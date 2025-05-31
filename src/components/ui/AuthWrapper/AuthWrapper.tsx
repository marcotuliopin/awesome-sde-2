import type { FC, ReactNode } from "react";
import { AuthModal } from "../AuthModal";

interface AuthWrapperProps {
    children: ReactNode;
}

export const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
    const isAuthenticated = false;

    if (!isAuthenticated) return <AuthModal />;
    return <>{children}</>;
};
