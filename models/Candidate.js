const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
