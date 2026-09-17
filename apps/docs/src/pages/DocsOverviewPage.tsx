import React from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "@chella-ui/react";
import { CodeBlock } from "../components/CodeBlock";

export const DocsOverviewPage: React.FC = () => {
  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Docs</span>
        <span>/</span>
        <span>Overview</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Documentation</h1>
        <Badge variant="primary" size="md">
          v0.1.0
        </Badge>
      </div>

      <p className="docs-description">
        Chella UI is an enterprise-grade React design system engineered with zero CSS configuration,
        flawless WAI-ARIA accessibility, and zero-runtime design tokens.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem", margin: "2rem 0" }}>
        <div className="feature-card" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⚡</div>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>Zero CSS Imports</h3>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--docs-fg-muted)", lineHeight: 1.5 }}>
            Components own their styles and inject them on demand into <code>&lt;head&gt;</code>. Never configure Tailwind or import manual CSS stylesheets.
          </p>
        </div>

        <div className="feature-card" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🎨</div>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>3-Tier Design Tokens</h3>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--docs-fg-muted)", lineHeight: 1.5 }}>
            Instant runtime theme switching (&lt;1ms, zero re-renders) backed by pure CSS custom properties with automatic SSR anti-flicker protection.
          </p>
        </div>

        <div className="feature-card" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🧩</div>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>Slot Polymorphism</h3>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--docs-fg-muted)", lineHeight: 1.5 }}>
            Radix-inspired <code>asChild</code> composition pattern eliminates generic TypeScript prop collisions and allows composable tags.
          </p>
        </div>

        <div className="feature-card" style={{ padding: "1.5rem" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>♿</div>
          <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem" }}>100% WAI-ARIA Accessible</h3>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--docs-fg-muted)", lineHeight: 1.5 }}>
            Every component ships with full keyboard navigation, screen reader announcements, and automated axe test suites.
          </p>
        </div>
      </div>

      <h2 className="docs-section-heading">Quick Start</h2>
      <p className="docs-p">
        Get up and running with Chella UI in under a minute:
      </p>

      <h3 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>1. Install the Package</h3>
      <CodeBlock code="npm install @chella-ui/react" language="bash" />

      <h3 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>2. Wrap with ChellaProvider</h3>
      <p className="docs-p">
        Place <code>&lt;ChellaProvider /&gt;</code> at your application root. It automatically injects design tokens and synchronizes system dark mode preferences:
      </p>
      <CodeBlock
        code={`import React from "react";
import ReactDOM from "react-dom/client";
import { ChellaProvider } from "@chella-ui/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChellaProvider defaultTheme="system">
      <App />
    </ChellaProvider>
  </React.StrictMode>
);`}
        language="tsx"
      />

      <h3 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>3. Import & Use Components</h3>
      <p className="docs-p">
        Notice that <strong>no stylesheet imports</strong> are required. Styles are auto-injected on component mount:
      </p>
      <CodeBlock
        code={`import { Button, Badge, Input } from "@chella-ui/react";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
      <Badge variant="success">Active Session</Badge>
      <Input placeholder="Enter your project name" />
      <Button variant="primary" onClick={() => alert("Ready!")}>
        Deploy Project
      </Button>
    </div>
  );
}`}
        language="tsx"
      />

      <div style={{ marginTop: "3rem", display: "flex", gap: "1rem" }}>
        <Link to="/docs/components">
          <Button variant="primary" size="md">
            Explore Component Gallery →
          </Button>
        </Link>
        <Link to="/docs/theming">
          <Button variant="secondary" size="md">
            Interactive Theming Studio →
          </Button>
        </Link>
      </div>
    </article>
  );
};
