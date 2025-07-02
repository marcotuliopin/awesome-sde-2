import { setupAxiosInterceptors } from "@/api/axios";
import { AuthService } from "@/services/auth.service";
import type { User } from "@/types/user";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string, from: string) => Promise<boolean>;
    register: (
        name: string,
        email: string,
        password: string,
        from: string
    ) => Promise<boolean>;
    logout: () => void;
    user: User | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const userData = await AuthService.checkAuth();
                if (userData) {
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error checking authentication status:", error);
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    useEffect(() => {
        setupAxiosInterceptors(() => {
            logout();
            navigate("/login");
        });
    }, [navigate]);

    const login = async (
        email: string,
        password: string,
        from: string
    ): Promise<boolean> => {
        try {
            const userData = await AuthService.login(email, password);
            console.log("Login success:", userData);
            setUser(userData);
            setIsAuthenticated(true);
            navigate(from);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

const logout = async () => {
    try {
        await AuthService.logout();
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login"); // ← redireciona após logout
    }
};


    const register = async (
    name: string,
    email: string,
    password: string
    ): Promise<boolean> => {
    try {
        const success = await AuthService.register(name, email, password);
        if (success) {
        navigate("/login"); // redireciona manualmente
        }
        return success;
    } catch (error) {
        console.error("Registration failed:", error);
        return false;
    }
    };




    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
