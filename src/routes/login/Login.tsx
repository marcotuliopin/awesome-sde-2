import { useState, type JSX } from "react";
import { useAuth } from "@/contexts/auth.context";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Importa o CSS estilizado

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password, "/");
    if (!success) {
      alert("Login failed. Please check your credentials.");
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="login-container">
      <h1 data-testid="login-header">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          data-testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          data-testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="login-button" type="submit">
          Login
        </button>
      </form>
      <div className="register-link">
        <Link data-testid="go-to-register" to="/register">
          Don't have an account? Register here
        </Link>
      </div>
    </div>
  );
};
