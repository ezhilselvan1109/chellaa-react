import { Callout } from "../../components/Common/Callout";
import { Button } from "@chellaa/react";

export function OverviewPage() {
  return (
    <article className="docs-page">
      <h1>Chellaa React Overview</h1>
      <p
        style={{
          fontSize: "1.15rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        Chellaa React (<code>@chellaa/react</code>) is an enterprise-grade,
        accessible React component library built with modern CSS custom
        properties and zero-runtime overhead.
      </p>

      <div style={{ display: "flex", gap: "16px", margin: "24px 0" }}>
        <Button asChild variant="solid" colorScheme="primary">
          <a href="#/installation">Get Started →</a>
        </Button>
        <Button asChild variant="outline">
          <a href="#/components/button">Explore Components</a>
        </Button>
      </div>

      <section id="pillars" style={{ marginTop: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Core Architectural Pillars</span>
          <a href="#pillars" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>
              ⚡ Zero-Configuration Styling
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
                lineHeight: 1.5,
              }}
            >
              Styles are delivered automatically alongside component imports. No
              manual stylesheet imports, no Tailwind dependencies, and no
              CSS-in-JS runtime overhead.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>♿ WCAG 2.2 AA by Default</h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
                lineHeight: 1.5,
              }}
            >
              Every component is built on accessible HTML semantics, supports
              full keyboard navigation, explicit focus indicators, and automated{" "}
              <code>axe-core</code> validation.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>
              🧩 Polymorphic Slot Delegation
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
                lineHeight: 1.5,
              }}
            >
              Compose cleanly with Next.js or React Router using the{" "}
              <code>asChild</code> prop. Zero wrapper <code>&lt;div&gt;</code>{" "}
              pollution in the DOM.
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>🎨 3-Tier Design Tokens</h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
                lineHeight: 1.5,
              }}
            >
              Primitive, semantic, and component tokens driven by standard CSS
              custom properties for effortless light, dark, and custom brand
              theming.
            </p>
          </div>
        </div>
      </section>

      <div id="frameworks" style={{ marginTop: "32px" }}>
        <Callout type="info" title="Framework Agnostic Consumers">
          Chellaa React runs natively in React 18 & 19, Next.js App Router
          (Server & Client Components), Vite, Remix, and Astro.
        </Callout>
      </div>
    </article>
  );
}
