import { useTheme } from "@/contexts/ThemeContext";
import type { JSX } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeToggle = (): JSX.Element => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                       text-gray-600 dark:text-white transform hover:scale-105 
                       transition-all duration-300 ease-in-out shadow-md"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? (
                <FaSun
                    size={16}
                    className="transition-transform duration-300 ease-in-out"
                />
            ) : (
                <FaMoon
                    size={16}
                    className="transition-transform duration-300 ease-in-out"
                />
            )}
        </button>
    );
};
