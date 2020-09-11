import React from "react";

function ShaneBoard()
{
    var NUM_TO_LETTER = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
    var cellSize = getComputedStyle(document.documentElement).getPropertyValue('--cell-size').slice(0, -2); // removes 'px'
    
    function floorBySize(num)
    {
      return Math.floor(num / cellSize);
    }
    
    function showCoords(event)
    {
      let tableChess = document.getElementById("board");
      
      // white on bottom
      var x = event.pageX - tableChess.offsetLeft;
      var y = Math.abs(event.pageY - tableChess.offsetHeight - tableChess.offsetTop);
      
      // black on bottom
      //var x = Math.abs(event.clientX - tableChess.offsetWidth - tableChess.offsetLeft);
      //var y = event.clientY - tableChess.offsetTop;

      // get array indexes
      var chessCol = floorBySize(x);
      var chessRow = floorBySize(y);
      
      // setup display vars
      var coords = "Actual: " + x + ", " + y
        + "<br />Array: [ " + chessCol + " ][ " + chessRow + " ]"
        + "<br />Notation: " + NUM_TO_LETTER[ chessCol ] + (chessRow + 1)
        + "<br />";
      
      // display
      document.getElementById("coords").innerHTML = coords;
    }

    function createBoard() {
        let table = [];
        for (let x=0; x<8; x++)
        {
            let children = [];
            children.push(<td/>,<td/>,<td/>,<td/>,<td/>,<td/>,<td/>,<td/>);
            table.push(<tr>{children}</tr>);
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
                        {createBoard()}
                    </table>

                    {/*pieces*/}
                    <img id='piece_bbc8' src='/assets/img/bb.gif' alt='bishop' style={{position:'absolute',top:'65px',left:'28px'}} />

                </div>
            </div>
            
            {/*current mouse click coords*/}
            <div id="coords" style={{color: 'white'}}></div>
        </div>
    );
}

export default ShaneBoard;