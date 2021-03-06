const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");
const auth = require("../../middleware/auth");

// Matches with "/api/games"
router
    .route("/")
    .get(auth, gamesController.findAll);

// Matches with "/api/games/chat/:id"
router
    .route("/chat/:id")
    .get(auth, gamesController.getMsgsById);

// Matches with "/api/games/chat/"
router
    .route("/chat")
    .post(auth, gamesController.sendMsg);

// Matches with "/api/games/poll/:id"
// leaving this in for now even though not used
router
    .route("/poll/:id")
    .get(auth, gamesController.pollGameStatus);

// Matches with "/api/games/exchange"
router
    .route("/exchange")
    .put(auth, gamesController.exchange);

// Matches with "/api/games/move"
router
    .route("/move")
    .put(auth, gamesController.move);

// Matches with "/api/games/create"
router
    .route("/create")
    .post(auth, gamesController.create);

// Matches with "/api/games/join"
router
    .route("/join")
    .post(auth, gamesController.join);

// Matches with "/api/games/:id/:location"
router
    .route("/:id/:location")
    .get(auth, gamesController.getValidMoves);

// Matches with "/api/games/:id"
router
    .route("/:id")
    .delete(auth, gamesController.remove)
    .get(auth, gamesController.findById);

module.exports = router;