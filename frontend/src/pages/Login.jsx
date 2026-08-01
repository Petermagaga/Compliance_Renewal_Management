import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
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
        email,     
        password,
      });

      console.log(response.data);

      const result = response.data;

      login(
          result.access,
          result.refresh,
          result.user
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid Email or password");
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
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>Unibrain Compliance Management Login</h2>

        <input
          type="email"   // ✅ better to use "email" type for validation
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;