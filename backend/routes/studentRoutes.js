const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { applyLeave, deleteStudent, getMyApplications } = require("../controllers/studentController");

// GET student's own applications
router.get("/applications", protect, allowRoles("STUDENT"), getMyApplications);

router.post("/apply", protect, allowRoles("STUDENT"), applyLeave);

// DELETE student by id (HOD only)
router.delete("/:id", protect, allowRoles("HOD"), deleteStudent);

// NOTE: self-delete removed — only HOD may delete students via DELETE /:id

module.exports = router;
