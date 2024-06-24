const express = require("express");
const {
  createSession,
  editSession,
  deleteSession,
  getSessions,
} = require("../controllers/sessionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createSession);
router.put("/:id", authMiddleware, editSession);
router.delete("/:id", authMiddleware, deleteSession);
router.get("/", authMiddleware, getSessions);

module.exports = router;
