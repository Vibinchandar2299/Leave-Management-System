const Leave = require("../models/LeaveApplication");
const Message = require("../models/ApplicationMessage");

exports.finalDecision = async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  leave.status = req.body.status;
  leave.hod_action_at = new Date();
  await leave.save();

  if (req.body.message) {
    await Message.create({
      application_id: leave._id,
      sender_role: "HOD",
      sender_id: req.user._id,
      message: req.body.message
    });
  }

  res.json(leave);
};
