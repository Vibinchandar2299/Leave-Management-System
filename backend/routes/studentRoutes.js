const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { applyLeave, deleteStudent } = require("../controllers/studentController");

router.post("/apply", protect, allowRoles("STUDENT"), applyLeave);

// DELETE student by id (HOD only)
router.delete("/:id", protect, allowRoles("HOD"), deleteStudent);

// DELETE own student profile
router.delete("/me", protect, allowRoles("STUDENT"), async (req, res, next) => {
	try {
		const student = await require('../models/Student').findOne({ user_id: req.user._id });
		if (!student) return res.status(404).json({ message: 'Student not found' });
		req.params.id = student._id.toString();
		// delegate to controller deleteStudent
		return deleteStudent(req, res, next);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
