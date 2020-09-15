import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login";

import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Toggle from "./components/Toggle";

function App() {
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const openHandler = () => {
    if (!sidenavOpen) {
      setSidenavOpen(true)
    } else {
      setSidenavOpen(false)
    }
  }

  const sidenavCloseHandler = () => {
    setSidenavOpen(false);
  }

  let sidenav
  if (sidenavOpen) {
    sidenav = <SideNav close={sidenavCloseHandler} sidenav = "sidenav"/>
  }

  return (
    <div className="App">
      <Router>
        <Header />
        {sidenav}
        <div className="row">
          <div className="col-md-3">
          <Toggle click={openHandler} />
          </div>
          <div className="col-md-8">
            <Switch>
              <Route path="/" component={Home} />
              <Route path='/login' component={Login} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
