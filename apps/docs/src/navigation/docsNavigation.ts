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
    title: "Foundations",
    items: [
      { id: "tokens", title: "Design Tokens", path: "#/tokens" },
      { id: "colors", title: "Colors & Palettes", path: "#/colors" },
    ],
  },
  {
    title: "Theming",
    items: [
      { id: "theming", title: "ThemeProvider & useTheme", path: "#/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      {
        id: "button",
        title: "Button",
        path: "#/components/button",
        status: "stable",
      },
      {
        id: "button-group",
        title: "ButtonGroup",
        path: "#/components/button-group",
        status: "stable",
      },
    ],
  },
  {
    title: "Advanced Guides",
    items: [
      {
        id: "as-child",
        title: "Polymorphism (asChild)",
        path: "#/guides/as-child",
      },
      {
        id: "accessibility",
        title: "Accessibility Standards",
        path: "#/guides/accessibility",
      },
    ],
  },
  {
    title: "Resources",
    items: [{ id: "changelog", title: "Changelog", path: "#/changelog" }],
  },
];
