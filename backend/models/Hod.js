const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  name: String,
  faculty_id: String,
  department: String,
  college_email: String
}, { timestamps: true });

module.exports = mongoose.model("hod", hodSchema);
