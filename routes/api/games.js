const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");
const auth = require("../../middleware/auth");

// Matches with "/api/games"
router
    .route("/")
    .get(auth, gamesController.findAll);
    //.put(auth, gamesController.move);
    //.post(auth, gamesController.create);

// Matches with "/api/games/:id/:location"
router
    .route("/:id/:location")
    .get(auth, gamesController.getValidMoves);

// Matches with "/api/games/move"
router
    .route("/move")
    .put(auth, gamesController.move);

// Matches with "/api/games/create"
router
    .route("/create")
    .post(auth, gamesController.create)

// Matches with "/api/games/join"
router
    .route("/join")
    .post(auth, gamesController.join)

// Matches with "/api/games/:id"
router
    .route("/:id")
    .delete(auth, gamesController.remove)
    .get(auth, gamesController.findById);


module.exports = router;