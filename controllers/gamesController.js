const chesssk = require("chesssk");
const db = require("../models");
const { getIO, getClientByUID } = require("../clients");

// enum for game status
const GameStatus = Object.freeze(
    {
        Waiting: 0,
        WhiteMove: 1,
        BlackMove: 2,
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
                        return res.json("ERROR: Invalid board data");
                    
                    // return valid moves for the location asked
                    res.json( game.getValidMoves(req.params.location) );
                }
            ).catch(err => res.status(422).json(err));
    },

    move: function(req, res) { // put

        var id = req.body.id;
        var from = req.body.from;
        var to = req.body.to;
        var uid = req.user;

        // check strings to ensure valid?

        db.Game
            .findById(id)
            .then(
                dbModel => {

                    // ok found game, create
                    var game = new chesssk();

                    // set grid data from database board data
                    if (!game.setGridFromJSON(dbModel.boardData))
                        return res.json({ status: "INVALID_BOARD", message: "Invalid board data" });

                    // piece color attempting move
                    var fromNode = game._getNodeByString(from);
                    var pieceColor = (fromNode.p !== null) ? ((fromNode.p.color == "W") ? 0 : 1 ) : null;
                    if (pieceColor === null)
                        return res.json({ status: "INVALID_LOCATION", message: "invalid location" });

                    // confirm uid matches either hostId or clientId first
                    // and set an object with the host or client data { host: bool, color: num, timer: num }
                    var player = { host: true };
                    if (uid == dbModel.hostId) {
                        player.color = dbModel.hostColor;
                        player.timer = dbModel.hostTimer;
                    } else {
                        player.host = false;
                        player.color = dbModel.clientColor;
                        player.timer = dbModel.clientTimer;
                    }

                    // compare piece color to our player
                    if (pieceColor !== player.color)
                        return res.json({ status: "INVALID_COLOR", message: "please move a piece belonging to you"});

                    // do various things based off game status
                    switch(dbModel.gameStatus)
                    {
                        case GameStatus.Waiting: // can't move yet, return
                            return res.json({ status: "WAIT", message: "wait for player to join" }); 
                        case GameStatus.WhiteMove: // if player black, can't move, return
                            if (player.color == 1) return res.json({ status: "WAIT", message: "wait for white move" }); 
                            break;
                        case GameStatus.BlackMove: // if player white, can't move, return
                            if (player.color == 0) return res.json({ status: "WAIT", message: "wait for black move" }); 
                            break;
                    }

                    // make move server-side and confirm results
                    var result = game.move(from, to, dbModel.enPassant);
                    if (result.status !== "OK")
                        return res.json(result);

                    // update status (simple color change for now)
                    var status;
                    if (dbModel.gameStatus === GameStatus.WhiteMove) status = GameStatus.BlackMove;
                    else status = GameStatus.WhiteMove;

                    // valid move, updat our db with updated grid data
                    var boardDataInJSON = game.getGridInJSON();
                    db.Game
                        .findByIdAndUpdate(
                            { _id: id }, 
                            { 
                                boardData: boardDataInJSON,
                                enPassant: "", // will always go back blank as only allowed in immediate
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
                            gameStatus: 1
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
            .then( (dbModel) => res.json(dbModel.chat) )
            .catch(err => res.status(422).json(err));
    },

    sendMsg: function(req, res) { // post
        var gameId = req.body.id;
        var msg = req.body.msg;
        var userId = req.user;

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

                // handle socketio
                updatePlayer(
                    "msgUpdate", 
                    (userId === dbModel.hostId) ? dbModel.hostId : dbModel.clientId, 
                    msg
                );
            }
        );
    }
};
