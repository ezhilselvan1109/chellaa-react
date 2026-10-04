import { Callout } from "../../components/Common/Callout";
import { Button } from "@chellaa/react";
import { FiZap, FiShield, FiLayers } from "react-icons/fi";
import { LuPalette } from "react-icons/lu";

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
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              boxShadow: "var(--docs-shadow-sm)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                color: "var(--docs-primary)",
                marginBottom: "12px",
              }}
            >
              <FiZap size={20} />
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>
              Zero-Configuration Styling
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--docs-text-muted)",
                lineHeight: 1.6,
              }}
            >
              Styles are delivered automatically alongside component imports. No
              manual stylesheet imports, no Tailwind dependencies, and no
              CSS-in-JS runtime overhead.
            </p>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              boxShadow: "var(--docs-shadow-sm)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                marginBottom: "12px",
              }}
            >
              <FiShield size={20} />
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>
              WCAG 2.2 AA by Default
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--docs-text-muted)",
                lineHeight: 1.6,
              }}
            >
              Every component is built on accessible HTML semantics, supports
              full keyboard navigation, explicit focus indicators, and automated{" "}
              <code>axe-core</code> validation.
            </p>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              boxShadow: "var(--docs-shadow-sm)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(124, 58, 237, 0.1)",
                color: "#7c3aed",
                marginBottom: "12px",
              }}
            >
              <FiLayers size={20} />
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>
              Polymorphic Slot Delegation
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--docs-text-muted)",
                lineHeight: 1.6,
              }}
            >
              Compose cleanly with Next.js or React Router using the{" "}
              <code>asChild</code> prop. Zero wrapper <code>&lt;div&gt;</code>{" "}
              pollution in the DOM.
            </p>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              boxShadow: "var(--docs-shadow-sm)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                color: "#f59e0b",
                marginBottom: "12px",
              }}
            >
              <LuPalette size={20} />
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>
              3-Tier Design Tokens
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--docs-text-muted)",
                lineHeight: 1.6,
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
