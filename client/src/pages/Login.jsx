import React, { useState, useContext } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import UserContext from "../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import Header from "../components/Header";
import SideNav from "../components/SideNav";

import Games from "./Games";
import Documentation from "./Documentation";
import AuthOptions from "./AuthOptions";
import Instructions from "./Instructions";

import "../css/ComponentStyles.css";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post("/users/login", loginUser);
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
            <div>
              <Header />
              <div className="row m-0">
                <div className="col-md-3">
                  <SideNav />
                </div>
                <div className="card col-md-7">
                  <h2>Log in</h2>
                  {error && (
                    <ErrorNotice
                      message={error}
                      clearError={() => setError(undefined)}
                    />
                  )}
                  <form className="form" onSubmit={submit}>
                    <label htmlFor="login-email">Email</label>
                    <input
                      id="login-email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" value="Log in" />
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
