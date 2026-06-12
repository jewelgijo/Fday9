import { useEffect, useState } from "react";
import api from "../api/axios";

function EditTaskModal({ task, onClose, onUpdate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    dueDate: ""
  });

  useEffect(() => {
    if (task) {
      setForm(task);
    }
  }, [task]);

  if (!task) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await api.put(`/tasks/${task._id}`, form);

    onUpdate(res.data); // update UI instantly
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 100,
        left: 100,
        background: "#fff",
        padding: 20,
        border: "1px solid #ccc"
      }}
    >
      <h3>Edit Task</h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditTaskModal;