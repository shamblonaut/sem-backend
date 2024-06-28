import Vote from "../models/Vote.js";

let studentVotes = 0;
let staffVotes = 0;

const castVote = async (req, res) => {
  try {
    const { voterInfo, votes } = req.body;

    const vote = await Vote.create({
      voterInfo,
      votes: votes.map((vote) => ({
        position: vote.positionId,
        candidate: vote.candidateId,
      })),
    });

    res.status(201).json({ vote, message: "Vote casted" });

    if (voterInfo.isStaff) {
      console.log(
        `Staff vote no. ${++staffVotes}: ${voterInfo.name} [${voterInfo.grade} ${voterInfo.section}] cated a vote!`,
      );
    } else {
      console.log(
        `Student vote no. ${++studentVotes}: ${voterInfo.name} [${voterInfo.grade} ${voterInfo.section}] casted a vote!`,
      );
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate({
        path: "votes.candidate",
        model: "Candidate",
      })
      .populate({
        path: "votes.position",
        model: "Position",
      });

    res.json(votes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getResults = async (req, res) => {
  try {
    const studentResults = await Vote.aggregate([
      { $match: { "voterInfo.isStaff": false } }, // Match student votes
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

    const staffResults = await Vote.aggregate([
      { $match: { "voterInfo.isStaff": true } }, // Match staff votes
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

    res.json({ studentResults, staffResults });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { castVote, getVotes, getResults };
