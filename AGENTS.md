# Chellaa React — Authoritative Repository Governance & Agent Instructions

**Package:** `@chellaa/react`  
**Repository:** `https://github.com/ezhilselvan1109/chellaa-react`  
**Target Branch:** `dev`  
**Governance Scope:** Mandatory for all AI agents, human contributors, automated pipelines, and generated artifacts.

---

## 1. Core Engineering Mandates

1. **Zero-Warning CI Gate:** All commits and pull requests must pass TypeScript strict typecheck (`tsc --noEmit`), ESLint without warnings (`pnpm lint --max-warnings 0`), Prettier format checks, unit tests, and production builds across all packages.
2. **Preserve User Changes:** Never revert, reset, or overwrite pre-existing user modifications in the working tree.
3. **No Unapproved Operations:** Never commit, push, publish, tag, or deploy unless explicitly authorized in the active prompt.
4. **CSS Architecture & Design Tokens:** Components must consume registered Tier 1 (global), Tier 2 (semantic), and Tier 3 (component) CSS tokens under `@layer cl-components`. Never use hardcoded hex values or inline styles for tokenized design properties.
5. **Polymorphic Composition:** All polymorphic components must use the Radix-style `asChild` composition pattern via the headless `Slot` primitive. Never implement dynamic `as={Component}` props.
6. **WAI-ARIA & Accessibility:** Every interactive component must meet WCAG 2.2 AA standards, implement keyboard navigation (Enter, Space, Arrow keys, Escape), maintain roving tabindex where appropriate, and pass Axe accessibility audits with 0 violations.

---

## 2. Permanent Decorative Emoji Policy

### 2.1 Mandate
**Do not introduce decorative Unicode emoji characters into product UI, maintained documentation, Storybook content, examples, marketing copy, error messages, success messages, notifications, button labels, headings or other repository-maintained user-facing text.**

### 2.2 Prohibition Specifics
- **No Substitute for Icons:** Do not use emojis as substitutes for professional icons, status indicators, navigation elements or semantic labels.
- **Use Icon System:** Use the existing supported icon system, accessible SVG icons, CSS indicators or clear text labels where appropriate.
- **Preserve Legitimate Assets:** Preserve existing icon-library components, Lucide icons, SVG artwork, logos and legitimate image assets.
- **Preserve Non-Emoji Unicode:** Do not remove meaningful mathematical symbols (e.g., `±`, `×`, `≤`, `≥`, `√`), ordinary Unicode typography (e.g., `©`, `®`, `™`, em-dash `—`, quotes, `⋮`, `↗`, `→`), non-emoji symbols, language characters (e.g., Tamil, accents, CJK) or accessibility labels merely because they are non-ASCII.
- **Third-Party & Generated Boundaries:** Do not modify third-party dependencies or generated dependency files to enforce this rule.
- **User-Generated Content Exemption:** If emoji support is an explicit product requirement for user-generated content, preserve that capability. The prohibition applies to decorative content authored by the project, not to users' legitimate input.

### 2.3 Automated Enforcement & Exceptions
- The repository enforces this policy automatically via `node scripts/check-no-emojis.mjs` as part of the quality gate suite.
- Narrowly justified exclusions are strictly limited to files explicitly designed to test or demonstrate input handling (e.g., `scripts/check-no-emojis.test.mjs`). Broadly disabling enforcement is forbidden.
- Every future implementation wave must run `node scripts/check-no-emojis.mjs` before completion.

---

## 3. Storybook Information Architecture & Sidebar Taxonomy

Every public visual component must be documented under its exact canonical category path in Storybook:

1. **Introduction:**
   - `Introduction/Welcome`
   - `Introduction/Getting Started`
2. **Foundations:**
   - `Foundations/Design Tokens Overview`
   - `Foundations/Colors & Semantic Tokens`
   - `Foundations/Typography Scale`
   - `Foundations/Spacing & Layout Tokens`
   - `Foundations/Radius, Shadows & Motion`
   - `Foundations/Theming & Dark Mode`
3. **Components:**
   - `Components/Actions`: `Button`, `ButtonGroup`
   - `Components/Forms & Inputs`: `Checkbox`, `Combobox`, `FormField`, `Input`, `Radio`, `Select`, `Switch`, `Textarea`
   - `Components/Data Display`: `Avatar`, `Badge`, `Card`, `Kbd`, `Table`, `Typography`
   - `Components/Navigation`: `Accordion`, `Pagination`, `Tabs`
   - `Components/Overlays`: `Dialog`, `Popover`, `Tooltip`
   - `Components/Feedback`: `Alert`, `Snackbar`, `TouchRipple`
   - `Components/Layout`: `Box`, `Container`, `Divider`, `Flex`, `Grid`, `Paper`, `Stack`
   - `Components/Utilities`: `Portal`, `Slot`

Never introduce unnested component paths (e.g., `Components/Button`), legacy top-level groups (`Forms/*`, `Layout/*`, `Surfaces/*`), or standalone `Feedback/*`.
