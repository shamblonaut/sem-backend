import path from "path";

import Candidate from "../models/Candidate.js";
import Position from "../models/Position.js";

const addCandidate = async (req, res) => {
  try {
    const { name, grade, section, positionId } = req.body;
    const position = await Position.findById(positionId);

    if (!position) {
      return res.status(404).json({ error: "Position not found" });
    }

    const newCandidate = {
      name,
      grade,
      section,
      position: positionId,
    };

    if (req.file) {
      newCandidate.image = req.file.filename;
    }

    const candidate = await Candidate.create(newCandidate);
    await Position.findByIdAndUpdate(
      positionId,
      { $push: { candidates: candidate._id } },
      { new: true },
    );

    res.status(201).json({ candidate, message: "Candidate added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grade, section, positionId } = req.body;
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Check if the position is changing
    if (candidate.position.toString() !== positionId) {
      // Remove candidate from old position's candidates list
      await Position.findByIdAndUpdate(
        candidate.position,
        { $pull: { candidates: candidate._id } },
        { new: true },
      );

      // Add candidate to new position's candidates list
      await Position.findByIdAndUpdate(
        positionId,
        { $push: { candidates: candidate._id } },
        { new: true },
      );
    }

    const updatedCandidate = { name, grade, section, position: positionId };

    // Update image filename if a new image is uploaded
    if (req.file) {
      updatedCandidate.image = req.file.filename;
    }

    await Candidate.findByIdAndUpdate(id, updatedCandidate, { new: true });

    res.json({ candidate, message: "Candidate updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    await Position.findByIdAndUpdate(
      candidate.position,
      { $pull: { candidates: candidate._id } },
      { new: true },
    );
    await Candidate.findByIdAndDelete(id);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.json({ message: "Candidate removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().populate("position");
    res.json({ candidates });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCandidateImage = async (req, res) => {
  const { id } = req.params;
  const candidate = await Candidate.findById(id);

  if (candidate.image) {
    res.sendFile(path.resolve(`uploads/${candidate.image}`));
  }
};

export {
  addCandidate,
  editCandidate,
  deleteCandidate,
  getCandidates,
  getCandidateImage,
};
