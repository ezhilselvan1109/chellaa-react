import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chella-ui/react";
import { CodeBlock } from "../components/CodeBlock";

export const IntroductionPage: React.FC = () => {
  return (
    <article className="docs-content">
      <h1 className="docs-title">Chella UI</h1>
      <p className="docs-description">
        A production-quality, accessible, and type-safe React design system and UI component library.
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
        <Button asChild variant="primary" size="lg">
          <Link to="/docs/installation">Get Started →</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link to="/docs/components/button">Browse Components</Link>
        </Button>
      </div>

      <h2 className="docs-section-heading">Core Architecture Pillars</h2>
      <ul>
        <li>
          <strong>Zero-Friction Consumer DX:</strong> Consumers install <code>@chella-ui/react</code> and import components directly. No Tailwind prerequisite, no configuration scripts.
        </li>
        <li>
          <strong>Three-Tier Token System:</strong> Clean cascade from raw Primitives to Semantic Tokens to Component Tokens.
        </li>
        <li>
          <strong>Zero-Runtime Theme Engine:</strong> Instantaneous switching between light, dark, and system modes powered by CSS custom properties.
        </li>
        <li>
          <strong>WAI-ARIA Accessibility:</strong> Complete keyboard navigation, focus management, screen reader labels, and axe-tested compliance.
        </li>
        <li>
          <strong>Polymorphism via Slot:</strong> Safe <code>asChild</code> composition without TypeScript generic explosions.
        </li>
      </ul>

      <h2 className="docs-section-heading">Quick Example</h2>
      <CodeBlock
        code={`import { Button, ChellaProvider } from "@chella-ui/react";

function App() {
  return (
    <ChellaProvider defaultTheme="system">
      <Button variant="primary" onClick={() => alert("Action triggered!")}>
        Get Started
      </Button>
    </ChellaProvider>
  );
}`}
      />
    </article>
  );
};
