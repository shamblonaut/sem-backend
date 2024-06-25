import mongoose from "mongoose";

const votingSessionSchema = new mongoose.Schema({
  grade: { type: Number, required: true },
  division: { type: String, required: true },
  voters: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
});

export default mongoose.model("VotingSession", votingSessionSchema);
