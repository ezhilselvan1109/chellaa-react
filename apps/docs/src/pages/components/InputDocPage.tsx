import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, InputSize, Badge } from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const inputPropsData: PropItem[] = [
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Size scale adjusting height, padding, and font-size.",
  },
  {
    name: "invalid",
    type: "boolean",
    defaultValue: "false",
    description: "Sets visual error styling and sets aria-invalid attribute.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables typing and keyboard interactions.",
  },
  {
    name: "placeholder",
    type: "string",
    defaultValue: "undefined",
    description: "Hint text displayed before a value is entered.",
  },
];

const sizes: InputSize[] = ["sm", "md", "lg"];

export const InputDocPage: React.FC = () => {
  const [size, setSize] = useState<InputSize>("md");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter your email address...");

  const interactiveCode = `<Input
  size="${size}"${invalid ? "\n  invalid" : ""}${disabled ? "\n  disabled" : ""}
  placeholder="${placeholder}"
/>`;

  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Input</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Input</h1>
        <Badge variant="primary" size="md">
          Stable
        </Badge>
        <Badge variant="success" size="md">
          100% WAI-ARIA
        </Badge>
      </div>

      <p className="docs-description">
        Text field component allowing users to enter and edit single-line text data with full keyboard accessibility.
      </p>

      <CodeBlock code='import { Input } from "@chella-ui/react";' language="tsx" />

      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
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

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={invalid}
                  onChange={(e) => setInvalid(e.target.checked)}
                />
                Invalid / Error
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
        <div style={{ width: "100%", maxWidth: 360 }}>
          <Input
            size={size}
            invalid={invalid}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </div>
      </ComponentPreview>

      <h2 className="docs-section-heading">Sizes</h2>
      <p className="docs-p">Available in small, medium, and large heights:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 360, margin: "1.5rem 0" }}>
        <Input size="sm" placeholder="Small input (32px)" />
        <Input size="md" placeholder="Medium input (40px)" />
        <Input size="lg" placeholder="Large input (48px)" />
      </div>

      <h2 className="docs-section-heading">Validation States</h2>
      <p className="docs-p">
        Use <code>invalid</code> when a field fails validation to apply a high-visibility danger border:
      </p>
      <div style={{ maxWidth: 360, margin: "1.5rem 0" }}>
        <Input invalid defaultValue="invalid-email-address" />
      </div>

      <h2 className="docs-section-heading">Props Reference</h2>
      <PropsTable props={inputPropsData} />
    </article>
  );
};
