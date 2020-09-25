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
    const [ gameData, setGameData ] = useState({gameObj: null, data: {}});
    const [ gamePassword, setGamePassword ] = useState("");

    useEffect( () => {

        console.log("games useeffect");

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
        if (typeof userData.user !== "undefined" && gameData.gameObj !== null) 
            return getGames();
            
        check();

        return () => console.log("games unmounting");
    }, []);

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
        console.log('loading game by id');
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
        
        setGameData({gameObj: null, data: {}});
        getGames();
    }

    const renderStatus = (status) => {
        console.log("rendering status");
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
                    {!gameData.gameObj ? (
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