import * as fs from "node:fs";
import * as path from "node:path";

console.log("[Benchmark CSS] Inspecting compiled distribution stylesheets...");

const stylesCssPath = path.resolve("../../packages/react/dist/styles.css");
const indexCssPath = path.resolve("../../packages/react/dist/index.css");

if (!fs.existsSync(stylesCssPath)) {
  throw new Error("dist/styles.css does not exist");
}
if (!fs.existsSync(indexCssPath)) {
  throw new Error("dist/index.css does not exist");
}

const stylesCss = fs.readFileSync(stylesCssPath, "utf-8");
const indexCss = fs.readFileSync(indexCssPath, "utf-8");

if (!stylesCss.includes("cl-tokens") && !indexCss.includes("cl-tokens")) {
  throw new Error("CSS missing cl-tokens layer");
}
if (!stylesCss.includes("cl-theme") && !indexCss.includes("cl-theme")) {
  throw new Error("CSS missing cl-theme layer");
}
if (!stylesCss.includes("cl-reset") && !indexCss.includes("cl-reset")) {
  throw new Error("CSS missing cl-reset layer");
}
if (!stylesCss.includes("--cl-color-primary-base") && !indexCss.includes("--cl-color-primary-base")) {
  throw new Error("CSS missing semantic primary token");
}
if (!stylesCss.includes("prefers-reduced-motion") && !indexCss.includes("prefers-reduced-motion")) {
  throw new Error("CSS missing prefers-reduced-motion accessibility rule");
}
if (!stylesCss.includes("cl-button") && !indexCss.includes("cl-button")) {
  throw new Error("CSS missing cl-button component class");
}
if (!stylesCss.includes("cl-button-group") && !indexCss.includes("cl-button-group")) {
  throw new Error("CSS missing cl-button-group component class");
}

console.log("[Benchmark CSS] PASSED: Stylesheets contain all verified cascade layers, semantic tokens, and a11y rules.");
