const Position = require("../models/Position");
const Candidate = require("../models/Candidate");

exports.addPosition = async (req, res) => {
  try {
    const { name } = req.body;
    const position = await Position.create({ name });

    res.status(201).json({ position, message: "Position added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const position = await Position.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!position) {
      return res.status(404).json({ error: "Position not found" });
    }

    res.json({ position, message: "Position updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const { id } = req.params;

    const position = await Position.findById(id);
    if (!position) {
      return res.status(404).json({ error: "Position not found" });
    }

    await Candidate.deleteMany({ position: id });
    await Position.findByIdAndDelete(id);

    res.json({ message: "Position removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPositions = async (req, res) => {
  try {
    const positions = await Position.find().populate("candidates");

    res.json({ positions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

