import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#1e293b",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        marginBottom: "25px",
      }}
    >
      {/* Logo */}
      <h2
        style={{
          margin: 0,
          color: "#60a5fa",
        }}
      >
        Task Manager
      </h2>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "25px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link
          to="/tasks"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaTasks />
          Tasks
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaUser />
          Profile
        </Link>
      </div>

      {/* User Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <span>{user?.name}</span>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;