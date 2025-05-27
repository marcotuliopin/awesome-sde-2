import { User } from "../types/user";


// TODO: Use environment variables for API URL
const API_URL = "http://localhost:3000"; 

export const registerUser = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao cadastrar usuário");
  }

  return await res.json();
};

export const loginUser = async (email: string, password: string): Promise<{ token: string }> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao fazer login");
  }

  return await res.json();
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const res = await fetch(`${API_URL}/users/email/${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("Usuário não encontrado");
  return await res.json();
};