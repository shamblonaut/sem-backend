const VotingSession = require("../models/VotingSession");

exports.createSession = async (req, res) => {
  try {
    const { grade, division } = req.body;
    const session = await VotingSession.create({ grade, division });

    res.status(201).json({ session, message: "Session added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, division, isActive } = req.body;
    const session = await VotingSession.findByIdAndUpdate(
      id,
      { grade, division, isActive },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ session, message: "Session updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await VotingSession.findByIdAndDelete(id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ message: "Session removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await VotingSession.find();

    res.json({ sessions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

