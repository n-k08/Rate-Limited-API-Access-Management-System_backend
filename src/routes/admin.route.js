const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const admin = require("../controllers/admin.controller");

router.post("/rate-limit", auth, role("ADMIN"), admin.setRateLimit);
router.get("/usage", auth, role("ADMIN"), admin.getAllUsage);

module.exports = router;
