import React from "react";
import "../css/ComponentStyles.css";

export default function Documentation() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>CheSSsk Library</h1>
          <br />
          <p>
            A library for chess move validation based on location and board data
          </p>
          <br />
          <h4>Getting Started:</h4>
            <p>To get started open the terminal for your project and run the command below:</p>
          <div className="code">
            <code>&nbsp;npm i chesssk</code>
          </div>
          <br />
          <h4>Example Usage:</h4>
          <div className="code">
            <code>&nbsp;const chesssk = require("chesssk");</code>
            <br />
            <code>&nbsp;const game = new chesssk();</code>
            <br />
            <code>&nbsp;game.setupNewGame();</code>
            <br />
            <code>&nbsp;let validMoves = game.getValidMoves("b1");</code>
            <br />
            <code>&nbsp;console.log(validMoves);</code>
          </div>
        </div>
      </div>
    </div>
  );
}
