const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

// 🔐 AUTH MIDDLEWARE
const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id: user._id, iat, exp }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ======================
// CREATE TASK
// ======================
router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,

    userId: req.user.id // 🔥 THIS IS REQUIRED
  });

  await task.save();
  res.json(task);
});

// ======================
// GET ALL TASKS (USER BASED)
// ======================
router.get("/", auth, async (req, res) => {
  console.log("USER FROM TOKEN:", req.user);

  const tasks = await Task.find({}); // temporary

  console.log("TASKS FOUND:", tasks);

  res.json(tasks);
});

module.exports = router;