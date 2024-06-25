import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  castVote,
  getVotes,
  getResults,
} from "../controllers/voteController.js";

const router = express.Router();

router.post("/", castVote);
router.get("/", authMiddleware, getVotes);
router.get("/results", authMiddleware, getResults);

export default router;
