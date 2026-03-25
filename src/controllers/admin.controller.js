const RateLimit = require("../models/RateLimit");
const ApiUsage = require("../models/ApiUsage");

exports.setRateLimit = async (req, res) => {
  const { requests, window } = req.body;

  let limit = await RateLimit.findOne();

  if (limit) {
    limit.requests = requests;
    limit.window = window;
    await limit.save();
  } else {
    await RateLimit.create({ requests, window });
  }

  res.json({ message: "Rate limit updated" });
};

exports.getAllUsage = async (req, res) => {
  const usage = await ApiUsage.find();
  res.json(usage);
};