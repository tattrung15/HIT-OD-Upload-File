const express = require("express");

const router = express.Router();

const uploadController = require("../controller/uploadController");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authMiddleware.auth, uploadController.getUpload)
  .post(authMiddleware.auth, uploadController.postUpload);

module.exports = router;
