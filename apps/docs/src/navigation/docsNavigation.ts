import { NavSection } from "./types";

export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { id: "overview", title: "Overview", path: "#/overview" },
      { id: "installation", title: "Installation", path: "#/installation" },
      { id: "quick-start", title: "Quick Start", path: "#/quick-start" },
    ],
  },
  {
    title: "Foundations & Theming",
    items: [
      { id: "tokens", title: "Design Tokens", path: "#/tokens" },
      { id: "colors", title: "Colors & Palettes", path: "#/colors" },
      { id: "theming", title: "ThemeProvider & useTheme", path: "#/theming" },
    ],
  },
  {
    title: "Form Controls",
    items: [
      { id: "button", title: "Button", path: "#/components/button", status: "stable" },
      { id: "button-group", title: "ButtonGroup", path: "#/components/button-group", status: "stable" },
      { id: "input", title: "Input & TextField", path: "#/components/input", status: "stable" },
      { id: "textarea", title: "Textarea", path: "#/components/textarea", status: "stable" },
      { id: "form-field", title: "FormField", path: "#/components/form-field", status: "stable" },
      { id: "checkbox", title: "Checkbox", path: "#/components/checkbox", status: "stable" },
      { id: "radio", title: "Radio", path: "#/components/radio", status: "stable" },
      { id: "switch", title: "Switch", path: "#/components/switch", status: "stable" },
    ],
  },
  {
    title: "Surfaces & Data Display",
    items: [
      { id: "paper", title: "Paper", path: "#/components/paper", status: "stable" },
      { id: "card", title: "Card", path: "#/components/card", status: "stable" },
      { id: "typography", title: "Typography", path: "#/components/typography", status: "stable" },
      { id: "kbd", title: "Kbd", path: "#/components/kbd", status: "stable" },
    ],
  },
  {
    title: "Layout Primitives",
    items: [
      { id: "box", title: "Box", path: "#/components/box", status: "stable" },
      { id: "container", title: "Container", path: "#/components/container", status: "stable" },
      { id: "divider", title: "Divider", path: "#/components/divider", status: "stable" },
      { id: "stack", title: "Stack", path: "#/components/stack", status: "stable" },
      { id: "flex", title: "Flex", path: "#/components/flex", status: "stable" },
      { id: "grid", title: "Grid", path: "#/components/grid", status: "stable" },
    ],
  },
  {
    title: "Advanced Guides",
    items: [
      { id: "as-child", title: "Polymorphism (asChild)", path: "#/guides/as-child" },
      { id: "accessibility", title: "Accessibility Standards", path: "#/guides/accessibility" },
    ],
  },
  {
    title: "Resources",
    items: [{ id: "changelog", title: "Changelog & Releases", path: "#/changelog" }],
  },
];
