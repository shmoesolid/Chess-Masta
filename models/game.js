const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        name: { type: String, default: "" },

        hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        hostColor: { type: Number, default: 0 }, // 0 = white, 1 = black
        hostTimer: { type: Number, default: null }, // time left

        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        clientColor: { type: Number, default: 1 }, // 0 = white, 1 = black
        clientTimer: { type: Number, default: null }, // time left

        boardData: { type: String, default: "" }, // json
        enPassant: { type: String, default: "" },
        history: { type: String, default: "" },
        chat: { type: String, default: "" },

        locked: { type: Boolean, default: false }, // true or false
        password: { type: String, default: "" },

        gameTime: { type: Number, default: null },
        gameStatus: { type: Number, default: 0 }, 
        // 0=waiting, 1=play white, 2=play black, 3=checkmate, 4=resignation, 5=timeout, 6=stalemate, 7=repetition, 8=agreement
    }, 
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;