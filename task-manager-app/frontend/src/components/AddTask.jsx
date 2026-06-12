import { useState } from "react";
import api from "../api/axios";

function AddTask({ onTaskAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/tasks", form);

    onTaskAdded(res.data);

    setForm({
      title: "",
      description: "",
      priority: "low",
      dueDate: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add Task</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;