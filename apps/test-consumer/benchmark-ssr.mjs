import React from "react";
import { renderToString } from "react-dom/server";
import {
  ThemeProvider,
  ThemeScript,
  Button,
  ButtonGroup,
  Input,
  Textarea,
  FormField,
  FormLabel,
  FormHelperText,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Paper,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardActions,
  Typography,
  Heading,
  Text,
  Paragraph,
  Code,
  Kbd,
} from "@chellaa/react";

console.log("[Benchmark SSR] Testing Server-Side Rendering across all 12 migrated components...");

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
        React.createElement("div", null, "SSR Consumer App"),

        // 1. Button & ButtonGroup
        React.createElement(
          ButtonGroup,
          { isAttached: true },
          React.createElement(Button, { variant: "solid" }, "Save"),
          React.createElement(Button, { variant: "outline" }, "Cancel"),
        ),

        // 2. FormField & Input
        React.createElement(
          FormField,
          { id: "ssr-field" },
          React.createElement(FormLabel, null, "Email Address"),
          React.createElement(Input, { placeholder: "name@company.com" }),
          React.createElement(FormHelperText, null, "We never share your email."),
        ),

        // 3. Textarea
        React.createElement(Textarea, { placeholder: "Comments...", rows: 3 }),

        // 4. Checkbox & CheckboxGroup
        React.createElement(
          CheckboxGroup,
          { defaultValue: ["terms"] },
          React.createElement(Checkbox, { value: "terms" }, "I agree to terms"),
        ),

        // 5. Radio & RadioGroup
        React.createElement(
          RadioGroup,
          { defaultValue: "opt1" },
          React.createElement(Radio, { value: "opt1" }, "Option 1"),
        ),

        // 6. Switch
        React.createElement(Switch, { defaultChecked: true }, "Enable telemetry"),

        // 7. Paper
        React.createElement(
          Paper,
          { elevation: 3 },
          React.createElement("span", null, "Elevated Paper Surface"),
        ),

        // 8. Card Compound
        React.createElement(
          Card,
          { variant: "elevated", elevation: 2 },
          React.createElement(CardHeader, { title: "SSR Card", subheader: "Subtitle" }),
          React.createElement(CardBody, null, React.createElement(Text, null, "Card Body")),
          React.createElement(CardFooter, { divider: true }, React.createElement(Text, null, "Footer")),
          React.createElement(CardActions, null, React.createElement(Button, { size: "sm" }, "Action")),
        ),

        // 9. Typography, Heading, Paragraph, Code
        React.createElement(Heading, { level: 1 }, "Page Title"),
        React.createElement(
          Paragraph,
          null,
          "Prose text with ",
          React.createElement(Code, { colorScheme: "primary" }, "npm install"),
        ),
        React.createElement(Typography, { variant: "caption" }, "Caption note"),

        // 10. Kbd
        React.createElement(Kbd, { modifier: "command" }),
        React.createElement(Kbd, null, "K"),
      ),
    ),
  );
}

const html = renderToString(React.createElement(App));

const mandatoryAssertions = [
  { name: "SSR Root text", check: html.includes("SSR Consumer App") },
  { name: "ThemeScript", check: html.includes("demo-key") },
  { name: "Button class (cl-button)", check: html.includes("cl-button") },
  { name: "ButtonGroup class (cl-button-group)", check: html.includes("cl-button-group") },
  { name: "Input class (cl-input)", check: html.includes("cl-input") },
  { name: "FormField class (cl-form-field)", check: html.includes("cl-form-field") },
  { name: "Textarea class (cl-textarea)", check: html.includes("cl-textarea") },
  { name: "Checkbox class (cl-checkbox)", check: html.includes("cl-checkbox") },
  { name: "Radio class (cl-radio)", check: html.includes("cl-radio") },
  { name: "Switch class (cl-switch)", check: html.includes("cl-switch") },
  { name: "Paper class (cl-paper)", check: html.includes("cl-paper") },
  { name: "Card class (cl-card)", check: html.includes("cl-card") },
  { name: "Typography class (cl-typography)", check: html.includes("cl-typography") },
  { name: "Code class (cl-code)", check: html.includes("cl-code") },
  { name: "Kbd class (cl-kbd)", check: html.includes("cl-kbd") },
];

for (const assertion of mandatoryAssertions) {
  if (!assertion.check) {
    throw new Error(`SSR verification failed for: ${assertion.name}`);
  }
}

console.log(
  `[Benchmark SSR] PASSED: SSR renderToString rendered all 12 components (${mandatoryAssertions.length} static class assertions verified) with zero errors and zero window access.`,
);
