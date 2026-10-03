import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: true,
  target: "es2022",
  external: ["react", "react-dom"],
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
    };
  },
});
