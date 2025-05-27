// src/services/auth.service.ts
import axios from 'axios';
import { setToken } from '@/utils/auth'; // ou '../../utils/auth' se não usar alias

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export async function login(username: string, password: string) {
  const res = await API.post('/auth/login', { username, password });
  // supondo que o backend devolva { accessToken: 'xxx' }
  setToken(res.data.accessToken);
  return res.data;
}
