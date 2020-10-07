import React from "react";
import "../css/ComponentStyles.css";

// Components
import Navigation from "../components/Header";

export default function Documentation() {
  return (
    <div>
      <Navigation />
      <div className="row m-0">
        <div
          className="col-md-2"
          style={{ margin: "2%", marginTop: "0px", padding: "26px" }}
        ></div>
        <div className="col-md-8">
          <br />
          <h4>CheSSsk Library</h4>
          <hr />
          <br />
          <h5>Description:</h5>
          <hr />
          <i>Still a WIP</i>
          <br />
          <br />
          A library for chess move validation based on location and board data.
          <br />
          <br />
          <ul>
            <li>Set up new game</li>
            <li>Load game from database JSON string</li>
            <li>Export board data to JSON string for saving</li>
            <li>Get valid moves for pieces based on location</li>
            <li>Make only valid moves for pieces</li>
            <li>En passant</li>
            <li>King check and checkmate status updates</li>
            <li>Pawn exchange</li>
          </ul>
          <br />
          <h5>Getting Started:</h5>
          <hr />
          <p>
            To get started open the terminal for your project and run the
            command below:
          </p>
          <div className="code">
            <code>&nbsp;npm i chesssk</code>
          </div>
          <br />
          <br />
          <h5>Example Usage:</h5>
          <hr />
          <ul>
            <li>
              Creating a new game and getting valid moves for a location
              <br />
              <br />
              <div className="code">
                <br />
                <code>&nbsp;const chesssk = require("chesssk");</code>
                <br />
                <code>&nbsp;const game = new chesssk();</code>
                <br />
                <br />
                <code>&nbsp;game.setupNewGame();</code>
                <br />
                <br />
                <code>&nbsp;let validMoves = game.getValidMoves("b1");</code>
                <br />
                <code>&nbsp;console.log(validMoves);</code>
                <br />
                <br />
              </div>
            </li>
            <br />
            <li>
              Load a game from database, make a move, and get new grid data in
              json string
              <br />
              <br />
              <div className="code">
                <br />
                <code>&nbsp;const chesssk = require("chesssk");</code>
                <br />
                <code>&nbsp;const game = new chesssk();</code>
                <br />
                <br />
                <code>&nbsp;game.setGridFromJSON( db.jsonGameData );</code>
                <br />
                <br />
                <code>
                  &nbsp;let moveResult = game.move("b2", "b4",
                  db.enPassantString);
                </code>
                <br />
                <code>
                  &nbsp;let dbJsonStringToSave = game.getGridInJSON();
                </code>
                <br />
                <br />
                <i className="codeNotes">
                  &nbsp;&nbsp;&nbsp;// do database and client updates with
                  moveResult object and new grid data
                </i>
                <br />
                <code>&nbsp;console.log(moveResult, dbJsonStringToSave);</code>
                <br />
                <br />
              </div>
            </li>
          </ul>
          <br />
        </div>
      </div>
    </div>
  );
}
