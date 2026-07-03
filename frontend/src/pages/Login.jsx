import { useState } from "react";
import { useNavigate }  from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
        const response = await api.post("/token/", {
        username,
        password,
        });

        login(response.data.access, response.data.refresh);

        navigate("/dashboard");
    } catch (err) {
        console.error(err);

        setError("Invalid username or password");
    } finally {
        setLoading(false);
    }
    };

  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>Compliance Management Login</h2>

        <input
          type="text"
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

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;