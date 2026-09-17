export const inputCssText = `
.ch-input {
  width: 100%;
  font-family: var(--ch-font-sans);
  background-color: var(--ch-color-bg-surface);
  color: var(--ch-color-fg-default);
  border: 1px solid var(--ch-color-border-default);
  border-radius: var(--ch-radius-md);
  outline: none;
  box-sizing: border-box;
  transition: border-color var(--ch-duration-fast) var(--ch-ease-default),
              box-shadow var(--ch-duration-fast) var(--ch-ease-default);
}

.ch-input::placeholder {
  color: var(--ch-color-fg-subtle);
}

.ch-input:hover:not(:disabled) {
  border-color: var(--ch-color-border-strong);
}

.ch-input:focus-visible {
  border-color: var(--ch-color-primary);
  box-shadow: 0 0 0 2px var(--ch-color-primary-subtle);
}

.ch-input--sm {
  height: 2rem;
  padding: 0 0.65rem;
  font-size: var(--ch-font-size-xs);
}

.ch-input--md {
  height: 2.5rem;
  padding: 0 0.85rem;
  font-size: var(--ch-font-size-sm);
}

.ch-input--lg {
  height: 3rem;
  padding: 0 1.15rem;
  font-size: var(--ch-font-size-base);
}

.ch-input--invalid {
  border-color: var(--ch-color-danger) !important;
}

.ch-input--invalid:focus-visible {
  box-shadow: 0 0 0 2px var(--ch-color-danger-subtle) !important;
}

.ch-input:disabled {
  background-color: var(--ch-color-bg-muted);
  cursor: not-allowed;
  opacity: 0.6;
}
`;
