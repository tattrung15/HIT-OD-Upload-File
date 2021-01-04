const express = require("express");

const router = express.Router();

const fileController = require("../controller/fileController");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authMiddleware.auth, authMiddleware.role, fileController.getAllFiles);

router
  .route("/web")
  .get(authMiddleware.auth, authMiddleware.role, fileController.getFileWeb);

router
  .route("/design")
  .get(authMiddleware.auth, authMiddleware.role, fileController.getFileDesign);

module.exports = router;
