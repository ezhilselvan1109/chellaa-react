# SPEC-037: Breadcrumbs and Link Component Specification

## 1. Overview & Scope
This specification defines the architecture, public APIs, keyboard interaction, accessibility semantics, design tokens, and testing criteria for two essential navigation primitives in Chellaa React:
1. **Breadcrumbs**: Hierarchical navigation landmark enabling users to orient themselves within a website or application structure, announce the current page, and navigate to parent levels.
2. **Link**: Accessible hyperlink component styling native `<a>` anchors with design-system color schemes, underline variants, external link security, and `asChild` composition via `Slot`.

---

## 2. Breadcrumbs Specification

### 2.1 Public API & Compound Architecture
The Breadcrumbs component family utilizes an ergonomic compound architecture:
```tsx
export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
  /** Accessible label for the navigation landmark. @default "Breadcrumb" */
  "aria-label"?: string;
  /** Custom separator node between items. @default "/" */
  separator?: React.ReactNode;
  /** Maximum number of breadcrumb items to display before collapsing. */
  maxItems?: number;
  /** Number of items to display before the ellipsis when collapsed. @default 1 */
  itemsBeforeCollapse?: number;
  /** Number of items to display after the ellipsis when collapsed. @default 1 */
  itemsAfterCollapse?: number;
  /** Additional CSS class names */
  className?: string;
  children: React.ReactNode;
}

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
}

export interface BreadcrumbLinkProps extends LinkProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {
  asChild?: boolean;
  children: React.ReactNode;
}

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<"li"> {
  children?: React.ReactNode;
}

export interface BreadcrumbEllipsisProps extends React.ComponentPropsWithoutRef<"span"> {
  "aria-label"?: string;
}
```

### 2.2 WAI-ARIA Semantics & Structure
- Root renders `<nav aria-label="Breadcrumb" className="cl-breadcrumb">`.
- Content list renders `<ol className="cl-breadcrumb__list">`.
- Each step renders `<li className="cl-breadcrumb__item">`.
- Intermediate links render `<a className="cl-breadcrumb__link">` (or `<BreadcrumbLink>`).
- Current page renders `<span aria-current="page" className="cl-breadcrumb__page">` and is NOT a navigable link by default.
- Separators render `<li aria-hidden="true" role="presentation" className="cl-breadcrumb__separator">`.
- Collapsed ellipsis renders `<span role="presentation" aria-label="More items" className="cl-breadcrumb__ellipsis">`.

### 2.3 Keyboard & Visual Behavior
- Keyboard navigation follows standard browser link focus traversal via `Tab` / `Shift+Tab`.
- Explicit focus indicator with `--cl-focus-ring` (2px solid `--cl-color-primary-base`, 2px offset).
- Supports long text wrapping and flex layout with truncation support.

---

## 3. Link Specification

### 3.1 Public API
```tsx
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Underline decoration style. @default "hover" */
  underline?: "always" | "hover" | "none";
  /** Semantic color scheme. @default "primary" */
  colorScheme?: "primary" | "neutral" | "subtle";
  /** Marks link as external, setting target="_blank" and rel="noopener noreferrer". @default false */
  isExternal?: boolean;
  /** Displays a decorative external link icon when isExternal is true. @default true */
  showExternalIcon?: boolean;
  /** Visual and interaction disabled state. @default false */
  isDisabled?: boolean;
  /** Delegates rendering to immediate child element using Slot. @default false */
  asChild?: boolean;
  /** Custom style overrides */
  sx?: SxProps;
}
```

### 3.2 Security & Navigation Integrity
- When `isExternal` is true or `target="_blank"` is supplied, the component automatically appends `rel="noopener noreferrer"` to prevent reverse tabnabbing security vulnerabilities.
- Native navigation attributes (`href`, `download`, `target`) and modifier clicks (`Cmd+Click`, `Ctrl+Click`, middle click) are preserved.
- When `isDisabled` is true:
  - Applies `aria-disabled="true"`.
  - Sets `tabIndex={-1}`.
  - Adds `.cl-link--disabled` with `pointer-events: none` and muted colors.
  - Cancels default navigation on click without invalidating anchor semantics.

---

## 4. Design Tokens & Styling
Scoped under `@layer cl-components`:
- `.cl-breadcrumb`, `.cl-breadcrumb__list`, `.cl-breadcrumb__item`, `.cl-breadcrumb__link`, `.cl-breadcrumb__page`, `.cl-breadcrumb__separator`, `.cl-breadcrumb__ellipsis`.
- `.cl-link`, `.cl-link--underline-always`, `.cl-link--underline-hover`, `.cl-link--underline-none`, `.cl-link--disabled`, `.cl-link__external-icon`.
- Tokens used:
  - `--cl-color-primary-base`, `--cl-color-text-primary`, `--cl-color-text-muted`, `--cl-color-border`.
  - `--cl-space-1`, `--cl-space-2`, `--cl-font-size-sm`, `--cl-font-size-md`.
  - `--cl-radius-sm`, `--cl-focus-ring`.

---

## 5. Testing & Acceptance Criteria
1. Landmark verification: `<nav aria-label="Breadcrumb">` identified by assistive tech.
2. Ordered list hierarchy: parent `<ol>` and child `<li>` elements intact.
3. Current page marked with `aria-current="page"`.
4. Decorative separators hidden with `aria-hidden="true"` and `role="presentation"`.
5. Automatic `rel="noopener noreferrer"` for `target="_blank"`.
6. External icon is hidden from screen readers (`aria-hidden="true"`).
7. `isDisabled` prevents navigation and disables keyboard focus.
8. Zero `axe-core` accessibility violations in light and dark modes.
