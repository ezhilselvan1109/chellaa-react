export const buttonCssText = `
.ch-btn {
  --ch-btn-bg: var(--ch-color-bg-surface);
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: var(--ch-color-border-default);
  --ch-btn-border-style: solid;
  --ch-btn-hover-bg: var(--ch-color-bg-surface);
  --ch-btn-hover-fg: var(--ch-color-primary);
  --ch-btn-hover-border: var(--ch-color-primary);
  --ch-btn-active-bg: var(--ch-color-bg-surface);
  --ch-btn-active-fg: var(--ch-color-primary-active);
  --ch-btn-active-border: var(--ch-color-primary-active);
  --ch-btn-height: 2.25rem;
  --ch-btn-padding-x: 0.95rem;
  --ch-btn-font-size: var(--ch-font-size-sm);
  --ch-btn-radius: var(--ch-radius-md);
  --ch-wave-color: var(--ch-color-primary);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: var(--ch-btn-height);
  padding-left: var(--ch-btn-padding-x);
  padding-right: var(--ch-btn-padding-x);
  font-family: var(--ch-font-sans);
  font-size: var(--ch-btn-font-size);
  font-weight: var(--ch-font-weight-medium);
  line-height: var(--ch-line-height-none);
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border-radius: var(--ch-btn-radius);
  border-width: 1px;
  border-style: var(--ch-btn-border-style);
  border-color: var(--ch-btn-border);
  background-color: var(--ch-btn-bg);
  color: var(--ch-btn-fg);
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all var(--ch-duration-fast) var(--ch-ease-default);
}

.ch-btn:hover:not(:disabled):not([data-disabled="true"]) {
  background-color: var(--ch-btn-hover-bg);
  color: var(--ch-btn-hover-fg);
  border-color: var(--ch-btn-hover-border);
}

.ch-btn:active:not(:disabled):not([data-disabled="true"]):not([data-loading="true"]) {
  background-color: var(--ch-btn-active-bg);
  color: var(--ch-btn-active-fg);
  border-color: var(--ch-btn-active-border);
  transform: scale(0.985);
}

.ch-btn:focus-visible {
  outline: 2px solid var(--ch-wave-color);
  outline-offset: 2px;
}

.ch-btn:disabled,
.ch-btn[data-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
  box-shadow: none;
}

/* ==========================================================================
   1. Button Types (Ant Design 5 syntactic sugar)
   ========================================================================== */

/* Primary Button */
.ch-btn--primary {
  --ch-btn-bg: var(--ch-color-primary);
  --ch-btn-fg: #ffffff;
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--ch-color-primary-hover);
  --ch-btn-hover-fg: #ffffff;
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: var(--ch-color-primary-active);
  --ch-btn-active-fg: #ffffff;
  --ch-btn-active-border: transparent;
  --ch-wave-color: var(--ch-color-primary);
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}

/* Default Button */
.ch-btn--default,
.ch-btn--secondary {
  --ch-btn-bg: var(--ch-color-bg-surface);
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: var(--ch-color-border-default);
  --ch-btn-hover-bg: var(--ch-color-bg-surface);
  --ch-btn-hover-fg: var(--ch-color-primary);
  --ch-btn-hover-border: var(--ch-color-primary);
  --ch-btn-active-bg: var(--ch-color-bg-surface);
  --ch-btn-active-fg: var(--ch-color-primary-active);
  --ch-btn-active-border: var(--ch-color-primary-active);
  --ch-wave-color: var(--ch-color-primary);
}

/* Dashed Button */
.ch-btn--dashed {
  --ch-btn-bg: var(--ch-color-bg-surface);
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: var(--ch-color-border-default);
  --ch-btn-border-style: dashed;
  --ch-btn-hover-bg: var(--ch-color-bg-surface);
  --ch-btn-hover-fg: var(--ch-color-primary);
  --ch-btn-hover-border: var(--ch-color-primary);
  --ch-btn-active-bg: var(--ch-color-bg-surface);
  --ch-btn-active-fg: var(--ch-color-primary-active);
  --ch-btn-active-border: var(--ch-color-primary-active);
  --ch-wave-color: var(--ch-color-primary);
}

/* Text Button */
.ch-btn--text {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--ch-color-bg-subtle);
  --ch-btn-hover-fg: var(--ch-color-fg-default);
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: var(--ch-color-bg-muted);
  --ch-btn-active-fg: var(--ch-color-fg-default);
  --ch-btn-active-border: transparent;
  box-shadow: none;
}

/* Link Button */
.ch-btn--link {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--ch-color-primary);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: transparent;
  --ch-btn-hover-fg: var(--ch-color-primary-hover);
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: transparent;
  --ch-btn-active-fg: var(--ch-color-primary-active);
  --ch-btn-active-border: transparent;
  box-shadow: none;
}

.ch-btn--link:hover:not(:disabled) {
  text-decoration: underline;
}

/* Outline compatibility alias */
.ch-btn--outline {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--ch-color-primary);
  --ch-btn-border: var(--ch-color-primary);
  --ch-btn-hover-bg: var(--ch-color-primary-subtle);
  --ch-btn-hover-fg: var(--ch-color-primary);
  --ch-btn-hover-border: var(--ch-color-primary-hover);
}

/* ==========================================================================
   2. Danger Modifiers (Works on ALL button types)
   ========================================================================== */
.ch-btn--danger.ch-btn--primary {
  --ch-btn-bg: var(--ch-color-danger);
  --ch-btn-fg: #ffffff;
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--ch-color-danger-hover);
  --ch-btn-hover-fg: #ffffff;
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: var(--ch-color-danger-active);
  --ch-wave-color: var(--ch-color-danger);
  box-shadow: 0 2px 0 rgba(255, 38, 5, 0.08);
}

.ch-btn--danger.ch-btn--default,
.ch-btn--danger.ch-btn--secondary {
  --ch-btn-fg: var(--ch-color-danger);
  --ch-btn-border: var(--ch-color-danger);
  --ch-btn-hover-fg: var(--ch-color-danger-hover);
  --ch-btn-hover-border: var(--ch-color-danger-hover);
  --ch-btn-hover-bg: var(--ch-color-danger-subtle);
  --ch-wave-color: var(--ch-color-danger);
}

.ch-btn--danger.ch-btn--dashed {
  --ch-btn-fg: var(--ch-color-danger);
  --ch-btn-border: var(--ch-color-danger);
  --ch-btn-hover-fg: var(--ch-color-danger-hover);
  --ch-btn-hover-border: var(--ch-color-danger-hover);
  --ch-btn-hover-bg: var(--ch-color-danger-subtle);
  --ch-wave-color: var(--ch-color-danger);
}

.ch-btn--danger.ch-btn--text {
  --ch-btn-fg: var(--ch-color-danger);
  --ch-btn-hover-fg: var(--ch-color-danger-hover);
  --ch-btn-hover-bg: var(--ch-color-danger-subtle);
}

.ch-btn--danger.ch-btn--link {
  --ch-btn-fg: var(--ch-color-danger);
  --ch-btn-hover-fg: var(--ch-color-danger-hover);
}

/* ==========================================================================
   3. Ghost Modifier
   ========================================================================== */
.ch-btn--ghost {
  background-color: transparent !important;
}

.ch-btn--ghost.ch-btn--default,
.ch-btn--ghost.ch-btn--secondary {
  --ch-btn-fg: #ffffff;
  --ch-btn-border: #ffffff;
  --ch-btn-hover-fg: var(--ch-color-primary);
  --ch-btn-hover-border: var(--ch-color-primary);
}

.ch-btn--ghost.ch-btn--primary {
  --ch-btn-fg: var(--ch-color-primary);
  --ch-btn-border: var(--ch-color-primary);
  --ch-btn-hover-fg: var(--ch-color-primary-hover);
  --ch-btn-hover-border: var(--ch-color-primary-hover);
}

.ch-btn--ghost.ch-btn--danger {
  --ch-btn-fg: var(--ch-color-danger);
  --ch-btn-border: var(--ch-color-danger);
  --ch-btn-hover-fg: var(--ch-color-danger-hover);
  --ch-btn-hover-border: var(--ch-color-danger-hover);
}

/* ==========================================================================
   4. Shapes
   ========================================================================== */
.ch-btn--shape-round {
  border-radius: var(--ch-radius-full);
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.ch-btn--shape-circle {
  border-radius: 50%;
  min-width: var(--ch-btn-height);
  width: var(--ch-btn-height);
  padding-left: 0;
  padding-right: 0;
}

/* ==========================================================================
   5. Sizes
   ========================================================================== */
.ch-btn--size-small,
.ch-btn--size-sm,
.ch-btn--sm {
  --ch-btn-height: 1.75rem; /* 28px */
  --ch-btn-padding-x: 0.65rem;
  --ch-btn-font-size: var(--ch-font-size-xs);
  --ch-btn-radius: var(--ch-radius-sm);
}

.ch-btn--size-medium,
.ch-btn--size-md,
.ch-btn--md {
  --ch-btn-height: 2.25rem; /* 36px */
  --ch-btn-padding-x: 0.95rem;
  --ch-btn-font-size: var(--ch-font-size-sm);
  --ch-btn-radius: var(--ch-radius-md);
}

.ch-btn--size-large,
.ch-btn--size-lg,
.ch-btn--lg {
  --ch-btn-height: 2.75rem; /* 44px */
  --ch-btn-padding-x: 1.35rem;
  --ch-btn-font-size: var(--ch-font-size-base);
  --ch-btn-radius: var(--ch-radius-lg);
}

/* ==========================================================================
   6. Block (Full Width)
   ========================================================================== */
.ch-btn--block,
.ch-btn--full-width {
  width: 100%;
  display: flex;
}

/* ==========================================================================
   7. Loading State
   ========================================================================== */
.ch-btn--loading {
  cursor: wait;
}

.ch-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

/* ==========================================================================
   8. Ant Design Wave Effect
   ========================================================================== */
.ch-btn--waving::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  pointer-events: none;
  animation: ch-btn-wave 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
}

@keyframes ch-btn-wave {
  0% {
    box-shadow: 0 0 0 0 var(--ch-wave-color);
    opacity: 0.75;
  }
  100% {
    box-shadow: 0 0 0 6px var(--ch-wave-color);
    opacity: 0;
  }
}
`;
