const ApiUsage = require("../models/ApiUsage");

exports.protectedAPI = async (req, res) => {
  res.json({ message: "API accessed successfully" });
};

exports.getMyUsage = async (req, res) => {
  const usage = await ApiUsage.findOne({ userId: req.user.id });
  res.json(usage);
};