const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { reviewLeave, deleteOwnFaculty } = require("../controllers/facultyController");

router.put("/:id/review", protect, allowRoles("FACULTY"), reviewLeave);

// DELETE own faculty profile
router.delete("/me", protect, allowRoles("FACULTY"), deleteOwnFaculty);

module.exports = router;
