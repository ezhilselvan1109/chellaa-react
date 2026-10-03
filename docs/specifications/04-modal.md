# Dialog (Modal) Component Specification

**Document Status:** Approved & Baseline  
**Phase:** 3 — Component Specifications  
**Target Package:** `@chellaa/react`  
**Governing Standard:** [00-component-feature-matrix.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/00-component-feature-matrix.md) & [01-api-conventions.md](file:///d:/learning/Microservice/ui-componenet/chellaa-react/docs/specifications/01-api-conventions.md)  

---

## 1. Identity

```text
Component Name:     Dialog (Canonical) / Modal (Compatibility Alias)
Package Export:     import { Dialog, Modal } from "@chellaa/react";
Category:           Overlays
Status:             Approved & Implementation Ready
Phase:              3 — Component Specifications
Related Components: AlertDialog, Drawer, Popover
```

### Canonical Name Formalization
In Chellaa React, **`Dialog` is the canonical component name**, strictly conforming to the W3C WAI-ARIA APG Dialog (Modal) pattern and HTML `<dialog>` semantics. `Modal` is exported as an exact compatibility alias (`export const Modal = Dialog; export type ModalProps = DialogProps;`) to support developer familiarity with zero friction.

---

## 2. Purpose

The `Dialog` component interrupts the user's current workflow to present critical information, prompt for an immediate decision, or encapsulate a focused sub-task without navigating away from the active screen.

### When to Use
- Critical user confirmations (destructive actions, unsaved changes).
- Focused multi-step workflows (creating a resource, editing complex profile settings).
- Self-contained forms requiring isolated user attention.

### When NOT to Use
- **Do NOT use for non-critical notifications.** Use `Toast` or `Notification`.
- **Do NOT use for lightweight contextual menus or pickers.** Use `Popover`, `Menu`, or `Tooltip`.
- **Do NOT stack more than 2 dialogs deeply.** Deeply nested dialogs degrade UX and create confusing focus hierarchies.

---

## 3. Scope

### In Scope
- Compound component structure (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Portal`, `Dialog.Overlay`, `Dialog.Content`, `Dialog.Header`, `Dialog.Title`, `Dialog.Description`, `Dialog.Body`, `Dialog.Footer`, `Dialog.Close`).
- Controlled (`isOpen`, `onClose`) and uncontrolled (`defaultOpen`) visibility states.
- Automated **Focus Trapping**: Tab and Shift+Tab constrained within dialog container.
- **Initial Focus Management**: Focuses first interactive element, or element referenced by `initialFocusRef`.
- **Focus Restoration**: Focus unconditionally restored to triggering element upon dialog dismissal.
- Dismissal triggers: Escape key, backdrop click, explicit close button (`Dialog.Close`).
- Background scroll locking: Disables scrolling on `document.body` while dialog is active.
- Accessible name binding via `aria-labelledby` and `aria-describedby`.
- 5 dialog sizes: `sm`, `md` (default), `lg`, `xl`, `full`.

---

## 4. Non-Goals

- Modeless floating windows that permit simultaneous interaction with the background.
- Draggable or resizable desktop windows.

---

## 5. Feature Summary

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Dialog Feature Summary                          │
├────────────────────┬───────────────────────────────────────────────────┤
│ Architecture       │ Compound WAI-ARIA APG Dialog (Modal) pattern      │
├────────────────────┼───────────────────────────────────────────────────┤
│ Focus Security     │ Hard focus trapping, initial focus, focus return  │
├────────────────────┼───────────────────────────────────────────────────┤
│ Dismissal Physics  │ Escape key, backdrop click, close button          │
├────────────────────┼───────────────────────────────────────────────────┤
│ Background Lock    │ Disables document.body scroll; marks DOM inert    │
├────────────────────┼───────────────────────────────────────────────────┤
│ Sizing Scale       │ sm (400px), md (560px), lg (720px), xl (960px),   │
│                    │ full (100vw/100vh)                                │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 6. Anatomy

```text
Dialog.Root (State & Context Provider)
└── Dialog.Trigger (HTML <button>)
└── Dialog.Portal (React DOM Portal rendered into document.body)
    ├── Dialog.Overlay (.cl-dialog__overlay) (Backdrop)
    └── Dialog.Content (.cl-dialog__content) (HTML <div role="dialog" aria-modal="true">)
        ├── Dialog.Header (.cl-dialog__header)
        │   ├── Dialog.Title (.cl-dialog__title) (HTML <h2 id="dialog-title">)
        │   ├── Dialog.Description (.cl-dialog__desc) (HTML <p id="dialog-desc">)
        │   └── Dialog.Close (.cl-dialog__close-button) (Icon button)
        ├── Dialog.Body (.cl-dialog__body)
        └── Dialog.Footer (.cl-dialog__footer)
```

---

## 7. Public API

### `Dialog.Root` Props
```typescript
export interface DialogRootProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  finalFocusRef?: React.RefObject<HTMLElement | null>;
  size?: DialogSize;
  isCentered?: boolean;
  children: React.ReactNode;
}
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Dialog.Root Props                                    │
├─────────────────────┬─────────────────────────┬──────────┬───────────┬──────────────────┤
│ Prop Name           │ Type                    │ Req/Opt  │ Default   │ A11y Impact      │
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ isOpen              │ boolean                 │ Optional │ undefined │ Controlled open  │
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ defaultOpen         │ boolean                 │ Optional │ false     │ Uncontrolled open│
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ onClose             │ () => void              │ Optional │ undefined │ Close callback   │
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ closeOnEsc          │ boolean                 │ Optional │ true      │ Escape dismissal │
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ closeOnOverlayClick │ boolean                 │ Optional │ true      │ Backdrop click   │
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ initialFocusRef     │ React.RefObject<HTML..> │ Optional │ undefined │ Target auto-focus│
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ finalFocusRef       │ React.RefObject<HTML..> │ Optional │ undefined │ Focus target exit│
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ size                │ DialogSize              │ Optional │ "md"      │ Dialog max-width │
├─────────────────────┼─────────────────────────┼──────────┼───────────┼──────────────────┤
│ isCentered          │ boolean                 │ Optional │ true      │ Center placement │
└─────────────────────┴─────────────────────────┴──────────┴───────────┴──────────────────┘
```

---

## 8. TypeScript Types

```typescript
export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogRootProps {
  /**
   * Controlled open state of the dialog.
   */
  isOpen?: boolean;

  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when dismissal is requested (via Escape, overlay, or close button).
   */
  onClose?: () => void;

  /**
   * If true, pressing Escape dismisses the dialog.
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * If true, clicking the backdrop overlay dismisses the dialog.
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Explicit DOM element to focus when the dialog opens.
   * Eliminates unsafe `any` types.
   */
  initialFocusRef?: React.RefObject<HTMLElement | null>;

  /**
   * Explicit DOM element to focus when the dialog closes.
   * Defaults to the triggering element.
   */
  finalFocusRef?: React.RefObject<HTMLElement | null>;

  /**
   * Dialog spatial max-width scale.
   * @default "md"
   */
  size?: DialogSize;

  /**
   * If true, vertically centers the dialog in the viewport.
   * @default true
   */
  isCentered?: boolean;

  children: React.ReactNode;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}
```

---

## 9. Variants

Dialog variants are expressed through spatial max-widths:
- `sm`: Max-width 400px (Confirmations, alerts).
- `md` (Default): Max-width 560px (Standard forms).
- `lg`: Max-width 720px (Multi-column content).
- `xl`: Max-width 960px (Data grids, previews).
- `full`: 100vw, 100vh (Mobile takeovers, fullscreen editors).

---

## 10. Sizes

Constrained by design tokens:
- `sm`: 400px max-width, 16px padding.
- `md`: 560px max-width, 20px padding.
- `lg`: 720px max-width, 24px padding.
- `xl`: 960px max-width, 32px padding.
- `full`: 100vw width, 100vh height.

---

## 11. States

- **Opening / Mount:** Backdrop fades in (`opacity: 0 -> 1`), Dialog content scales gently (`scale(0.96) -> scale(1)`).
- **Active / Open:** Focus trapped inside dialog, background content marked `inert`.
- **Closing / Unmount:** Fast fade out and scale down, focus returned to trigger.

---

## 12. Behavior

### State Transition Matrix
| Current State | User Action | Next State | Effect |
|---|---|---|---|
| Closed | Trigger clicked | Open | Lock scroll; mount portal; trap focus; focus first node |
| Open | Escape key pressed | Closed | Unmount portal; unlock scroll; restore focus to trigger |
| Open | Overlay clicked | Closed | Trigger `onClose()`; dismiss modal |
| Open | Close button clicked | Closed | Trigger `onClose()`; dismiss modal |
| Open | Tab on last element | Open | Cycle focus to first focusable element inside modal |
| Open | Shift+Tab on first element | Open | Cycle focus to last focusable element inside modal |

---

## 13. Controlled / Uncontrolled

### Controlled Usage
```tsx
const [isOpen, setIsOpen] = useState(false);
<Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
<Dialog.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Header><Dialog.Title>Account Settings</Dialog.Title></Dialog.Header>
      <Dialog.Body>Settings content...</Dialog.Body>
      <Dialog.Footer><Button onClick={() => setIsOpen(false)}>Save</Button></Dialog.Footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

---

## 14. Events

- `onClose: () => void`: Triggered when dismissal is initiated (Escape key, close button click, or backdrop click).

---

## 15. Composition

- `Dialog.Trigger` and `Dialog.Close` support `asChild` for zero-DOM button delegation.
- Compound export structure:
  ```tsx
  export const Dialog = Object.assign(DialogRoot, {
    Trigger: DialogTrigger,
    Portal: DialogPortal,
    Overlay: DialogOverlay,
    Content: DialogContent,
    Header: DialogHeader,
    Title: DialogTitle,
    Description: DialogDescription,
    Body: DialogBody,
    Footer: DialogFooter,
    Close: DialogClose,
  });
  export const Modal = Dialog;
  ```

---

## 16. Ref Contract

- `Dialog.Content` forwards ref to `HTMLDivElement`.
- Accepts `initialFocusRef` and `finalFocusRef` with exact `React.RefObject<HTMLElement | null>` typing.

---

## 17. Accessibility

### 17.1 WAI-ARIA APG Roles
- Root container: `<div role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId}>`.
- Automatic ID linkage: `Dialog.Title` automatically binds `aria-labelledby`.
- `Dialog.Description` automatically binds `aria-describedby`.

### 17.2 Focus Trapping Mandate
- Keyboard Tab navigation must **never leak to the background document**.
- Background elements outside the portal are marked `inert` or `aria-hidden="true"`.

### 17.3 Focus Restoration Mandate
- Upon closing, focus **must be returned to the exact element that opened the dialog**.

---

## 18. Keyboard Interaction

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Dialog Keyboard Keymap                         │
├────────────────────┬───────────────────────────────────────────────────┤
│ Key / Combination  │ Expected APG Action                               │
├────────────────────┼───────────────────────────────────────────────────┤
│ Tab                │ Advances focus to next focusable element in dialog│
│                    │ Loops from last element to first element.         │
├────────────────────┼───────────────────────────────────────────────────┤
│ Shift + Tab        │ Moves focus to previous element in dialog.        │
│                    │ Loops from first element to last element.         │
├────────────────────┼───────────────────────────────────────────────────┤
│ Escape             │ Dismisses the dialog and restores focus.          │
└────────────────────┴───────────────────────────────────────────────────┘
```

---

## 19. Styling Contract

```css
@layer cl-components {
  .cl-dialog__overlay {
    position: fixed;
    inset: 0;
    z-index: var(--cl-z-modal);
    background-color: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding: var(--cl-space-4);
  }

  .cl-dialog__content {
    position: relative;
    width: 100%;
    background-color: var(--cl-color-bg-elev);
    border: 1px solid var(--cl-color-border-sub);
    border-radius: var(--cl-rad-lg);
    box-shadow: var(--cl-shadow-xl);
    outline: none;
  }

  .cl-dialog__header {
    padding: var(--cl-space-5);
    border-bottom: 1px solid var(--cl-color-border-sub);
  }

  .cl-dialog__title {
    margin: 0;
    font-size: var(--cl-font-lg);
    font-weight: 600;
    color: var(--cl-color-fg-primary);
  }

  .cl-dialog__desc {
    margin: var(--cl-space-1) 0 0 0;
    font-size: var(--cl-font-sm);
    color: var(--cl-color-fg-muted);
  }

  .cl-dialog__body {
    padding: var(--cl-space-5);
    color: var(--cl-color-fg-second);
  }

  .cl-dialog__footer {
    padding: var(--cl-space-4) var(--cl-space-5);
    border-top: 1px solid var(--cl-color-border-sub);
    display: flex;
    justify-content: flex-end;
    gap: var(--cl-space-3);
  }
}
```

---

## 20. Theme Contract

- Dialog surfaces utilize elevated dark mode tokens (`--cl-color-bg-elev`, `--cl-shadow-xl`), providing distinct visual elevation above dark canvases.

---

## 21. Responsive Behavior

- On viewports < 640px, dialogs adapt to width 100% with bottom-docked or margin-padded positioning.

---

## 22. Motion

Under `prefers-reduced-motion: reduce`:
```css
@media (prefers-reduced-motion: reduce) {
  .cl-dialog__overlay,
  .cl-dialog__content {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 23. Testing

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Dialog Test Matrix                             │
├───────────────────────────────────┬────────────────────────────────────┤
│ Category                          │ Applicability & Verification       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 1. Rendering / Prop Pass-through  │ Applicable: verifies Portal,       │
│                                   │ Overlay, Content mounting.         │
├───────────────────────────────────┼────────────────────────────────────┤
│ 2. User Interaction Suite         │ Applicable: opening, backdrop      │
│                                   │ click closes, close button closes. │
├───────────────────────────────────┼────────────────────────────────────┤
│ 3. Accessibility / axe-core       │ Applicable: zero violations with   │
│                                   │ role="dialog" & aria-labelledby.   │
├───────────────────────────────────┼────────────────────────────────────┤
│ 4. Keyboard Navigation Physics    │ Applicable: Escape dismisses,      │
│                                   │ Tab loops inside container.        │
├───────────────────────────────────┼────────────────────────────────────┤
│ 5. Controlled / Uncontrolled      │ Applicable: isOpen / onClose vs.   │
│                                   │ defaultOpen.                       │
├───────────────────────────────────┼────────────────────────────────────┤
│ 6. Disabled / Loading State Guards│ N/A — Overlays do not possess      │
│                                   │ disabled states (children buttons  │
│                                   │ handle disabled states).           │
├───────────────────────────────────┼────────────────────────────────────┤
│ 7. SSR & RSC Compatibility        │ Applicable: safe client portal     │
│                                   │ mounting without hydration crash.  │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 24. Storybook

1. `Default`: Confirmation dialog with Cancel and Confirm buttons.
2. `FormDialog`: Dialog containing inputs and validation.
3. `Sizes`: Side-by-side display of `sm`, `md`, `lg`, `xl`, `full`.
4. `InitialFocus`: Dialog targeting a specific input on mount.
5. `ScrollingContent`: Dialog with long scrollable body text.
6. `DarkTheme`: Verified under Dark Mode surface elevation.

---

## 25. Documentation Requirements

- Live example of accessible dialog workflow.
- Complete API table for all compound sub-components.
- Accessibility guide: Focus trapping, focus restoration, label associations.

---

## 26. Edge Cases

1. **Focus Leak on Tab:** Tab on last element wraps strictly to first interactive child.
2. **Scroll Lock Residual:** Ensure `overflow: hidden` is removed from `document.body` even if component unmounts unexpectedly.
3. **Double Escape Key:** Dismisses only the top-most dialog if nested.

---

## 27. Reference Library Comparison

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Dialog Reference Comparison Matrix                   │
├───────────────────┬────────────────────┬───────────────────────────────┤
│ Material UI (MUI) │ Ant Design (AntD)  │ Chellaa React Selected        │
├───────────────────┼────────────────────┼───────────────────────────────┤
│ Dialog            │ Modal              │ Dialog (canonical) / Modal (al│
│ DialogTitle       │ title prop         │ Dialog.Title slot             │
│ DialogContent     │ children           │ Dialog.Body slot              │
│ DialogActions     │ footer prop        │ Dialog.Footer slot            │
│ fullScreen        │ width="100vw"      │ size="full"                   │
│ disablePortal     │ getContainer       │ Rendered via Dialog.Portal    │
└───────────────────┴────────────────────┴───────────────────────────────┘
```

---

## 28. Deferred Features

- **Nested Draggable Modals:** Deferred to specialized windowing extensions.
- **Modeless Floating Windows:** Handled by a dedicated floating inspector component.

---

## 29. Acceptance Criteria

- [ ] Focus strictly trapped inside dialog while open.
- [ ] Focus restored to trigger element upon closing.
- [ ] Escape key dismisses dialog.
- [ ] Backdrop click dismisses dialog (when enabled).
- [ ] Background scroll locked when dialog is open.
- [ ] `aria-modal="true"`, `role="dialog"`, `aria-labelledby`, `aria-describedby` properly set.
- [ ] Zero axe-core accessibility violations.
- [ ] Styled in `@layer cl-components` using `--cl-*` tokens.

---

## 30. Definition of Done

The Dialog/Modal specification is approved, hardened against reference libraries, verified for cross-document consistency, and ready for Phase 4 implementation.
