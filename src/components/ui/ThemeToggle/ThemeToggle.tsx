import type { JSX } from "react";

export const ThemeToggle = (): JSX.Element => {
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    };

    return (
        <button
            className="p-2 bg-gray-800 text-white rounded"
            onClick={toggleTheme}
        >
            Toggle Theme
        </button>
    );
}