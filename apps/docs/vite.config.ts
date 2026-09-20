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
      "@chellaa/react": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
      "@chella-ui/react": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
      react: path.resolve(__dirname, "../../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../../node_modules/react-dom"),
      "react-router-dom": path.resolve(__dirname, "../../node_modules/react-router-dom"),
      "react-router": path.resolve(__dirname, "../../node_modules/react-router"),
      "@remix-run/router": path.resolve(__dirname, "../../node_modules/@remix-run/router"),
    },
  },
});
