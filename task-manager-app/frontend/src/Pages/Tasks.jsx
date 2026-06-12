import { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import EditTaskModal from "../components/EditTaskModal";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  // UI STATES (DAY 10)
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // GET TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD
  const handleTaskAdded = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // DELETE
  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // UPDATE
  const handleUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
    setEditingTask(null);
  };

  // TOGGLE STATUS (MARK COMPLETE / PENDING)
  const toggleStatus = async (task) => {
  try {
    const res = await api.patch(`/tasks/${task._id}`, {
      status: task.status === "completed" ? "pending" : "completed",
    });

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? res.data : t))
    );
  } catch (err) {
    console.log("PATCH ERROR:", err);
  }
};

  // 🔍 SEARCH + FILTER LOGIC
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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Tasks</h2>

      {/* ADD TASK */}
      <AddTask onTaskAdded={handleTaskAdded} />

      {/* SEARCH */}
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, marginTop: 10 }}
      />

      {/* FILTER BUTTONS */}
      <div style={{ marginTop: 10 }}>
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
            onDelete={handleDelete}
            onToggleStatus={toggleStatus}
          />
        ))
      )}

      {/* EDIT MODAL */}
      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default Tasks;