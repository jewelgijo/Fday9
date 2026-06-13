import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ FRONTEND VALIDATION (CRITICAL)
  if (!form.email || !form.password) {
    toast.error("Email and password are required");
    return;
  }

  if (!isLogin && !form.name) {
    toast.error("Name is required");
    return;
  }

  setLoading(true);

  try {
    if (isLogin) {
      const res = await api.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (!res.data?.token) {
        toast.error("Invalid login response");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      login(res.data.token);

      toast.success("Login successful");

      navigate("/dashboard");
    } else {
      await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      toast.success("Registered successfully");

      setIsLogin(true);
      setForm({ name: "", email: "", password: "" });
    }
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    toast.error(
      err.response?.data?.message ||
      "Auth failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      style={{
        width: "350px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Register"}
        </button>
      </form>

      <p
        onClick={() => setIsLogin(!isLogin)}
        style={{
          cursor: "pointer",
          color: "blue",
          marginTop: "15px",
        }}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default AuthPage;