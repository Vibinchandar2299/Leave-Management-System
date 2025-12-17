const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    role: req.body.role,
    college_email: req.body.college_email,
    password_hash: hash
  });
  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ college_email: req.body.college_email });
  const match = await bcrypt.compare(req.body.password, user.password_hash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
};
