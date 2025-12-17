const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { reviewLeave } = require("../controllers/facultyController");

router.put("/:id/review", protect, allowRoles("FACULTY"), reviewLeave);

module.exports = router;
