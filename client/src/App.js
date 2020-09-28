import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Games from "./pages/Games";
import Login from "./pages/Login";
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
            <UserContext.Provider value={value}><Home /></UserContext.Provider>
          </Route>
          <Route path="/home" exact >
            <UserContext.Provider value={value}><AuthOptions /></UserContext.Provider>
          </Route>
          <Route path="/rooms" exact >
            <UserContext.Provider value={value}><Games /></UserContext.Provider>
          </Route>
          <Route path="/login" exact >
            <UserContext.Provider value={value}><Login /></UserContext.Provider>
          </Route>
          <Route path="/register" exact >
            <UserContext.Provider value={value}><Register /></UserContext.Provider>
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

  // return (

  //   <div className="App">
  //     <Router>
  //       <UserContext.Provider value={{ userData, setUserData }}>
  //         <>
  //           <Switch>
  //             <Route path="/" exact component={Home} />
  //             <Route path="/home" exact component={AuthOptions} />
  //             <Route path="/rooms" exact component={Games} />
  //             <Route path="/login" exact component={Login} />
  //             <Route path="/register" exact component={Register} />
  //             <Route path="/instructions" exact component={Instructions} />
  //             <Route path="/documentation" exact component={Documentation} />
  //           </Switch>
  //         </>
  //       </UserContext.Provider>
  //     </Router>
  //   </div>
  // );
}

export default App;
