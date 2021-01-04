const express = require("express");

const router = express.Router();

const viewUploadController = require("../controller/viewUploadController");

router.route("/:id").get(viewUploadController.viewDetail);

module.exports = router;
