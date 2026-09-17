import React from "react";
import { CodeBlock } from "../components/CodeBlock";

export const TokensPage: React.FC = () => {
  return (
    <article className="docs-content">
      <h1 className="docs-title">Design Tokens</h1>
      <p className="docs-description">
        Explore Chella UI's multi-tier token hierarchy and customization mechanisms.
      </p>

      <h2 className="docs-section-heading">The Three-Tier Architecture</h2>
      <p className="docs-p">
        Tokens decouple visual choices into distinct, maintainable layers:
      </p>
      <ul>
        <li>
          <strong>Tier 1: Global Primitives:</strong> Raw numerical values and color scales (e.g. <code>--ch-font-size-base</code>, <code>--ch-space-4</code>).
        </li>
        <li>
          <strong>Tier 2: Semantic Tokens:</strong> Purpose-driven variables mapped to primitives (e.g. <code>--ch-color-primary</code>, <code>--ch-color-bg-canvas</code>).
        </li>
        <li>
          <strong>Tier 3: Component Tokens:</strong> Local hooks scoped to specific components (e.g. <code>--ch-btn-bg</code>, <code>--ch-btn-height</code>).
        </li>
      </ul>

      <h2 className="docs-section-heading">Overriding Tokens in CSS</h2>
      <p className="docs-p">
        Customize your brand theme globally by overriding semantic CSS custom properties:
      </p>
      <CodeBlock
        language="css"
        code={`/* Custom Brand Palette Override */
:root {
  --ch-color-primary: #7c3aed;       /* Violet 600 */
  --ch-color-primary-hover: #6d28d9; /* Violet 700 */
  --ch-radius-md: 0.5rem;            /* 8px default radius */
}`}
      />
    </article>
  );
};
