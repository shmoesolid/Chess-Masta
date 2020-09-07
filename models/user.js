const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String }, // hashed and salted
    actualname: { type: String },
    location: { type: String, default: null },
    games: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }
});

const User = mongoose.model("User", userSchema);
module.exports = User;