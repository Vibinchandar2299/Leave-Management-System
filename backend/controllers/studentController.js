const Leave = require("../models/LeaveApplication");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Hod = require("../models/Hod");

exports.applyLeave = async (req, res) => {
  const student = await Student.findOne({ user_id: req.user._id });
  const faculty = await Faculty.findOne({
    department: student.department,
    assigned_year: student.year,
    assigned_section: student.section
  });
  const hod = await Hod.findOne({ department: student.department });

  const leave = await Leave.create({
    student_id: student._id,
    faculty_id: faculty._id,
    hod_id: hod._id,
    student_snapshot: {
      name: student.name,
      roll_no: student.roll_no,
      department: student.department,
      year: student.year,
      college_email: student.college_email
    },
    parent_phone: req.body.parent_phone,
    leave_reason: req.body.leave_reason
  });

  res.json(leave);
};
