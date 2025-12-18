const Leave = require("../models/LeaveApplication");
const Message = require("../models/ApplicationMessage");
const Faculty = require("../models/Faculty");
const User = require("../models/User");

exports.getPendingApplications = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ user_id: req.user._id });
    if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });

    const applications = await Leave.find({
      status: "PENDING_FACULTY",
      "student_snapshot.department": faculty.department,
      "student_snapshot.year": faculty.assigned_year
    }).sort({ submitted_at: -1 });

    console.log('Faculty pending applications count:', applications.length);
    if (applications.length > 0) {
      console.log('Sample application data:', JSON.stringify(applications[0], null, 2));
    }

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reviewLeave = async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) return res.status(404).json({ message: "Leave application not found" });

  // If faculty approves, send to HOD. If faculty rejects, mark as rejected
  leave.status = req.body.action === 'approve' ? "PENDING_HOD" : "REJECTED";
  leave.faculty_action_at = new Date();
  await leave.save();

  if (req.body.message) {
    await Message.create({
      application_id: leave._id,
      sender_role: "FACULTY",
      sender_id: req.user._id,
      message: req.body.message
    });
  }

  res.json(leave);
};

exports.deleteOwnFaculty = async (req, res) => {
  const faculty = await Faculty.findOne({ user_id: req.user._id });
  if (!faculty) return res.status(404).json({ message: "Faculty not found" });

  // clear faculty references from leave applications
  await Leave.updateMany({ faculty_id: faculty._id }, { $unset: { faculty_id: "" } });

  // delete user
  if (faculty.user_id) {
    await User.findByIdAndDelete(faculty.user_id);
  }

  // delete faculty document
  await Faculty.findByIdAndDelete(faculty._id);

  res.json({ message: "Faculty and related references deleted" });
};
