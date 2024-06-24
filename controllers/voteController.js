const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const VotingSession = require("../models/VotingSession");

exports.castVote = async (req, res) => {
  try {
    const { candidateId, sessionId } = req.body;
    const candidate = await Candidate.findById(candidateId);
    const session = await VotingSession.findById(sessionId);

    if (!candidate || !session) {
      return res.status(404).json({ error: "Candidate or session not found" });
    }
    if (!session.isActive) {
      return res.status(400).json({ error: "Voting session is not active" });
    }

    const vote = await Vote.create({
      student: req.user.id,
      candidate: candidateId,
      session: sessionId,
    });

    res.status(201).json({ vote, message: "Vote casted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("candidate session");

    res.json(votes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate",
          totalVotes: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $unwind: "$candidate",
      },
      {
        $lookup: {
          from: "positions",
          localField: "candidate.position",
          foreignField: "_id",
          as: "position",
        },
      },
      {
        $unwind: "$position",
      },
      {
        $project: {
          candidate: "$candidate.name",
          position: "$position.name",
          totalVotes: 1,
        },
      },
      {
        $sort: { totalVotes: -1 },
      },
    ]);

    res.json({ results });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

