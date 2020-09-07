const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hostColor: { type: Number }, // 0 = white, 1 = black
    hostTimer: { type: Number }, // time left

    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clientColor: { type: Number }, // 0 = white, 1 = black
    clientTimer: { type: Number }, // time left

    boardData: { type: String },
    history: { type: String },
    chat: { type: String },
    gameTime: { type: Number },
    status: { type: Number }, // 0=created (byself), 1=created (user joined), 2=playing (white turn), 
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;