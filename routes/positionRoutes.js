import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addPosition,
  getPositions,
  deletePosition,
  editPosition,
} from "../controllers/positionController.js";

const router = express.Router();

router.post("/", authMiddleware, addPosition);
router.put("/:id", authMiddleware, editPosition);
router.delete("/:id", authMiddleware, deletePosition);
router.get("/", getPositions);

export default router;
