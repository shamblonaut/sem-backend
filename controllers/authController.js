const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.create({ username, password, role });

    res.status(201).json({ user, message: "User created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

