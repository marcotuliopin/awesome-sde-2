import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react(), tsconfigPaths()],
    server: {
        port: 3000,
    },
});
