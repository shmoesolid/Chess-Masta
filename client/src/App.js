import React from 'react';
import ShanePageTest from "./pages/ShanePagetest";
//import './css/themes/board_green_gray.css';
import './css/board.css';
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Toggle from "./components/Toggle";

function App() {
  return (
    <div className="App">
      <Header />
      <SideNav />
      <Toggle />
      <ShanePageTest />
    </div>
  );
}

export default App;
