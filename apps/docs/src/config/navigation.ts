export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationConfig: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Overview",
        href: "/docs",
        description: "Introduction to Chella UI design philosophy and architecture.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        description: "How to install and configure Chella UI in Vite, Next.js, and Remix.",
      },
      {
        title: "Theming & Token Studio",
        href: "/docs/theming",
        description: "Zero-runtime CSS custom properties theming, dark mode, and SSR hydration.",
      },
    ],
  },
  {
    title: "Foundations",
    items: [
      {
        title: "Design Tokens",
        href: "/docs/tokens",
        description: "Three-tier token cascade: Primitives, Semantic tokens, Component tokens.",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "All Components",
        href: "/docs/components",
        badge: "Gallery",
        description: "Browse all accessible production-ready components in one place.",
      },
      {
        title: "Button",
        href: "/docs/components/button",
        badge: "Stable",
        description: "Interactive button with variants, sizes, loading states, and polymorphism.",
      },
      {
        title: "FloatButton",
        href: "/docs/components/float-button",
        badge: "Stable",
        description: "Floating action button with group menu modes and BackTop scroll progress ring.",
      },
      {
        title: "Badge",
        href: "/docs/components/badge",
        badge: "Stable",
        description: "Compact status indicators, count tags, and descriptors.",
      },
      {
        title: "Input",
        href: "/docs/components/input",
        badge: "Stable",
        description: "Single-line accessible text input field with validation and size scales.",
      },
      {
        title: "Divider",
        href: "/docs/components/divider",
        badge: "Layout",
        description: "A line that separates different blocks or inline content with text and style variants.",
      },
      {
        title: "Flex",
        href: "/docs/components/flex",
        badge: "Layout",
        description: "A flex layout container for setting spacing and alignment between elements.",
      },
      {
        title: "Spinner",
        href: "/docs/components/spinner",
        badge: "Stable",
        description: "Accessible circular loading indicator with size and color scales.",
      },
    ],
  },
  {
    title: "Upcoming Components",
    items: [
      { title: "Checkbox & Radio", href: "#", badge: "Phase 4" },
      { title: "Modal / Dialog", href: "#", badge: "Phase 6" },
      { title: "Tabs", href: "#", badge: "Phase 7" },
    ],
  },
];
