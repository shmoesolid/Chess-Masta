import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import UserContext from "../../context/userContext";


function ShaneBoard(props)
{
    const { userData } = useContext(UserContext);
    const [ nodesState, setNodesState ] = useState(

        // fill 2d array grid with null
        Array.from(
            {length: 8},
            () => Array.from(
                {length: 8}, 
                () => null
            )
        )
    );

    var blackOnBottom = false;
    var NUM_TO_LETTER = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
    var cellSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').slice(0, -2); // removes 'px'
    var selected = null;
    var game; // using still for getting node by string

    useEffect( () => {
        game=props.game; // update game for now
        setNodesState(props.game._grid); // update our node state with grid
    });

    function getDisplayCoords(node)
    {
        // get reference
        var tableChess = document.getElementById("board");

        // test
        var imageWidth = 40; // FOR NOW (IMAGE SIZE KNOWN)
        var imageHeight = 40; // FOR NOW (IMAGE SIZE KNOWN)

        // x moves with board
        var xDisp = ((node.x * cellSize) + imageWidth / 4);

        // y moves with board and needs to be inversed
        var yDisp = tableChess.offsetHeight;
        yDisp -= (((node.y * cellSize) + imageHeight) + imageHeight / 4);

        // return data in object
        return { top: yDisp, left: xDisp };
    }

    function floorBySize(num)
    {
        return Math.floor(num / cellSize);
    }
    
    function showCoords(event)
    {
        var tableChess = document.getElementById("board");
        var bounding = tableChess.getBoundingClientRect();
        console.log(event.pageX, event.pageY, bounding);
        var x;
        var y;
        
        // white on bottom
        if (!blackOnBottom)
        {
            // x = event.pageX - tableChess.offsetLeft;
            // y = Math.abs(event.pageY - tableChess.offsetHeight - tableChess.offsetTop);
            x = event.pageX - bounding.left;
            y = Math.abs(event.pageY - bounding.height - bounding.top);
        }
        
        // black on bottom
        else
        {
            x = Math.abs(event.clientX - tableChess.offsetWidth - tableChess.offsetLeft);
            y = event.clientY - tableChess.offsetTop;
        }
        
        // get array indexes
        var chessCol = floorBySize(x);
        var chessRow = floorBySize(y);
        
        // setup display vars (DEBUG)
        var coords = "Actual: " + x + ", " + y
            + "<br />Array: [ " + chessCol + " ][ " + chessRow + " ]"
            + "<br />Notation: " + NUM_TO_LETTER[ chessCol ] + (chessRow + 1)
            + "<br />";
        
        // display (DEBUG)
        document.getElementById("coords").innerHTML = coords;

        // get node by string
        var clickedString = NUM_TO_LETTER[ chessCol ] + (chessRow + 1);
        //console.log(clickedString);
        var node = game._getNodeByString(clickedString);
        //console.log(node);

        // handle toggle selection
        if (selected === null)
        {
            // select if piece exists
            if (node !== false && node.p !== null)
                selected = node;
        }

        // deselect if same node clicked
        else if (selected === node)
            selected = null

        // make the move
        else
        {
            var fromString = NUM_TO_LETTER[ selected.x ] + (selected.y + 1);
            makeMove(fromString, clickedString);
            selected = null;
        }

        document.getElementById("selected").textContent = selected;
    }

    function makeMove(from, to) 
    {
        Axios
            .put(`/api/games`,
                {
                    id: props.data._id,
                    from: from,
                    to: to
                },
                { headers: {"x-auth-token": userData.token} }
            )
            .then(() => props.update(props.data._id))
            .catch(err => { if (err) console.log(err) });
    }

    function createBoard() 
    {
        let table = [];
        for (let x=0; x<8; x++)
        {
            let children = [];
            for (let y=0; y<8; y++) children.push(<td key={"row-"+y}/>);
            table.push(<tr key={"col-"+x}>{children}</tr>);
        }
        return table;
    }

    return (
        <div>
            {/*chess board border*/}
            <div className="board_border" >
                {/*chess board wrapper (where board table and pieces are handled)*/}
                <div id="board" onClick={showCoords} style={{position:"relative"}}>

                    {/*board styling*/}
                    <table id="t01" >
                        <tbody>{createBoard()}</tbody>
                    </table>

                    {/*pieces render*/}
                    {nodesState.map( (col, cIndex) => {
                        return col.map( (node, nIndex) => {
                        
                            // returning something here so it shuts up about the stupid key
                            if (node === null || node.p === null)
                                return <div style={{position:'absolute'}} key={"null-"+cIndex+nIndex}></div>;
                            
                            // setup our image
                            var c = node.p.color.toLowerCase();
                            var t = node.p.type.toLowerCase();
                            var display = getDisplayCoords(node);
                            return (
                                <img 
                                    key={"piece-"+cIndex+nIndex}
                                    src={`assets/img/${c}${t}.gif`}
                                    alt={c+t + " chess piece"}
                                    style={{
                                        position: 'absolute',
                                        top: display.top,
                                        left: display.left,
                                        zIndex: 10
                                    }}
                                />
                            );
                        })
                    })}

                </div>
            </div>
            
            {/*current mouse click coords*/}
            <div style={{color: 'white'}} >Selected:<span id="selected"></span></div><br />
            <div id="coords" style={{color: 'white'}} />
        </div>
    );
}

export default ShaneBoard;
