import { useState, type JSX } from "react";
import { useAuth } from "@/contexts/auth.context";
import { Link, useNavigate } from "react-router-dom"; // Importando useNavigate

export const Login = (): JSX.Element => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const { login } = useAuth();
 const navigate = useNavigate(); // Inicializando o hook useNavigate

 const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     const success = await login(email, password, "/");
     if (!success) {
         alert("Login failed. Please check your credentials.");
     } else {
         navigate("/products"); // Redireciona para a página de produtos
     }
 };

 return (
     <div>
         <h1 data-testid="login-header">Login</h1>
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
                 data-testid="password-input"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
             />
             <br />
             <button data-testid="login-button" type="submit">Login</button>
         </form>
         <Link data-testid="go-to-register" to="/register">Don't have an account? Register here</Link>
     </div>
 );
};