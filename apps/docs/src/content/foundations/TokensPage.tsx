import { FiLayers, FiTarget, FiBox } from "react-icons/fi";
import { CodeBlock } from "../../components/Common/CodeBlock";

export function TokensPage() {
  const spacingTokens = [
    { token: "--cl-spacing-1", val: "4px" },
    { token: "--cl-spacing-2", val: "8px" },
    { token: "--cl-spacing-3", val: "12px" },
    { token: "--cl-spacing-4", val: "16px" },
    { token: "--cl-spacing-5", val: "20px" },
    { token: "--cl-spacing-6", val: "24px" },
    { token: "--cl-spacing-8", val: "32px" },
    { token: "--cl-spacing-12", val: "48px" },
    { token: "--cl-spacing-16", val: "64px" },
  ];

  const radiusTokens = [
    { name: "sm", token: "--cl-radius-sm", val: "4px" },
    { name: "md", token: "--cl-radius-md", val: "8px" },
    { name: "lg", token: "--cl-radius-lg", val: "12px" },
    { name: "xl", token: "--cl-radius-xl", val: "16px" },
    { name: "full", token: "--cl-radius-full", val: "9999px" },
  ];

  const shadowTokens = [
    {
      name: "sm",
      token: "--cl-shadow-sm",
      val: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    {
      name: "md",
      token: "--cl-shadow-md",
      val: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    {
      name: "lg",
      token: "--cl-shadow-lg",
      val: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    {
      name: "xl",
      token: "--cl-shadow-xl",
      val: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    },
  ];

  return (
    <article className="docs-page">
      <h1 className="docs-page-title">Design Tokens Architecture</h1>
      <p className="docs-page-desc">
        Chellaa React implements a strict 3-tier design token architecture using
        standard CSS Custom Properties, providing infinite customizability
        without runtime cost.
      </p>

      {/* 3 Tiers Explanation */}
      <section id="token-tiers" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>The 3 Token Tiers</span>
          <a href="#token-tiers" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              padding: "24px",
              border: "1px solid var(--docs-border)",
              borderRadius: "14px",
              backgroundColor: "var(--docs-card)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(37, 99, 235, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <FiLayers size={20} color="#2563eb" />
            </div>
            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#2563eb",
                fontSize: "1.1rem",
              }}
            >
              1. Primitive Tokens
            </h3>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "0.88rem",
                color: "var(--docs-text-muted)",
                lineHeight: 1.5,
              }}
            >
              Raw, literal values: color hexes, pixel radii, animation
              durations. Never used directly in components.
            </p>
            <code style={{ fontSize: "0.8rem", color: "var(--docs-text-dim)" }}>
              --cl-palette-blue-500: #3b82f6;
            </code>
          </div>

          <div
            style={{
              padding: "24px",
              border: "1px solid var(--docs-border)",
              borderRadius: "14px",
              backgroundColor: "var(--docs-card)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <FiTarget size={20} color="#10b981" />
            </div>
            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#10b981",
                fontSize: "1.1rem",
              }}
            >
              2. Semantic Tokens
            </h3>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "0.88rem",
                color: "var(--docs-text-muted)",
                lineHeight: 1.5,
              }}
            >
              Contextual design decisions that map primitive values to intent.
              Automatically adapt between themes.
            </p>
            <code style={{ fontSize: "0.8rem", color: "var(--docs-text-dim)" }}>
              --cl-color-primary-base: var(--cl-palette-blue-500);
            </code>
          </div>

          <div
            style={{
              padding: "24px",
              border: "1px solid var(--docs-border)",
              borderRadius: "14px",
              backgroundColor: "var(--docs-card)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(139, 92, 246, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <FiBox size={20} color="#8b5cf6" />
            </div>
            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#8b5cf6",
                fontSize: "1.1rem",
              }}
            >
              3. Component Tokens
            </h3>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "0.88rem",
                color: "var(--docs-text-muted)",
                lineHeight: 1.5,
              }}
            >
              Component-scoped variables referencing semantic tokens. Provides
              safe micro-customization boundaries.
            </p>
            <code style={{ fontSize: "0.8rem", color: "var(--docs-text-dim)" }}>
              --cl-button-primary-bg: var(--cl-color-primary-base);
            </code>
          </div>
        </div>
      </section>


      {/* Spacing Ruler */}
      <section style={{ marginTop: "48px" }}>
        <h2 className="docs-heading-2">
          <span>Spatial &amp; Sizing Scale (4px Baseline)</span>
        </h2>
        <p style={{ color: "var(--docs-text-muted)", marginBottom: "20px" }}>
          All padding, margins, heights, and component layouts adhere to an
          8pt/4pt mathematical scale.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            backgroundColor: "var(--docs-card)",
          }}
        >
          {spacingTokens.map((s) => (
            <div
              key={s.token}
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              <span
                style={{
                  width: "140px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.82rem",
                  color: "var(--docs-text-muted)",
                }}
              >
                {s.token}
              </span>
              <span
                style={{ width: "50px", fontSize: "0.85rem", fontWeight: 700 }}
              >
                {s.val}
              </span>
              <div
                style={{
                  height: "18px",
                  width: s.val,
                  backgroundColor: "var(--docs-primary)",
                  borderRadius: "4px",
                  minWidth: "4px",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius Explorer */}
      <section style={{ marginTop: "48px" }}>
        <h2 className="docs-heading-2">
          <span>Border Radius Scale</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "16px",
          }}
        >
          {radiusTokens.map((r) => (
            <div
              key={r.token}
              style={{
                border: "1px solid var(--docs-border)",
                borderRadius: "12px",
                padding: "20px 16px",
                textAlign: "center",
                backgroundColor: "var(--docs-card)",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  border: "2px solid var(--docs-primary)",
                  borderRadius: r.val,
                  margin: "0 auto 12px auto",
                  backgroundColor: "var(--docs-primary-bg)",
                }}
              />
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                {r.name}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--docs-text-dim)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {r.val}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elevation Shadows */}
      <section style={{ marginTop: "48px" }}>
        <h2 className="docs-heading-2">
          <span>Elevation &amp; Shadow Depth</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {shadowTokens.map((sh) => (
            <div
              key={sh.token}
              style={{
                padding: "28px 20px",
                borderRadius: "14px",
                backgroundColor: "var(--docs-surface)",
                border: "1px solid var(--docs-border)",
                boxShadow: sh.val,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginBottom: "4px",
                }}
              >
                {sh.name}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--docs-text-dim)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {sh.token}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Overriding in CSS */}
      <section id="overrides" style={{ marginTop: "48px" }}>
        <h2 className="docs-heading-2">
          <span>Overriding Tokens in CSS</span>
          <a href="#overrides" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          You can customize any token globally at <code>:root</code> or scope it
          to a specific sub-tree:
        </p>
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
