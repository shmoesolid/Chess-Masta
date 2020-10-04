import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import "../css/ComponentStyles.css";
import UserContext from "../context/userContext";
import Navigation from "../components/Header";

export default function Activate() {
  const [code, setCode] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    Axios.get("/api/users/logout", { withCredentials: true });
    setUserData({
      user: undefined,
    });
    history.push("/");
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
        // do with creds because we are technically logged in
        const activateRes = await Axios.post("/api/users/activate", {activateCode: code}, { withCredentials: true });
        setUserData({
            user: activateRes.data,
        });
        window.location.reload();
        //history.push("/rooms");
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
            <h2 className="title">Activate Your Account</h2>
            <br />
            {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )}
            <p>Please check your email for your activation code we sent to confirm your email address is authentic.</p>
            <br />
            <form className="form" onSubmit={submit}>
                <label htmlFor="activate-code">Activation Code</label>
                <input
                    id="activate-code"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    maxLength="6"
                />
                <input type="submit" value="Activate" />
                
            </form>
            <button className="btn btn-warning" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
