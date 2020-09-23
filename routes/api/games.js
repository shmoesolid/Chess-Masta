const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");
const auth = require("../../middleware/auth");

// Matches with "/api/games"
router
    .route("/")
    .get(auth, gamesController.findAll)
    .put(auth, gamesController.move)
    .post(auth, gamesController.create);

// Matches with "/api/games/:id/:location"
router
    .route("/:id/:location")
    .get(auth, gamesController.getValidMovesTest);

// Matches with "/api/games/:id/:from/:to"
// router
//     .route("/:id/:from/:to")
//     .put(auth, gamesController.move);

// Matches with "/api/games/:id"
router
    .route("/:id")
    .get(auth, gamesController.findById);


module.exports = router;