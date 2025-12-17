const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["STUDENT", "FACULTY", "HOD"],
    required: true
  },
  college_email: {
    type: String,
    unique: true,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);
