import React from "react";
import { renderToString } from "react-dom/server";
import { ThemeProvider, ThemeScript, Button, ButtonGroup } from "@chellaa/react";

console.log("[Benchmark SSR] Testing Server-Side Rendering...");

function App() {
  return React.createElement(
    "html",
    null,
    React.createElement(
      "head",
      null,
      React.createElement(ThemeScript, {
        storageKey: "demo-key",
        defaultTheme: "dark",
      }),
    ),
    React.createElement(
      "body",
      null,
      React.createElement(
        ThemeProvider,
        { defaultTheme: "dark" },
        React.createElement("div", null, "SSR Content"),
        React.createElement(
          ButtonGroup,
          { isAttached: true },
          React.createElement(Button, { variant: "solid" }, "Save"),
          React.createElement(Button, { variant: "outline" }, "Cancel"),
        ),
      ),
    ),
  );
}

const html = renderToString(React.createElement(App));

if (!html.includes("SSR Content")) {
  throw new Error("SSR markup failed to render children");
}
if (!html.includes("demo-key")) {
  throw new Error("ThemeScript failed to render in SSR markup");
}
if (!html.includes("cl-button") || !html.includes("cl-button-group")) {
  throw new Error("Button and ButtonGroup failed to render in SSR markup");
}

console.log(
  "[Benchmark SSR] PASSED: SSR renderToString executed with zero errors and zero window access.",
);
