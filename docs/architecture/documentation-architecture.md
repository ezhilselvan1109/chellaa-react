# Chellaa React — Documentation Application Architecture

## Document 08: Scalable Consumer Documentation Platform Architecture

**Document Status:** 🟢 COMPLETE & ENFORCED  
**Target Application:** `apps/docs` (`@chellaa/docs`)  
**Target Library Package:** `@chellaa/react`  
**Governing Standard:** Phase 2 Engineering Standards & Component Validation Architecture

---

## 1. Purpose

The primary purpose of `apps/docs` is to serve as the **official consumer-facing documentation platform** for `@chellaa/react`. It is designed to educate, guide, and support developers, design system consumers, and maintainers in adopting, installing, configuring, and mastering Chellaa React components and design tokens.

The platform directly answers core consumer questions:

- _What is Chellaa React and what are its core architectural guarantees?_
- _How do I install and configure it with zero styling friction?_
- _What components exist, what are their visual variants, states, and accessibility guarantees?_
- _What is the authoritative TypeScript API and props contract?_
- _How does theming, dark mode, and design token customization work?_
- _How do I compose components in modern React environments (Vite, Next.js, Remix)?_
- _What changed between package releases and how do I migrate?_

---

## 2. Target Users

The documentation platform serves five distinct audiences:

1. **Application Developers:** Need fast installation instructions, copy-pasteable code examples, clear API reference tables, and TypeScript integration details.
2. **Design System Engineers & Designers:** Need to inspect design token mappings, semantic color ramps, spacing scales, typography standards, and responsive behaviors.
3. **Accessibility Auditors & QA:** Need WCAG 2.2 AA compliance documentation, keyboard keymaps, ARIA roles, focus management rules, and screen reader announcements.
4. **New Contributors:** Need to understand the public component contract, architectural patterns (`asChild`, `ButtonGroupContext`), and coding conventions.
5. **Existing Consumers Upgrading Versions:** Need transparent changelogs, migration guides, deprecation timelines, and release notes.

---

## 3. Application Boundary & Non-Overlapping Mandates

`apps/docs` is strictly **NOT**:

- ❌ **Storybook:** It does not host raw component state debugging matrices or internal developer knobs.
- ❌ **Playground:** It does not serve as an unconstrained application sandbox with arbitrary mock forms.
- ❌ **Unit Test Environment:** It does not run automated test suites (`vitest`).
- ❌ **Package Source:** It does not implement components; it consumes `@chellaa/react` as an external consumer.

```text
       packages/react (Component Source)
              │
              ├─────────────────────────────┐
              ▼                             ▼
   apps/storybook (Storybook 8)     apps/playground (Vite SPA)
   Isolated Component Lab           Real Application Sandbox
              │                             │
              └──────────────┬──────────────┘
                             ▼
                    apps/docs (Vite SPA)
                  Consumer Learning Portal
                             │
                             ▼
                 apps/test-consumer (Node)
               Package Distribution Firewall
```

---

## 4. Information Architecture (IA)

The information architecture is structured around **user intent** rather than monorepo source layout:

```text
Chellaa React Documentation
├── 1. Getting Started
│   ├── Overview (Vision, Zero-Config Styling, Principles)
│   ├── Installation (npm, pnpm, yarn, peer dependencies)
│   ├── Quick Start (First component, provider setup)
│   └── Framework Guides (Next.js App Router, Vite, Remix)
│
├── 2. Foundations
│   ├── Design Tokens Architecture (Primitives vs Semantic vs Component)
│   ├── Colors & Semantic Ramps
│   ├── Spatial & Sizing Scale (4px/8px baseline)
│   ├── Typography Scale
│   ├── Elevation & Shadows
│   └── Motion & Reduced Motion
│
├── 3. Theming
│   ├── ThemeProvider & useTheme
│   ├── Light, Dark & System Modes
│   ├── ThemeScript (Zero-FOUC SSR Hydration)
│   └── Custom Token Overrides
│
├── 4. Components
│   ├── General
│   │   ├── Button
│   │   └── ButtonGroup
│   ├── Form Controls (Roadmap: Input, Select, Checkbox)
│   ├── Overlay & Feedback (Roadmap: Dialog, Toast, Tooltip)
│   └── Data Display & Layout (Roadmap: Card, Badge, Table)
│
├── 5. Advanced Guides
│   ├── Polymorphism & asChild (Slot Delegation)
│   ├── Accessibility & Keyboard Navigation (WCAG 2.2 AA)
│   └── SSR & React Server Components (RSC)
│
└── 6. Resources
    ├── Package Releases
    ├── Changelog
    └── Migration Guides
```

---

## 5. Content Architecture

Content is decoupled into modular, typed data models under `apps/docs/src/content/`:

- `content/getting-started/`: Installation instructions, bundler setup, zero-config styling explanation.
- `content/foundations/`: Tokens overview, color tables, spatial rules.
- `content/theming/`: ThemeProvider usage, SSR ThemeScript snippets.
- `content/components/`: Per-component structured specifications (metadata, overview, anatomy, variants, a11y, API).
- `content/guides/`: Polymorphic slot composition, RSC boundary rules.
- `content/resources/`: Changelog and migration data.

Each page exports a strictly typed content descriptor adhering to `DocPage` metadata.

---

## 6. Component Documentation Template

To ensure complete consistency as the library expands from 2 to 100+ components, every component page adheres to a standardized template:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Component Header (Title, Status Badge, Description, Tags)│
├─────────────────────────────────────────────────────────────┤
│ 2. Quick Installation & Import Snippet                      │
├─────────────────────────────────────────────────────────────┤
│ 3. Interactive Hero Preview (Live component with controls)  │
├─────────────────────────────────────────────────────────────┤
│ 4. Variants Showcase (Solid, Outline, Ghost, Subtle, Link)  │
├─────────────────────────────────────────────────────────────┤
│ 5. Sizes Scale (xs, sm, md, lg, xl with spatial dimensions) │
├─────────────────────────────────────────────────────────────┤
│ 6. Component States (Loading with spinner, Disabled guards) │
├─────────────────────────────────────────────────────────────┤
│ 7. Icon Integration (startIcon, endIcon, accessible labels) │
├─────────────────────────────────────────────────────────────┤
│ 8. Polymorphic Slot Delegation (asChild anchor/Next link)   │
├─────────────────────────────────────────────────────────────┤
│ 9. Subcomponents / Groups (e.g., ButtonGroup context)       │
├─────────────────────────────────────────────────────────────┤
│ 10. Accessibility Matrix (Keyboard keys, ARIA roles, WCAG)  │
├─────────────────────────────────────────────────────────────┤
│ 11. Props & Type Reference Table (Prop, Type, Default, Desc)│
└─────────────────────────────────────────────────────────────┘
```

Implemented via a reusable, composable `<ComponentDocLayout>` container.

---

## 7. Example Architecture

Component code examples are decoupled from page layouts under `apps/docs/src/examples/<component>/`:

- Modular files (e.g. `ButtonBasicExample.tsx`, `ButtonVariantsExample.tsx`, `ButtonLoadingExample.tsx`).
- Every example imports exclusively from `@chellaa/react`.
- Supports raw code string display alongside rendered JSX previews via a unified `<ComponentPreview>` wrapper.
- Includes instantaneous "Copy Code" button with visual confirmation.

---

## 8. Storybook Integration & Boundaries

- **Boundary:** Storybook (`apps/storybook`) is the component development lab; `apps/docs` is the consumer learning platform.
- **Linkage:** Component documentation pages include a direct external link to the component's live Storybook canvas (`Open in Storybook ↗`), allowing engineers to inspect edge-case matrices in Storybook when needed without bloating the docs bundle.

---

## 9. Playground Integration & Boundaries

- **Boundary:** Playground (`apps/playground`) is an interactive application sandbox for composing multiple components; `apps/docs` is an educational reference.
- **Linkage:** Component documentation pages provide an "Open in Playground ↗" deep-link for developers wanting to experiment with complex stateful forms.

---

## 10. Theme Integration

`apps/docs` directly uses `@chellaa/react`'s native theme engine:

- Wraps documentation inside `<ThemeProvider defaultTheme="system">`.
- Header features a high-contrast Theme Toggle button switching between `light`, `dark`, and `system` modes.
- Demonstrations automatically respond to the active theme via CSS custom properties (`--cl-color-*`), proving the library's theming capabilities in real-time.

---

## 11. API Documentation Source of Truth

- **Authoritative Source:** `packages/react/src/components/<Component>/<Component>.types.ts`.
- **Props Tables:** Generated directly matching the exported TypeScript interfaces (`ButtonProps`, `ButtonGroupProps`).
- Documented fields: `Prop Name`, `Type Signature`, `Default Value`, and `TSDoc Description`.
- Zero manual drift: If a prop type changes in the package, the documentation type definition must match.

---

## 12. Search Architecture

A scalable client-side search system:

1. **Search Index Model (`searchIndex.ts`):** Indexable records containing `{ id, title, category, description, section, url, keywords }`.
2. **Keyboard Shortcut (`Cmd+K` / `Ctrl+K`):** Global listener opens the `<SearchModal>` dialog from any page.
3. **Accessible Dialog:** Built with `role="dialog"`, `aria-modal="true"`, auto-focusing search input, and keyboard arrow navigation (Up/Down/Enter/Escape).
4. **Instant Matcher:** Filters titles, sections, and keywords with real-time highlighted match counts.

---

## 13. Navigation Architecture

Navigation is driven by structured configuration (`apps/docs/src/navigation/docsNavigation.ts`):

- Categories: Getting Started, Foundations, Theming, Components, Guides, Resources.
- Items: Title, URL hash/route, badge (`Stable`, `Beta`, `New`), icon.
- Active route highlighting based on current navigation state.
- Mobile drawer navigation accessible via hamburger menu on smaller viewports.

---

## 14. Accessibility (WCAG 2.2 AA)

The documentation platform itself adheres strictly to accessibility standards:

- Semantic landmarks: `<header>`, `<nav>`, `<aside>`, `<main>`, `<footer>`.
- Keyboard navigation: All interactive links, buttons, and code tabs are keyboard operable.
- Skip to main content link: First focusable element for screen reader users.
- Visible focus rings: High-contrast `:focus-visible` styling on all interactive controls.
- Color contrast: All text and interactive controls meet minimum 4.5:1 contrast against backgrounds in both light and dark themes.

---

## 15. SEO & Social Meta Architecture

- Document title dynamically updates per active section: e.g., `Button — Chellaa React`.
- Standard meta tags in `index.html`: `description`, `viewport`, `robots`.
- Open Graph tags: `og:title`, `og:description`, `og:type="website"`.
- Clean semantic headings: Single `<h1>` per view, followed by strict `<h2>` and `<h3>` hierarchy.

---

## 16. Performance & Bundle Boundary

- **Tree-Shaking:** Components are imported as named imports (`import { Button, ButtonGroup } from "@chellaa/react"`).
- **Fast First Paint:** Lightweight CSS styling leveraging native CSS custom properties.
- **Zero Heavy External Runtimes:** No heavy markdown parsing or external search libraries at runtime.
- **Target Bundle Size:** Documentation client bundle under 200 KB gzipped.

---

## 17. Versioning Strategy

- Header displays current package version tag (e.g., `v0.1.0`).
- Documentation architecture includes dedicated `/resources/releases` and `/resources/migration` sections.
- Future multi-version capability: The structured content directory model enables version-scoped namespaces (`content/v0/`, `content/v1/`) without requiring an app rewrite.

---

## 18. Release Integration

- Synchronized with repository Changesets (`.changeset/`).
- Release notes and changelog displayed directly on the `/resources/changelog` view.
- When new components are released, their status transitions from `Beta` to `Stable`.

---

## 19. Testing & Quality Assurance

Automated checks for `apps/docs`:

- `pnpm --filter @chellaa/docs typecheck`: Validates TypeScript strict mode.
- `pnpm --filter @chellaa/docs build`: Compiles production bundle with zero warnings/errors.
- `pnpm format:check`: Validates code style.
- Internal route validation: Verifies all navigation items map to existing page views.

---

## 20. Scalability Strategy (Scaling to 100+ Components)

When adding Component #50 (e.g. `Tooltip`):

1. Create `apps/docs/src/content/components/tooltipDoc.ts`.
2. Create `apps/docs/src/examples/tooltip/TooltipExamples.tsx`.
3. Add a single entry to `docsNavigation.ts` under `Components`.
4. Add the component records to `searchIndex.ts`.
5. **Zero changes** to DocsLayout, Header, Sidebar, or App shell.
