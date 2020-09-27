import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import CheSSsk from "chesssk";
import "../css/board.css";

import checkLoggedIn from "../utils/checkLoggedIn";
import UserContext from "../context/userContext";

// Components
import CreateGame from "../components/CreateGame";
import ShaneBoard from "../components/ShaneBoard";
import SideNav from "../components/SideNav";
import Header from "../components/Header";

// Pages
import Instructions from "./Instructions";
import Documentation from "./Documentation";
import AuthOptions from "./AuthOptions";

function Games() {

  const { userData, setUserData } = useContext(UserContext);
  const [gameList, setGameList] = useState([]);
  const [gameData, setGameData] = useState({ gameObj: null, data: {} });
  const [gamePassword, setGamePassword] = useState("");

  useEffect(() => {

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData(login);
    }

    check();
  }, []);

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
            <Route>
              <Switch>
                <Route path="/instructions" exact component={Instructions} />
                <Route path="/home" exact component={AuthOptions} />
                <Route path="/documentation" exact component={Documentation} />
                <UserContext.Provider value={{ userData, setUserData }}>
                  <Header />
                  <div className="row m-0">
                    <div className="col-md-3">
                      <SideNav />
                    </div>
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
              </Switch>
            </Route>
          </Router>
        </>
      </div>
    </div>
  );
}

export default Games;
