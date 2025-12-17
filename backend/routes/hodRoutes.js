const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { finalDecision } = require("../controllers/hodController");

router.put("/:id/decision", protect, allowRoles("HOD"), finalDecision);

module.exports = router;
