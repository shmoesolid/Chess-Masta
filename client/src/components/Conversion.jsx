import React from 'react';

function Conversion(){
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
}

export default Conversion;