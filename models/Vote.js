import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
});

const votesSchema = new mongoose.Schema({
  voterName: { type: String, required: true },
  voterId: { type: Number, required: true },
  votes: [voteSchema],
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VotingSession",
    required: true,
  },
});

export default mongoose.model("Vote", votesSchema);
