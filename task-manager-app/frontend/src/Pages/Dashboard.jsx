import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaUser,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import api from "../api/axios";
import toast from "react-hot-toast";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        toast.error("Failed to load tasks");
      }
    };

    fetchTasks();
  }, []);

  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "pending"
  ).length;

  const highPriority = tasks.filter(
    (t) => t.priority === "high"
  ).length;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1>Welcome to Task Manager 🚀</h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Manage your tasks efficiently and stay productive.
      </p>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <FaTasks size={35} />
          <h3>Total Tasks</h3>
          <h1>{total}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <FaCheckCircle size={35} />
          <h3>Completed</h3>
          <h1>{completed}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <FaClock size={35} />
          <h3>Pending</h3>
          <h1>{pending}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <FaTasks size={35} />
          <h3>High Priority</h3>
          <h1>{highPriority}</h1>
        </div>
      </div>

      {/* Navigation Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <FaTasks size={40} />

          <h2>Tasks</h2>

          <p>Create, edit and manage your tasks.</p>

          <Link to="/tasks">
            <button
              style={{
                padding: "10px 15px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Open Tasks
            </button>
          </Link>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <FaUser size={40} />

          <h2>Profile</h2>

          <p>Manage your account information.</p>

          <Link to="/profile">
            <button
              style={{
                padding: "10px 15px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Open Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;