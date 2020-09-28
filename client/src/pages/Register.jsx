import React, { useState, useContext } from "react";
import { useHistory, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import Header from "../components/Header";
import SideNav from "../components/SideNav";

import Games from "./Games";
import Documentation from "./Documentation";
import AuthOptions from "./AuthOptions";
import Instructions from "./Instructions";
import Login from "./Login";

import "../css/ComponentStyles.css";
import UserContext from "../context/userContext";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("/users/register", newUser);
      const loginRes = await Axios.post("/users/login", {
        email,
        password,
      });
      setUserData({
        user: loginRes.data,
      });
      history.push("/rooms");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="App">
      <Router>
        <Route>
          <Switch>
            <Route path="/rooms" exact component={Games} />
            <Route path="/home" exact component={AuthOptions} />
            <Route path="/documentation" exact component={Documentation} />
            <Route path="/instructions" exact component={Instructions} />
            <Route path="/login" exact component={Login} />
            <div>
              <Header />
              <div className="row m-0">
                <div className="col-md-3">
                  <SideNav />
                </div>
                <div className="card col-md-7">
                  <h2>New User? Create an Account.</h2>
                  {error && (
                    <ErrorNotice
                      message={error}
                      clearError={() => setError(undefined)}
                    />
                  )}
                  <form className="form" onSubmit={submit}>
                    <label htmlFor="register-email">Email</label>
                    <input
                      id="register-email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="register-password">Password</label>
                    <input
                      id="register-password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Verify password"
                      onChange={(e) => setPasswordCheck(e.target.value)}
                    />

                    <label htmlFor="register-display-name">Username</label>
                    <input
                      id="register-display-name"
                      type="text"
                      onChange={(e) => setDisplayName(e.target.value)}
                    />

                    <input type="submit" value="Register" />
                  </form>
                </div>
              </div>
            </div>
          </Switch>
        </Route>
      </Router>
    </div>
  );
}
