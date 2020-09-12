import React from "react";
import chesssk from "chesssk";

function ShaneBoard()
{
    const tableChess = document.getElementById("board");
    var blackOnBottom = false;
    var NUM_TO_LETTER = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
    var cellSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').slice(0, -2); // removes 'px'
    var game = new chesssk();
    console.log(game._grid);
    
    function floorBySize(num)
    {
      return Math.floor(num / cellSize);
    }
    
    function showCoords(event)
    {
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
    }

    function createBoard() 
    {
        let table = [];
        for (let x=0; x<8; x++)
        {
            let children = [];
            for (let y=0; y<8; y++)
                children.push(<td key={"row"+y}/>);
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
                    <img id='piece_bbc8' src='/assets/img/bb.gif' alt='bishop' style={{position:'absolute',top:'0px',left:'0px'}} />

                </div>
            </div>
            
            {/*current mouse click coords*/}
            <div id="coords" style={{color: 'white'}} />
        </div>
    );
}

export default ShaneBoard;
