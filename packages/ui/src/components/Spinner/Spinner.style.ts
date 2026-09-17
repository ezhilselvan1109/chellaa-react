export const spinnerCssText = `
@keyframes ch-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.ch-spinner {
  display: inline-block;
  flex-shrink: 0;
  animation: ch-spin 0.75s linear infinite;
  color: currentColor;
}

.ch-spinner--xs {
  width: 0.75rem;
  height: 0.75rem;
}

.ch-spinner--sm {
  width: 1rem;
  height: 1rem;
}

.ch-spinner--md {
  width: 1.25rem;
  height: 1.25rem;
}

.ch-spinner--lg {
  width: 1.75rem;
  height: 1.75rem;
}
`;
