import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import EditTaskModal from "../components/EditTaskModal";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // 🔍 SEARCH + FILTER STATE
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // GET TASKS
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE
  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // DELETE
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // UPDATE
  const updateTask = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
    setEditingTask(null);
  };

  // TOGGLE STATUS
  const toggleStatus = async (task) => {
    const res = await api.patch(`/tasks/${task._id}`, {
      status: task.status === "completed" ? "pending" : "completed",
    });

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? res.data : t))
    );
  };

  // 🔥 SEARCH + FILTER LOGIC
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      let matchFilter = true;

      if (filter === "pending") matchFilter = task.status === "pending";
      if (filter === "completed") matchFilter = task.status === "completed";
      if (filter === "high") matchFilter = task.priority === "high";

      return matchSearch && matchFilter;
    });
  }, [tasks, search, filter]);

  // 📊 COUNTS
  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    high: tasks.filter((t) => t.priority === "high").length,
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tasks</h2>

      {/* ADD TASK */}
      <AddTask onTaskAdded={addTask} />

      {/* 🔍 SEARCH BAR */}
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, margin: "10px 0" }}
      />

      {/* FILTER BUTTONS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button onClick={() => setFilter("all")}>
          All ({counts.all})
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending ({counts.pending})
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed ({counts.completed})
        </button>

        <button onClick={() => setFilter("high")}>
          High Priority ({counts.high})
        </button>
      </div>

      {/* TASK LIST */}
      {filteredTasks.length === 0 ? (
        <h3>No tasks found</h3>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggleStatus={toggleStatus}
          />
        ))
      )}

      {/* EDIT MODAL */}
      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default Tasks;