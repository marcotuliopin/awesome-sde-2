import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme.context";
import { RootLayout } from "@components/layout/RootLayout";
import { Root } from "@routes/root";
import { Login } from "@routes/login";
import "./index.css";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />, 
        children: [
            { index: true, element: <Root /> },
            { path: "/login", element: <Login /> },
        ]
    }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>
);
