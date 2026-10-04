# @chellaa/react

[![npm version](https://img.shields.io/npm/v/@chellaa/react.svg?style=flat-square&color=2563eb)](https://www.npmjs.com/package/@chellaa/react)
[![license](https://img.shields.io/npm/l/@chellaa/react.svg?style=flat-square&color=10b981)](https://github.com/chellaa/chellaa-react/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@chellaa/react?style=flat-square&color=7c3aed)](https://bundlephobia.com/package/@chellaa/react)
[![accessibility](https://img.shields.io/badge/accessibility-WCAG%202.2%20AA-059669?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **Production-grade, accessible, high-performance React component library and design system engine built with zero-runtime CSS custom properties.**

---

## Highlights

- **Zero-Configuration Styling**: Uses standard CSS cascade layers (`@layer cl-components`) injected automatically for browser bundlers—no Tailwind config, PostCSS plugins, or runtime CSS-in-JS overhead required.
- **Strict WCAG 2.2 AA Accessibility**: Rigorously validated with `@testing-library`, `vitest-axe`, explicit keyboard keymaps (`Space`, `Enter`, `Tab`), high-contrast focus rings, and proper ARIA semantics.
- **3-Tier Design Token Architecture**: Primitive Ramps $\rightarrow$ Semantic Intent $\rightarrow$ Component Scope. Every visual variable can be overridden at the root or component level without breaking library upgrades.
- **Zero-FOUC Theme Engine**: Complete light/dark/system theme orchestration with `ThemeProvider`, `useTheme`, and SSR-safe `ThemeScript`.
- **Polymorphic Slot Delegation (`asChild`)**: Render custom router links (Next.js `<Link>`, Remix/React Router `<Link>`) with full button behaviors and styles without invalid nested `<button>` tags.
- **Universal Runtime Architecture**: Dual ESM (`.mjs`) and CommonJS (`.cjs`) distributions, clean Node.js SSR support (`index.node.mjs`), and comprehensive TypeScript typings (`.d.ts` & `.d.cts`).

---

## Installation

```bash
# Using pnpm (recommended)
pnpm add @chellaa/react

# Using npm
npm install @chellaa/react

# Using yarn
yarn add @chellaa/react

# Using bun
bun add @chellaa/react
```

### Peer Dependencies
`@chellaa/react` requires React 18.2.0 or later:
```json
{
  "peerDependencies": {
    "react": ">=18.2.0",
    "react-dom": ">=18.2.0"
  }
}
```

---

## Quick Start

Wrap your application root with `ThemeProvider` and start using components:

```tsx
import * as React from "react";
import { Button, ButtonGroup, ThemeProvider } from "@chellaa/react";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <main style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <h1>Welcome to Chellaa React</h1>

        {/* Individual Button */}
        <Button variant="solid" colorScheme="primary" onClick={() => alert("Action triggered!")}>
          Primary Action
        </Button>

        {/* Attached Segmented Button Group */}
        <ButtonGroup isAttached variant="outline" colorScheme="neutral">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
          <Button>Year</Button>
        </ButtonGroup>
      </main>
    </ThemeProvider>
  );
}
```

---

## Core Components

### `Button`
Versatile, interactive action trigger supporting 5 variants, 5 sizes, 7 color schemes, loading states, directional icon slots, and slot delegation:

```tsx
import { Button } from "@chellaa/react";
import { FiSend } from "react-icons/fi";

<Button
  variant="solid"           // "solid" | "outline" | "ghost" | "subtle" | "link"
  size="md"                 // "xs" | "sm" | "md" | "lg" | "xl"
  colorScheme="primary"     // "primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info"
  isLoading={false}
  loadingPosition="start"   // "start" | "end" | "center"
  startIcon={<FiSend />}
>
  Send Message
</Button>
```

#### Framework Link Delegation (`asChild`)
Avoid invalid nested interactive elements when integrating with Next.js or React Router:

```tsx
import Link from "next/link";
import { Button } from "@chellaa/react";

<Button asChild variant="outline" colorScheme="primary">
  <Link href="/dashboard">
    Go to Dashboard
  </Link>
</Button>
```

---

### `ButtonGroup`
Container coordinating spacing, attached segment styling, orientation, and context propagation:

```tsx
import { ButtonGroup, Button } from "@chellaa/react";

<ButtonGroup isAttached orientation="horizontal" variant="outline" colorScheme="primary">
  <Button>Cut</Button>
  <Button>Copy</Button>
  <Button>Paste</Button>
</ButtonGroup>
```

---

## Theming & Dark Mode

Chellaa React handles theming through standard CSS custom properties without style injection flicker:

```tsx
import { useTheme } from "@chellaa/react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Current: {theme} (System: {systemTheme})
    </button>
  );
}
```

---

## Distribution & Export Verification

Package integrity is continuously verified with a multi-stage validation matrix:
- **Node ESM Resolution**: PASSED
- **Node CommonJS `require()`**: PASSED
- **Server-Side Rendering (SSR)**: PASSED
- **CSS Stylesheet Integrity**: PASSED
- **NPM Package Archive Payload**: PASSED (<45kB gzip)

---

## Documentation & Community

- **Official Documentation**: [https://chellaa.dev](https://chellaa.dev)
- **GitHub Repository**: [https://github.com/chellaa/chellaa-react](https://github.com/chellaa/chellaa-react)
- **Issue Tracker**: [https://github.com/chellaa/chellaa-react/issues](https://github.com/chellaa/chellaa-react/issues)

---

## License

MIT © [Ezhil Selvan P](https://github.com/chellaa)
