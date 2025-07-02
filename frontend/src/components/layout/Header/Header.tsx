import { LoginButton } from "@/components/ui/LoginButton/LoginButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/contexts/auth.context";
import { PROJECT_NAME } from "@/utils/constants";
import type { JSX } from "react";
import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
    const { isAuthenticated, user } = useAuth();

    return (
        <header className="flex items-center justify-between p-4 pr-6 md:pr-12 bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 from-gray-100 to-gray-200 text-white shadow-lg transition-colors duration-500">
            <Link
                to="/"
                className="text-lg font-bold tracking-wide dark:text-white text-black"
            >
                {PROJECT_NAME}
            </Link>
            <nav className="flex items-center">
                <ul className="flex items-center space-x-4">
                    <li>
                        {isAuthenticated && (
                            <div
                                className="text-black dark:text-white"
                                data-testid="user-greeting"
                            >
                                Hello, <strong>{user ? user.name : "User"}</strong>
                            </div>
                        )}
                    </li>
                    <li>
                        <LoginButton />
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
