import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react(), tsconfigPaths()],
    server: {
        port: 3030,
    },
    preview: {
        port: 3030,
    },
});
