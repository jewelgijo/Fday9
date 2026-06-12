const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());

// 🔥 IMPORTANT: body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});