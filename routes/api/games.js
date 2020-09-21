const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

// Matches with "/api/games"
router
    .route("/")
    .get(gamesController.findAll);
//     .post(gamesController.create);

// Matches with "/api/games/:id/:location"
router
    .route("/:id/:location")
    .get(gamesController.getValidMovesTest);

// Matches with "/api/games/:id/:from/:to"
router
    .route("/:id/:from/:to")
    .get(gamesController.move);

// Matches with "/api/games/:id"
router
    .route("/:id")
    .get(gamesController.findById);


module.exports = router;