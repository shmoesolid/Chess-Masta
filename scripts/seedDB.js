const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/chessmastadb" );

const userSeed = [
  {
    username: "user1",
    password: "", // hashed and salted
    actualname: "",
    location: "",
    games: [],
  },
  {
    username: "user2",
    password: "", // hashed and salted
    actualname: "",
    location: "",
    games: [],
  },
];

const gameSeed = [
  {
    hostId: null,
    hostColor: 0, // 0 = white, 1 = black
    hostTimer: null, // time left

    clientId: null,
    clientColor: 1, // 0 = white, 1 = black
    clientTimer: null, // time left

    boardData: "", // json
    enPassant: "", // location string ie a2
    history: "", // json
    chat: "", // json

    locked: false, // true or false
    password: "", 

    gameTime: null,
    gameStatus: 0,
  },
  /* for dupes
  {
    hostId: "",
    hostColor: "", // 0 = white, 1 = black
    hostTimer: "", // time left

    clientId: "",
    clientColor: "", // 0 = white, 1 = black
    clientTimer: "", // time left

    boardData: "", // json
    enPassant: "",
    history: "",
    chat: "",

    locked: false, // true or false
    password: "",

    gameTime: "",
    gameStatus: "",
  },
  */
];

// use user db
db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    //console.log(data);

    // manually set host and client ids from updated user ids
    gameSeed[0].hostId = data.ops[0]._id;
    gameSeed[0].clientId = data.ops[1]._id;

    // set game db
    db.Game
      .remove({})
      .then(() => db.Game.collection.insertMany(gameSeed))
      .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });






