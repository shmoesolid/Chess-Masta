import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Games from "./pages/Games";
import Login from "./pages/Login";
import Activate from "./pages/Activate"
import Register from "./pages/Register";
import AuthOptions from "./pages/AuthOptions";
import Documentation from "./pages/Documentation";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import UserContext from "./context/userContext";

import checkLoggedIn from "./utils/checkLoggedIn";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ user: undefined });
  const value = { userData, setUserData };

  useEffect(() => {
    if (userData.user)
      return;

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData(login);
      setLoading(false);
    }

    check();

    return () => {};
  }, [userData, isLoading]);

  if (isLoading) return <>Loading...</>;
  
  return (

    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact >
            <UserContext.Provider value={value}>
              {userData.user && userData.user.activateCode && <Redirect to="/activate" />}
              <Home />
            </UserContext.Provider>
          </Route>
          <Route path="/home" exact >
            <UserContext.Provider value={value}>
              {userData.user && userData.user.activateCode && <Redirect to="/activate" />}
              <AuthOptions />
            </UserContext.Provider>
          </Route>
          <Route path="/rooms" exact >
            <UserContext.Provider value={value}>
              {userData.user && userData.user.activateCode && <Redirect to="/activate" />}
              {userData.user ? <Games /> : <Redirect to="/login" />}
            </UserContext.Provider>
          </Route>
          <Route path="/login" exact >
            <UserContext.Provider value={value}>
              {userData.user && userData.user.activateCode && <Redirect to="/activate" />}
              {userData.user ? <Redirect to="/rooms" /> : <Login />}
            </UserContext.Provider>
          </Route>
          <Route path="/activate" exact >
            <UserContext.Provider value={value}>
              {userData.user && !userData.user.activateCode ? <Redirect to="/rooms" /> : <Activate />}
            </UserContext.Provider>
          </Route>
          <Route path="/register" exact >
            <UserContext.Provider value={value}>
              {userData.user && userData.user.activateCode && <Redirect to="/activate" />}
              {userData.user ? <Redirect to="/rooms" /> : <Register />}
            </UserContext.Provider>
          </Route>
          <Route path="/instructions" exact >
            <UserContext.Provider value={value}><Instructions /></UserContext.Provider>
          </Route>
          <Route path="/documentation" exact >
            <UserContext.Provider value={value}><Documentation /></UserContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
