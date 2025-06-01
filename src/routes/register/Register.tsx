import { useState, type JSX } from "react";
import { useAuth } from "@/contexts/auth.context";
import { Link } from "react-router-dom";

export const Register = (): JSX.Element => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validações básicas
        if (!name || !email || !password) {
            setError("All fields are required");
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

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        data-testid="name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        data-testid="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        data-testid="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        data-testid="confirm-password-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </div>

                <p className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
    );
};
