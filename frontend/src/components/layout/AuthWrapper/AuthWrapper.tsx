import { useAuth } from "@/contexts/auth.context";
import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";


export const AuthWrapper = (): JSX.Element => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    return <Outlet />;
};
