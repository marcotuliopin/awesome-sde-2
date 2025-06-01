import { useState, type JSX } from "react";
import { useAuth } from "@/contexts/auth.context";
import { Link } from "react-router-dom";

export const Login = (): JSX.Element => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login(email, password, "/");
        if (!success) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    data-testid="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    data-testid="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Don't have an account? Register here</Link>
        </div>
    );
};
