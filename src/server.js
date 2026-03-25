require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api", require("./routes/api.route"));

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);