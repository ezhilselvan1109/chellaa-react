export const buttonCssText = `
.ch-btn {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: transparent;
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: transparent;
  --ch-btn-height: 2.5rem;
  --ch-btn-padding-x: 1rem;
  --ch-btn-font-size: var(--ch-font-size-sm);
  --ch-btn-radius: var(--ch-radius-md);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ch-space-2);
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
  border: 1px solid var(--ch-btn-border);
  background-color: var(--ch-btn-bg);
  color: var(--ch-btn-fg);
  cursor: pointer;
  transition: background-color var(--ch-duration-fast) var(--ch-ease-default),
              border-color var(--ch-duration-fast) var(--ch-ease-default),
              color var(--ch-duration-fast) var(--ch-ease-default),
              box-shadow var(--ch-duration-fast) var(--ch-ease-default),
              transform 100ms ease;
}

.ch-btn:focus-visible {
  outline: var(--ch-ring-width) solid var(--ch-ring-color);
  outline-offset: 2px;
}

.ch-btn:active:not(:disabled):not([data-disabled="true"]):not([data-loading="true"]) {
  transform: scale(0.98);
}

.ch-btn:disabled,
.ch-btn[data-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.55;
}

/* Variants */
.ch-btn--primary {
  --ch-btn-bg: var(--ch-color-primary);
  --ch-btn-fg: var(--ch-color-fg-on-primary);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--ch-color-primary-hover);
  --ch-btn-active-bg: var(--ch-color-primary-active);
  box-shadow: var(--ch-shadow-sm);
}

.ch-btn--primary:hover:not(:disabled) {
  background-color: var(--ch-btn-hover-bg);
}

.ch-btn--primary:active:not(:disabled) {
  background-color: var(--ch-btn-active-bg);
}

.ch-btn--secondary {
  --ch-btn-bg: var(--ch-color-bg-subtle);
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: var(--ch-color-border-default);
  --ch-btn-hover-bg: var(--ch-color-bg-muted);
  --ch-btn-hover-border: var(--ch-color-border-strong);
}

.ch-btn--secondary:hover:not(:disabled) {
  background-color: var(--ch-btn-hover-bg);
  border-color: var(--ch-btn-hover-border);
}

.ch-btn--outline {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--ch-color-primary);
  --ch-btn-border: var(--ch-color-primary);
  --ch-btn-hover-bg: var(--ch-color-primary-subtle);
}

.ch-btn--outline:hover:not(:disabled) {
  background-color: var(--ch-btn-hover-bg);
}

.ch-btn--ghost {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--ch-color-bg-subtle);
}

.ch-btn--ghost:hover:not(:disabled) {
  background-color: var(--ch-btn-hover-bg);
}

.ch-btn--danger {
  --ch-btn-bg: var(--ch-color-danger);
  --ch-btn-fg: var(--ch-color-fg-on-danger);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--ch-color-danger-hover);
  --ch-btn-active-bg: var(--ch-color-danger-active);
  box-shadow: var(--ch-shadow-sm);
}

.ch-btn--danger:hover:not(:disabled) {
  background-color: var(--ch-btn-hover-bg);
}

.ch-btn--danger:active:not(:disabled) {
  background-color: var(--ch-btn-active-bg);
}

/* Sizes */
.ch-btn--sm {
  --ch-btn-height: 2rem;
  --ch-btn-padding-x: 0.75rem;
  --ch-btn-font-size: var(--ch-font-size-xs);
  --ch-btn-radius: var(--ch-radius-sm);
}

.ch-btn--md {
  --ch-btn-height: 2.5rem;
  --ch-btn-padding-x: 1rem;
  --ch-btn-font-size: var(--ch-font-size-sm);
  --ch-btn-radius: var(--ch-radius-md);
}

.ch-btn--lg {
  --ch-btn-height: 3rem;
  --ch-btn-padding-x: 1.5rem;
  --ch-btn-font-size: var(--ch-font-size-base);
  --ch-btn-radius: var(--ch-radius-lg);
}

/* Modifiers */
.ch-btn--full-width {
  width: 100%;
  display: flex;
}

.ch-btn--loading {
  cursor: wait;
}
`;
