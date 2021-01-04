const express = require("express");
const { getExam } = require("../controller/examController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/web", authMiddleware.auth, getExam);
router.get("/design", authMiddleware.auth, (req, res) => {
  res.render("dedohoa");
});

module.exports = router;
