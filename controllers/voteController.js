import Vote from "../models/Vote.js";
import VotingSession from "../models/VotingSession.js";

const castVote = async (req, res) => {
  try {
    const { voterName, voterId, votes, sessionId } = req.body;

    const session = await VotingSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Voting session not found" });
    }
    if (!session.isActive) {
      return res.status(400).json({ error: "Voting session is not active" });
    }

    const vote = await Vote.create({
      voterName: voterName,
      voterId: voterId,
      votes: votes.map((vote) => ({
        position: vote.positionId,
        candidate: vote.candidateId,
      })),
      session: sessionId,
    });

    res.status(201).json({ vote, message: "Vote casted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("candidate session");

    res.json(votes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $unwind: "$votes" },
      {
        $group: {
          _id: {
            position: "$votes.position",
            candidate: "$votes.candidate",
          },
          totalVotes: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id.candidate",
          foreignField: "_id",
          as: "candidate",
        },
      },
      { $unwind: "$candidate" },
      {
        $lookup: {
          from: "positions",
          localField: "_id.position",
          foreignField: "_id",
          as: "position",
        },
      },
      { $unwind: "$position" },
      {
        $project: {
          candidate: "$candidate.name",
          position: "$position.name",
          totalVotes: 1,
        },
      },
      {
        $sort: { "position.name": 1, totalVotes: -1 },
      },
    ]);

    res.json({ results });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { castVote, getVotes, getResults };
