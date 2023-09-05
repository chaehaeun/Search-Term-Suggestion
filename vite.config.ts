import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    cors: true,
  },
});
