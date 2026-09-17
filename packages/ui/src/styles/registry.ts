/**
 * Chella UI - Component Style Registry (Ant Design v5 inspired)
 * Automatically injects component styles on-demand into document.head.
 * Consumers do NOT need to import any CSS files manually.
 */

const injectedCache = new Set<string>();

/**
 * Injects a style block into document.head once per unique ID.
 * Completely no-op in SSR environments.
 */
export function injectStyle(id: string, cssText: string): void {
  if (typeof document === "undefined") {
    return;
  }

  if (injectedCache.has(id)) {
    return;
  }

  if (document.getElementById(id)) {
    injectedCache.add(id);
    return;
  }

  const styleEl = document.createElement("style");
  styleEl.id = id;
  styleEl.setAttribute("data-chella-component", id);
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
  injectedCache.add(id);
}
