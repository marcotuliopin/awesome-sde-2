import { Outlet } from "react-router-dom";
import { Header } from "@components/layout/Header";
import { useTheme } from "@/contexts/theme.context";
import type { JSX } from "react";
import { AuthProvider } from "@/contexts/auth.context";

export const RootLayout = (): JSX.Element => {
    const { theme } = useTheme();

    return (
        <AuthProvider>
            <div
                className={`${
                    theme === "dark" ? "dark" : ""
                } transition-colors duration-500 dark:bg-gray-900 bg-gray-100 min-h-screen`}
            >
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <Outlet />
                </main>
            </div>
        </AuthProvider>
    );
};
