const chesssk = require("chesssk");
const db = require("../models");
const { getIO, getClientByUID } = require("../clients");

// enum for game status
const GameStatus = Object.freeze(
    {
        Waiting: 0,
        Normal: 1,
        PawnExchange: 2,
        Check: 3,
        Checkmate: 4,
        Resignation: 5,
        Timeout: 6,
        Stalemate: 7,
        Repetition: 8,
        Agreement: 9
    }
);

// use socket.io to send other player update
// generalized function for resuse
// msg can be gameId or actual msg from other client
const updatePlayer = (msgType, playerId, msg) => {

    // get client socket by playerId
    var clientSocket = getClientByUID(playerId);

    // DEBUG
    console.log("update player on socket:", clientSocket, msgType, playerId, msg);

    // send it if the other client is connected to game
    if (clientSocket !== false)
        getIO().to(clientSocket.id).emit(msgType, msg);
}

// Defining methods for the gamesController
module.exports = {

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // game finding

    findAll: function(req, res) { // get
        db.Game
            .find(req.query)
            //.sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function(req, res) { // get
        db.Game
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // game updates

    // THIS IS TEMPORARY.. socket.io to take over this
    pollGameStatus: function(req, res) { // get
        db.Game
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel.gameStatus))
            .catch(err => {
                console.log(err);
                res.status(422).json(err)
            });
    },

    getValidMoves: function(req, res) { // get
        db.Game
            .findById(req.params.id)
            .then(
                dbModel => {

                    // create game and set grid data from database board data
                    var game = new chesssk();
                    if (!game.setGridFromJSON(dbModel.boardData))
                        return res.status(400).json({status: "INVALID_BOARD_DATA", message: "Invalid board data from database.  Please contact admin." } );
                    
                    // return valid moves for the location asked
                    var validMoves = game.getValidMoves(req.params.location, 0, dbModel.enPassant);
                    res.json( validMoves );
                }
            ).catch(err => res.status(422).json(err));
    },

    exchange: function(req, res) { // put

        var userId = req.user;
        var { id, piece } = req.body;

        db.Game
            .findById(id)
            .then(
                dbModel => {

                    // game is over if status is 4 or more
                    if (dbModel.gameStatus > 3)
                        return res.status(400).json({ 
                            status: "GAME_OVER", 
                            message: "Game is over by status: "+ Object.keys(GameStatus)[dbModel.gameStatus] 
                        }); 

                    // return if status not matching or if database doesn't have the location of the would be exchange
                    if (dbModel.gameStatus != GameStatus.PawnExchange || dbModel.pawnExchange == "")
                        return res.status(400).json({status: "INVALID_EXCHANGE", message: "Game status not match or no pawn exchange available." });

                    // create game and set grid data from database board data
                    var game = new chesssk();
                    if (!game.setGridFromJSON(dbModel.boardData))
                        return res.status(400).json({status: "INVALID_BOARD_DATA", message: "Invalid board data from database.  Please contact admin." } );
                    
                    // exchange the pawn
                    var result = game.exchangePawn(dbModel.pawnExchange, piece);

                    // we did not exchange the pawn, return why
                    if (result.status != "OK")
                        return res.status(400).json(result);

                    // update game status by resulting king check
                    var status = GameStatus.Normal;
                    if (result.kingStatus == 1) status = GameStatus.Check;
                    else if (result.kingStatus == 2) status = GameStatus.Checkmate;

                    // valid move, update our db with updated grid data
                    var boardDataInJSON = game.getGridInJSON();
                    db.Game
                        .findByIdAndUpdate(
                            { _id: id }, 
                            { 
                                boardData: boardDataInJSON,
                                enPassant: "",
                                pawnExchange: "",
                                gameTurn:
                                    (status > 3)
                                    ? dbModel.gameTurn // don't change if win
                                    : !dbModel.gameTurn, // should toggle between 1 and 0
                                gameStatus: status
                            },
                            function(err, result) {
                                if (err) return res.json(err);
                                
                                // send back json data to our player making move
                                res.json(result);

                                // use socket.io to send msg to other player about move update
                                updatePlayer(
                                    "moveUpdate", 
                                    (userId == dbModel.hostId) ? dbModel.clientId : dbModel.hostId, // use == here NOT ===
                                    dbModel._id
                                );
                            }
                        );
                }
            ).catch(err => res.status(422).json(err));
    },

    move: function(req, res) { // put

        var id = req.body.id;
        var from = req.body.from;
        var to = req.body.to;
        var uid = req.user;

        db.Game
            .findById(id)
            .then(
                dbModel => {

                    // game is over if status is 4 or more
                    if (dbModel.gameStatus > 3)
                        return res.status(400).json({ 
                            status: "GAME_OVER", 
                            message: "Game is over by status: "+ Object.keys(GameStatus)[dbModel.gameStatus] 
                        }); 
                    
                    // game is still waiting for player to join
                    else if (dbModel.gameStatus == GameStatus.Waiting)
                        return res.status(400).json({ status: "WAIT", message: "Wait for player to join." }); 

                    // we are in a pawn exchange, player must select piece first
                    // this technically should never happen but making sure
                    else if (dbModel.gameStatus == GameStatus.PawnExchange)
                        return res.status(400).json({ status: "EXCHANGE", message: "Must do pawn exchange before moving another piece." }); 

                    // got a status we can work with, create game
                    var game = new chesssk();

                    // set grid data from database board data
                    if (!game.setGridFromJSON(dbModel.boardData))
                        return res.status(400).json({status: "INVALID_BOARD_DATA", message: "Invalid board data from database.  Please contact admin." } );

                    // piece color attempting move
                    var fromNode = game._getNodeByString(from);
                    var pieceColor = (fromNode.p !== null) ? ((fromNode.p.color == "W") ? 0 : 1 ) : null;
                    if (pieceColor === null)
                        return res.status(400).json({ status: "INVALID_LOCATION", message: "Invalid location" });

                    // confirm uid matches either hostId or clientId first
                    // and set an object with the host or client data { host: bool, color: num, timer: num }
                    var player = { host: true };
                    if (uid == dbModel.hostId) { // use == here NOT ===
                        player.color = dbModel.hostColor;
                        player.timer = dbModel.hostTimer;
                    } else {
                        player.host = false;
                        player.color = dbModel.clientColor;
                        player.timer = dbModel.clientTimer;
                    }

                    // compare piece color to our player
                    if (pieceColor !== player.color)
                        return res.status(400).json({ status: "INVALID_COLOR", message: "Please move a piece belonging to you"});

                    // confirm our player turn
                    if (dbModel.gameTurn !== player.color)
                        return res.status(400).json({ status: "WAIT", message: "It's not your turn." }); 

                    // make move server-side and confirm results
                    var result = game.move(from, to, dbModel.enPassant);
                    if (result.status !== "OK")
                        return res.json(result);

                    console.log(result);

                    // update game status
                    if (result.kingStatus === 1) status = GameStatus.Check;
                    else if (result.kingStatus === 2) status = GameStatus.Checkmate;
                    else if (result.pawnExchange !== "") status = GameStatus.PawnExchange;
                    else status = GameStatus.Normal;

                    // valid move, update our db with updated grid data
                    var boardDataInJSON = game.getGridInJSON();
                    db.Game
                        .findByIdAndUpdate(
                            { _id: id }, 
                            { 
                                boardData: boardDataInJSON,
                                enPassant: result.enPassant,
                                pawnExchange: result.pawnExchange,
                                // turn only updates if we are not in a pawn exchange
                                gameTurn: 
                                    (status == GameStatus.PawnExchange 
                                    ||  status > 3)
                                    ? dbModel.gameTurn // don't change if exchange or win
                                    : !dbModel.gameTurn, // should toggle between 1 and 0
                                gameStatus: status
                            },
                            function(err, result) {
                                if (err) return res.json(err);
                                
                                // send back json data to our player making move
                                res.json(result);

                                // use socket.io to send msg to other player about move update
                                updatePlayer(
                                    "moveUpdate", 
                                    player.host ? dbModel.clientId : dbModel.hostId, 
                                    dbModel._id
                                );
                            }
                        );
                }
            ).catch(err => res.status(422).json(err));
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // game managing

    create: function(req, res) { // post

        // assign
        var body = req.body;

        // setup new game and set boardData in json
        var game = new chesssk();
        game.setupNewGame();
        body.boardData = game.getGridInJSON();

        // set host id to our user creating
        body.hostId = req.user;

        // create it
        db.Game
            .create(body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    join: function(req, res) { // post

        // get passed vars
        var gameId = req.body.id; // need game id, got that in req.body.id from user post
        var userId = req.user; // need user id, got that in req.user from auth
        var gamePass = req.body.gamePassword;

        // get game by id
        db.Game
            .findById(gameId)
            .then( dbModel => {
                // if clientId in use, return
                if (dbModel.clientId)
                    return res.status(409).json("someone else already joined this game");

                // confirm password (don't care about hashing atm)
                if (dbModel.locked && dbModel.password !== gamePass)
                    return res.status(500).json("invalid game password");

                // add self to clientId, set clientColor by !hostColor (and time will already be set by creation)
                db.Game
                    .findByIdAndUpdate(
                        { _id: gameId }, 
                        { 
                            clientId: userId,
                            clientColor: !dbModel.hostColor,
                            gameStatus: GameStatus.Normal
                        },
                        function(err, result) {
                            if (err) return res.json(err);
                            
                            // send back json data to our player making move
                            res.json(result);

                            // use socket.io to send msg to other player aka host about join (using moveUpdate for now)
                            updatePlayer(
                                "moveUpdate", 
                                dbModel.hostId, 
                                dbModel._id
                            );
                        }
                    );
            })
            .catch(err => res.status(422).json(err));
    },

    remove: function(req, res) { // delete
        db.Game
            .deleteOne({_id: req.params.id})
            .then( res.json("deleted") )
            .catch(err => res.status(422).json(err));
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // game messaging

    getMsgsById: function(req, res) { // get
        db.Game
            .findById(req.params.id)
            .then( (dbModel) => {
                var reversedChat = dbModel.chat.reverse();
                //console.log(reversedChat);
                res.json(reversedChat);
            })
            .catch(err => res.status(422).json(err));
    },

    sendMsg: function(req, res) { // post

        var userId = req.user;
        var gameId = req.body.id;
        var username = req.body.displayName;
        var msg = username +": "+ req.body.msg;

        db.Game.findByIdAndUpdate(
            gameId, 
            { $push: { chat: msg } }, 
            { new: true, upsert: true },
            function(err, dbModel) {

                // error 
                if (err) return res.status(422).json(err);

                // send back that we updated
                // shouldn't need to waste bw sending back the whole chat
                res.json(true);

                // handle socketio, even if no go
                updatePlayer(
                    "msgUpdate",
                    (userId == dbModel.hostId) ? dbModel.clientId : dbModel.hostId, // use == here NOT ===
                    msg
                );
            }
        );
    }
};
