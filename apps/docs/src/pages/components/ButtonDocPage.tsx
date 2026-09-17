import React, { useState } from "react";
import { Button, ButtonVariant, ButtonSize } from "@chella-ui/react";
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
      <h1 className="docs-title">Button</h1>
      <p className="docs-description">
        Interactive button component supporting multiple semantic variants, sizes, loading states,
        icon slots, and polymorphic composition via the Slot pattern.
      </p>

      <h2 className="docs-section-heading">Interactive Preview</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
            <div className="preview-control-group">
              <label htmlFor="variant-select"><strong>Variant:</strong></label>
              <select
                id="variant-select"
                value={variant}
                onChange={(e) => setVariant(e.target.value as ButtonVariant)}
                style={{ padding: "0.25rem 0.5rem", borderRadius: "4px" }}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
                <option value="danger">Danger</option>
              </select>
            </div>

            <div className="preview-control-group">
              <label htmlFor="size-select"><strong>Size:</strong></label>
              <select
                id="size-select"
                value={size}
                onChange={(e) => setSize(e.target.value as ButtonSize)}
                style={{ padding: "0.25rem 0.5rem", borderRadius: "4px" }}
              >
                <option value="sm">Small (sm)</option>
                <option value="md">Medium (md)</option>
                <option value="lg">Large (lg)</option>
              </select>
            </div>

            <div className="preview-control-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isLoading}
                  onChange={(e) => setIsLoading(e.target.checked)}
                />
                Loading
              </label>
            </div>

            <div className="preview-control-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}>
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
        Use variants to communicate visual weight and hierarchy:
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
      <p className="docs-p">Available in small, medium, and large scales:</p>
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

      <h2 className="docs-section-heading">Component CSS Tokens</h2>
      <p className="docs-p">
        Custom styling hooks available for local overrides:
      </p>
      <ul>
        <li><code>--ch-btn-bg</code>: Background color</li>
        <li><code>--ch-btn-fg</code>: Text and icon color</li>
        <li><code>--ch-btn-border</code>: Border color</li>
        <li><code>--ch-btn-height</code>: Button height scale</li>
        <li><code>--ch-btn-padding-x</code>: Horizontal padding</li>
        <li><code>--ch-btn-radius</code>: Border radius</li>
      </ul>
    </article>
  );
};
