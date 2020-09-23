import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import Home from "./pages/Home";
import Create from "./pages/CreateGame";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthOptions from "./pages/AuthOptions";

import SideNav from "./components/SideNav";
import Toggle from "./components/Toggle";

import UserContext from "./context/userContext";

import checkLoggedIn from "./utils/checkLoggedIn";

function App() {
  const [sidenavOpen, setSidenavOpen] = useState(true);

  // user auth
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    // const checkLoggedIn = async () => {

    //   let token = localStorage.getItem("auth-token"); // TODO

    //   if (token === null) {

    //     localStorage.setItem("auth-token", ""); // TODO

    //     token = "";
    //   }
    //   const tokenRes = await Axios.post(
    //     "/users/tokenIsValid",
    //     null,
    //     { headers: { "x-auth-token": token } }
    //   );
    //   if (tokenRes.data) {
    //     const userRes = await Axios.get("/users", {
    //       headers: { "x-auth-token": token },
    //     });
    //     setUserData({
    //       token,
    //       user: userRes.data,
    //     });

    //     test(token);
    //   }
    // };

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData( login );
    };

    // check();
    
  }, []);

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

  return (
    <div className="App">
      <>
        <Router>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Navbar className="sticky-top">
              <Toggle click={openHandler} />
              <Navbar.Brand href="/">Chess Masta Logo</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Item>{userData.user ? (<p>Welcome, {userData.user.displayName}!</p>) : (<><Link to="/login">Login</Link></>)}</Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="row m-0">
              <div className="col-md-3">{sidenav}</div>
              <div className="col-md-8">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/create" exact component={Create} />
                  <Route path="/rooms" exact component={Games} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/auth-options" exact component={AuthOptions} />
                </Switch>
              </div>
            </div>
          </UserContext.Provider>
        </Router>
      </>
    </div>
  );
}

export default App;
