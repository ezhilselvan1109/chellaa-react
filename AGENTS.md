# AGENTS.md — Chella UI Engineering Contract

## 1. Purpose & Philosophy
This repository contains **Chella UI**, a production-grade React design system and UI component library distributed as `@chella-ui/react`.
Chella UI is an engineering-first design system inspired by Ant Design, Material UI, Chakra UI, and Radix UI without cloning them.
Every AI agent or engineer modifying this codebase must adhere strictly to the rules and standards set forth herein.

---

## 2. Monorepo Structure & Package Boundaries

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
│   └── adr/                    # Architectural Decision Records
└── AGENTS.md                   # This contract
```

### Boundary Constraints
1. **Never violate package boundaries**: `packages/ui` must NEVER import from `apps/*`.
2. **Public consumption only**: `apps/docs` and `apps/test-consumer` must consume `@chella-ui/react` through package exports (`@chella-ui/react`), never relative internal paths (`../../packages/ui/src/...`).
3. **Zero leak of dev dependencies**: Consumer builds must never require internal tooling (tsup, vitest, postcss).
4. **Peer dependencies**: React and React-DOM (`^18.0.0 || ^19.0.0`) are peer dependencies.

---

## 3. Styling & Token Rules

1. **CSS Ownership**: Chella UI owns its CSS. Consumers are **never** required to install or configure Tailwind CSS.
2. **CSS Modules + CSS Custom Properties**: Scoped CSS Modules with `ch-[component]__[element]--[modifier]` prefix.
3. **Three-Tier Token Cascade**:
   - Tier 1: Primitive Tokens (Raw scales: colors, spacing, radii, shadows).
   - Tier 2: Semantic Tokens (Theme & mode variables: `--ch-color-bg-surface`, `--ch-color-fg-default`, `--ch-color-primary`).
   - Tier 3: Component Tokens (Scoped customization: `--ch-btn-bg`, `--ch-input-border`).
4. **Token Rule**: Components must NEVER directly consume Tier 1 Primitive tokens. They must consume Tier 2 Semantic or Tier 3 Component Tokens.
5. **Zero-Runtime Theme Switching**: Theme switching is executed by setting `data-theme="light | dark"` on HTML roots. No JavaScript theme re-computation.

---

## 4. Component Development Checklist ("Definition of Done")

Every component MUST be constructed in `packages/ui/src/components/[ComponentName]/` with the following structure:
```text
[ComponentName]/
├── [ComponentName].tsx         # React component with React.forwardRef
├── [ComponentName].types.ts   # Public exported TypeScript types
├── [ComponentName].module.css # Scoped styles consuming tokens
├── [ComponentName].test.tsx   # Vitest + React Testing Library + Axe tests
├── [ComponentName].stories.tsx# Storybook interactive stories
└── index.ts                  # Public export barrel
```

Before marking any component complete:
- [ ] **API Design**: Predictable, composable, consistent prop naming (`variant`, `size`, `disabled`, `loading`).
- [ ] **Ref Forwarding**: Uses `React.forwardRef` with correct generic element types.
- [ ] **Polymorphism**: Uses the `Slot` (`asChild`) primitive when element switching is supported.
- [ ] **TypeScript**: Strict types, no unnecessary `any`, public types exported from package entry.
- [ ] **Accessibility (A11y)**:
  - WAI-ARIA role and state attributes (`aria-expanded`, `aria-controls`, `aria-disabled`).
  - Keyboard navigation (Enter, Space, Tab, Escape, Arrow keys where appropriate).
  - Visible focus rings with high contrast.
  - Zero violations with `jest-axe`.
- [ ] **Data Attributes**: State styles driven by `data-state`, `data-disabled`, `data-loading`.
- [ ] **Tests**: Behavioral unit tests + keyboard tests + accessibility tests.
- [ ] **Storybook**: Stories covering all variants, sizes, states, and dark mode.
- [ ] **Documentation**: Corresponding page in `apps/docs` with live preview, props table, and a11y guide.
- [ ] **Build Validation**: Package builds with `npm run build` without type or lint errors.

---

## 5. Verification Commands

Run these commands before completing any work:

```bash
# Typecheck entire workspace
npm run typecheck

# Run all test suites (unit + a11y)
npm run test

# Build packages and applications
npm run build

# Validate formatting
npm run format:check
```

---

## 6. AI Agent Behavior Guidelines

1. **Inspect before modifying**: Always read existing implementations and primitives before adding code.
2. **Reuse existing primitives**: Use `Slot`, `VisuallyHidden`, `Portal`, `FocusTrap`, and token variables instead of reinventing them.
3. **No premature abstractions**: Create reusable primitives only when proven necessary by multiple components.
4. **Preserve public APIs**: Never break or alter existing public component props without an ADR and deprecation cycle.
5. **Update ADRs**: When an architectural decision is modified or introduced, create or update the corresponding ADR in `docs/adr/`.
