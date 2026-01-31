const RateLimit = require("../models/RateLimit");
const ApiUsage = require("../models/ApiUsage");

exports.setRateLimit = async (req, res) => {
  const { role, maxRequests, windowMinutes } = req.body;

  await RateLimit.findOneAndUpdate(
    { role },
    { maxRequests, windowMinutes },
    { upsert: true }
  );

  res.json({ message: "Rate limit saved" });
};

exports.getAllUsage = async (req, res) => {
  const data = await ApiUsage.find();
  res.json(data);
};
