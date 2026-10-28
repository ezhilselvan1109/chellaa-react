import * as fs from "node:fs";
import * as path from "node:path";

console.log("[Directive Benchmark] Validating Next.js App Router directive prologue across all distribution entries...");

const distDir = path.resolve("../../packages/react/dist");

const indexMjsPath = path.join(distDir, "index.mjs");
const indexNodeMjsPath = path.join(distDir, "index.node.mjs");
const indexCjsPath = path.join(distDir, "index.cjs");

// 1. Validate dist/index.mjs (Browser / Bundler entry)
if (!fs.existsSync(indexMjsPath)) {
  throw new Error(`Missing mandatory file: ${indexMjsPath}`);
}
const mjsContent = fs.readFileSync(indexMjsPath, "utf-8");
const mjsLines = mjsContent.split("\n").map((l) => l.trim());

if (mjsLines[0] !== '"use client";') {
  throw new Error(
    `[Directive Defect] dist/index.mjs does NOT begin with '"use client";' in the directive prologue. Line 1: "${mjsLines[0]}"`
  );
}
if (!mjsLines[1].startsWith('import "./styles.css";')) {
  throw new Error(
    `[Styling Defect] dist/index.mjs line 2 must deliver styles.css automatically. Line 2: "${mjsLines[1]}"`
  );
}
console.log("  ✓ dist/index.mjs: Line 1 '\"use client\";', Line 2 'import \"./styles.css\";'");

// 2. Validate dist/index.node.mjs (Node / RSC server entry)
if (!fs.existsSync(indexNodeMjsPath)) {
  throw new Error(`Missing mandatory file: ${indexNodeMjsPath}`);
}
const nodeContent = fs.readFileSync(indexNodeMjsPath, "utf-8");
const nodeLines = nodeContent.split("\n").map((l) => l.trim());

if (nodeLines[0] !== '"use client";') {
  throw new Error(
    `[Directive Defect] dist/index.node.mjs does NOT begin with '"use client";' in the directive prologue. Line 1: "${nodeLines[0]}"`
  );
}
if (nodeContent.includes('.css"')) {
  throw new Error(
    `[SSR Node Defect] dist/index.node.mjs must NOT contain CSS imports (would cause Node runtime syntax error).`
  );
}
console.log("  ✓ dist/index.node.mjs: Line 1 '\"use client\";', zero CSS side-effect imports");

// 3. Validate dist/index.cjs (CommonJS entry)
if (!fs.existsSync(indexCjsPath)) {
  throw new Error(`Missing mandatory file: ${indexCjsPath}`);
}
const cjsContent = fs.readFileSync(indexCjsPath, "utf-8");
const cjsLines = cjsContent.split("\n").map((l) => l.trim());

if (cjsLines[0] !== '"use client";') {
  throw new Error(
    `[Directive Defect] dist/index.cjs does NOT begin with '"use client";' in the directive prologue. Line 1: "${cjsLines[0]}"`
  );
}
console.log("  ✓ dist/index.cjs: Line 1 '\"use client\";'");

console.log("[Directive Benchmark] PASSED: All package distribution entry points strictly conform to React Server Components & Next.js App Router directive prologue rules.");
