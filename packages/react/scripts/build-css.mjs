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

// Zero-Configuration Styling Delivery Automation (ADR-007):
// 1. Create dist/index.node.mjs without CSS imports for pure Node.js runtime.
// 2. Ensure dist/index.mjs has `import "./styles.css";` at the top for browser bundlers.
const indexMjsPath = path.resolve("dist/index.mjs");
const indexNodeMjsPath = path.resolve("dist/index.node.mjs");

if (fs.existsSync(indexMjsPath)) {
  const originalCode = fs.readFileSync(indexMjsPath, "utf-8");
  // Clean Node version without CSS side-effect imports
  const codeWithoutCss = originalCode.replace(/^import\s+['"][^'"]+\.css['"];?\s*\n?/gm, "");
  fs.writeFileSync(indexNodeMjsPath, codeWithoutCss, "utf-8");
  console.log(`[Zero-Config] Emitted ${indexNodeMjsPath} for Node.js runtime`);

  // Browser/Bundler version with automatic CSS delivery
  const codeWithCss = `import "./styles.css";\n` + codeWithoutCss;
  fs.writeFileSync(indexMjsPath, codeWithCss, "utf-8");
  console.log(`[Zero-Config] Injected styles.css into ${indexMjsPath} for Browser/Bundlers`);
}
