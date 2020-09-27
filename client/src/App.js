import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthOptions from "./pages/AuthOptions";
import Documentation from "./pages/Documentation";
import Home from "./pages/Home";

import UserContext from "./context/userContext";

import checkLoggedIn from "./utils/checkLoggedIn";

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
  });

  useEffect(() => {

    async function check() {
      var login = await checkLoggedIn();
      if (login !== false) setUserData(login);
    }

    check();
  }, []);
  return (

    <div className="App">
        <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={AuthOptions} />
              <Route path="/rooms" exact component={Games} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/documentation" exact component={Documentation} />
            </Switch>
            </>
          </UserContext.Provider>
        </Router>
    </div>
  );
}

export default App;
