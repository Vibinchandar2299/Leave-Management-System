const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: "faculty" },
  hod_id: { type: mongoose.Schema.Types.ObjectId, ref: "hod" },

  student_snapshot: {
    name: String,
    roll_no: String,
    department: String,
    year: Number,
    college_email: String
  },

  parent_phone: String,
  leave_reason: String,

  status: {
    type: String,
    enum: ["PENDING_FACULTY", "PENDING_HOD", "APPROVED", "REJECTED"],
    default: "PENDING_FACULTY"
  },

  submitted_at: { type: Date, default: Date.now },
  faculty_action_at: Date,
  hod_action_at: Date
});

module.exports = mongoose.model("leave_applications", leaveSchema);
