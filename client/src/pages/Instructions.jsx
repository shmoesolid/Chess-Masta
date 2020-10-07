import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/go";
import * as MdIcons from "react-icons/md";
// Components
import Navigation from "../components/Header";

export default function Instructions() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 900;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  return (
    <div>
      <Navigation />
      <div className="row m-0">
        {width > breakpoint ? <div className="col-md-2"></div> : ""}
        {width > breakpoint ? (
          <div
            style={{ margin: "2%",marginTop: "0px", padding: "26px" }}
            className="col-md-9"
          >
            <h4>How To Play:</h4>
            <br />
            <h5>Create An Account or Log In</h5>
            <hr />
            To start creating and playing games, you must first be logged into
            an account. <a href="/register">Create an account</a> or{" "}
            <a href="/login">log in</a> to get started.
            <br />
            <br />
            <br />
            <h5>Create a Game or Join Existing Game</h5>
            <hr />
            To create a new game fill out the set up form in the games tab and
            select 'Create Game'. Games that are password protected are meant
            for users who would like to play a game with a specific player. Set
            a password and pass it to your friend for a room that only you two
            can access.
            <br />
            <br />
            Existing games will be listed for users to join. To load into a game
            click on the '<FaIcons.GoPlay color="green" />' icon in the table.
            Games you are a part of will have the option for you to delete by
            clicking the '<MdIcons.MdDelete color="red" />' icon.
            <br />
            <br />
            <br />
            <h5 className="titi">Move Suggestions and Validation</h5>
            <hr />
            <div className="row">
              <div className="col-md-5">
                Once you have joined a game and it's your turn you will be able
                to select your piece and make your move. CheSSsk will handle
                move validation so you won't be able to make any illegal moves.
                CheSSsk also provides suggestions for each piece so you can
                visualize your move before you make it.
              </div>
              <div
                style={{ marginTop: "25px" }}
                className="col-md-5 mx-auto text-center justify-content-center align-center"
              >
                <img
                  src="../moveSuggestion.png"
                  alt="Move Suggestion"
                  className="howToImg"
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            <h5>Chat With Your Opponent</h5>
            <hr />
            <div className="row">
              <div className="col-md-5">
                Use Socket.io to chat with your opponents and get automatic
                board updates whenever they make a move. Chat boards are unique
                per game so only messages between the players currently playing
                in a game will be displayed.
              </div>
              <div
                style={{ marginTop: "25px" }}
                className="col-md-5 mx-auto text-center justify-content-center align-center"
              >
                <img src="../chat1.png" alt="Chat" className="howToImg" />
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        ) : (
          <div
            style={{ margin: "4%", padding: "26px" }}
            className="col-md-12 card-1"
          >
            <h4>How To Play:</h4>
            <br />
            <h5>Create An Account or Log In</h5>
            <hr />
            To start creating and playing games, you must first be logged into
            an account. <a href="/register">Create an account</a> or{" "}
            <a href="/login">log in</a> to get started.
            <br />
            <br />
            <br />
            <h5>Create a Game or Join Existing Game</h5>
            <hr />
            To create a new game fill out the set up form in the games tab and
            select 'Create Game'. Games that are password protected are meant
            for users who would like to play a game with a specific player. Set
            a password and pass it to your friend for a room that only you two
            can access.
            <br />
            <br />
            Existing games will be listed for users to join. To load into a game
            click on the '<FaIcons.GoPlay color="green" />' icon in the table.
            Games you are a part of will have the option for you to delete by
            clicking the '<MdIcons.MdDelete color="red" />' icon.
            <br />
            <br />
            <br />
            <h5 className="titi">Move Suggestions and Validation</h5>
            <hr />
            <div className="row">
              <div className="col-md-5">
                Once you have joined a game and it's your turn you will be able
                to select your piece and make your move. CheSSsk will handle
                move validation so you won't be able to make any illegal moves.
                CheSSsk also provides suggestions for each piece so you can
                visualize your move before you make it.
              </div>
              <div
                style={{ marginTop: "25px" }}
                className="col-md-5 mx-auto text-center justify-content-center align-center"
              >
                <img
                  src="../moveSuggestion.png"
                  alt="Move Suggestion"
                  className="howToImg"
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            <h5>Chat With Your Opponent</h5>
            <hr />
            <div className="row">
              <div className="col-md-5">
                Use Socket.io to chat with your opponents and get automatic
                board updates whenever they make a move. Chat boards are unique
                per game so only messages between the players currently playing
                in a game will be displayed.
              </div>
              <div
                style={{ marginTop: "25px" }}
                className="col-md-5 mx-auto text-center justify-content-center align-center"
              >
                <img src="../chat1.png" alt="Chat" className="howToImg" />
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
}
