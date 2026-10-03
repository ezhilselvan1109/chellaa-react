# Chellaa React — Component Specifications

## Document 00: Component Feature Matrix & Reference Analysis

**Document Status:** Approved  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** Phase 1 Foundation & Phase 2 Engineering Standards

---

## 1. Executive Summary & Architecture Philosophy

Chellaa React is **not** a clone of Material UI (MUI), Ant Design, or Chakra UI. Instead, we study established reference design systems to understand what capabilities mature React libraries provide, evaluate those capabilities against our core pillars (**Tactile Clarity, Zero-Configuration Styling, Scoped Static CSS, WAI-ARIA APG Accessibility, Strict TypeScript**), and synthesize a **simple, composable, and consistent API**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Feature Decision & Synthesis Pipeline                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Reference Discovery     Study MUI & Ant Design component patterns.  │
│        ↓                                                               │
│ 2. Capability Analysis     Filter essential vs. bloated features.      │
│        ↓                                                               │
│ 3. Chellaa Architecture   Map to --cl-* tokens and scoped static CSS.  │
│        ↓                                                               │
│ 4. API Standardization    Apply universal naming: isDisabled, asChild. │
│        ↓                                                               │
│ 5. Specification Freeze   30-section authoritative specification.       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Global Design System Baseline

All components adhere to the Chellaa React spatial, visual, and semantic standards:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Universal Design System Scale                     │
├───────────────┬────────────────────────────────────────────────────────┤
│ Dimension     │ Supported Scale / Values                               │
├───────────────┼────────────────────────────────────────────────────────┤
│ Sizes         │ xs (28px), sm (32px), md (40px, default), lg (48px),   │
│               │ xl (56px) [Optical 1:1 vertical alignment across forms]│
├───────────────┼────────────────────────────────────────────────────────┤
│ Color Schemes │ primary (Indigo), secondary (Violet), success (Emerald)│
│               │ warning (Amber), danger (Rose), info (Sky), neutral    │
├───────────────┼────────────────────────────────────────────────────────┤
│ Border Radii  │ --cl-rad-xs (2px), --cl-rad-sm (4px), --cl-rad-md (6px)│
│               │ --cl-rad-lg (8px), --cl-rad-xl (12px), --cl-rad-full   │
├───────────────┼────────────────────────────────────────────────────────┤
│ Layering      │ Authored inside @layer cl-components                   │
├───────────────┼────────────────────────────────────────────────────────┤
│ CSS Prefix    │ Variables: --cl-*, Classes: .cl-*                      │
└───────────────┴────────────────────────────────────────────────────────┘
```

---

## 3. Comprehensive Component Feature Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   Component Feature Discovery Matrix                                    │
├───────────┬──────────────┬────────────┬─────────────────────────────┬───────────────────────────────────┤
│ Component │ Category     │ Priority   │ Reference Features Analyzed │ Chellaa React Decision            │
├───────────┼──────────────┼────────────┼─────────────────────────────┼───────────────────────────────────┤
│ Button    │ Actions      │ P0 Core    │ MUI: variant, size, color,  │ Selected: solid, outline, ghost,  │
│           │              │            │ startIcon, endIcon, loading,│ subtle, link; xs-xl; colorScheme; │
│           │              │            │ fullWidth, disableRipple.   │ isLoading; loadingText; startIcon;│
│           │              │            │ AntD: shape, danger, ghost, │ endIcon; isFullWidth; asChild.    │
│           │              │            │ block, loading, icon.       │ Deferred: ripple, arbitrary sx.   │
├───────────┼──────────────┼────────────┼─────────────────────────────┼───────────────────────────────────┤
│ Input     │ Forms        │ P0 Core    │ MUI: TextField composite,   │ Selected: primitive <input>;      │
│           │              │            │ variant, error, helperText, │ outline, filled, flushed,         │
│           │              │            │ startAdornment. AntD: addon,│ unstyled; xs-xl; isInvalid;       │
│           │              │            │ prefix, allowClear, status. │ isReadOnly; isDisabled; value /   │
│           │              │            │                             │ defaultValue. Deferred: custom    │
│           │              │            │                             │ border color props, asChild.      │
├───────────┼──────────────┼────────────┼─────────────────────────────┼───────────────────────────────────┤
│ Select    │ Forms        │ P0 Core    │ MUI: native select vs menu  │ Selected: Compound WAI-ARIA APG   │
│           │              │            │ select, renderValue.        │ Listbox (Root, Trigger, Value,    │
│           │              │            │ AntD: mode, options array,  │ Content, Item, Group, Label);     │
│           │              │            │ showSearch, filterOption.   │ generic TValue; portal; roving    │
│           │              │            │                             │ focus; type-ahead. Deferred: multi│
├───────────┼──────────────┼────────────┼─────────────────────────────┼───────────────────────────────────┤
│ Dialog /  │ Overlays     │ P0 Core    │ MUI: Dialog, DialogTitle,   │ Selected: Compound WAI-ARIA APG   │
│ Modal     │              │            │ DialogContent, fullScreen.  │ Dialog (Dialog canonical, Modal   │
│           │              │            │ AntD: Modal, maskClosable,  │ alias); focus trapping; Escape;   │
│           │              │            │ destroyOnClose, centered.   │ scroll locking; focus restoration;│
│           │              │            │                             │ initialFocusRef; sm-full sizes.   │
├───────────┼──────────────┼────────────┼─────────────────────────────┼───────────────────────────────────┤
│ Card      │ Layout /     │ P0 Core    │ MUI: Card, CardContent,     │ Selected: Compound structure      │
│           │ Data Display │            │ CardActions, CardMedia.     │ (Root, Header, Title, Description,│
│           │              │            │ AntD: title, extra, hoverable│ Body, Footer); elevated, outline, │
│           │              │            │ bordered, cover.            │ filled; asChild on root.          │
│           │              │            │                             │ Removed: ambiguous isInteractive. │
├───────────┼──────────────┼────────────┼─────────────────────────────┼───────────────────────────────────┤
│ Badge     │ Data Display │ P0 Core    │ MUI: badgeContent, color,   │ Selected: subtle, solid, outline; │
│           │              │            │ variant (dot/standard).     │ sm, md, lg; 7 colorSchemes;       │
│           │              │            │ AntD: count, dot, status,   │ isPill; hasDot; token contrast.   │
│           │              │            │ text, overflowCount.        │ Rejected: standalone clickable.   │
├───────────┼──────────────┼────────────┼─────────────────────────────┼───────────────────────────────────┤
│ Table     │ Data Display │ P0 Core    │ MUI: Table, TableContainer, │ Selected: Semantic HTML table     │
│           │              │            │ TableHead, TableRow, cell.  │ (Root, Thead, Tbody, Tfoot, Tr,   │
│           │              │            │ AntD: data-driven columns,  │ Th, Td, Caption, Container);      │
│           │              │            │ pagination, rowSelection.   │ simple, striped, bordered;        │
│           │              │            │                             │ isNumeric; isStickyHeader; hover. │
└───────────┴──────────────┴────────────┴─────────────────────────────┴───────────────────────────────────┘
```

---

## 4. Component-by-Component Decision Records

### 4.1 Button

- **Reference Analysis:**
  - MUI provides `variant="contained" | "outlined" | "text"`, `startIcon`, `endIcon`, `fullWidth`, `loading` via `@mui/lab` or v5 button, and `disableRipple`.
  - Ant Design provides `type="primary" | "default" | "dashed" | "link" | "text"`, `danger`, `ghost`, `block`, and `shape="circle" | "round"`.
- **Chellaa React Synthesis:**
  - **Variants:** `solid` (default), `outline`, `ghost`, `subtle`, `link`. Unified with design system visual treatments.
  - **Sizes:** `xs` (28px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px).
  - **Icons:** Standardized on `startIcon` and `endIcon` (modern logical direction conventions).
  - **Full Width:** `isFullWidth?: boolean` follows universal `is` prefix convention.
  - **Loading:** `isLoading?: boolean`, `loadingText?: string`, `loadingPosition?: "start" | "end" | "center"`.
  - **Polymorphism:** `asChild?: boolean` delegates rendering to Next.js / React Router links without runtime `as` prop cost.
  - **Rejected / Deferred:** Material ripples (tactile micro-scale `scale(0.98)` preferred), arbitrary `sx` props.

### 4.2 Input

- **Reference Analysis:**
  - MUI combines label, helper text, and input into a monolithic `TextField`, while exposing a raw `InputBase`.
  - Ant Design bundles status, prefixes, suffixes, and `allowClear` into a single `<Input />`.
- **Chellaa React Synthesis:**
  - **Primitive Separation:** `Input` is strictly the native `<input>` primitive control. Higher-level form orchestration (labels, helper text, error messages) belongs to `FormControl` / `FormField`.
  - **Variants:** `outline` (default), `filled`, `flushed`, `unstyled`.
  - **Sizes:** `xs`, `sm`, `md`, `lg`, `xl` matching `Button` heights.
  - **States:** `isDisabled`, `isInvalid`, `isReadOnly`, `isRequired`.
  - **Rejected:** `asChild` (an `<input>` is a void element; delegating children is invalid HTML and breaks accessibility); `errorBorderColor` / `focusBorderColor` props (customization is handled through semantic theme tokens).

### 4.3 Select

- **Reference Analysis:**
  - Native `<select>` provides poor visual styling and limited desktop customization.
  - MUI offers `Select` and `Autocomplete`. Ant Design provides an options-array driven `Select` with integrated tags.
- **Chellaa React Synthesis:**
  - **Compound Architecture:** Follows the WAI-ARIA APG Listbox pattern (`Select.Root`, `Select.Trigger`, `Select.Value`, `Select.Portal`, `Select.Content`, `Select.Item`, `Select.ItemText`, `Select.ItemIndicator`, `Select.Group`, `Select.Label`, `Select.Separator`).
  - **Generic Support:** Strictly typed `Select<TValue extends string = string>` supporting custom string-based value types.
  - **Accessibility Physics:** Keyboard navigation (Arrow keys, Home, End, Enter, Space, Escape, type-ahead character jump), focus restoration to Trigger upon close.
  - **Deferred:** Multi-select with tags (deferred to `MultiSelect` in Phase 6).

### 4.4 Modal / Dialog

- **Reference Analysis:**
  - Terminology confusion in the industry: MUI calls it `Dialog`, Ant Design calls it `Modal`.
- **Chellaa React Synthesis:**
  - **Canonical Name:** **`Dialog` is the canonical component name** (matching W3C WAI-ARIA APG Dialog and native HTML `<dialog>`).
  - **Compatibility Export:** `export const Modal = Dialog;` is provided as an exact alias to ensure zero developer friction.
  - **Focus & A11y:** Focus trapping inside dialog; focus restoration to trigger; Escape key dismissal; backdrop click dismissal; background scroll lock; `aria-labelledby` and `aria-describedby` automatic linkage.
  - **Sizes:** `sm` (400px), `md` (560px), `lg` (720px), `xl` (960px), `full` (100vw/100vh).

### 4.5 Card

- **Reference Analysis:**
  - MUI `Card` has `CardActionArea` creating an interactive container. Ant Design provides `hoverable`.
- **Chellaa React Synthesis:**
  - **Accessibility Hazard Elimination:** A generic `<div>` with `isInteractive` creates an inaccessible container without keyboard activation or semantic role. We **reject ambiguous interactive cards**.
  - **Safe Composition:** If a card is interactive, users wrap internal actions in `<Button>` or `<Link>`, or compose `<Card asChild><a href="...">...</a></Card>`.
  - **Sub-components:** `Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`, `Card.Body`, `Card.Footer`.
  - **Variants:** `elevated` (default), `outline`, `filled`.

### 4.6 Badge

- **Reference Analysis:**
  - MUI `Badge` wraps children and positions a badge in the top-right corner. Ant Design provides both standalone tags and avatar-overlapping badges.
- **Chellaa React Synthesis:**
  - **Primary Purpose:** Standalone status indicator and metadata label.
  - **Variants:** `subtle` (default), `solid`, `outline`.
  - **Color Schemes:** All 7 semantic color schemes with token-based WCAG AA contrast.
  - **Features:** `isPill` (full pill radius), `hasDot` (decorative status dot with `aria-hidden="true"`).
  - **WCAG SC 1.4.1 Compliance:** Badges must always feature textual copy; color alone cannot convey meaning.

### 4.7 Table

- **Reference Analysis:**
  - MUI provides composite table primitives (`Table`, `TableHead`, `TableRow`, `TableCell`). Ant Design provides a heavy JSON-configured table with built-in sorting/pagination.
- **Chellaa React Synthesis:**
  - **Primitive Architecture:** Pure semantic HTML table primitives (`Table.Root`, `Table.Thead`, `Table.Tbody`, `Table.Tfoot`, `Table.Tr`, `Table.Th`, `Table.Td`, `Table.Caption`, `Table.Container`).
  - **Headless Compatibility:** Designed to seamlessly pair with TanStack Table for sorting, filtering, and pagination.
  - **Features:** `isNumeric` (right-aligns tabular numerals), `isStickyHeader`, `isHoverable` (row hover), `Table.Container` (accessible horizontal scrolling).
  - **Semantic Protection:** `asChild` is **prohibited** on table elements to guarantee valid HTML table structure.

---

## 5. Summary of Architecture Decisions

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Hardened Decision Summary                       │
├───────────────────────────────────┬────────────────────────────────────┤
│ Decision Area                     │ Official Rule                      │
├───────────────────────────────────┼────────────────────────────────────┤
│ Icon Props                        │ Standardize on startIcon / endIcon │
├───────────────────────────────────┼────────────────────────────────────┤
│ Full Width                        │ Standardize on isFullWidth         │
├───────────────────────────────────┼────────────────────────────────────┤
│ Modal vs Dialog                   │ Dialog is canonical; Modal alias   │
├───────────────────────────────────┼────────────────────────────────────┤
│ Interactive Card                  │ Removed; use asChild with <a>/Link │
├───────────────────────────────────┼────────────────────────────────────┤
│ Polymorphic `as`                  │ Strictly prohibited repo-wide      │
├───────────────────────────────────┼────────────────────────────────────┤
│ `asChild` Boundary                │ Allowed on Button, Card, Dialog    │
│                                   │ Prohibited on Input, Table tags    │
├───────────────────────────────────┼────────────────────────────────────┤
│ Strict Types                      │ Zero `any`; exact RefObject types  │
├───────────────────────────────────┼────────────────────────────────────┤
│ CSS Class Namespace               │ Strictly .cl-*; no naked .is-*     │
└───────────────────────────────────┴────────────────────────────────────┘
```
