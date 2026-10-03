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
