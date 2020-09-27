import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Axios from "axios";

import checkLoggedIn from "../utils/checkLoggedIn";
import UserContext from "../context/userContext";

// Components
import Header from "../components/Header";
import SideNav from "../components/SideNav";

// Pages
import Games from "./Games";
import Instructions from "./Instructions";
import Documentation from "./Documentation";

export default function AuthOptions() {
  const [userData, setUserData] = useState({
    user: undefined,
  });
  const history = useHistory();

  useEffect(() => {

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData(login);
    }

    check();
  }, []);

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
              <Route path="/instructions" exact component={Instructions} />
              <Route path="/documentation" exact component={Documentation} />
              <UserContext.Provider value={{ userData, setUserData }}>
                <Header />
                <div className="row m-0">
                  <div className="col-md-3">
                    <SideNav />
                  </div>
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
