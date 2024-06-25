import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: Number, required: true },
  division: { type: String, required: true },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
});

export default mongoose.model("Candidate", candidateSchema);
