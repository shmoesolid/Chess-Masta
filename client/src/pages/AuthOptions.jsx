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
    Axios.get("/api/users/logout", { withCredentials: true });
    setUserData({
      user: undefined,
    });
    history.push("/");
  };
  const deleteUser = () => {
    Axios.delete("/api/users/delete", { withCredentials: true });
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
                  <div className="row">
                    <div
                      onClick={logout}
                      className="col-md-5 card text-center card-1"
                    >
                      <p>Logout</p>
                    </div>
                    <div
                      onClick={deleteUser}
                      className="col-md-5 card text-center card-1"
                    >
                      <p>Delete Account</p>
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
                  <div className="row">
                    <div
                      onClick={register}
                      className="col-md-5 card text-center card-1"
                    >
                      <p>Register</p>
                    </div>
                    <div
                      onClick={login}
                      className="col-md-5 card text-center card-1"
                    >
                      <p>Log in</p>
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
