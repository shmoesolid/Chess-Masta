const chesssk = require("chesssk");
const db = require("../models");

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

    findByIdAndUpdate: function(req, res) {

    },

    getValidMoves: function(req, res) {
        console.log("handling valid moves");
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

    getValidMovesTest: function(req, res) {
        console.log(req.user);
        var game = new chesssk();
        game.setupNewGame();
        res.json( game.getValidMoves(req.params.location) );
    },

    move: function(req, res) { // put

        var id = req.body.id;
        var from = req.body.from;
        var to = req.body.to;
        var uid = req.user;

        // check strings to ensure valid

        db.Game
            .findById(id)
            .then(
                dbModel => {

                    //console.log("move: found game");

                    // create game and set grid data from database board data
                    var game = new chesssk();
                    if (!game.setGridFromJSON(dbModel.boardData))
                        return res.json("ERROR: Invalid board data");

                    //console.log("move: set data");

                    // make move server-side and confirm results
                    var result = game.move(from, to, dbModel.enPassant);
                    if (result.status !== "OK")
                        return res.json(result);

                    //console.log("move: made");

                    // valid move and we updated our stuff
                    db.Game
                        .findByIdAndUpdate(
                            { _id: id }, 
                            { 
                                boardData: game.getGridInJSON(),
                                //status: 
                            },
                            function(err, result) {
                                //console.log("move: updated?", result, err);
                                if (err) res.json(err);
                                else res.json(result);
                            }
                        );
                }
            ).catch(err => res.status(422).json(err));
    },

    create: function(req, res) {

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
};