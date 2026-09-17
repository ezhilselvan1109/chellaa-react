/**
 * Chella UI - Client-side style injection fallback.
 * Automatically injects core design token variables if styles.css was omitted in browser environments.
 * Idempotent: runs at most once.
 */

const STYLE_TAG_ID = "chella-ui-styles-fallback";

export function injectChellaStyles(): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (document.getElementById(STYLE_TAG_ID)) {
    return;
  }

  const styleEl = document.createElement("style");
  styleEl.id = STYLE_TAG_ID;
  styleEl.setAttribute("data-chella", "tokens");
  // Minimal fallback ensuring CSS variables exist
  styleEl.textContent = `
    :root {
      --ch-font-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --ch-color-bg-canvas: #f8fafc;
      --ch-color-bg-surface: #ffffff;
      --ch-color-fg-default: #0f172a;
      --ch-color-primary: #2563eb;
      --ch-color-primary-hover: #1d4ed8;
      --ch-radius-md: 0.375rem;
      --ch-ring-color: #3b82f6;
      --ch-ring-width: 2px;
    }
    [data-theme="dark"] {
      --ch-color-bg-canvas: #020617;
      --ch-color-bg-surface: #0f172a;
      --ch-color-fg-default: #f8fafc;
      --ch-color-primary: #3b82f6;
      --ch-color-primary-hover: #60a5fa;
      --ch-ring-color: #60a5fa;
    }
  `;
  document.head.appendChild(styleEl);
}

// Automatically invoke on module evaluation in browser
if (typeof window !== "undefined") {
  injectChellaStyles();
}
