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

    Number.prototype.clamp = function(min, max)
    {
        return Math.min( Math.max(this, min), max);
    }

    function floorBySize(num)
    {
        return Math.floor(num / cellSize);
    }

    function getDisplayCoords(node)
    {
        // get reference
        //var tableChess = document.getElementById("board");

        // test
        var imageWidth = 40; // FOR NOW (IMAGE SIZE KNOWN)
        var imageHeight = 40; // FOR NOW (IMAGE SIZE KNOWN)
        var xDisp, yDisp;

        if (!blackOnBottom)
        {
            // x moves with board
            xDisp = node.x * cellSize + imageWidth / 4;

            // y moves with board and needs to be inversed
            yDisp = (cellSize*8 - node.y * cellSize) - imageHeight - imageHeight / 4;
        }
        else
        {
            // x moves with board and needs inverse
            xDisp = (cellSize*8 - node.x * cellSize) - imageWidth - imageWidth / 4;

            // y moves with board
            yDisp = node.y * cellSize + imageWidth / 4;
        }
        
        // return data in object
        return { top: yDisp, left: xDisp };
    }
    
    function showCoords(event)
    {
        var tableChess = document.getElementById("board");
        var bounding = tableChess.getBoundingClientRect();
        var x;
        var y;
        
        // white on bottom
        if (!blackOnBottom)
        {
            x = event.clientX - bounding.left;
            y = Math.abs(event.clientY - bounding.bottom);
        }
        
        // black on bottom
        else
        {
            x = Math.abs(event.clientX - bounding.right);
            y = event.clientY - bounding.top;
        }

        // contain x and y
        x = x.clamp(0, bounding.width-1);
        y = y.clamp(0, bounding.height-1);
        
        // get array indexes and keep x and y within range
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
            .put(`/api/games/move`,
                {
                    id: props.data._id,
                    from: from,
                    to: to
                },
                { withCredentials: true }
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
