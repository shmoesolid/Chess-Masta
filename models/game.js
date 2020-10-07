const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        name: { type: String, default: "" },

        hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        hostColor: { type: Number, default: 0 }, // 0 = white, 1 = black
        hostTimer: { type: Number, default: null }, // time left

        clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
        clientColor: { type: Number, default: 1 }, // 0 = white, 1 = black
        clientTimer: { type: Number, default: null }, // time left

        boardData: { type: String, default: "" }, // json
        pawnExchange: { type: String, default: "" },
        enPassant: { type: String, default: "" },
        history: { type: String, default: "" },
        chat: { type: [String], default: [] },
        notes: { type: String, default: "" },

        locked: { type: Boolean, default: false }, // true or false
        password: { type: String, default: "" },

        gameTime: { type: Number, default: null },
        gameTurn: { type: Number, default: 0 }, // 0 = white, 1 = black
        gameStatus: { type: Number, default: 0 }, 
        /* NEW STATUS
            0=waiting for client join
            1=normal play
            2=pawn exchange
            3=check
            4=checkmate
            5=resignation
            6=timeout
            7=stalemate
            8=repetition
            9=agreement
        */
    }, 
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;