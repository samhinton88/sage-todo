import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ✅ Enables global `expect`
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // ✅ Add a setup file
  },
  define: { global: "window" },
});
