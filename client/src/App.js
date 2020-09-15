import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import ShanePageTest from "./pages/ShanePagetest";
import Home from "./pages/Home";
import './css/board.css';
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
        <Toggle click={openHandler} />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
