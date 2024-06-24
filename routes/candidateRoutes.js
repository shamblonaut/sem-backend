const express = require("express");
const {
  addCandidate,
  editCandidate,
  deleteCandidate,
  getCandidates,
} = require("../controllers/candidateController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addCandidate);
router.put("/:id", authMiddleware, editCandidate);
router.delete("/:id", authMiddleware, deleteCandidate);
router.get("/", authMiddleware, getCandidates);

module.exports = router;
