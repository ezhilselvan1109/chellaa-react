# Chella UI

[![CI Quality Gate](https://github.com/ezhilselvan1109/chellaa-react/actions/workflows/ci.yml/badge.svg)](https://github.com/ezhilselvan1109/chellaa-react/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](tsconfig.base.json)

**Chella UI** is a production-quality, accessible, and type-safe React design system and UI component library distributed as `@chella-ui/react`.

Inspired by the engineering discipline and developer experience of Ant Design, Material UI, Chakra UI, and Radix UI, Chella UI provides an uncompromised foundation designed to scale from early prototypes to enterprise systems.

---

## 🌟 Key Features

* **Zero-Friction Consumer DX**: Install `@chella-ui/react` and import components directly. No Tailwind prerequisite, no complex bundler plugins.
* **Three-Tier Token Cascade**: Clean separation from raw Primitives to Semantic Tokens to Component Tokens.
* **Zero-Runtime Theme Engine**: Instantaneous (<1ms) switching between Light, Dark, and System modes powered by CSS custom properties.
* **Polymorphism via Slot (`asChild`)**: Radix-inspired composition pattern eliminating fragile TypeScript `as` prop unions.
* **WAI-ARIA Accessibility**: Complete keyboard navigation, visible focus rings, ARIA attributes, and automated axe testing.
* **Full SSR / RSC Compatibility**: 100% compatible with React 18, React 19, Next.js (App & Pages Router), Remix, and Vite with zero hydration mismatches.
* **Independent Scalable Documentation**: Standalone documentation web application (`apps/docs`) with live interactive previews and auto-extracted props reference.

---

## 📦 Monorepo Architecture

```text
chellaa-react/
├── packages/
│   └── ui/                     # Core library: @chella-ui/react
├── apps/
│   ├── docs/                   # Independent Documentation Web Application
│   ├── playground/             # Design System Workbench & Token Customizer
│   └── test-consumer/          # Clean Consumer App verifying public package boundaries
├── docs/
│   ├── architecture/           # System design specifications
│   └── adr/                    # Architectural Decision Records (ADRs 001 - 007)
├── AGENTS.md                   # Engineering contract for AI agents
├── package.json                # Native npm workspaces manifest
└── tsconfig.base.json          # Shared strict TypeScript configuration
```

---

## 🚀 Quick Start (Consumers)

### 1. Installation

```bash
npm install @chella-ui/react
```

### 2. Usage (Zero CSS Imports Required!)

Unlike older component libraries, **Chella UI components own their own styles** (inspired by Ant Design v5). When you import a component, its styles and design tokens are automatically injected on demand:

```tsx
import React from "react";
import { Button, ChellaProvider, useTheme } from "@chella-ui/react";

function ThemeToggleButton() {
  const { toggleTheme, resolvedTheme } = useTheme();
  return (
    <Button variant="secondary" onClick={toggleTheme}>
      Switch to {resolvedTheme === "dark" ? "Light" : "Dark"} Mode
    </Button>
  );
}

export function App() {
  return (
    <ChellaProvider defaultTheme="system">
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to Chella UI</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button variant="primary">Primary Action</Button>
          <Button variant="outline">Outline Action</Button>
          <Button isLoading loadingText="Saving...">Save</Button>
          <ThemeToggleButton />
        </div>
      </div>
    </ChellaProvider>
  );
}
```

---

## 🛠️ Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/ezhilselvan1109/chellaa-react.git
cd chellaa-react
npm install
```

### Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev:docs` | Starts the Documentation Web App on `http://localhost:3000` |
| `npm run dev:playground` | Starts the Design Workbench on `http://localhost:3001` |
| `npm run build` | Builds all packages and applications (`packages/ui`, `docs`, `playground`, `test-consumer`) |
| `npm run test` | Runs the Vitest unit and accessibility test suites |
| `npm run typecheck` | Typechecks all workspaces with strict TypeScript |
| `npm run format:check` | Verifies code formatting with Prettier |

---

## 🏛️ Architecture Decision Records (ADRs)

Key architectural decisions are formally documented in [docs/adr/](docs/adr/):
- [ADR-001: Monorepo Architecture](docs/adr/ADR-001-monorepo-architecture.md)
- [ADR-002: Styling Architecture & CSS Ownership](docs/adr/ADR-002-styling-architecture.md)
- [ADR-003: Three-Tier Design Token Cascade](docs/adr/ADR-003-design-token-cascade.md)
- [ADR-004: Polymorphic Composition via Slot](docs/adr/ADR-004-polymorphic-composition.md)
- [ADR-005: Package Build & Distribution Architecture](docs/adr/ADR-005-package-build-system.md)
- [ADR-006: Documentation Application Architecture](docs/adr/ADR-006-documentation-architecture.md)
- [ADR-007: Automated Release Management](docs/adr/ADR-007-automated-release-management.md)

---

## 🤖 Engineering Contract

All automated agents and human contributors must follow the [AGENTS.md](AGENTS.md) contract before introducing or modifying components.

---

## 📄 License

MIT © [Chella UI Team](LICENSE)