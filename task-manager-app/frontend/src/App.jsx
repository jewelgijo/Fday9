import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={!token ? <AuthPage /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/tasks"
          element={token ? <Tasks /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;