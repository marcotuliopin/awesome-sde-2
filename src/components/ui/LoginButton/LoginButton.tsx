import { useAuth } from "@/contexts/auth.context";
import type { JSX } from "react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const LoginButton = (): JSX.Element => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const clickHandler = (): void => {
        if (isAuthenticated) {
            logout();
            return;
        }
        navigate("/login");
    };

    return (
        <button
            onClick={clickHandler}
            className="h-full w-8 align-middle justify-center"
            data-testid="header-login-button"
        >
            <CiUser className="h-full w-full hover:scale-110 transition-all duration-200 hover:cursor-pointer dark:text-gray-100 text-gray-800" />
        </button>
    );
};
