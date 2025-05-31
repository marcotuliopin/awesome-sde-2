// TODO: Use environment variables for API URL
const API_URL = "http://localhost:3000";


export const login = async (
    email: string,
    password: string
): Promise<{ token: string }> => {
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


export const logout = async (): Promise<void> => {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao fazer logout");
    }
    return await res.json();
};