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
    var game = new chesssk();
    game.setupNewGame();
    res.json( game.getValidMoves(req.params.location) );
  },

  create: function(req, res) {
    // confirm authed

    db.Game
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};