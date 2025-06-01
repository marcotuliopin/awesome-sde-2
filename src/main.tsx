import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { Root } from "@/routes/root/Root";
import { Login } from "@/routes/login/Login";
import { Register } from "@/routes/register/Register";
import "./index.css";
import { AuthWrapper } from "./components/layout/AuthWrapper";
import { ThemeProvider } from "./contexts/theme.context";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <AuthWrapper />,
                children: [
                    {
                        index: true,
                        element: <Root />,
                    },
                ],
            },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>
);
