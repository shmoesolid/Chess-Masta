import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/userContext";
import Axios from "axios";

import "../css/board.css";
import ShaneBoard from "../components/ShaneBoard";
import CheSSsk from "chesssk";

function Games() 
{
    const { userData } = useContext(UserContext);
    const [ gameList, setGameList ] = useState([]);
    const [ gameData, setGameData ] = useState(null);

    useEffect( () => {
        getGames()
    }, []);

    const getGames = () => {
        Axios.get("/api/games", { headers: {"x-auth-token": userData.token} })
            .then(
                res => {
                    //console.log(res.data);
                    setGameList(res.data);
                }
            )
            .catch( err => { if (err) console.log(err) });
    };

    const getGameById = (id) => {
        Axios.get("/api/games/"+id, { headers: {"x-auth-token": userData.token} })
            .then(
                res => {
                    // create new game 
                    var game = new CheSSsk();

                    // set game grid data from our boardData
                    game.setGridFromJSON(res.data.boardData);
                    console.log("loaded:", game._grid);

                    // set our game, plus the other stuff for reference
                    setGameData({ gameObj: game, data: res.data });
                }
            )
            .catch( err => { if (err) console.log(err) });
    };

    return (
        <>
            {!gameData ? (
                <>
                    <ul>
                    {
                        gameList.map( (item, index) => {
                            return (
                                <li key={index}>
                                    {item.name}
                                    &nbsp;
                                    <button onClick={() => getGameById(item._id)}>Load</button>
                                </li>
                            )
                        })
                    }
                    </ul>
                </>
            ) : (
                <>
                    <button onClick={() => setGameData(null)}>BACK</button>
                    <ShaneBoard game={ gameData.gameObj } data={ gameData.data } />
                </>
            )}
        </>
    );
}

export default Games;