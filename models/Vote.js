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

const voterInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  isStaff: {
    type: Boolean,
    required: true,
  },
});

const votesSchema = new mongoose.Schema({
  voterInfo: voterInfoSchema,
  votes: [voteSchema],
});

export default mongoose.model("Vote", votesSchema);
