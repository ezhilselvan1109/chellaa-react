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
        href: "/",
        description: "Introduction to Chella UI design philosophy and architecture.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        description: "How to install and configure Chella UI in Vite, Next.js, and Remix.",
      },
      {
        title: "Theming & Dark Mode",
        href: "/docs/theming",
        description: "Zero-runtime CSS variable theming, dark mode, and SSR hydration.",
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
        title: "Button",
        href: "/docs/components/button",
        badge: "Stable",
        description: "Interactive button with variants, sizes, loading states, and polymorphism.",
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
      { title: "Input & Textarea", href: "#", badge: "Phase 4" },
      { title: "Checkbox & Radio", href: "#", badge: "Phase 4" },
      { title: "Modal / Dialog", href: "#", badge: "Phase 6" },
      { title: "Tabs", href: "#", badge: "Phase 7" },
    ],
  },
];
