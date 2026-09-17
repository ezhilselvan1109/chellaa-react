export const badgeCssText = `
.ch-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ch-font-sans);
  font-weight: var(--ch-font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: var(--ch-radius-full);
  border: 1px solid transparent;
  transition: background-color var(--ch-duration-fast) var(--ch-ease-default);
}

.ch-badge--sm {
  font-size: var(--ch-font-size-xs);
  padding: 0.2rem 0.55rem;
  gap: 0.25rem;
}

.ch-badge--md {
  font-size: var(--ch-font-size-sm);
  padding: 0.3rem 0.75rem;
  gap: 0.375rem;
}

.ch-badge--default {
  background-color: var(--ch-color-bg-subtle);
  color: var(--ch-color-fg-muted);
  border-color: var(--ch-color-border-default);
}

.ch-badge--primary {
  background-color: var(--ch-color-primary-subtle);
  color: var(--ch-color-primary);
  border-color: rgba(37, 99, 235, 0.2);
}

.ch-badge--success {
  background-color: var(--ch-color-success-subtle);
  color: var(--ch-color-success);
  border-color: rgba(16, 185, 129, 0.2);
}

.ch-badge--warning {
  background-color: var(--ch-color-warning-subtle);
  color: var(--ch-color-warning-fg);
  border-color: rgba(245, 158, 11, 0.2);
}

.ch-badge--danger {
  background-color: var(--ch-color-danger-subtle);
  color: var(--ch-color-danger);
  border-color: rgba(244, 63, 94, 0.2);
}

.ch-badge--outline {
  background-color: transparent;
  color: var(--ch-color-fg-default);
  border-color: var(--ch-color-border-strong);
}
`;
