import VotingSession from "../models/VotingSession.js";

const createSession = async (req, res) => {
  try {
    const { grade, division, voters } = req.body;
    const session = await VotingSession.create({ grade, division, voters });

    res.status(201).json({ session, message: "Session added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, division, voters, isActive } = req.body;
    let session = await VotingSession.findById(id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (isActive) {
      // Check if there is already an active session
      const activeSession = await VotingSession.findOne({ isActive: true });
      if (activeSession && activeSession._id.toString() !== id) {
        return res.status(400).json({
          error: `Another session is already active: ${activeSession.grade} ${activeSession.division}`,
        });
      }
    }

    session = await VotingSession.findByIdAndUpdate(
      id,
      { grade, division, voters, isActive },
      { new: true },
    );

    res.json({ session, message: "Session updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSession = async (req, res) => {
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

const getSessions = async (req, res) => {
  try {
    const sessions = await VotingSession.find();
    const activeSession = await VotingSession.findOne({ isActive: true });

    res.json({ sessions, activeSession });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createSession, editSession, deleteSession, getSessions };
