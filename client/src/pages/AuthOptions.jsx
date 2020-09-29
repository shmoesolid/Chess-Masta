import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import UserContext from "../context/userContext";

// Components
import Navigation from "../components/Header";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    Axios.get("/users/logout", { withCredentials: true });
    setUserData({
      user: undefined,
    });
    history.push("/");
  };
  const deleteUser = () => {
    Axios.delete("/users/delete", { withCredentials: true });
    setUserData({
      user: undefined,
    });
    history.push("/login");
  };

  return (
    <div>
      <Navigation />
      <div className="row m-0">
        <div className="col-md-3"></div>
        <div className="col-md-9">
          <div className="auth-options">
            {userData.user ? (
              <>
                <br />
                <br />
                <h5 className="title">Account Options</h5>
                <hr />
                <div style={{marginLeft: "5px"}} className="row title">
                  <div
                    onClick={logout}
                  >
                    <button className="btn btn-warning">Logout</button>
                  </div>&nbsp;
                  <div
                    onClick={deleteUser}
                  >
                    <button className="btn btn-danger">
                      Delete Account
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <br />
                <br />
                <h5 className="title">
                  Log in or Register a New Account to Start Playing
                </h5>
                <hr />
                <div style={{marginLeft: "5px"}} className="row title">
                  <div
                    onClick={register}
                  >
                    <button className="btn btn-info">Register</button>
                  </div>&nbsp;
                  <div
                    onClick={login}
                  >
                    <button className="btn btn-warning">Log in</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
