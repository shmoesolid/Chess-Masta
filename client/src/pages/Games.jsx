import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/userContext";
import checkLoggedIn from "../utils/checkLoggedIn";
import Axios from "axios";

import "../css/board.css";
import CreateGame from "../components/CreateGame";
import ShaneBoard from "../components/ShaneBoard";
import CheSSsk from "chesssk";

function Games() 
{
    const { userData, setUserData } = useContext(UserContext);
    const [ gameList, setGameList ] = useState([]);
    const [ gameData, setGameData ] = useState(null);

    useEffect( () => {

        // confirm we are have our user data
        // sometimes would error on refresh
        async function check() {
            var login = await checkLoggedIn();
            if (login !== false) 
            {
                setUserData( login );
                getGames();
            }
        }
        console.log(userData);
        if (typeof userData.user !== "undefined") 
            return getGames();

        check();
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

    const loadGameById = (id) => {
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
            {userData.user ? (
                <> 
                    {!gameData ? (
                        <>
                            <h2>Create Game</h2>
                            <CreateGame update={ loadGameById } />
                            <br /><br />
                            <h2>Game List</h2>
                            <ul>
                            {
                                gameList.map( (item, index) => {
                                    return item.hostId === userData.user.id || item.clientId === userData.user.id ? (
                                        <li key={index}>
                                            {item.name}&nbsp;
                                            <button onClick={() => loadGameById(item._id)}>Load</button>&nbsp;
                                            <button onClick={() => deleteGameById(item._id)}>Delete</button>
                                        </li>
                                        ) : !item.clientId &&
                                            <li key={index}>
                                                {item.name}&nbsp;
                                                <button onClick={() => joinGameById(item._id)}>Join</button>
                                            </li>
                                })
                            }
                            </ul>
                        </>
                    ) : (
                        <>
                            <button onClick={() => goBackToListing()}>BACK</button>
                            <ShaneBoard 
                                game={ gameData.gameObj } 
                                data={ gameData.data } 
                                update={ loadGameById }
                            />
                        </>
                    )}
                </> ): (<><h2>Please login...</h2></>)
            }
        </>
    );
}

export default Games;