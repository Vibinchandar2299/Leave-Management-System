const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { reviewLeave, deleteOwnFaculty, getPendingApplications } = require("../controllers/facultyController");

// GET pending applications for faculty
router.get("/applications", protect, allowRoles("FACULTY"), getPendingApplications);

router.put("/:id/review", protect, allowRoles("FACULTY"), reviewLeave);

// DELETE own faculty profile
router.delete("/me", protect, allowRoles("FACULTY"), deleteOwnFaculty);

module.exports = router;
