const RateLimit = require("../models/RateLimit");
const ApiUsage = require("../models/ApiUsage");

module.exports = async (req, res, next) => {
  const rule = await RateLimit.findOne({ role: req.user.role });
  if (!rule) return next();

  const now = new Date();
  const windowStart = new Date(now - rule.windowMinutes * 60000);

  let usage = await ApiUsage.findOne({
    userId: req.user.id,
    endpoint: req.originalUrl,
    windowStart: { $gte: windowStart }
  });

  if (!usage) {
    await ApiUsage.create({
      userId: req.user.id,
      endpoint: req.originalUrl,
      count: 1,
      windowStart: now
    });
    return next();
  }

  if (usage.count >= rule.maxRequests) {
    return res.status(429).json({
      message: "Rate limit exceeded"
    });
  }

  usage.count++;
  await usage.save();
  next();
};
