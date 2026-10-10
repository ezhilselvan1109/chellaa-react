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
  // Layout Primitives (Workflow F3)
  Box,
  Container,
  Divider,
  Stack,
  Flex,
  Grid,
  Alert,
  Snackbar,
  Avatar,
  AvatarGroup,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  // 19. Navigation Primitives (Wave 3)
  Tabs,
} from "@chellaa/react";

console.log("[Benchmark SSR] Testing Server-Side Rendering across all 18 library components...");

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

        // 11. Container & Box
        React.createElement(
          Container,
          { maxWidth: "md" },
          React.createElement(Box, { component: "section", sx: { p: 2 } }, "Box content inside container"),
        ),

        // 12. Stack with Divider
        React.createElement(
          Stack,
          { direction: "column", spacing: 2, divider: React.createElement(Divider, null) },
          React.createElement("div", null, "Stack Item 1"),
          React.createElement("div", null, "Stack Item 2"),
        ),

        // 13. Flex
        React.createElement(
          Flex,
          { center: true, gap: 3 },
          React.createElement("span", null, "Centered Item 1"),
          React.createElement("span", null, "Centered Item 2"),
        ),

        // 14. Grid
        React.createElement(
          Grid,
          { container: true, spacing: 2 },
          React.createElement(Grid, { item: true, xs: 6 }, "Grid Column A"),
          React.createElement(Grid, { item: true, xs: 6 }, "Grid Column B"),
        ),

        // 15. Alert (Wave 2B)
        React.createElement(
          Alert,
          { status: "warning", variant: "subtle" },
          React.createElement(Alert.Icon),
          React.createElement(
            Alert.Body,
            null,
            React.createElement(Alert.Title, null, "SSR Alert Title"),
            React.createElement(Alert.Description, null, "SSR Alert Description"),
          ),
          React.createElement(Alert.CloseButton),
        ),

        // 16. Snackbar (Wave 2B) - portaled notification, SSR safe
        React.createElement(Snackbar, {
          isOpen: true,
          message: "SSR Snackbar Notification",
          status: "info",
        }),

        // 17. Visual Data Display & Identity (Wave 3)
        React.createElement(
          AvatarGroup,
          { max: 2 },
          React.createElement(Avatar, { name: "Ezhil Selvan" }),
          React.createElement(Avatar, { name: "Sarah Connor" }),
          React.createElement(Avatar, { name: "John Doe" }),
        ),

        // 18. Disclosure & Accordion (Wave 3)
        React.createElement(
          Accordion,
          { type: "single", defaultValue: "faq-1", collapsible: true },
          React.createElement(
            AccordionItem,
            { value: "faq-1" },
            React.createElement(
              AccordionHeader,
              null,
              React.createElement(AccordionTrigger, null, "FAQ Question 1", React.createElement(AccordionIcon, null)),
            ),
            React.createElement(AccordionContent, null, "FAQ Answer 1"),
          ),
        ),

        // 19. Navigation & Tabs (Wave 3)
        React.createElement(
          Tabs,
          { defaultValue: "tab-1" },
          React.createElement(
            Tabs.List,
            { "aria-label": "SSR Tabs" },
            React.createElement(Tabs.Trigger, { value: "tab-1" }, "Tab 1"),
            React.createElement(Tabs.Trigger, { value: "tab-2" }, "Tab 2"),
          ),
          React.createElement(Tabs.Content, { value: "tab-1" }, "Tab 1 Content"),
          React.createElement(Tabs.Content, { value: "tab-2" }, "Tab 2 Content"),
        ),
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
  // Layout Primitives
  { name: "Container class (cl-container)", check: html.includes("cl-container") },
  { name: "Box class (cl-box)", check: html.includes("cl-box") },
  { name: "Stack class (cl-stack)", check: html.includes("cl-stack") },
  { name: "Divider class (cl-divider)", check: html.includes("cl-divider") },
  { name: "Flex class (cl-flex)", check: html.includes("cl-flex") },
  { name: "Grid class (cl-grid)", check: html.includes("cl-grid") },
  // Feedback & Alert (Wave 2B)
  { name: "Alert class (cl-alert)", check: html.includes("cl-alert") },
  { name: "Alert icon class (cl-alert__icon)", check: html.includes("cl-alert__icon") },
  { name: "Alert title class (cl-alert__title)", check: html.includes("cl-alert__title") },
  // Identity & Avatar (Wave 3)
  { name: "Avatar class (cl-avatar)", check: html.includes("cl-avatar") },
  { name: "AvatarGroup class (cl-avatar-group)", check: html.includes("cl-avatar-group") },
  { name: "Avatar initials (ES)", check: html.includes("ES") },
  { name: "AvatarGroup excess (+1)", check: html.includes("+1") },
  // Disclosure & Accordion (Wave 3)
  { name: "Accordion class (cl-accordion)", check: html.includes("cl-accordion") },
  { name: "Accordion item class (cl-accordion__item)", check: html.includes("cl-accordion__item") },
  { name: "Accordion trigger class (cl-accordion__trigger)", check: html.includes("cl-accordion__trigger") },
  { name: "Accordion content class (cl-accordion__content)", check: html.includes("cl-accordion__content") },
  { name: "Accordion inner class (cl-accordion__inner)", check: html.includes("cl-accordion__inner") },
  { name: "Accordion icon class (cl-accordion__icon)", check: html.includes("cl-accordion__icon") },
  // Navigation & Tabs (Wave 3)
  { name: "Tabs class (cl-tabs)", check: html.includes("cl-tabs") },
  { name: "Tabs list class (cl-tabs__list)", check: html.includes("cl-tabs__list") },
  { name: "Tabs trigger class (cl-tabs__trigger)", check: html.includes("cl-tabs__trigger") },
  { name: "Tabs content class (cl-tabs__content)", check: html.includes("cl-tabs__content") },
];

for (const assertion of mandatoryAssertions) {
  if (!assertion.check) {
    throw new Error(`SSR verification failed for: ${assertion.name}`);
  }
}

console.log(
  `[Benchmark SSR] PASSED: SSR renderToString rendered all components including Alert, Snackbar, Avatar, Accordion, and Tabs (${mandatoryAssertions.length} static class assertions verified) with zero errors and zero window access.`,
);
