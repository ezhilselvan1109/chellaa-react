import { execSync } from "node:child_process";

console.log("=================================================");
console.log("CHELLAA REACT — CONSUMER FIREWALL & BENCHMARK SUITE");
console.log("=================================================");

function runStep(name, cmd) {
  process.stdout.write(`Testing: ${name}... `);
  try {
    const output = execSync(cmd, { stdio: "pipe" }).toString();
    console.log("PASSED");
    return { name, pass: true, output };
  } catch (err) {
    console.log("FAILED");
    console.error(err.stderr ? err.stderr.toString() : err.message);
    return { name, pass: false, error: err.message };
  }
}

const results = [
  runStep("Node ESM Resolution", "node benchmark-node-esm.mjs"),
  runStep("Node CommonJS Require", "node benchmark-node-cjs.cjs"),
  runStep("Server-Side Rendering (SSR)", "node benchmark-ssr.mjs"),
  runStep("CSS Stylesheet Integrity", "node benchmark-css.mjs"),
  runStep("NPM Package Archive Integrity", "node benchmark-pack.mjs"),
];

const allPassed = results.every((r) => r.pass);

console.log("=================================================");
if (allPassed) {
  console.log("ALL BENCHMARK GATES PASSED (5/5)");
  process.exit(0);
} else {
  console.error("SOME BENCHMARK GATES FAILED");
  process.exit(1);
}
