const chesssk = require("chesssk");
const db = require("../models");

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


// Defining methods for the gamesController
module.exports = {

    findAll: function(req, res) {
        db.Game
            .find(req.query)
            //.sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function(req, res) {
        db.Game
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // THIS IS TEMPORARY.. socket.io to take over this
    pollGameStatus: function(req, res) {
        db.Game
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel.gameStatus))
            .catch(err => {
                console.log(err);
                res.status(422).json(err)
            });
    },

    getValidMoves: function(req, res) {
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

                                // maybe here use socket.io to send to new board data to other player or just let them know
                                //var otherPlayerId = player.host ? dbModel.clientId : dbModel.hostId;
                            }
                        );
                }
            ).catch(err => res.status(422).json(err));
    },

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

                            // maybe here use socket.io to send to new board data to other player or just let them know
                            //var otherPlayerId = player.host ? dbModel.clientId : dbModel.hostId;
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
    }
};