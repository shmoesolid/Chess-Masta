import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import Navigation from "../components/Header";

import "../css/ComponentStyles.css";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post("/api/users/login", loginUser);
      setUserData({
        user: loginRes.data,
      });
      history.push("/rooms");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <Navigation />
      <div className="row m-0">
        <div className="col-md-3"></div>
        <div style={{ float: "left" }} className="card card-1 col-md-7">
          <br />
          <h2 className="title">Log in</h2>
          <br />
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
            <br />{" "}
            <i>
              New user? Register <a href="/register">here.</a>
            </i>
          </form>
        </div>
      </div>
    </div>
  );
}
