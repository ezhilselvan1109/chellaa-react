import { NavSection } from "./types";

export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { id: "overview", title: "Overview", path: "/overview" },
      { id: "installation", title: "Installation", path: "/installation" },
      { id: "quick-start", title: "Quick Start", path: "/quick-start" },
    ],
  },
  {
    title: "Foundations & Theming",
    items: [
      { id: "tokens", title: "Design Tokens", path: "/tokens" },
      { id: "colors", title: "Colors & Palettes", path: "/colors" },
      { id: "theming", title: "ThemeProvider & useTheme", path: "/theming" },
    ],
  },
  {
    title: "Actions",
    items: [
      { id: "button", title: "Button", path: "/components/button" },
      { id: "button-group", title: "ButtonGroup", path: "/components/button-group" },
    ],
  },
  {
    title: "Forms & Inputs",
    items: [
      { id: "input", title: "Input & TextField", path: "/components/input" },
      { id: "textarea", title: "Textarea", path: "/components/textarea" },
      { id: "form-field", title: "FormField", path: "/components/form-field" },
      { id: "checkbox", title: "Checkbox", path: "/components/checkbox" },
      { id: "radio", title: "Radio", path: "/components/radio" },
      { id: "switch", title: "Switch", path: "/components/switch" },
      { id: "select", title: "Select", path: "/components/select" },
      { id: "combobox", title: "Combobox", path: "/components/combobox" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { id: "accordion", title: "Accordion", path: "/components/accordion" },
      { id: "tabs", title: "Tabs", path: "/components/tabs" },
      { id: "pagination", title: "Pagination", path: "/components/pagination" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { id: "dialog", title: "Dialog & Modal", path: "/components/dialog" },
      { id: "popover", title: "Popover", path: "/components/popover" },
      { id: "tooltip", title: "Tooltip", path: "/components/tooltip" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { id: "alert", title: "Alert", path: "/components/alert" },
      { id: "snackbar", title: "Snackbar & Toast", path: "/components/snackbar" },
      { id: "touch-ripple", title: "TouchRipple", path: "/components/touch-ripple" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { id: "avatar", title: "Avatar", path: "/components/avatar" },
      { id: "badge", title: "Badge", path: "/components/badge" },
      { id: "card", title: "Card", path: "/components/card" },
      { id: "kbd", title: "Kbd", path: "/components/kbd" },
      { id: "table", title: "Table", path: "/components/table" },
      { id: "typography", title: "Typography", path: "/components/typography" },
    ],
  },
  {
    title: "Layout",
    items: [
      { id: "box", title: "Box", path: "/components/box" },
      { id: "container", title: "Container", path: "/components/container" },
      { id: "divider", title: "Divider", path: "/components/divider" },
      { id: "flex", title: "Flex", path: "/components/flex" },
      { id: "grid", title: "Grid", path: "/components/grid" },
      { id: "paper", title: "Paper", path: "/components/paper" },
      { id: "stack", title: "Stack", path: "/components/stack" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { id: "portal", title: "Portal", path: "/components/portal" },
      { id: "slot", title: "Slot", path: "/components/slot" },
    ],
  },
  {
    title: "Advanced Guides",
    items: [
      { id: "as-child", title: "Polymorphism (asChild)", path: "/guides/as-child" },
      { id: "accessibility", title: "Accessibility Standards", path: "/guides/accessibility" },
    ],
  },
  {
    title: "Resources",
    items: [{ id: "changelog", title: "Changelog & Releases", path: "/changelog" }],
  },
];
