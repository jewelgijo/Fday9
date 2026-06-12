import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    };

    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  return (
    <div>
      <h2>Dashboard</h2>

      {/* NAVIGATION BUTTON */}
      <Link to="/tasks">
        <button>Go to Tasks Page</button>
      </Link>

      <hr />

      {/* SUMMARY */}
      <h3>Total: {total}</h3>
      <h3>Completed: {completed}</h3>
      <h3>Pending: {pending}</h3>
    </div>
  );
}

export default Dashboard;