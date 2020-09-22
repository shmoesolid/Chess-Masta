import React, { useEffect, useState } from "react";


function ShaneBoard(props)
{
    var [ keyState, setKeyState ] = useState();
    var [ piecesState, setPiecesState ] = useState([]);

    var blackOnBottom = false;
    var NUM_TO_LETTER = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
    var cellSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').slice(0, -2); // removes 'px'

    var game = props.game;
    var selected = null;

    useEffect(
        testRender
    );

    // function for displaying pieces
    function renderPiece(node)
    {
        // to do this we need piece IMAGE size, board CELL size (we have this)...
        // ?? to start..
        // ?? midpoint(x + cellSize / 2) to get middle coord of node (SAME FOR y)
        // ?? get midpoint of image x and y
        // SO...
        // >> var imageWidth = 40; // FOR NOW (IMAGES ON HAND)
        // >> var imageHeight = 40; // FOR NOW (IMAGES ON HAND)
        // >> var xMid = (node.x + cellSize) / 2;
        // >> var yMid = (node.y + cellSize) / 2;
        // >> var xDisp = (xMid - imageWidth / 2);
        // >> var yDisp = (yMid - imageHeight / 2);

        // load the image in the board to get width/height
        // ..disreguard for now (img size 40)

        // make sure we have a piece
        if (node.p === null)
            return;

        

        // get references
        var tableChess = document.getElementById("board");
        var pieces = document.getElementById("pieces");

        // test
        var imageWidth = 40; // FOR NOW (IMAGE SIZE KNOWN)
        var imageHeight = 40; // FOR NOW (IMAGE SIZE KNOWN)

        // x moves with board
        var xDisp = ((node.x * cellSize) + imageWidth / 4);

        // y moves with board and needs to be inversed
        var yDisp = tableChess.offsetHeight;
        yDisp -= (((node.y * cellSize) + imageHeight) + imageHeight / 4);

        // innerHTML is just for testing
        pieces.innerHTML += "<img src='assets/img/"
            + node.p.color.toLowerCase() 
            + node.p.type.toLowerCase()
            +".gif' alt='' style='position:absolute;top:"+yDisp+"px;left:"+xDisp+"px;z-index:10' />";
    }

    function testRender()
    {
        // show grid
        console.log(game._grid);

        // lets show our pieces
        for (var x=0;x<8;x++)
            for (var y=0;y<8;y++)
                renderPiece(game._grid[x][y]);
    }

    function floorBySize(num)
    {
        return Math.floor(num / cellSize);
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
        console.log(clickedString);
        var node = game._getNodeByString(clickedString);
        console.log(node);

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
            var res = game.move(fromString, clickedString);
            console.log(fromString, clickedString, res);
            selected = null;

            // refresh
            setKeyState(Math.random());
        }

        document.getElementById("selected").textContent = selected;
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

                    {/*pieces*/}
                    <div id="pieces" style={{height:"0px",width:"0px"}} key={keyState}></div>

                </div>
            </div>
            
            {/*current mouse click coords*/}
            <div style={{color: 'white'}} >Selected:<span id="selected"></span></div><br />
            <div id="coords" style={{color: 'white'}} />
        </div>
    );
}

export default ShaneBoard;
