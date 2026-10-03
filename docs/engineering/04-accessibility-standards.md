# Chellaa React — Engineering Standards
## Document 04: Accessibility (A11y) Standards

**Document Status:** Ready to Freeze  
**Phase:** 2 — Engineering Standards  
**Target Package:** `@chellaa/react`  
**Conformance Level:** WCAG 2.2 Level AA & W3C WAI-ARIA APG  

---

## 1. Executive Summary & Purpose

In Chellaa React, accessibility is an uncompromising foundational contract. Every component must be inherently accessible to all users regardless of physical ability, input device, or assistive technology.

This document codifies the mandatory standards for semantic HTML, WAI-ARIA authoring practices, keyboard navigation physics, focus trapping, screen reader compatibility, and automated a11y testing.

---

## 2. The Core Principle: Semantic HTML First

> **Rule 1 of ARIA:** *If you can use a native HTML element or attribute with the semantics and behavior you require already built in, then do so instead of re-purposing an element and adding an ARIA role, state or property to make it accessible.*

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Semantic HTML vs. ARIA Matrix                     │
├─────────────────────┬───────────────────┬──────────────────────────────┤
│ Interactive Intent  │ Native HTML (✅)  │ Prohibited ARIA Hack (❌)    │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Button / Action     │ <button type="..">│ <div role="button" tabIndex> │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Navigation Link     │ <a href="...">    │ <span onClick={navigate}>    │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Text Input          │ <input type=".."> │ <div contentEditable>        │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Modal Dialog        │ <dialog> / portal │ <div role="dialog"> on body  │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ Selection List      │ <select> / <form> │ Complex custom div soup      │
└─────────────────────┴───────────────────┴──────────────────────────────┘
```

Developers must never use `role="button"` or `role="link"` on a `<div>` or `<span>` when a native `<button>` or `<a>` can be used. Native elements provide built-in keyboard handling, form submission integration, disabled state handling, and screen reader recognition for free.

---

## 3. Accessible Names & Form Associations

Every interactive element rendered in the DOM must have a computable **Accessible Name**.

### 3.1 Accessible Name Hierarchy
1. **Direct Text Content:** `<Button>Save Changes</Button>` (Accessible name: "Save Changes").
2. **`aria-label` Prop:** Used when an element has no visible text (e.g., an icon-only button):
   ```tsx
   <IconButton aria-label="Close modal" icon={<CloseIcon />} />
   ```
3. **`aria-labelledby` Prop:** Used when visible text elsewhere on the screen provides the name:
   ```tsx
   <h2 id="modal-heading">Account Settings</h2>
   <Dialog.Content aria-labelledby="modal-heading">...</Dialog.Content>
   ```

### 3.2 Form Field Accessibility Mandates
All form input components (`Input`, `Select`, `Textarea`, `Checkbox`, `Radio`) must integrate with accessible labels and error messages:
- **Label Association:** Inputs must be programmatically connected to visible labels via `htmlFor` matching the input's `id`.
- **Error Association:** When an input is invalid, it must declare `aria-invalid="true"` and associate its error message via `aria-describedby`:
  ```tsx
  <label htmlFor={inputId}>Email Address</label>
  <input 
    id={inputId}
    aria-invalid={isInvalid ? "true" : undefined}
    aria-describedby={isInvalid ? errorId : helperId}
  />
  {isInvalid && <p id={errorId} role="alert">Please enter a valid email.</p>}
  ```

---

## 4. Keyboard Navigation Physics & Interaction

Chellaa React components must be 100% operable via keyboard alone. Mouse interaction is an enhancement, not a requirement.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Standard Keyboard Keymap                        │
├────────────────────┬───────────────────────────────────────────────────┤
│ Key / Combination  │ Standard Behavior Across Components               │
├────────────────────┼───────────────────────────────────────────────────┤
│ Tab                │ Moves focus sequentially to next focusable node.  │
├────────────────────┼───────────────────────────────────────────────────┤
│ Shift + Tab        │ Moves focus sequentially to previous node.        │
├────────────────────┼───────────────────────────────────────────────────┤
│ Enter              │ Activates button, submits form, selects item.     │
├────────────────────┼───────────────────────────────────────────────────┤
│ Space              │ Toggles button, checkbox, expands dropdown.       │
├────────────────────┼───────────────────────────────────────────────────┤
│ Arrow Down / Up    │ Navigates items in Menu, Select, RadioGroup, List.│
├────────────────────┼───────────────────────────────────────────────────┤
│ Arrow Right / Left │ Navigates horizontal Tabs, Sliders, Breadcrumbs.  │
├────────────────────┼───────────────────────────────────────────────────┤
│ Escape             │ Dismisses active overlay (Modal, Popover, Menu);  │
│                    │ immediately restores focus to trigger element.    │
├────────────────────┼───────────────────────────────────────────────────┤
│ Home / End         │ Jumps focus to first / last item in collection.   │
└────────────────────┴───────────────────────────────────────────────────┘
```

### 4.1 The Roving Tabindex Pattern
In composite widgets containing multiple interactive items (such as `Tabs`, `MenuBar`, `RadioGroup`, or `ListBox`), having every item in the sequential Tab order creates a frustrating "Tab trap" for keyboard users.
- **Rule:** Use the **Roving Tabindex** pattern:
  - Only the *currently active or selected item* has `tabIndex={0}`.
  - All other items have `tabIndex={-1}`.
  - Arrow keys move focus between items, updating the active item's `tabIndex` to `0` and previous to `-1`.

---

## 5. Focus Management & Trapping

### 5.1 Focus Trapping in Overlays (Dialog, Sheet, Drawer)
When a modal overlay is opened:
1. **Focus Trap:** Tab and Shift+Tab must be constrained strictly within the modal container. Focus must never leak to background DOM elements.
2. **Initial Focus:** Focus must automatically move to the first focusable child inside the dialog, or an element explicitly designated via an `initialFocusRef` prop.
3. **Focus Restoration (Crucial):** When the modal is dismissed (via Escape, close button, or backdrop click), focus **must** return to the exact trigger element that opened it.
4. **Inert Background:** The rest of the document must be marked with HTML `inert` or `aria-hidden="true"` to prevent screen reader navigation into inactive background nodes.

### 5.2 Focus Visibility
- Every interactive element must display a clearly discernible focus ring when navigated via keyboard (`:focus-visible`).
- **Rule:** Never use `outline: none` without providing an offset ring (`outline: 2px solid var(--cl-color-focus-ring); outline-offset: 2px;`).

---

## 6. Screen Reader Announcing & Live Regions

### 6.1 State Attributes
Screen readers do not inspect visual colors. Components must broadcast state through ARIA attributes:
- Disclosure / Accordion: `aria-expanded="true | false"` and `aria-controls="content-id"`
- Checkbox / Switch: `aria-checked="true | false | mixed"`
- Radio Group / Select Option: `aria-selected="true | false"`
- Toggle Button: `aria-pressed="true | false"`
- Loading / Busy Containers: `aria-busy="true"`

### 6.2 Dynamic Announcements (`aria-live`)
- **Polite Notifications (`aria-live="polite"`):** Used for non-urgent status updates (e.g., "Search results loaded: 14 items found"). Screen readers announce this when idle.
- **Assertive Alerts (`aria-live="assertive"` or `role="alert"`):** Used for urgent errors and destructive confirmations (e.g., "Network connection lost"). Screen readers interrupt active speech immediately.

---

## 7. Contrast & Visual Accessibility

### 7.1 WCAG 2.2 AA Contrast Ratios
- **Normal Text (< 18pt or < 14pt bold):** Minimum contrast ratio of **4.5:1** against surface background.
- **Large Text (>= 18pt or >= 14pt bold):** Minimum contrast ratio of **3.0:1**.
- **Interactive UI Components & Graphical Objects:** Minimum contrast ratio of **3.0:1** for borders, focus rings, and active states against adjacent surfaces.

### 7.2 Color Independence
- Color must never be the sole visual means of conveying information.
- Error inputs must display both an error border color **and** an icon or helper text message.
- Status badges must display both a background color **and** distinct text labels.

### 7.3 Reduced-Motion Safety & A11y Overrides
Under WCAG 2.2 Success Criterion 2.3.3 (Animation from Interactions), non-essential motion must respect user preferences (`prefers-reduced-motion: reduce`).

To ensure that rogue or cascade animations do not override this user preference, a narrowly scoped `!important` exception is permitted exclusively within reduced-motion media queries:

```css
/* Accessibility Safety Override: Guarantee reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  .cl-component,
  .cl-component * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Architectural Constraints on this Exception:**
1. Must remain strictly inside component styles or global theme reset layer.
2. Must be directly tied to accessibility safety (vestibular disorder prevention).
3. Must include an explanatory comment.
4. Intrinsic CSS timing values (such as `0.01ms`) are permitted as browser mechanics rather than design tokens.

---

## 8. Required Accessibility Testing & Verification

Every component pull request must undergo three mandatory accessibility verification gates:

### 8.1 Automated Axe-Core Tests (`vitest-axe`)
Every component unit test must include an automated axe-core audit:

```tsx
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "./Button";

it("should have zero axe-core accessibility violations", async () => {
  const { container } = render(<Button>Accessible Action</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 8.2 Keyboard Interaction User-Event Tests
Test suites must simulate real keyboard events using `@testing-library/user-event`:
- Verifies Enter and Space trigger activations.
- Verifies Escape dismisses overlays.
- Verifies Arrow keys cycle items with roving tabindex.

### 8.3 Screen Reader Verification Checklist
Complex composite widgets (`Dialog`, `Select`, `Combobox`, `Menu`) must be manually verified with:
- **NVDA** on Windows with Chrome/Firefox.
- **VoiceOver** on macOS with Safari.

---

## 9. What Developers Must Do vs. Never Do

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Accessibility Rule Summary                      │
├───────────────────────────────────┬────────────────────────────────────┤
│ MUST DO                           │ NEVER DO                           │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Use native semantic HTML first. │ • Never use div/span as buttons or │
│ • Guarantee accessible name for   │   links.                           │
│   every interactive control.      │ • Never use outline: none without  │
│ • Implement focus restoration on  │   an accessible replacement ring.  │
│   all overlays upon dismissal.    │ • Never trap keyboard focus in     │
│ • Use roving tabindex on menus,   │   unintended loops.                │
│   tabs, and radio groups.         │ • Never use color as the sole      │
│ • Trap focus in modal dialogs.    │   indicator of state or error.     │
│ • Run automated axe-core tests on │ • Never skip keyboard user-event   │
│   every component test suite.     │   test suites.                     │
└───────────────────────────────────┴────────────────────────────────────┘
```
