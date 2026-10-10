export interface SearchRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  path: string;
  keywords: string[];
}

export const searchIndex: SearchRecord[] = [
  {
    id: "overview",
    title: "Overview",
    category: "Getting Started",
    description:
      "Introduction to Chellaa React, design philosophy, and zero-config styling.",
    path: "/overview",
    keywords: [
      "intro",
      "overview",
      "philosophy",
      "zero config",
      "architecture",
    ],
  },
  {
    id: "installation",
    title: "Installation",
    category: "Getting Started",
    description:
      "Installing @chellaa/react via npm, pnpm, yarn, and bundler setup.",
    path: "/installation",
    keywords: ["install", "pnpm", "npm", "yarn", "setup", "dependencies"],
  },
  {
    id: "quick-start",
    title: "Quick Start",
    category: "Getting Started",
    description:
      "Fast-track code walkthrough rendering your first Chellaa React component.",
    path: "/quick-start",
    keywords: ["quickstart", "start", "tutorial", "hello world", "basic"],
  },
  {
    id: "tokens",
    title: "Design Tokens",
    category: "Foundations",
    description:
      "3-tier token architecture: primitive, semantic, and component CSS custom properties.",
    path: "/tokens",
    keywords: ["tokens", "css variables", "primitives", "semantic", "--cl-"],
  },
  {
    id: "colors",
    title: "Colors & Palettes",
    category: "Foundations",
    description:
      "Semantic color ramps: primary, secondary, neutral, success, warning, danger, and info.",
    path: "/colors",
    keywords: ["colors", "palette", "ramps", "primary", "danger", "neutral"],
  },
  {
    id: "theming",
    title: "ThemeProvider & useTheme",
    category: "Theming",
    description:
      "Theme context, light/dark/system mode switching, and ThemeScript zero-FOUC hydration.",
    path: "/theming",
    keywords: [
      "theme",
      "themeprovider",
      "dark mode",
      "light mode",
      "fouc",
      "themescript",
    ],
  },
  {
    id: "button",
    title: "Button Component",
    category: "Components",
    description:
      "Interactive button with 5 variants, 5 sizes, 7 color schemes, loading states, and asChild slot.",
    path: "/components/button",
    keywords: [
      "button",
      "action",
      "cta",
      "click",
      "primary",
      "secondary",
      "loading",
      "spinner",
    ],
  },
  {
    id: "button-group",
    title: "ButtonGroup Component",
    category: "Components",
    description:
      "Container component managing grouped buttons with shared borders and context propagation.",
    path: "/components/button-group",
    keywords: [
      "buttongroup",
      "group",
      "toolbar",
      "attached",
      "segmented",
      "radio",
    ],
  },
  {
    id: "as-child",
    title: "Polymorphism (asChild)",
    category: "Advanced Guides",
    description:
      "Zero DOM wrapper polymorphic slot delegation using Radix-style Slot primitives.",
    path: "/guides/as-child",
    keywords: [
      "asChild",
      "slot",
      "polymorphic",
      "next/link",
      "react-router",
      "anchor",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility Standards",
    category: "Advanced Guides",
    description:
      "WCAG 2.2 AA compliance, keyboard navigation keymaps, focus rings, and axe-core validation.",
    path: "/guides/accessibility",
    keywords: [
      "a11y",
      "accessibility",
      "wcag",
      "keyboard",
      "screen reader",
      "axe",
    ],
  },
  {
    id: "changelog",
    title: "Changelog",
    category: "Resources",
    description:
      "Release notes, new component introductions, version history, and bug fixes.",
    path: "/changelog",
    keywords: ["changelog", "releases", "history", "versions", "changeset"],
  },
];
