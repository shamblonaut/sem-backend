const express = require("express");
const {
  castVote,
  getVotes,
  getResults,
} = require("../controllers/voteController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, castVote);
router.get("/", authMiddleware, getVotes);
router.get("/results", authMiddleware, getResults);

module.exports = router;
