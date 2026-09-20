import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@chellaa/react": path.resolve(__dirname, "../../packages/ui/dist/index.js"),
      "@chella-ui/react": path.resolve(__dirname, "../../packages/ui/dist/index.js"),
    },
  },
});
