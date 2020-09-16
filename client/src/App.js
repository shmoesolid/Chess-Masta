import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login";

import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Toggle from "./components/Toggle";
import Navbar from "./components/Navbar";

function App() {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

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

  useEffect(() => {
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 1200;
        if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
  }, [isMobile]);
  
  let sidenav
  if (sidenavOpen) {
    sidenav = <SideNav className={`${isMobile ? "sidenav close" : "sidenav"}`} close={sidenavCloseHandler} sidenav="sidenav"/>
  }

  return (
    <div className="App">
      <Router>
      <Header />
      <div className="row m-0">
        <div className="col-md-3">
        <Toggle click={openHandler}/>
          {sidenav}
      </div>
          <div className="col-md-8">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path='/login' exact component={Login} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
