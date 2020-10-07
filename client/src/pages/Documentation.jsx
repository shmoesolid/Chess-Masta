import React from "react";
import "../css/ComponentStyles.css";

// Components
import Navigation from "../components/Header";

export default function Documentation() {

  return (
    <div>
      <Navigation />
      <div className="row m-0">
        <div className="col-md-2" style={{ margin: "2%",marginTop: "0px", padding: "26px" }}>
        </div>
        <div className="col-md-8">
          <br />
          <h4>CheSSsk Library</h4>
          <hr />
          <br />
          <h5>Description:</h5>
          <hr />
          <p>
            A library for chess move validation based on
            location and board data
          </p>
          <br />
          <h5>Getting Started:</h5>
          <hr />
          <p>
            To get started open the terminal for your project
            and run the command below:
          </p>
          <div className="code">
            <code>&nbsp;npm i chesssk</code>
          </div>
          <br />
          <br />
          <h5>Example Usage:</h5>
          <hr />
          <div className="code">
            <code>
              &nbsp;const chesssk = require("chesssk");
            </code>
            <br />
            <code>&nbsp;const game = new chesssk();</code>
            <br />
            <code>&nbsp;game.setupNewGame();</code>
            <br />
            <code>
              &nbsp;let validMoves = game.getValidMoves("b1");
            </code>
            <br />
            <code>&nbsp;console.log(validMoves);</code>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
