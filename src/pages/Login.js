import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  // Local state for form inputs and error feedback
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // Prevent full page reload

    // Simple hardcoded check for demo purposes
    if (username === "Admin" && password === "123456") {
      // Set persistence token so ProtectedRoute allows access
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {/* Controlled inputs to track value changes immediately */}
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Only render error message if one exists */}
        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}