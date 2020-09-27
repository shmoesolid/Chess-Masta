import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

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
    <div className="page">
      <div className="space"></div>
      <div className="row">
        <div className="card col-md-9">
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

            <label htmlFor="register-display-name">Display name</label>
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
  );
}
