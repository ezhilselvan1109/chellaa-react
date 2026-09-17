/**
 * Chella UI - Core Theme Tokens & Reset Stylesheet
 * Injected automatically on demand.
 */

export const tokensCssText = `
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root,
[data-theme="light"] {
  /* Typography */
  --ch-font-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --ch-font-mono: "JetBrains Mono", "Fira Code", SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --ch-font-size-xs: 0.75rem;
  --ch-font-size-sm: 0.875rem;
  --ch-font-size-base: 1rem;
  --ch-font-size-lg: 1.125rem;
  --ch-font-size-xl: 1.25rem;
  --ch-font-size-2xl: 1.5rem;

  --ch-font-weight-normal: 400;
  --ch-font-weight-medium: 500;
  --ch-font-weight-semibold: 600;
  --ch-font-weight-bold: 700;

  --ch-line-height-none: 1;
  --ch-line-height-tight: 1.25;
  --ch-line-height-normal: 1.5;

  /* Spacing */
  --ch-space-0: 0px;
  --ch-space-1: 0.25rem;
  --ch-space-2: 0.5rem;
  --ch-space-3: 0.75rem;
  --ch-space-4: 1rem;
  --ch-space-6: 1.5rem;
  --ch-space-8: 2rem;

  /* Radii */
  --ch-radius-none: 0px;
  --ch-radius-sm: 0.25rem;
  --ch-radius-md: 0.375rem;
  --ch-radius-lg: 0.5rem;
  --ch-radius-xl: 0.75rem;
  --ch-radius-full: 9999px;

  /* Shadows */
  --ch-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --ch-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --ch-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Motion */
  --ch-duration-fast: 150ms;
  --ch-duration-normal: 200ms;
  --ch-ease-default: cubic-bezier(0.4, 0, 0.2, 1);

  /* Semantic - Light */
  --ch-color-bg-canvas: #f8fafc;
  --ch-color-bg-surface: #ffffff;
  --ch-color-bg-subtle: #f1f5f9;
  --ch-color-bg-muted: #e2e8f0;
  --ch-color-bg-overlay: rgba(15, 23, 42, 0.5);

  --ch-color-fg-default: #0f172a;
  --ch-color-fg-muted: #475569;
  --ch-color-fg-subtle: #94a3b8;
  --ch-color-fg-on-primary: #ffffff;
  --ch-color-fg-on-danger: #ffffff;

  --ch-color-border-default: #e2e8f0;
  --ch-color-border-subtle: #f1f5f9;
  --ch-color-border-strong: #cbd5e1;

  --ch-color-primary: #2563eb;
  --ch-color-primary-hover: #1d4ed8;
  --ch-color-primary-active: #1e40af;
  --ch-color-primary-subtle: #eff6ff;
  --ch-color-primary-fg: #1d4ed8;

  --ch-color-success: #059669;
  --ch-color-success-hover: #047857;
  --ch-color-success-subtle: #ecfdf5;
  --ch-color-success-fg: #047857;

  --ch-color-danger: #e11d48;
  --ch-color-danger-hover: #be123c;
  --ch-color-danger-active: #9f1239;
  --ch-color-danger-subtle: #fff1f2;
  --ch-color-danger-fg: #be123c;

  --ch-ring-color: #3b82f6;
  --ch-ring-offset: #ffffff;
  --ch-ring-width: 2px;
}

[data-theme="dark"] {
  --ch-color-bg-canvas: #020617;
  --ch-color-bg-surface: #0f172a;
  --ch-color-bg-subtle: #1e293b;
  --ch-color-bg-muted: #334155;
  --ch-color-bg-overlay: rgba(0, 0, 0, 0.75);

  --ch-color-fg-default: #f8fafc;
  --ch-color-fg-muted: #94a3b8;
  --ch-color-fg-subtle: #64748b;
  --ch-color-fg-on-primary: #ffffff;
  --ch-color-fg-on-danger: #ffffff;

  --ch-color-border-default: #1e293b;
  --ch-color-border-subtle: #0f172a;
  --ch-color-border-strong: #334155;

  --ch-color-primary: #3b82f6;
  --ch-color-primary-hover: #60a5fa;
  --ch-color-primary-active: #2563eb;
  --ch-color-primary-subtle: #172554;
  --ch-color-primary-fg: #93c5fd;

  --ch-color-success: #10b981;
  --ch-color-success-hover: #34d399;
  --ch-color-success-subtle: #022c22;
  --ch-color-success-fg: #6ee7b7;

  --ch-color-danger: #f43f5e;
  --ch-color-danger-hover: #fb7185;
  --ch-color-danger-active: #e11d48;
  --ch-color-danger-subtle: #4c0519;
  --ch-color-danger-fg: #fda4af;

  --ch-ring-color: #60a5fa;
  --ch-ring-offset: #0f172a;
}
`;
