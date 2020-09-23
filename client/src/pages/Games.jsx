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
        Axios.get("/api/games", { withCredentials: true })
            .then(
                res => {
                    //console.log(res.data);
                    setGameList(res.data);
                }
            )
            .catch( err => { if (err) console.log(err) });
    };

    const getGameById = (id) => {
        Axios.get("/api/games/"+id, { withCredentials: true })
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

    const joinGameById = (id) => {
        Axios.post("/api/games/join", {id}, { withCredentials: true })
            .then(
                res => {
                    console.log("joinres", res.data);

                    // create new game 
                    var game = new CheSSsk();

                    // set game grid data from our boardData
                    game.setGridFromJSON(res.data.boardData);
                    console.log("joined:", game._grid);

                    // set our game, plus the other stuff for reference
                    setGameData({ gameObj: game, data: res.data });
                }
            ).catch( err => { if (err) console.log(err) });
    };

    const deleteGameById = (id) => {
        Axios
            .delete("/api/games/"+id, { withCredentials: true })
            .then( res => {
                getGames();
            }).catch( err => { if (err) console.log(err) });
    };

    const goBackToListing = () => {
        
        setGameData(null);
        getGames();
    }

    return (
        <>
            {!gameData ? (
                <ul>
                {
                    gameList.map( (item, index) => {
                        return (
                            <li key={index}>

                                {/*this is one of our games*/}
                                {item.hostId === userData.user.id || item.clientId === userData.user.id ? (
                                    <>
                                        {item.name}&nbsp;
                                        <button onClick={() => getGameById(item._id)}>Load</button>&nbsp;
                                        <button onClick={() => deleteGameById(item._id)}>Delete</button>
                                    </>
                                ) : (
                                    <>
                                        {/*not our game but available to join*/}
                                        {!item.clientId &&
                                            <>
                                                {item.name}&nbsp;
                                                <button onClick={() => joinGameById(item._id)}>Join</button>
                                            </>
                                        }
                                    </>
                                )}
                            </li>
                        )
                    })
                }
                </ul>
            ) : (
                <>
                    <button onClick={() => goBackToListing()}>BACK</button>
                    <ShaneBoard 
                        game={ gameData.gameObj } 
                        data={ gameData.data } 
                        update={ getGameById }
                    />
                </>
            )}
        </>
    );
}

export default Games;