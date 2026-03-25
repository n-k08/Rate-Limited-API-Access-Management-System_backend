const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { setRateLimit, getAllUsage } = require("../controllers/admin.controller");

router.post("/rate-limit", auth, role("ADMIN"), setRateLimit);
router.get("/usage", auth, role("ADMIN"), getAllUsage);

module.exports = router;