const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        hostColor: { type: Number }, // 0 = white, 1 = black
        hostTimer: { type: Number }, // time left

        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        clientColor: { type: Number }, // 0 = white, 1 = black
        clientTimer: { type: Number }, // time left

        boardData: { type: String }, // json
        enPassant: { type: String },
        history: { type: String },
        chat: { type: String },

        locked: { type: Boolean }, // true or false
        password: { type: String },

        gameTime: { type: Number },
        gameStatus: { type: Number }, 
        // 0=play white, 1=play black, 2=checkmate, 3=resignation, 4=timeout, 5=stalemate, 6=repetition, 7=agreement
    }, 
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
