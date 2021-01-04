const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controller/userController");

router.route("/login").get(authController.login).post(authController.postLogin);

router
  .route("/signup")
  .get(authController.signup)
  .post(authController.postSignup);

router
  .route("/user")
  .put(authMiddleware.auth, authMiddleware.role, userController.updateScore);

module.exports = router;
