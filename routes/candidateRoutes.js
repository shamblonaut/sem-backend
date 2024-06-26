import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  addCandidate,
  getCandidates,
  deleteCandidate,
  editCandidate,
  getCandidateImage,
} from "../controllers/candidateController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), addCandidate);
router.put("/:id", authMiddleware, upload.single("image"), editCandidate);
router.delete("/:id", authMiddleware, deleteCandidate);
router.get("/", getCandidates);
router.get("/:id/image", getCandidateImage);

export default router;
