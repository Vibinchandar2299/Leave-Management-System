const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  name: String,
  faculty_id: { type: String, unique: true },
  department: String,
  assigned_year: Number,
  assigned_section: String,
  college_email: String
}, { timestamps: true });

module.exports = mongoose.model("faculty", facultySchema);
