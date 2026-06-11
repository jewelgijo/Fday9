import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/auth/register", form);

    alert("Registered successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button>Register</button>
    </form>
  );
}