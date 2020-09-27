import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import checkLoggedIn from "../utils/checkLoggedIn";
import Axios from "axios";
import { Nav, Navbar } from "react-bootstrap";

import "../css/board.css";
import CreateGame from "../components/CreateGame";
import ShaneBoard from "../components/ShaneBoard";
import CheSSsk from "chesssk";

import SideNav from "../components/SideNav";
import Toggle from "../components/Toggle";

function Games() {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 933;

  const openHandler = () => {
    if (!sidenavOpen) {
      setSidenavOpen(true);
    } else {
      setSidenavOpen(false);
    }
  };

  const sidenavCloseHandler = () => {
    setSidenavOpen(false);
  };

  let sidenav;
  if (sidenavOpen) {
    sidenav = <SideNav close={sidenavCloseHandler} sidenav="sidenav" />;
  }

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  const deleteUser = () => {
    const user = { withCredentials: true };
    Axios.delete("/users/delete", user);
    setUserData({
      token: undefined,
      user: undefined,
    });
    history.push("/login");
  };

  const { userData, setUserData } = useContext(UserContext);
  const [gameList, setGameList] = useState([]);
  const [gameData, setGameData] = useState({ gameObj: null, data: {} });
  const [gamePassword, setGamePassword] = useState("");

  useEffect(() => {
    // confirm we are have our user data
    // sometimes would error on refresh
    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) {
        setUserData(login);
        getGames();
      }
    }
    if (typeof userData.user !== "undefined" && gameData.gameObj !== null)
      return getGames();

    check();

    return () => console.log("games unmounting");
  }, []);

  const gamePassChange = (event) => {
    setGamePassword(event.target.value);
  };

  const getGames = () => {
    Axios.get("/api/games", { withCredentials: true })
      .then((res) => {
        //console.log(res.data);
        setGameList(res.data);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  const loadGameById = (id) => {
    console.log("loading game by id");
    Axios.get("/api/games/" + id, { withCredentials: true })
      .then((res) => {
        // create new game
        var game = new CheSSsk();

        // set game grid data from our boardData
        game.setGridFromJSON(res.data.boardData);
        console.log("loaded:", game._grid);

        // set our game, plus the other stuff for reference
        setGameData({ gameObj: game, data: res.data });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  const joinGameById = (id) => {
    Axios.post(
      "/api/games/join",
      { id, gamePassword },
      { withCredentials: true }
    )
      .then((res) => {
        // create new game
        var game = new CheSSsk();

        // set game grid data from our boardData
        game.setGridFromJSON(res.data.boardData);
        console.log("joined:", game._grid);

        // set our game, plus the other stuff for reference
        setGameData({ gameObj: game, data: res.data });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  const deleteGameById = (id) => {
    Axios.delete("/api/games/" + id, { withCredentials: true })
      .then((res) => {
        getGames();
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  };

  const goBackToListing = () => {
    setGameData({ gameObj: null, data: {} });
    getGames();
  };

  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return <span>Waiting for join...</span>;
      case 1:
        return <span>White move...</span>;
      case 2:
        return <span>Black move...</span>;
      default:
        return <span>Status not used yet...</span>;
    }
  };

  return (
    <div>
      <div className="App">
        <>
          <Router>
            <UserContext.Provider value={{ userData, setUserData }}>
              <Navbar className="sticky-top">
                {width > breakpoint ? "" : <Toggle click={openHandler} />}
                <Navbar.Brand href="/">Chess Masta Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto welcome">
                    <Nav.Item>
                      {userData.user ? (
                        <p>
                          <Link to="/home">
                            Welcome, {userData.user.displayName}!
                          </Link>
                        </p>
                      ) : (
                        <p>
                          <Link to="/login">Login</Link>
                        </p>
                      )}
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <div className="row m-0">
                <div className="col-md-3">
                  {width < breakpoint ? (
                    ""
                  ) : (
                    <SideNav close={sidenavCloseHandler} sidenav="sidenav" />
                  )}
                </div>
                <div>{sidenav}</div>
                <div className="col-md-9">
                  {userData.user ? (
                    <>
                      {!gameData.gameObj ? (
                        <>
                          <h2>Create Game</h2>
                          <CreateGame update={loadGameById} />
                          <br />
                          <br />
                          <h2>Game List</h2>
                          <ul>
                            {gameList.map((item, index) => {
                              return item.hostId === userData.user.id ||
                                item.clientId === userData.user.id ? (
                                <li key={index}>
                                  {item.name}&nbsp;
                                  <button
                                    onClick={() => loadGameById(item._id)}
                                  >
                                    Load
                                  </button>
                                  &nbsp;
                                  <button
                                    onClick={() => deleteGameById(item._id)}
                                  >
                                    Delete
                                  </button>
                                </li>
                              ) : (
                                !item.clientId && (
                                  <li key={index}>
                                    {item.name}&nbsp;
                                    {item.locked && (
                                      <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Game password..."
                                        onChange={gamePassChange}
                                      />
                                    )}
                                    <button
                                      onClick={() => joinGameById(item._id)}
                                    >
                                      Join
                                    </button>
                                  </li>
                                )
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <>
                          <button onClick={() => goBackToListing()}>
                            BACK
                          </button>
                          {renderStatus(gameData.data.gameStatus)}
                          <ShaneBoard
                            game={gameData.gameObj}
                            data={gameData.data}
                            update={loadGameById}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <h2>Please login...</h2>
                    </>
                  )}
                </div>
              </div>
            </UserContext.Provider>
          </Router>
        </>
      </div>
    </div>
  );
}

export default Games;
