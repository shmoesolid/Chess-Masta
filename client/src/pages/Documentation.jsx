import React from "react";
import "../css/ComponentStyles.css";

// Components
import Header from "../components/Header";
import SideNav from "../components/SideNav";

export default function Documentation() {

  return (
    <div>
      <Header />
      <div className="row m-0">
        <div className="col-md-3">
          <SideNav />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <br />
                <h1>CheSSsk Library</h1>
                <hr />
                <br />
                <h4>Description:</h4>
                <hr />
                <p>
                  A library for chess move validation based on
                  location and board data
                </p>
                <br />
                <h4>Getting Started:</h4>
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
                <h4>Example Usage:</h4>
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
        </div>
      </div>
    </div>
  );
}
