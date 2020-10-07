const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const auth = require("../../middleware/auth");

// Matches with "/api/users/"
router
    .route("/")
    .get(auth, usersController.getUser)
    .post(auth, usersController.updateUser);

// Matches with "/api/users/logout"
router
    .route("/logout")
    .get(auth, usersController.logout);

// Matches with "/api/users/delete"
router
    .route("/delete")
    .delete(auth, usersController.delete);

// Matches with "/api/users/tokenIsValid"
router
    .route("/tokenIsValid")
    .get(usersController.tokenIsValid);

// Matches with "/api/users/register"
router
    .route("/register")
    .post(usersController.register);

// Matches with "/api/users/activate"
router
    .route("/activate")
    .post(auth, usersController.activate);

// Matches with "/api/users/resendActivation"
router
    .route("/resendActivation")
    .get(auth, usersController.resendActivation);

// Matches with "/api/users/login"
router
    .route("/login")
    .post(usersController.login);

module.exports = router;
