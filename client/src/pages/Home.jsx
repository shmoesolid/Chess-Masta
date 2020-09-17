import React from "react";
import "../css/board.css";
import ShaneBoard from "../components/ShaneBoard";
import chesssk from "chesssk";

function Home() {
  var game = new chesssk();
  game.setupNewGame();
  console.log("setting up new game...");

  return <ShaneBoard game={game} />;
}

export default Home;
