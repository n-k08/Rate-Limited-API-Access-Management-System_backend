const ApiUsage = require("../models/ApiUsage");

exports.protectedApi = (req, res) => {
  res.json({ message: "Protected API accessed" });
};

exports.myUsage = async (req, res) => {
  const usage = await ApiUsage.find({ userId: req.user.id });
  res.json(usage);
};
