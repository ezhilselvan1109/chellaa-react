import { Callout } from "../../components/Common/Callout";

export function AccessibilityGuidePage() {
  return (
    <article className="docs-page">
      <h1>Accessibility Standards (WCAG 2.2 AA)</h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        Accessibility is not an afterthought in Chellaa React — every component
        is engineered to comply with WCAG 2.2 AA standards out of the box.
      </p>

      <section style={{ marginTop: "28px" }}>
        <h2>Core Accessibility Principles</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              padding: "16px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 6px 0" }}>
              1. Native HTML Semantics First
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
                lineHeight: 1.5,
              }}
            >
              We use native HTML interactive elements (
              <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>) whenever
              possible to leverage built-in browser keyboard interaction and
              assistive technology roles.
            </p>
          </div>

          <div
            style={{
              padding: "16px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 6px 0" }}>
              2. Focus Visibility & Keymaps
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
                lineHeight: 1.5,
              }}
            >
              All focusable controls display a prominent <code>2px solid</code>{" "}
              focus ring via <code>:focus-visible</code> with a 2px offset.
              Focus is never suppressed.
            </p>
          </div>

          <div
            style={{
              padding: "16px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 6px 0" }}>3. Automated Testing in CI</h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
                lineHeight: 1.5,
              }}
            >
              Every component is tested with <code>vitest-axe</code> (axe-core)
              across all its visual variants, sizes, and states. Tests fail if
              violations occur.
            </p>
          </div>
        </div>
      </section>

      <Callout type="warning" title="Icon-Only Elements">
        When using icon-only buttons with no textual children, always provide an
        explicit <code>aria-label</code> so screen readers can announce the
        button&apos;s action.
      </Callout>
    </article>
  );
}
