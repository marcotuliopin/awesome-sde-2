import { useEffect, useState, type JSX } from "react";
import { useAuth } from "@/contexts/auth.context";
import { Link } from "react-router-dom";
import "./Register.css"; // Importa o CSS para estilização

export const Register = (): JSX.Element => {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { isAuthenticated, register, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated) logout();
  }, [isAuthenticated, logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const name = formName.trim();
    const email = formEmail.trim();
    const password = formPassword.trim();
    const confirmPassword = formConfirmPassword.trim();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const hasMinLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!hasMinLength || !hasNumber || !hasLetter || !hasSpecialChar) {
      setError(
        "Password must contain at least 6 characters, one number, one letter, and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const success = await register(name, email, password, "/");
    if (!success) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>

      {error && <div className="error-message">{error}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" data-testid="name-label">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            data-testid="name-input"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" data-testid="email-label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            data-testid="email-input"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" data-testid="password-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            data-testid="confirm-password-input"
            value={formConfirmPassword}
            onChange={(e) => setFormConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            data-testid="register-button"
            className="register-button"
          >
            Register
          </button>
        </div>

        <p className="login-link">
          Already have an account?{" "}
          <Link data-testid="go-to-login" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};
