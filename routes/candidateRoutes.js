import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addCandidate,
  getCandidates,
  deleteCandidate,
  editCandidate,
} from "../controllers/candidateController.js";

const router = express.Router();

router.post("/", authMiddleware, addCandidate);
router.put("/:id", authMiddleware, editCandidate);
router.delete("/:id", authMiddleware, deleteCandidate);
router.get("/", getCandidates);

export default router;
