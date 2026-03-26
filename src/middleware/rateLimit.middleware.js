const RateLimit = require("../models/RateLimit");
const ApiUsage = require("../models/ApiUsage");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.user.id);

  const limit = await RateLimit.findOne();
  if (!limit) return res.status(500).json({ message: "Rate limit not set" });

  let usage = await ApiUsage.findOne({ userId });

  const now = new Date();
  const windowMs = limit.window * 60 * 1000;

  if (!usage) {
    usage = await ApiUsage.create({
      userId,
      count: 1,
      startTime: now,
    });
    return next();
  }

  // Reset window
  if (now - usage.startTime > windowMs) {
    usage.count = 1;
    usage.startTime = now;
    await usage.save();
    return next();
  }

  // Check limit
  if (usage.count >= limit.requests) {
    return res.status(429).json({
      message: "Rate limit exceeded. Try again later.",
    });
  }

  usage.count += 1;
  await usage.save();

  next();
};
