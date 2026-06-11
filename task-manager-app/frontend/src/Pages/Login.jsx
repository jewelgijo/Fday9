import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", form);

    localStorage.setItem("token", res.data.token);

    alert("Login success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button>Login</button>
    </form>
  );
}