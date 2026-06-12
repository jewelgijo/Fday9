import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        login(res.data.token);
        navigate("/dashboard");
      } else {
        await api.post("/auth/register", form);
        alert("Registered successfully");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert("Auth failed");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input name="name" placeholder="Name" onChange={handleChange} />
        )}

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" onChange={handleChange} />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Go to Register" : "Go to Login"}
      </p>
    </div>
  );
}

export default AuthPage;