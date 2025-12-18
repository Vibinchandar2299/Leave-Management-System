const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { finalDecision, deleteOwnHod, getAllApplications } = require("../controllers/hodController");

// GET all applications for HOD
router.get("/applications", protect, allowRoles("HOD"), getAllApplications);

router.put("/:id/decision", protect, allowRoles("HOD"), finalDecision);

// DELETE own HOD profile
router.delete("/me", protect, allowRoles("HOD"), deleteOwnHod);

module.exports = router;
