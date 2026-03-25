const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const rateLimit = require("../middleware/rateLimit.middleware");
const { protectedAPI, getMyUsage } = require("../controllers/api.controller");

router.get("/protected", auth, rateLimit, protectedAPI);
router.get("/usage/me", auth, getMyUsage);

module.exports = router;