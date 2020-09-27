import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import Games from "./Games";
import Login from "./Login";
import Register from "./Register";
import AuthOptions from "./AuthOptions";
import Documentation from "./Documentation";

import SideNav from "../components/SideNav";
import Toggle from "../components/Toggle";

import UserContext from "../context/userContext";

import checkLoggedIn from "../utils/checkLoggedIn";

function Home() {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 933;
  // user auth
  const [userData, setUserData] = useState({
    user: undefined
  });

  useEffect(() => {

    window.addEventListener("resize", () => setWidth(window.innerWidth));

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData( login );
    }

    check();
    
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
              {width > breakpoint ? "" : <Toggle click={openHandler} />}
              <Navbar.Brand href="/">Chess Masta Logo</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto welcome">
                  <Nav.Item>{userData.user ? (<p>Welcome, {userData.user.displayName}!</p>) : (<p><Link to="/login">Login</Link></p>)}</Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="row m-0">
              <div className="col-md-3">{width < breakpoint ? "" : <SideNav close={sidenavCloseHandler} sidenav="sidenav" />}</div>
              <div>{sidenav}</div>
              <div className="col-md-9">
                <Switch>
                  <Route path="/home" exact component={AuthOptions} />
                  <Route path="/rooms" exact component={Games} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/documentation" exact component={Documentation} />
                </Switch>
              </div>
            </div>
          </UserContext.Provider>
        </Router>
      </>
    </div>
  );
}

export default Home;
