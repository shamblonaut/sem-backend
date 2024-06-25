import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
});

export default mongoose.model("Position", positionSchema);
