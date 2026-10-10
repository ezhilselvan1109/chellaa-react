#!/usr/bin/env node

/**
 * Unified Vercel Build Script for Chellaa React Monorepo
 *
 * Compiles:
 * 1. @chellaa/react (Core package)
 * 2. @chellaa/docs (Documentation portal -> deployed at /)
 * 3. @chellaa/playground (Component sandbox -> deployed at /playground/)
 * 4. @chellaa/storybook (Visual storybook -> deployed at /storybook/)
 *
 * Bundles everything into a single unified root `dist/` directory for Vercel.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const distDir = path.join(rootDir, "dist");
const docsDist = path.join(rootDir, "apps", "docs", "dist");
const playgroundDist = path.join(rootDir, "apps", "playground", "dist");
const storybookDist = path.join(rootDir, "apps", "storybook", "dist");

function run(command, cwd = rootDir) {
  console.log(`\n🚀 Running: ${command} in ${cwd}`);
  execSync(command, {
    cwd,
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
      VERCEL: "1",
    },
  });
}

console.log("=========================================");
console.log("  Building Chellaa React Unified Bundle  ");
console.log("=========================================");

// 1. Build core React package
console.log("\n[1/4] Building @chellaa/react...");
run("pnpm --filter @chellaa/react build");

// 2. Build Documentation App (at /)
console.log("\n[2/4] Building @chellaa/docs...");
run("pnpm --filter @chellaa/docs build");

// 3. Build Playground App (at /playground/)
console.log("\n[3/4] Building @chellaa/playground...");
run("pnpm --filter @chellaa/playground build");

// 4. Build Storybook (at /storybook/)
console.log("\n[4/4] Building @chellaa/storybook...");
run("pnpm --filter @chellaa/storybook build");

// 5. Assemble unified output
console.log("\n[5/5] Assembling unified distribution folder...");
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy docs to root
console.log(" -> Copying Docs to dist/ (root)...");
fs.cpSync(docsDist, distDir, { recursive: true });

// Copy playground to dist/playground
console.log(" -> Copying Playground to dist/playground/...");
const targetPlayground = path.join(distDir, "playground");
fs.mkdirSync(targetPlayground, { recursive: true });
fs.cpSync(playgroundDist, targetPlayground, { recursive: true });

// Copy storybook to dist/storybook
console.log(" -> Copying Storybook to dist/storybook/...");
const targetStorybook = path.join(distDir, "storybook");
fs.mkdirSync(targetStorybook, { recursive: true });
fs.cpSync(storybookDist, targetStorybook, { recursive: true });

console.log("\n=========================================");
console.log("✅ Unified build complete!");
console.log("   - Docs:       dist/index.html (/)");
console.log("   - Playground: dist/playground/index.html (/playground/)");
console.log("   - Storybook:  dist/storybook/index.html (/storybook/)");
console.log("=========================================\n");
