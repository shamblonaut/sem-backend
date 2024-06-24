const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VotingSession",
    required: true,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
