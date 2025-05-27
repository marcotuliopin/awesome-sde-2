import axios from "axios";


// TODO: Use environment variables for API URL
const API_URL = "http://localhost:3000"; 

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};
