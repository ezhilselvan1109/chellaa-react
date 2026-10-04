import * as path from "node:path";
import { execSync } from "node:child_process";

console.log("[Benchmark Pack] Inspecting npm package tarball artifact...");

const packOutput = execSync("npm pack --dry-run --json", {
  cwd: path.resolve("../../packages/react"),
}).toString();

const packInfo = JSON.parse(packOutput)[0];

if (!packInfo.name || packInfo.name !== "@chellaa/react") {
  throw new Error(`Unexpected package name: ${packInfo.name}`);
}

const filePaths = packInfo.files.map((f) => f.path);

const mandatoryFiles = [
  "dist/index.mjs",
  "dist/index.cjs",
  "dist/index.d.ts",
  "dist/index.d.cts",
  "dist/styles.css",
  "styles.css",
  "styles.css.d.ts",
  "package.json",
  "README.md",
  "LICENSE",
];

for (const required of mandatoryFiles) {
  if (!filePaths.includes(required)) {
    throw new Error(`Mandatory file missing from package archive: ${required}`);
  }
}

// Ensure no test, story, or internal scratch files leaked into archive
for (const file of filePaths) {
  if (
    file.includes(".test.") ||
    file.includes(".stories.") ||
    file.includes("tsconfig") ||
    file.includes("src/")
  ) {
    throw new Error(`Prohibited file leaked into package archive: ${file}`);
  }
}

console.log(
  `[Benchmark Pack] PASSED: Verified package archive (${packInfo.entryCount} files, ${packInfo.size} bytes, clean distribution).`,
);
