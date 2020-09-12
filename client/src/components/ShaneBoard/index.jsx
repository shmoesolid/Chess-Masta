import React, { useEffect } from "react";
import chesssk from "chesssk";

function ShaneBoard()
{
    var blackOnBottom = false;
    var NUM_TO_LETTER = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
    var cellSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').slice(0, -2); // removes 'px'

    useEffect(
        testRender
    );

    // DEBUG START
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

        if (node.p === null)
            return;

        var pieces = document.getElementById("pieces");

        // test
        var imageWidth = 40; // FOR NOW (IMAGE SIZE ON HAND)
        var imageHeight = 40; // FOR NOW (IMAGE SIZE ON HAND)
        var xDisp = ((node.x * cellSize) + imageWidth / 2);

        // y needs to be inversed
        var yDisp = ((node.y * cellSize) + imageHeight / 2);

        pieces.innerHTML += "<img src='assets/img/bb.gif' alt='' style='position:absolute;top:"+yDisp+"px;left:"+xDisp+"px' />";
    }

    function testRender()
    {
        var game = new chesssk();

        // test setup
        game.setupNewGame();
        //console.log(game._grid);

        // lets show our pieces
        for (var x=0;x<8;x++)
            for (var y=0;y<8;y++)
                renderPiece(game._grid[x][y]);
    }
    // DEBUG END

    function floorBySize(num)
    {
        return Math.floor(num / cellSize);
    }
    
    function showCoords(event)
    {
        var tableChess = document.getElementById("board");
        var x;
        var y;
        
        // white on bottom
        if (!blackOnBottom)
        {
            x = event.pageX - tableChess.offsetLeft;
            y = Math.abs(event.pageY - tableChess.offsetHeight - tableChess.offsetTop);
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
        //testRender();
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
            <div className="board_border">
                {/*chess board wrapper (where board table and pieces are handled)*/}
                <div id="board" onClick={showCoords}>

                    {/*board styling*/}
                    <table id="t01" >
                        <tbody>{createBoard()}</tbody>
                    </table>

                    {/*pieces*/}
                    <div id="pieces"></div>
                    <img id='piece_bbc8' src='/assets/img/bb.gif' alt='bishop' style={{position:'absolute',top:'0px',left:'0px'}} />

                </div>
            </div>
            
            {/*current mouse click coords*/}
            <div id="coords" style={{color: 'white'}} />
        </div>
    );
}

export default ShaneBoard;
