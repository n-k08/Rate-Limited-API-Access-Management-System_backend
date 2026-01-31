const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const rateLimit = require("../middleware/rateLimit.middleware");
const api = require("../controllers/api.controller");

router.get("/protected", auth, rateLimit, api.protectedApi);
router.get("/my-usage", auth, api.myUsage);

module.exports = router;
