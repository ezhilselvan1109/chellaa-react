import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, BadgeVariant, BadgeSize } from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const badgePropsData: PropItem[] = [
  {
    name: "variant",
    type: '"default" | "primary" | "success" | "warning" | "danger" | "outline"',
    defaultValue: '"default"',
    description: "Visual appearance style for semantic tagging.",
  },
  {
    name: "size",
    type: '"sm" | "md"',
    defaultValue: '"sm"',
    description: "Size scale of the badge.",
  },
];

const variants: BadgeVariant[] = ["default", "primary", "success", "warning", "danger", "outline"];
const sizes: BadgeSize[] = ["sm", "md"];

export const BadgeDocPage: React.FC = () => {
  const [variant, setVariant] = useState<BadgeVariant>("primary");
  const [size, setSize] = useState<BadgeSize>("md");

  const interactiveCode = `<Badge variant="${variant}" size="${size}">
  ${variant.toUpperCase()} STATUS
</Badge>`;

  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Badge</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Badge</h1>
        <Badge variant="primary" size="md">
          Stable
        </Badge>
      </div>

      <p className="docs-description">
        Badges are compact indicators used to highlight an item's status, category, or count.
      </p>

      <CodeBlock code='import { Badge } from "@chella-ui/react";' language="tsx" />

      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
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
          </>
        }
      >
        <Badge variant={variant} size={size}>
          {variant.toUpperCase()} STATUS
        </Badge>
      </ComponentPreview>

      <h2 className="docs-section-heading">Variants</h2>
      <p className="docs-p">
        Use variants to communicate status states like success, warning, or brand updates:
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">New Feature</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Attention</Badge>
        <Badge variant="danger">Deprecated</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
      <CodeBlock
        code={`<Badge variant="default">Default</Badge>
<Badge variant="primary">New Feature</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Attention</Badge>
<Badge variant="danger">Deprecated</Badge>
<Badge variant="outline">Draft</Badge>`}
      />

      <h2 className="docs-section-heading">Props Reference</h2>
      <PropsTable props={badgePropsData} />
    </article>
  );
};
