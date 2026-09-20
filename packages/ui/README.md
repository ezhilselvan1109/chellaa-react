# @chellaa/react

> Production-ready, accessible, and high-performance React UI component library and design system inspired by Ant Design 5 & 6, powered by Vanilla CSS Tokens and Lucide icons.

[![npm version](https://img.shields.io/npm/v/@chellaa/react.svg)](https://www.npmjs.com/package/@chellaa/react)
[![license](https://img.shields.io/npm/l/@chellaa/react.svg)](https://github.com/ezhilselvan/chella-ui/blob/main/LICENSE)

---

## Features

- 🎨 **Ant Design 5 & 6 Aesthetics**: Complete button variants (`solid`, `outlined`, `dashed`, `filled`, `text`, `link`), preset colors, ripple wave click animations, and pill/circle shapes.
- ⚡ **Zero Tailwind Dependency**: Built with Vanilla CSS tokens & dynamic style injection for maximum flexibility and performance.
- 🔀 **Full Icon Library**: Seamlessly bundled with `lucide-react` (1000+ icons) plus Ant Design compatibility aliases (`SearchOutlined`, `SearchIcon`, etc.).
- ♿ **WAI-ARIA Compliant**: Fully accessible interactive components with keyboard navigation, focus management, and screen-reader support.
- 📦 **Dual Bundle**: Modern ESM & CommonJS builds with full TypeScript declarations (`.d.ts`).

---

## Installation

```bash
npm install @chellaa/react lucide-react
# or
yarn add @chellaa/react lucide-react
# or
pnpm add @chellaa/react lucide-react
```

---

## Quick Start

Import components and optional global CSS styles:

```tsx
import React from "react";
import {
  Button,
  SearchIcon,
  DownloadIcon,
  Select,
  Modal,
  Menu,
} from "@chellaa/react";
import "@chellaa/react/styles.css";

export function App() {
  return (
    <div style={{ padding: 24, display: "flex", gap: 12 }}>
      {/* Primary Solid Button */}
      <Button type="primary">Primary Button</Button>

      {/* Circle Icon Button */}
      <Button type="primary" shape="circle" icon={<SearchIcon />} />

      {/* Pill Button with Icon */}
      <Button type="primary" shape="round" icon={<DownloadIcon />}>
        Download
      </Button>

      {/* Dashed Button */}
      <Button type="dashed">Dashed Button</Button>
    </div>
  );
}
```

---

## Included Components

| Component | Description |
| :--- | :--- |
| **Button** | Full Ant Design specification buttons with solid, outlined, dashed, filled, text, link variants, circle & round shapes, wave ripple effect, and loading states. |
| **Input / Search / OTP** | Form inputs with prefix, suffix, clear button, password reveal toggle, and 6-digit OTP verification pin boxes. |
| **Select** | Dropdown selection supporting single, multiple, tags, searchable filter, async loading, and custom rendering. |
| **AutoComplete** | Live auto-complete search with dropdown suggestions and keyboard navigation. |
| **Radio & Checkbox** | Single and multiple option selections with Radio.Group, button styles, and indeterminate states. |
| **Steps** | Multi-step progress workflow indicator with horizontal, vertical, and clickable step navigation. |
| **Menu** | Navigation menu supporting horizontal, vertical, and inline accordion navigation with submenus. |
| **Modal** | Dialog box with title, body, action buttons, animated backdrop, and `Modal.confirm()` API. |
| **DatePicker & RangePicker** | Calendar picker supporting single date and date range selection. |
| **Grid (Row & Col)** | 24-column responsive grid system with flexible gutter and flex alignment. |
| **FloatButton** | Floating action buttons with group back-to-top triggers. |
| **Badge, Spinner, Divider, Flex, Masonry** | Foundational layout and feedback primitives. |

---

## Using Icons

All icons from `lucide-react` are exported directly:

```tsx
import {
  SearchIcon,      // or SearchOutlined
  DownloadIcon,    // or DownloadOutlined
  StarIcon,        // or StarOutlined
  ArrowRightIcon,  // or ArrowRightOutlined
  UserOutlined,    // or UserIcon
  SettingOutlined, // or SettingIcon
} from "@chellaa/react";

<Button icon={<SearchIcon />}>Search</Button>
<Button iconPlacement="end" icon={<ArrowRightIcon />}>Next Step</Button>
```

---

## Publishing & Maintenance

### 1. Authenticate with npm

```bash
npm login
npm whoami
# Verify owner of @chellaa organization:
npm org ls chellaa
```

### 2. Publishing to npm

From the monorepo root:

```bash
npm publish --workspace=@chellaa/react --access public
```

Or from within `packages/ui`:

```bash
cd packages/ui
npm publish --access public
```

### 3. Releasing New Versions

```bash
# Bump version (patch, minor, or major)
npm version patch --workspace=@chellaa/react

# Publish new version
npm publish --workspace=@chellaa/react --access public
```

---

## License

MIT © [Ezhil Selvan P](https://github.com/ezhilselvan)

