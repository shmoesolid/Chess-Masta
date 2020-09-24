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
    const [ gamePassword, setGamePassword ] = useState("");
    //var pollHandler = null;

    useEffect( () => {

        //setupPoll();

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
        if (typeof userData.user !== "undefined") 
            return getGames();
            
        check();
    }, []);
    

    // const setupPoll = () => {
    //     // setup poller (TEMPORARY. socket.io to replace)
    //     console.log("setup poll", pollHandler);
    //     if (pollHandler !== null)
    //     {
    //         console.log("CLEARING");
    //         clearTimeout(pollHandler);
    //         pollHandler=null;
    //     }

    //     pollHandler = setTimeout(poll, 2500);
    // }

    // const poll = async () => {

    //     console.log("running...", gameData);

    //     if (gameData === null)
    //     {
    //         pollHandler = setTimeout(poll, 2500);
    //         return;
    //     }
            

    //     await Axios
    //         .get("/api/games/poll/"+gameData.data._id, { withCredentials: true })
    //         .then( res => {
    //             console.log(res.data, gameData.data.gameStatus);
    //             if (res.data !== gameData.data.gameStatus)
    //             {
    //                 console.log("LOADING");
    //                 loadGameById(gameData.data._id);
    //                 return;
    //             }
    //         })
    //         .catch( err => { if (err) console.log(err) });

    //     pollHandler = setTimeout(poll, 2500);
    // }

    const gamePassChange = (event) => {
        setGamePassword(event.target.value);
    }

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
        Axios.post("/api/games/join", {id, gamePassword}, { withCredentials: true })
            .then(
                res => {
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

    const renderStatus = (status) => {
        switch(status)
        {
            case 0: return (<span>Waiting for join...</span>);
            case 1: return (<span>White move...</span>);
            case 2: return (<span>Black move...</span>);
        }
    };

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
                                                {item.locked &&
                                                    <input 
                                                        type="password" 
                                                        name="password" 
                                                        id="password" 
                                                        placeholder="Game password..."
                                                        onChange={gamePassChange}
                                                    />
                                                }
                                                <button onClick={() => joinGameById(item._id)}>Join</button>
                                                
                                            </li>
                                })
                            }
                            </ul>
                        </>
                    ) : (
                        <>
                            <button onClick={() => goBackToListing()}>BACK</button>
                            {renderStatus(gameData.data.gameStatus)}
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