import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: 15 }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/profile">Profile</Link>

      {/* AVATAR */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "blue",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user?.name?.charAt(0).toUpperCase()}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;