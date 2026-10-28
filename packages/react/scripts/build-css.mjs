import * as fs from "node:fs";
import * as path from "node:path";
import { bundle } from "lightningcss";

const srcFile = path.resolve("src/styles/index.css");
const distDir = path.resolve("dist");
const distFile = path.resolve("dist/styles.css");
const dtsFile = path.resolve("dist/styles.css.d.ts");
const dctsFile = path.resolve("dist/styles.css.d.cts");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

try {
  const result = bundle({
    filename: srcFile,
    minify: true,
  });

  fs.writeFileSync(distFile, result.code);
  console.log(`[LightningCSS] Compiled ${distFile} (${result.code.length} bytes)`);
} catch (err) {
  console.error("[LightningCSS] Compilation failed:", err);
  if (fs.existsSync(path.resolve("dist/index.css"))) {
    fs.copyFileSync(path.resolve("dist/index.css"), distFile);
    console.log(`[Fallback] Copied dist/index.css to ${distFile}`);
  } else {
    process.exit(1);
  }
}

// Emit type declarations for CSS export
const cssDtsContent = `declare const styles: string;\nexport default styles;\n`;
fs.writeFileSync(dtsFile, cssDtsContent);
fs.writeFileSync(dctsFile, cssDtsContent);
console.log(`[TypeScript] Emitted ${dtsFile} and ${dctsFile}`);

// Zero-Configuration Styling & Next.js App Router Directive Delivery:
// 1. Ensure dist/index.mjs starts with `"use client";` directive prologue followed by `import "./styles.css";` for browser bundlers.
// 2. Ensure dist/index.node.mjs starts with `"use client";` without CSS imports for Node.js / RSC server runtimes.
// 3. Ensure dist/index.cjs starts with `"use client";` for CommonJS consumers.
const indexMjsPath = path.resolve("dist/index.mjs");
const indexNodeMjsPath = path.resolve("dist/index.node.mjs");
const indexCjsPath = path.resolve("dist/index.cjs");

function cleanDirectivesAndCss(code) {
  return code
    .replace(/^\s*(['"])use client\1;?\s*\n?/m, "")
    .replace(/^import\s+['"][^'"]+\.css['"];?\s*\n?/gm, "");
}

if (fs.existsSync(indexMjsPath)) {
  const originalMjs = fs.readFileSync(indexMjsPath, "utf-8");
  const cleanMjs = cleanDirectivesAndCss(originalMjs);

  // 1. Browser/Bundler version with "use client" in directive prologue followed by CSS delivery
  const codeWithCss = `"use client";\nimport "./styles.css";\n` + cleanMjs;
  fs.writeFileSync(indexMjsPath, codeWithCss, "utf-8");
  console.log(`[Zero-Config] Injected "use client" + styles.css into ${indexMjsPath} for Browser/Bundlers`);

  // 2. Clean Node/RSC version with "use client" but without CSS side-effect imports
  const codeWithoutCss = `"use client";\n` + cleanMjs;
  fs.writeFileSync(indexNodeMjsPath, codeWithoutCss, "utf-8");
  console.log(`[Zero-Config] Emitted ${indexNodeMjsPath} with "use client" for Node.js / RSC runtime`);
}

if (fs.existsSync(indexCjsPath)) {
  const originalCjs = fs.readFileSync(indexCjsPath, "utf-8");
  const cleanCjs = originalCjs.replace(/^\s*(['"])use client\1;?\s*\n?/m, "");
  const cjsWithDirective = `"use client";\n` + cleanCjs;
  fs.writeFileSync(indexCjsPath, cjsWithDirective, "utf-8");
  console.log(`[Zero-Config] Injected "use client" into ${indexCjsPath} for CommonJS`);
}

