const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  displayName: {
    type: String,
    required: true
  },
  blackOnBottom: { // for black on bottom if player is black
    type: Boolean,
    default: true
  },
  boardWhiteColor: {
    type: String,
    default: "#ccc"
  },
  boardBlackColor: {
    type: String,
    default: "#378a24"
  },
  boardBorderColor: {
    type: String,
    default: "#000"
  },

  // unused but plans for:
  pieceWhiteColor: {
    type: String,
    default: "#fff"
  },
  pieceBlackColor: {
    type: String,
    default: "#000"
  },
  score: {
    type: Number,
    default: 1000 // new users will start at 1000 and will adjust from there
  }
});

module.exports = User = mongoose.model("user", userSchema);