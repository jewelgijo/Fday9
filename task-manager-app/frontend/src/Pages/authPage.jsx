import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        login(res.data.token);
        navigate("/dashboard");
      } else {
        await API.post("/auth/register", form);

        alert("Registered successfully!");
        setIsLogin(true);
      }
    } catch (err) {
      console.log("ERROR:", err.response || err.message);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}