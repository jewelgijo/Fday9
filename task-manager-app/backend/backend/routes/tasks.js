const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// CREATE TASK
router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id,
  });

  await task.save();
  res.json(task);
});

// GET ALL TASKS (for logged-in user)
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(task);
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;