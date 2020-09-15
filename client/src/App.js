import React, { useState } from 'react';
import ShanePageTest from "./pages/ShanePagetest";
//import './css/themes/board_green_gray.css';
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
      <Header />
      {sidenav}
      <Toggle click={openHandler} />
      <ShanePageTest />
    </div>
  );
}

export default App;
