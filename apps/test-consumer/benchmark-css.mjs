import * as fs from "node:fs";
import * as path from "node:path";

console.log("[Benchmark CSS] Inspecting compiled distribution stylesheets for all 12 migrated components...");

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

const combined = stylesCss + "\n" + indexCss;

const mandatoryRules = [
  // 1. Cascade Layers
  { name: "Layer: cl-reset", check: combined.includes("cl-reset") },
  { name: "Layer: cl-tokens", check: combined.includes("cl-tokens") },
  { name: "Layer: cl-theme", check: combined.includes("cl-theme") },
  { name: "Layer: cl-components", check: combined.includes("cl-components") },

  // 2. Core Tokens
  { name: "Token: --cl-color-primary-base", check: combined.includes("--cl-color-primary-base") },
  { name: "Token: --cl-color-bg-canvas", check: combined.includes("--cl-color-bg-canvas") },
  { name: "Token: --cl-color-border-subtle", check: combined.includes("--cl-color-border-subtle") },

  // 3. Accessibility
  { name: "A11y: prefers-reduced-motion", check: combined.includes("prefers-reduced-motion") },

  // 4. Baseline (Button & ButtonGroup)
  { name: "Class: cl-button", check: combined.includes("cl-button") },
  { name: "Class: cl-button-group", check: combined.includes("cl-button-group") },

  // 5. Form Controls (Workflow F1)
  { name: "Class: cl-input", check: combined.includes("cl-input") },
  { name: "Class: cl-textarea", check: combined.includes("cl-textarea") },
  { name: "Class: cl-form-field", check: combined.includes("cl-form-field") },
  { name: "Class: cl-checkbox", check: combined.includes("cl-checkbox") },
  { name: "Class: cl-radio", check: combined.includes("cl-radio") },
  { name: "Class: cl-switch", check: combined.includes("cl-switch") },

  // 6. Surfaces & Data Display (Workflow F2)
  { name: "Class: cl-paper", check: combined.includes("cl-paper") },
  { name: "Class: cl-card", check: combined.includes("cl-card") },
  { name: "Class: cl-card__header", check: combined.includes("cl-card__header") },
  { name: "Class: cl-card__body", check: combined.includes("cl-card__body") },
  { name: "Class: cl-card__footer", check: combined.includes("cl-card__footer") },
  { name: "Class: cl-card__actions", check: combined.includes("cl-card__actions") },
  { name: "Class: cl-typography", check: combined.includes("cl-typography") },
  { name: "Class: cl-code", check: combined.includes("cl-code") },
  { name: "Class: cl-kbd", check: combined.includes("cl-kbd") },
];

for (const rule of mandatoryRules) {
  if (!rule.check) {
    throw new Error(`CSS Stylesheet verification failed for: ${rule.name}`);
  }
}

console.log(
  `[Benchmark CSS] PASSED: Stylesheets contain all ${mandatoryRules.length} verified cascade layers, semantic tokens, a11y rules, and static component classes.`,
);
