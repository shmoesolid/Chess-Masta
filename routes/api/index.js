const router = require("express").Router();
//const bookRoutes = require("./books");
const gameRoutes = require("./games");
//const userRoutes = require("./users");

// routes
//router.use("/books", bookRoutes);
router.use("/games", gameRoutes);
//router.use("/users", userRoutes);

module.exports = router;
