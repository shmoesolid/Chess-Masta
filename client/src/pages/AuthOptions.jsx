import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import Axios from "axios";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

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
    const user = { headers: { "x-auth-token": localStorage.getItem("auth-token", "") } };
    Axios.delete("/users/delete", user);
    setUserData({
      token: undefined,
      user: undefined,
    });
    history.push("/login");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <>
          <div>
            <button onClick={logout}>Log out</button>
          </div>
          <div>
            <button onClick={deleteUser}>Delete Account</button>
          </div>
        </>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );
}
