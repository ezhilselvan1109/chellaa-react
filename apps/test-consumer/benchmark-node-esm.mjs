import {
  ThemeProvider,
  useTheme,
  createTheme,
  ThemeScript,
  Button,
  ButtonGroup,
} from "@chellaa/react";

console.log("[Benchmark Node ESM] Testing module resolution...");

if (typeof ThemeProvider !== "function") {
  throw new Error("ThemeProvider is not a function in ESM");
}
if (typeof useTheme !== "function") {
  throw new Error("useTheme is not a function in ESM");
}
if (typeof createTheme !== "function") {
  throw new Error("createTheme is not a function in ESM");
}
if (typeof ThemeScript !== "function") {
  throw new Error("ThemeScript is not a function in ESM");
}
if (typeof Button !== "object" && typeof Button !== "function") {
  throw new Error("Button is not a valid component in ESM");
}
if (typeof ButtonGroup !== "object" && typeof ButtonGroup !== "function") {
  throw new Error("ButtonGroup is not a valid component in ESM");
}

console.log(
  "[Benchmark Node ESM] PASSED: All public symbols imported cleanly in Node ESM.",
);
