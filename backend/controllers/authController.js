const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Hod = require("../models/Hod");

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    role: req.body.role,
    college_email: req.body.college_email,
    password_hash: hash
  });
  // create role-specific profile document
  if (user.role === "STUDENT") {
    await Student.create({
      user_id: user._id,
      name: req.body.name || "",
      roll_no: req.body.roll_no || "",
      department: req.body.department || "",
      year: req.body.year || null,
      degree: req.body.degree || "",
      section: req.body.section || "",
      college_email: user.college_email
    });
  } else if (user.role === "FACULTY") {
    await Faculty.create({
      user_id: user._id,
      name: req.body.name || "",
      faculty_id: req.body.faculty_id || "",
      department: req.body.department || "",
      assigned_year: req.body.assigned_year || null,
      assigned_section: req.body.assigned_section || "",
      college_email: user.college_email
    });
  } else if (user.role === "HOD") {
    await Hod.create({
      user_id: user._id,
      name: req.body.name || "",
      faculty_id: req.body.faculty_id || "",
      department: req.body.department || "",
      college_email: user.college_email
    });
  }

  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ college_email: req.body.college_email });
  const match = await bcrypt.compare(req.body.password, user.password_hash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
};
