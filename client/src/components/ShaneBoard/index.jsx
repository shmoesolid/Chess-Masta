import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/userContext";

import CreateBoard from "./CreateBoard";
import ValidMoves from "./ValidMoves";
import Pieces from "./Pieces";
//import Chat from "./Chat";

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
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    // get chat
    getAllMsgs();
    //setChat(chat);
  }, []);

  // socket.io client, update board if other player moves
  // separate useeffect with no vars, runs once per component load
  useEffect(() => {
    const socket = socketioClient("/");
    socket.on("moveUpdate", gameId => {
        console.log("socketio move update", gameId);
        props.update(gameId);
    });
    socket.on("msgUpdate", msg => {
        getAllMsgs();
        // console.log("received msg:", msg);
        // console.log('before:', chat);
        // var tmp = chat;
        // tmp.unshift(msg);
        // console.log('after:', tmp);
        // setChat(tmp);
    });
    socket.emit('userData', {uid: userData.user._id, gid: props.data._id});

    // handle component leave
    return () => { 

        // shut off listener and tell server we're done
        socket.off("msgUpdate");
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

  function handleClick(event) {
    var tableChess = document.getElementById("board");
    var bounding = tableChess.getBoundingClientRect();
    var x, y;

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
    //   "Actual: " + x + ", " + y +
    //   "<br />Array: [ " + chessCol + " ][ " + chessRow + " ]" +
    //   "<br />Notation: " + NUM_TO_LETTER[chessCol] + (chessRow + 1) + "<br />";

    // display (DEBUG)
    //document.getElementById("coords").innerHTML = coords;

    // get node by string (no longer need game for this)
    var gridCopy = [...nodesState];
    var clickedString = NUM_TO_LETTER[chessCol] + (chessRow + 1);
    var node = gridCopy[chessCol][chessRow];
    var fromString;

    // handle toggle selection
    if (selected === null) {

      // select if piece exists
      if (node !== false && node.p !== null) {
        setSelected(node);
        fromString = NUM_TO_LETTER[node.x] + (node.y + 1);
        possibleMoves(fromString);
      }
    }

    // deselect if same node clicked
    else if (selected === node) {
      setSelected(null);
      setValidMoves([]);
    }

    // make the move
    else {
      fromString = NUM_TO_LETTER[selected.x] + (selected.y + 1);
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

    function getAllMsgs() {
        Axios
            .get('/api/games/chat/'+ props.data._id, { withCredentials: true })
            .then( res => {
                //console.log("msgs received:", res.data);
                setChat(res.data);
            })
            .catch((err) => {
                if (err) console.log(err);
            });
    }

    function sendMsg(msg) {
        var username = userData.user.displayName;
        Axios
            .post(
                '/api/games/chat', 
                {
                    id: props.data._id, 
                    displayName: username, 
                    msg
                }, 
                { withCredentials: true }
            )
            .then( () => {
                var tmp = chat;
                tmp.unshift(username +": "+ msg);
                setChat(tmp);
                setMessage("");
            })
            .catch((err) => {
                if (err) console.log(err);
            });
    }

    function handleInputChange(event)
    {
        setMessage(event.target.value);
    }

    function handleFormSubmit(event)
    {
        event.preventDefault();
        sendMsg(message);
    }

    return (
        <div>
            {/*chess board border*/}
            <div className="board_border">
                {/*chess board wrapper (where board table and pieces are handled)*/}
                <div id="board" onClick={handleClick} style={{ position: "relative" }}>
                    <CreateBoard />
                    <ValidMoves validMoves={validMoves} getCoords={getDisplayCoords} />
                    <Pieces nodesState={nodesState} getCoords={getDisplayCoords} />
                </div>
            </div>

            {/*chat*/}
            <div style={{float:'left'}}>
                <form>
                    <input type="text" name="message" placeholder="Message..." onChange={handleInputChange} value={message} />
                    <button onClick={handleFormSubmit}>Send</button>
                </form>
                <textarea 
                    readOnly={true} 
                    value={chat.map(msg => msg+'\n').join('')/*this stupid join to remove commas... makes my head hurt*/}
                />
            </div>
            
            {/*current mouse click coords*/}
            <div id="coords" style={{ color: "white" }} />
        </div>
    );
}

export default ShaneBoard;
