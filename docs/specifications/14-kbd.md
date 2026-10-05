# Kbd Component Specification (Keyboard Shortcut & Keycap Primitive)

**Document Status:** Approved & Baseline  
**Phase:** Phase 1 — Layout & Typography Foundations  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-specification-standard.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-specification-standard.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)

---

## 1. Identity

```text
Component Name:     Kbd
Package Export:     import { Kbd, type KbdProps, type KbdOwnerState, type KbdSize, type KbdVariant, type KbdModifier, MODIFIER_SYMBOLS } from "@chellaa/react";
Category:           Layout & Primitives
Status:             Approved & Implementation Baseline
Phase:              Phase 1 — Layout & Typography Foundations
Related Components: Typography, Code, Button, Tooltip, Input
```

---

## 2. Purpose

The `Kbd` component renders a **semantic, tactile keyboard keycap** (`<kbd>`) designed to represent hardware keys, hotkeys, and platform-specific keyboard shortcuts. Modeled after modern IDE and desktop operating system visual aesthetics, `Kbd` gives users clear visual affordances for keyboard navigation, command palettes, hotkey hints in menus, and documentation walkthroughs.

With built-in 3D keycap elevations, platform modifier symbols (⌘, ⌥, ⇧, ⌃, ↵), proportional size scalings (`sm`, `md`, `lg`), and surface variants (`outline`, `subtle`, `solid`), `Kbd` standardizes shortcut rendering across the entire library ecosystem.

### When to Use

- **Search Inputs & Command Palettes**: Indicating activation shortcuts in search inputs (e.g. `⌘K` or `Ctrl + K`).
- **Menu Items & Dropdown Actions**: Displaying trailing hotkey shortcuts next to menu item labels (e.g. `⌘S` for Save, `⇧⌘P` for Command Palette).
- **Tooltips on Interactive Controls**: Appending shortcut hints to button tooltips (e.g. "Bold (Ctrl+B)").
- **Documentation & Hotkey Guides**: Explaining multi-key sequences and combinations in user manuals and settings dialogs.

### When NOT to Use

- **Do NOT use `Kbd` for code identifiers or terminal commands.** Use `Code` (Spec 13) for function names, file paths, and CLI commands.
- **Do NOT use `Kbd` as an interactive trigger.** `Kbd` is a purely visual display primitive; if a keycap is clickable, wrap it in a `<button>` or pass `component="button"`.
- **Do NOT use `Kbd` for status badges or numerical counts.** Use `Badge` or `Chip` (Phase 3) for counters and metadata tags.

---

## 3. Scope

### In Scope

1. **Semantic HTML5 Element**: Renders a native `<kbd>` tag by default, preserving accessibility semantics for assistive technologies.
2. **Tactile Keycap Aesthetics**:
   - 3D physical key appearance using bottom border offset (`border-bottom: 2px solid ...`) and soft ambient elevation.
   - Monospace typography baseline (`font-family: ui-monospace...`).
3. **Proportional Size Scale**:
   - `"sm"`: Compact (18px height, 11px font size) for dense menus, search inputs, and table rows.
   - `"md"`: Standard default (22px height, 12px font size) for general application UI.
   - `"lg"`: Prominent (28px height, 14px font size) for onboarding hero banners and keyboard guide cards.
4. **Surface Variants**:
   - `"outline"` (default): Crisp keycap with elevated bottom border and paper background.
   - `"subtle"`: Borderless keycap with tinted background for low-contrast toolbars.
   - `"solid"`: High-contrast inverted keycap.
5. **Platform Modifier Symbol Support**:
   - Convenience `modifier` prop and exported `MODIFIER_SYMBOLS` dictionary mapping `"command"`, `"shift"`, `"option"`, `"control"`, `"enter"`, `"escape"`, `"tab"`, `"backspace"`, and arrow keys to canonical unicode symbols.
6. **Polymorphic Zero-DOM Composition**:
   - `asChild` composition via `Slot`, `component`, and `as`.
7. **Emotion Theme Overrides**:
   - Styled via Emotion `styled()`, hookable at `theme.components.ChellaaKbd.styleOverrides.root`.

### Out of Scope

- Keyboard event listeners or global shortcut registration (delegated to `useHotkeys` / `useKeyboardShortcut` hooks).
- Multi-key animated recording widgets.

---

## 4. Non-Goals

- `Kbd` does **NOT** capture keyboard events or trigger focus actions.
- `Kbd` does **NOT** automatically detect the user's OS; developers pass the appropriate modifier key or use platform detection utilities when needed.

---

## 5. Feature Summary

| Feature | Values | Description |
| :--- | :--- | :--- |
| **Sizes** | `"sm"` \| `"md"` \| `"lg"` | Scale proportions for compact, standard, and prominent displays |
| **Variants** | `"outline"` \| `"subtle"` \| `"solid"` | Dictates 3D border depth, fill colors, and visual contrast |
| **Modifiers** | `"command"` \| `"shift"` \| `"option"` \| `"control"` \| `"enter"` \| `"escape"` \| `"tab"` \| `"backspace"` \| `"up"` \| `"down"` \| `"left"` \| `"right"` | Renders canonical unicode modifier symbol automatically |
| **Semantic Element** | `<kbd>` (default) | Preserves semantic browser element |
| **Polymorphism** | `asChild`, `component`, `as` | Zero-DOM delegation onto custom elements |
| **Theme Overrides** | Full Emotion Support | `theme.components.ChellaaKbd.styleOverrides.root` |

---

## 6. Anatomy

### 3D Tactile Keycap Anatomy

```
┌────────────────────────────────────────────────────────┐
│ Kbd Keycap (<kbd>)                                     │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ⌘ / K / Shift (ui-monospace; font-weight: 600)   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  3D Bottom Depth: border-bottom: 2px solid darken(...) │
└────────────────────────────────────────────────────────┘
```

### Multi-Key Shortcut Combination Pattern

```
┌───────┐     ┌───────┐
│  ⌘    │  +  │   K   │
└───────┘     └───────┘
```

---

## 7. Mathematics & Proportions

### 7.1. Size Proportions Matrix

| Token | Min Height | Min Width | Font Size | Padding (X) | Border Radius |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `"sm"` | `18px` | `18px` | `11px` (0.6875rem) | `4px` | `3px` |
| `"md"` *(default)* | `22px` | `22px` | `12px` (0.75rem) | `6px` | `4px` |
| `"lg"` | `28px` | `28px` | `14px` (0.875rem) | `8px` | `5px` |

### 7.2. Canonical Platform Modifier Glyphs (`MODIFIER_SYMBOLS`)

| Key Name | Mac Glyph | Windows / Cross-Platform Fallback | Code Token |
| :--- | :--- | :--- | :--- |
| Command | `⌘` | `Ctrl` | `"command"` \| `"cmd"` |
| Shift | `⇧` | `Shift` | `"shift"` |
| Option / Alt | `⌥` | `Alt` | `"option"` \| `"alt"` |
| Control | `⌃` | `Ctrl` | `"control"` \| `"ctrl"` |
| Enter / Return | `↵` | `Enter` | `"enter"` |
| Escape | `Esc` | `Esc` | `"escape"` \| `"esc"` |
| Tab | `⇥` | `Tab` | `"tab"` |
| Backspace | `⌫` | `Backspace` | `"backspace"` |
| Delete | `⌦` | `Del` | `"delete"` \| `"del"` |
| Up Arrow | `↑` | `↑` | `"up"` |
| Down Arrow | `↓` | `↓` | `"down"` |
| Left Arrow | `←` | `←` | `"left"` |
| Right Arrow | `→` | `→` | `"right"` |

---

## 8. Component States & Behavior

### 8.1. Variant Aesthetics

- **`variant="outline"` (Default)**:
  - Background: `theme.palette.background.paper`.
  - Border: `1px solid ${theme.palette.divider}` with `border-bottom: 2px solid ${darkerBorder}`.
  - Box Shadow: `0 1px 1px rgba(0, 0, 0, 0.08)`.
  - Best for: Light and dark application surfaces, form inputs, toolbars.
- **`variant="subtle"`**:
  - Background: `theme.palette.action.hover`.
  - Border: `1px solid transparent`.
  - Best for: Dense dropdown menus and subtle search input trails.
- **`variant="solid"`**:
  - Background: `theme.palette.text.primary`.
  - Text Color: `theme.palette.background.paper`.
  - Border: `none`.
  - Best for: Inverted themes, dark highlights, high-visibility badges.

### 8.2. Modifier Shortcut Helpers

When `modifier` is declared without children, `Kbd` automatically renders the canonical unicode glyph:
```tsx
<Kbd modifier="command" /> {/* Renders ⌘ */}
<Kbd modifier="shift" />   {/* Renders ⇧ */}
```
When both `modifier` and `children` are supplied, `children` takes precedence, or developer can combine them:
```tsx
<Flex align="center" gap={0.5}>
  <Kbd modifier="command" />
  <Typography variant="caption" color="text.secondary">+</Typography>
  <Kbd>K</Kbd>
</Flex>
```

---

## 9. Accessibility & WAI-ARIA Standards

- **Semantic `<kbd>` Element**:
  - Assistive technologies recognize `<kbd>` as user input keystrokes.
- **Screen Reader Announcements**:
  - Symbols like `⌘` can sometimes be announced cryptically by certain screen readers. When displaying complex glyph combinations, developers can optionally provide `aria-label`:
  ```tsx
  <span aria-label="Command K">
    <Kbd aria-hidden="true" modifier="command" />
    <Kbd aria-hidden="true">K</Kbd>
  </span>
  ```

---

## 10. API Specification & TypeScript Contracts

```ts
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { SxProps } from "../../system/types";

export type KbdSize = "sm" | "md" | "lg";
export type KbdVariant = "outline" | "subtle" | "solid";

export type KbdModifier =
  | "command"
  | "cmd"
  | "shift"
  | "option"
  | "alt"
  | "control"
  | "ctrl"
  | "enter"
  | "escape"
  | "esc"
  | "tab"
  | "backspace"
  | "delete"
  | "del"
  | "up"
  | "down"
  | "left"
  | "right";

export interface KbdOwnerState {
  size?: KbdSize | undefined;
  variant?: KbdVariant | undefined;
  modifier?: KbdModifier | undefined;
}

export interface KbdProps
  extends HTMLAttributes<HTMLElement>,
    KbdOwnerState {
  asChild?: boolean | undefined;
  component?: ElementType | undefined;
  as?: ElementType | undefined;
  sx?: SxProps;
  children?: ReactNode | undefined;
}
```

---

## 11. Design System Tokens & Emotion Styling Architecture

`Kbd` is styled via Emotion `styled()` and `shouldForwardProp`:

```ts
const StyledKbdRoot = styled("kbd", {
  name: "ChellaaKbd",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "size" &&
    prop !== "variant" &&
    prop !== "modifier" &&
    prop !== "asChild" &&
    prop !== "component",
})<{ ownerState: KbdOwnerState }>(({ theme, ownerState }) => {
  const size = ownerState.size ?? "md";
  const variant = ownerState.variant ?? "outline";

  // Size styles
  const sizeMap: Record<KbdSize, any> = {
    sm: {
      minHeight: 18,
      minWidth: 18,
      fontSize: "0.6875rem",
      padding: "0 4px",
      borderRadius: (theme.shape?.borderRadius ?? 4) - 1,
    },
    md: {
      minHeight: 22,
      minWidth: 22,
      fontSize: "0.75rem",
      padding: "0 6px",
      borderRadius: theme.shape?.borderRadius ?? 4,
    },
    lg: {
      minHeight: 28,
      minWidth: 28,
      fontSize: "0.875rem",
      padding: "0 8px",
      borderRadius: (theme.shape?.borderRadius ?? 4) + 1,
    },
  };

  // Base styles
  const baseStyles: Record<string, any> = {
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontWeight: 600,
    lineHeight: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    userSelect: "none",
    boxSizing: "border-box",
    ...sizeMap[size],
  };

  // Variant styles
  if (variant === "outline") {
    return {
      ...baseStyles,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.divider}`,
      borderBottom: `2px solid ${theme.palette.divider}`,
      boxShadow: "0 1px 1px rgba(0, 0, 0, 0.08)",
    };
  }

  if (variant === "subtle") {
    return {
      ...baseStyles,
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.secondary,
      border: "1px solid transparent",
    };
  }

  if (variant === "solid") {
    return {
      ...baseStyles,
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.paper,
      border: "none",
    };
  }

  return baseStyles;
});
```

---

## 12. Composition & Polymorphism Patterns

### 12.1. Search Input Shortcut Affordance

```tsx
<TextField
  placeholder="Search documentation..."
  endAdornment={
    <Flex align="center" gap={0.5}>
      <Kbd size="sm" modifier="command" />
      <Kbd size="sm">K</Kbd>
    </Flex>
  }
/>
```

### 12.2. Menu Item Trailing Shortcut

```tsx
<MenuItem>
  <Text>Command Palette</Text>
  <Flex align="center" gap={0.5} sx={{ ml: "auto" }}>
    <Kbd size="sm" modifier="shift" />
    <Kbd size="sm" modifier="command" />
    <Kbd size="sm">P</Kbd>
  </Flex>
</MenuItem>
```

### 12.3. Zero-DOM `asChild` Delegation

```tsx
<Kbd asChild size="lg">
  <span>Enter</span>
</Kbd>
```

---

## 13. Edge Cases & Resilience

| Edge Case | Expected System Behavior | Architectural Defense |
| :--- | :--- | :--- |
| **Modifier Passed with Children** | Children content is rendered; modifier ignored. | Explicit fallback hierarchy: `children ?? (modifier ? MODIFIER_SYMBOLS[modifier] : null)`. |
| **Unknown Modifier String** | Renders string literal without crashing. | Safe dictionary lookup fallback. |
| **Single Character Key (e.g. `K`)** | Centered in square keycap (`minWidth: minHeight`). | `minWidth === minHeight` with flex alignment ensures square keycaps. |
| **Isolated Unit Testing** | Tested without `<ThemeProvider>`. | `styled` factory automatically provides `defaultTheme`. |

---

## 14. Testing Verification Matrix

Every implementation of `Kbd` must satisfy this 100% test contract:

1. **Semantic HTML Element**:
   - Renders a native `<kbd>` tag by default with monospace font and centered text.
2. **Sizes**:
   - `size="sm"` applies compact dimensions.
   - `size="md"` applies standard dimensions.
   - `size="lg"` applies prominent dimensions.
3. **Variants**:
   - `variant="outline"` applies 3D border-bottom offset.
   - `variant="subtle"` applies hover background without 3D border.
   - `variant="solid"` applies high-contrast inverted fill.
4. **Modifier Symbols**:
   - `modifier="command"` renders `⌘`.
   - `modifier="shift"` renders `⇧`.
   - `modifier="option"` renders `⌥`.
   - `modifier="enter"` renders `↵`.
5. **Polymorphic Rendering**:
   - `component="span"` renders `<span>`.
   - `asChild` composition delegates keycap styles onto custom element.
6. **DOM Hygiene**:
   - `size`, `variant`, and `modifier` props do NOT leak to DOM attributes.
7. **Accessibility (`vitest-axe`)**:
   - Zero automated accessibility violations when used in document shortcuts and toolbars.

---

## 15. Implementation File Blueprint

```text
packages/react/src/components/Kbd/
├── Kbd.tsx          # Implementation with forwardRef & Emotion styled factory
├── Kbd.test.tsx     # Vitest unit test suite (100% pass + vitest-axe)
├── Kbd.stories.tsx  # Storybook stories (sizes, variants, modifiers, search bar integration)
└── index.ts         # Public exports (Kbd, KbdProps, MODIFIER_SYMBOLS, etc.)
```
