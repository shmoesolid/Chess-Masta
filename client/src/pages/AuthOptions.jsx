import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import UserContext from "../context/userContext";
import Axios from "axios";
import { Nav, Navbar } from "react-bootstrap";

import SideNav from "../components/SideNav";
import Toggle from "../components/Toggle";

import checkLoggedIn from "../utils/checkLoggedIn";

import Games from "../pages/Games";

export default function AuthOptions() {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 933;
  // user auth
  const [userData, setUserData] = useState({
    user: undefined,
  });

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData(login);
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

  return (
    <div className="App">
      <>
        <Router>
          <Route>
            <Switch>
            <Route path="/rooms" exact component={Games} />
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
                    <div className="auth-options">
                      {userData.user ? (
                        <>
                          <br />
                          <h5>Account Options:</h5>
                          <hr />
                          <div className="row">
                            <div className="acctOps">
                              <div id="logout" onClick={logout}>
                                Log out
                              </div>
                              <br />
                              <div id="delete" onClick={deleteUser}>
                                Delete Account
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <button onClick={register}>Register</button>
                          <button onClick={login}>Log in</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </UserContext.Provider>
            </Switch>
          </Route>
        </Router>
      </>
    </div>
  );
}
