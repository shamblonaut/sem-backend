const express = require("express");
const {
  addPosition,
  editPosition,
  deletePosition,
  getPositions,
} = require("../controllers/positionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addPosition);
router.put("/:id", authMiddleware, editPosition);
router.delete("/:id", authMiddleware, deletePosition);
router.get("/", authMiddleware, getPositions);

module.exports = router;
