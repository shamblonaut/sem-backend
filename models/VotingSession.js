const mongoose = require("mongoose");

const votingSessionSchema = new mongoose.Schema({
  grade: { type: Number, required: true },
  division: { type: String, required: true },
  isActive: { type: Boolean, default: false },
});

module.exports = mongoose.model("VotingSession", votingSessionSchema);
