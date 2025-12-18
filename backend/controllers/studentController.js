const Leave = require("../models/LeaveApplication");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Hod = require("../models/Hod");
const User = require("../models/User");

exports.applyLeave = async (req, res) => {
  try {
    console.log('Received leave application data:', req.body);
    
    const student = await Student.findOne({ user_id: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    const faculty = await Faculty.findOne({
      department: student.department,
      assigned_year: student.year,
      assigned_section: student.section
    });
    if (!faculty) return res.status(404).json({ message: "Assigned faculty not found for student's department/year/section" });

    const hod = await Hod.findOne({ department: student.department });
    if (!hod) return res.status(404).json({ message: "HOD not found for student's department" });

    const leaveData = {
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
      leave_type: req.body.leave_type,
      from_date: req.body.from_date,
      to_date: req.body.to_date,
      number_of_days: req.body.number_of_days,
      parent_phone: req.body.parent_phone,
      leave_reason: req.body.leave_reason
    };

    console.log('Creating leave application with data:', leaveData);

    const leave = await Leave.create(leaveData);
    
    console.log('Leave application created:', leave);

    res.json(leave);
  } catch (error) {
    console.error('Error in applyLeave:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    const applications = await Leave.find({ student_id: student._id }).sort({ submitted_at: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  // remove related leave applications
  await Leave.deleteMany({ student_id: student._id });

  // remove associated user account if present
  if (student.user_id) {
    await User.findByIdAndDelete(student.user_id);
  }

  // remove student document
  await Student.findByIdAndDelete(student._id);

  res.json({ message: "Student and related data deleted" });
};


