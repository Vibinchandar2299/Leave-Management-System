const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  application_id: { type: mongoose.Schema.Types.ObjectId, ref: "leave_applications" },
  sender_role: { type: String, enum: ["FACULTY", "HOD"] },
  sender_id: mongoose.Schema.Types.ObjectId,
  message: String
}, { timestamps: true });

module.exports = mongoose.model("application_messages", messageSchema);
