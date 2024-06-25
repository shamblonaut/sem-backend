import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createSession,
  editSession,
  deleteSession,
  getSessions,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", authMiddleware, createSession);
router.put("/:id", authMiddleware, editSession);
router.delete("/:id", authMiddleware, deleteSession);
router.get("/", getSessions);

export default router;
