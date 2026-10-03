import { CodeBlock } from "../../components/Common/CodeBlock";

export function TokensPage() {
  return (
    <article className="docs-page">
      <h1>Design Tokens</h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        Chellaa React implements a strict 3-tier design token architecture using
        standard CSS Custom Properties.
      </p>

      <section id="token-tiers" style={{ marginTop: "28px" }}>
        <h2 className="docs-heading-2">
          <span>The 3 Token Tiers</span>
          <a href="#token-tiers" className="docs-heading-anchor">
            #
          </a>
        </h2>
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
            <h3 style={{ margin: "0 0 4px 0", color: "#2563eb" }}>
              1. Primitive Tokens
            </h3>
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "0.88rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
              }}
            >
              Raw, literal values: color hexes, pixel radii, animation
              durations. Never used directly in components.
            </p>
            <code>--cl-palette-blue-500: #3b82f6;</code>
          </div>

          <div
            style={{
              padding: "16px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 4px 0", color: "#10b981" }}>
              2. Semantic Tokens
            </h3>
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "0.88rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
              }}
            >
              Contextual design decisions that map primitive values to meaning.
              Switch values across themes.
            </p>
            <code>--cl-color-primary-base: var(--cl-palette-blue-500);</code>
          </div>

          <div
            style={{
              padding: "16px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ margin: "0 0 4px 0", color: "#8b5cf6" }}>
              3. Component Tokens
            </h3>
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "0.88rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
              }}
            >
              Component-scoped variables referencing semantic tokens. Provides
              safe micro-customization boundaries.
            </p>
            <code>--cl-button-primary-bg: var(--cl-color-primary-base);</code>
          </div>
        </div>
      </section>

      <section id="overrides" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Overriding Tokens in CSS</span>
          <a href="#overrides" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>You can customize any token at root or within a scoped container:</p>
        <CodeBlock
          code={`:root {
  --cl-color-primary-base: #6366f1; /* Customize brand primary */
  --cl-radius-md: 6px;             /* Adjust global corner radius */
}`}
          language="css"
          title="styles.css"
        />
      </section>
    </article>
  );
}
