const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  name: String,
  roll_no: { type: String, unique: true },
  department: String,
  year: Number,
  degree: String,
  section: String,
  college_email: String
}, { timestamps: true });

module.exports = mongoose.model("students", studentSchema);
