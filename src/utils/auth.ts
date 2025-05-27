// src/utils/auth.ts

// Chave que será usada no storage
const TOKEN_KEY = 'authToken';

/** Retorna true se houver token salvo */
export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

/** Grava o token (ex: após login) */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Remove o token (ex: no logout) */
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** Recupera o token (ex: para usar em headers) */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
