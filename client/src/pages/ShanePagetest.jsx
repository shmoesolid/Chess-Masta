import React from "react";
import ShaneBoard from "../components/ShaneBoard";
import chesssk from "chesssk";

function ShanePageTest()
{
    var game = new chesssk();
    game.setupNewGame();
    console.log("setting up new game...");

    return(
        <ShaneBoard game={game} />
    );
}

export default ShanePageTest;