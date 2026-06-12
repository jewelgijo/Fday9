import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get("/auth/me");
      setUser(res.data);
      setName(res.data.name);
    };

    fetchUser();
  }, []);

  const updateProfile = async () => {
    const res = await api.put("/users/me", { name });
    setUser(res.data);
    alert("Profile updated");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile</h2>

      <p>Email: {user.email}</p>

      <p>
        Member Since:{" "}
        {user.createdAt
          ? new Date(user.createdAt).toDateString()
          : "N/A"}
      </p>

      <input value={name} onChange={(e) => setName(e.target.value)} />

      <button onClick={updateProfile}>Update Name</button>
    </div>
  );
}

export default Profile;