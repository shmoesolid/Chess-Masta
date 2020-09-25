import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/userContext";

import CreateBoard from "./CreateBoard";
import ValidMoves from "./ValidMoves";
import Pieces from "./Pieces";

import socketioClient from "socket.io-client";

function ShaneBoard(props) 
{
  const { userData } = useContext(UserContext);
  const [nodesState, setNodesState] = useState(
    // fill 2d array grid with null
    Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null))
  );
  const [validMoves, setValidMoves] = useState([]);
  const [selected, setSelected] = useState(null);

  // handle black on bottom per user preference
  var blackOnBottom = userData.user.blackOnBottom;
  var blackPlayer = false;
  if (userData.user._id === props.data.hostId) blackPlayer = props.data.hostColor === 1;
  else blackPlayer = props.data.clientColor === 1;

  // handle board theme
  var root = document.documentElement;
  root.style.setProperty("--light-color", userData.user.boardWhiteColor);
  root.style.setProperty("--dark-color", userData.user.boardBlackColor);
  root.style.setProperty("--border-color", userData.user.boardBorderColor);

  // other needed vars
  var NUM_TO_LETTER = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var cellSize = getComputedStyle(document.documentElement).getPropertyValue("--cell-size").slice(0, -2); // removes 'px'

  // this refreshes on props.game._grid update
  useEffect(() => {
    setNodesState(props.game._grid); // update our node state with grid
  }, [props.game._grid]);

  // socket.io client, update board if other player moves
  // separate useeffect with no vars, runs once per component load
  useEffect(() => {
    const socket = socketioClient("/");
    socket.on("moveUpdate", gameId => {
        console.log("received", gameId);
        props.update(gameId);
    });
    socket.emit('userData', {uid: userData.user._id, gid: props.data._id});

    return () => { 

        // shut off listener and tell server we're done
        socket.off("moveUpdate");
        socket.emit('disconnect');
    }
  }, []);

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function floorBySize(num) {
    return Math.floor(num / cellSize);
  }

  function getDisplayCoords(node) {
    // test
    var imageWidth = 40; // FOR NOW (IMAGE SIZE KNOWN)
    var imageHeight = 40; // FOR NOW (IMAGE SIZE KNOWN)
    var xDisp, yDisp;

    if (blackOnBottom && blackPlayer) {
      // x moves with board and needs inverse
      xDisp = cellSize * 8 - node.x * cellSize - imageWidth - imageWidth / 4;

      // y moves with board
      yDisp = node.y * cellSize + imageWidth / 4;
    } else {
      // x moves with board
      xDisp = node.x * cellSize + imageWidth / 4;

      // y moves with board and needs to be inversed
      yDisp = cellSize * 8 - node.y * cellSize - imageHeight - imageHeight / 4;
    }

    // return data in object
    return { top: yDisp, left: xDisp };
  }

  function showCoords(event) {
      console.log("showing coords");
    var tableChess = document.getElementById("board");
    var bounding = tableChess.getBoundingClientRect();
    var x;
    var y;

    // black on bottom
    if (blackOnBottom && blackPlayer) {
      x = Math.abs(event.clientX - bounding.right);
      y = event.clientY - bounding.top;
    }

    // white on bottom
    else {
      x = event.clientX - bounding.left;
      y = Math.abs(event.clientY - bounding.bottom);
    }

    // contain x and y
    x = clamp(x, 0, bounding.width - 1);
    y = clamp(y, 0, bounding.height - 1);

    // get array indexes and keep x and y within range
    var chessCol = floorBySize(x);
    var chessRow = floorBySize(y);

    // setup display vars (DEBUG)
    // var coords =
    //   "Actual: " +
    //   x +
    //   ", " +
    //   y +
    //   "<br />Array: [ " +
    //   chessCol +
    //   " ][ " +
    //   chessRow +
    //   " ]" +
    //   "<br />Notation: " +
    //   NUM_TO_LETTER[chessCol] +
    //   (chessRow + 1) +
    //   "<br />";

    // display (DEBUG)
    //document.getElementById("coords").innerHTML = coords;

    // get node by string (no longer need game for this)
    var gridCopy = [...nodesState];
    var clickedString = NUM_TO_LETTER[chessCol] + (chessRow + 1);
    var node = gridCopy[chessCol][chessRow];

    // handle toggle selection
    if (selected === null) {
      console.log("selecting1");
      // select if piece exists
      if (node !== false && node.p !== null) {
        console.log("selecting2");
        setSelected(node);
        var fromString = NUM_TO_LETTER[node.x] + (node.y + 1);
        possibleMoves(fromString);
      }
    }

    // deselect if same node clicked
    else if (selected === node) {
      console.log("deselecting");
      setSelected(null);
      setValidMoves([]);
    }

    // make the move
    else {
      console.log("attempting move");
      var fromString = NUM_TO_LETTER[selected.x] + (selected.y + 1);
      makeMove(fromString, clickedString);
      setSelected(null);
      setValidMoves([]);
    }
  }

  function possibleMoves(from) {
    Axios.get(`/api/games/${props.data._id}/${from}`, {
      withCredentials: true,
    })
      .then((res) => {
        setValidMoves(res.data.results);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  function makeMove(from, to) {
    console.log("making move");
    Axios.put(
      `/api/games/move`,
      {
        id: props.data._id,
        from: from,
        to: to,
      },
      { withCredentials: true }
    )
      .then(() => props.update(props.data._id))
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  return (
    <div>
      {/*chess board border*/}
      <div className="board_border">
        {/*chess board wrapper (where board table and pieces are handled)*/}
        <div id="board" onClick={showCoords} style={{ position: "relative" }}>
            <CreateBoard />
            <ValidMoves validMoves={validMoves} getCoords={getDisplayCoords} />
            <Pieces nodesState={nodesState} getCoords={getDisplayCoords} />
        </div>
      </div>

      {/*current mouse click coords*/}
      <div id="coords" style={{ color: "white" }} />
    </div>
  );
}

export default ShaneBoard;
