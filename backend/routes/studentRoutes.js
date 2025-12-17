const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { applyLeave } = require("../controllers/studentController");

router.post("/apply", protect, allowRoles("STUDENT"), applyLeave);

module.exports = router;
