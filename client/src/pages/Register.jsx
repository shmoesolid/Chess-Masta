import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import "../css/ComponentStyles.css";
import UserContext from "../context/userContext";
import Navigation from "../components/Header";

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
      await Axios.post("/api/users/register", newUser);
      const loginRes = await Axios.post("/api/users/login", {
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
    <div>
      <Navigation />
      <div className="row m-0">
        <div className="col-md-3"></div>
        <div style={{float: "left"}} className="card card-1 col-md-7">
          <div>
            <br />
            <h2 className="title">Create an Account</h2>
            <br />
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
                maxLength="128"
              />
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                maxLength="128"
              />
              <input
                type="password"
                placeholder="Verify password"
                onChange={(e) => setPasswordCheck(e.target.value)}
                maxLength="128"
              />
              <label htmlFor="register-display-name">Username</label>
              <input
                id="register-display-name"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength="32"
              />
              <input type="submit" value="Register" />
              <br />{" "}
              <i>
                Existing user? Log in <a href="/login">here.</a>
              </i>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
