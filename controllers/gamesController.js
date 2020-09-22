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

    move: function(req, res) {

        var id = req.params.id;
        var from = req.params.from;
        var to = req.params.to;

        // maybe check from and to strings?

        db.Game
            .findById(id)
            .then(
                dbModel => {

                    // create game and set grid data from database board data
                    var game = new chesssk();
                    if (!game.setGridFromJSON(dbModel.boardData))
                        return res.json("ERROR: Invalid board data");
                    
                    // make move and return result
                    res.json( game.move(from, to, dbModel.enPassant) );
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