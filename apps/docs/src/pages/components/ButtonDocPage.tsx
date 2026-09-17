import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonVariant, ButtonSize, Badge } from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const buttonPropsData: PropItem[] = [
  {
    name: "variant",
    type: '"primary" | "secondary" | "outline" | "ghost" | "danger"',
    defaultValue: '"primary"',
    description: "The visual appearance style of the button.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "The size scale of the button.",
  },
  {
    name: "isLoading",
    type: "boolean",
    defaultValue: "false",
    description: "Replaces button content with an accessible loading spinner and disables clicks.",
  },
  {
    name: "loadingText",
    type: "string",
    defaultValue: "undefined",
    description: "Optional text displayed alongside the spinner when isLoading is true.",
  },
  {
    name: "leftIcon",
    type: "React.ReactNode",
    defaultValue: "undefined",
    description: "Icon element rendered before the button label.",
  },
  {
    name: "rightIcon",
    type: "React.ReactNode",
    defaultValue: "undefined",
    description: "Icon element rendered after the button label.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    defaultValue: "false",
    description: "If true, the button stretches to 100% of the parent width.",
  },
  {
    name: "asChild",
    type: "boolean",
    defaultValue: "false",
    description: "Enables polymorphic composition via the Slot primitive, merging behavior onto the child element.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables button interactions and sets data-disabled attribute.",
  },
];

const variants: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "danger"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

export const ButtonDocPage: React.FC = () => {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ButtonSize>("md");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const interactiveCode = `<Button
  variant="${variant}"
  size="${size}"${isLoading ? "\n  isLoading" : ""}${disabled ? "\n  disabled" : ""}
>
  Button Action
</Button>`;

  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Button</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Button</h1>
        <Badge variant="primary" size="md">
          Stable
        </Badge>
        <Badge variant="success" size="md">
          100% WAI-ARIA
        </Badge>
      </div>

      <p className="docs-description">
        Interactive button component supporting multiple semantic variants, sizes, loading states,
        icon slots, and polymorphic composition via the Slot pattern.
      </p>

      {/* Package import box */}
      <CodeBlock code='import { Button } from "@chella-ui/react";' language="tsx" />

      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
            {/* Variant Segmented Pills */}
            <div className="preview-control-group">
              <span className="control-label">Variant:</span>
              <div className="control-segmented-group">
                {variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`control-pill ${variant === v ? "active" : ""}`}
                    onClick={() => setVariant(v)}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Segmented Pills */}
            <div className="preview-control-group">
              <span className="control-label">Size:</span>
              <div className="control-segmented-group">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`control-pill ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={isLoading}
                  onChange={(e) => setIsLoading(e.target.checked)}
                />
                Loading
              </label>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                Disabled
              </label>
            </div>
          </>
        }
      >
        <Button variant={variant} size={size} isLoading={isLoading} disabled={disabled}>
          Button Action
        </Button>
      </ComponentPreview>

      <h2 className="docs-section-heading">Variants</h2>
      <p className="docs-p">
        Use variants to communicate visual hierarchy and weight across interfaces:
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <CodeBlock
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
      />

      <h2 className="docs-section-heading">Sizes</h2>
      <p className="docs-p">Available in small, medium, and large size scales:</p>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
        <Button size="sm">Small (sm)</Button>
        <Button size="md">Medium (md)</Button>
        <Button size="lg">Large (lg)</Button>
      </div>

      <h2 className="docs-section-heading">Loading States</h2>
      <p className="docs-p">
        Pass <code>isLoading</code> to trigger an accessible spinner. When <code>loadingText</code> is supplied, it replaces the label while the operation is in progress:
      </p>
      <div style={{ display: "flex", gap: "1rem", margin: "1.5rem 0" }}>
        <Button isLoading>Save Changes</Button>
        <Button isLoading loadingText="Deploying..." variant="secondary">
          Deploy
        </Button>
      </div>

      <h2 className="docs-section-heading">Polymorphism (asChild Pattern)</h2>
      <p className="docs-p">
        Render custom anchor links or router links (e.g. Next.js <code>Link</code>) with complete button styling using the <code>asChild</code> prop:
      </p>
      <CodeBlock
        code={`import { Button } from "@chella-ui/react";
import Link from "next/link";

<Button asChild variant="primary">
  <Link href="/dashboard">Navigate to Dashboard</Link>
</Button>`}
      />

      <h2 className="docs-section-heading">Accessibility (WAI-ARIA)</h2>
      <p className="docs-p">
        The Button component satisfies all WCAG 2.1 AA specifications:
      </p>
      <ul>
        <li><strong>Keyboard Navigation:</strong> Triggered via both <kbd>Enter</kbd> and <kbd>Space</kbd> keys.</li>
        <li><strong>Focus Rings:</strong> Uses high-contrast <code>outline</code> with 2px offset for WCAG 2.4.7 compliance.</li>
        <li><strong>Loading Semantics:</strong> Applies <code>aria-busy="true"</code> and embeds an accessible <code>role="status"</code> indicator.</li>
        <li><strong>Disabled State:</strong> Native <code>disabled</code> attribute prevents keyboard and pointer activation.</li>
      </ul>

      <h2 className="docs-section-heading">Props Reference</h2>
      <PropsTable props={buttonPropsData} />
    </article>
  );
};
