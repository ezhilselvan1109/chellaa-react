const { ThemeProvider, useTheme, createTheme, ThemeScript } = require("@chellaa/react");

console.log("[Benchmark Node CJS] Testing CommonJS require...");

if (typeof ThemeProvider !== "function") {
  throw new Error("ThemeProvider is not a function in CJS");
}
if (typeof useTheme !== "function") {
  throw new Error("useTheme is not a function in CJS");
}
if (typeof createTheme !== "function") {
  throw new Error("createTheme is not a function in CJS");
}
if (typeof ThemeScript !== "function") {
  throw new Error("ThemeScript is not a function in CJS");
}

console.log("[Benchmark Node CJS] PASSED: CommonJS require succeeded without CSS syntax errors.");
