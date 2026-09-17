import React, { useState } from "react";
import { Spinner, SpinnerSize } from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";

const spinnerPropsData: PropItem[] = [
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "The diameter size scale of the spinner.",
  },
  {
    name: "label",
    type: "string",
    defaultValue: '"Loading..."',
    description: "Screen reader announcement text rendered in an accessible VisuallyHidden element.",
  },
  {
    name: "color",
    type: "string",
    defaultValue: '"currentColor"',
    description: "Custom stroke color override. Inherits parent text color by default.",
  },
];

export const SpinnerDocPage: React.FC = () => {
  const [size, setSize] = useState<SpinnerSize>("md");

  return (
    <article className="docs-content">
      <h1 className="docs-title">Spinner</h1>
      <p className="docs-description">
        Accessible circular loading indicator indicating asynchronous progress.
      </p>

      <h2 className="docs-section-heading">Interactive Preview</h2>
      <ComponentPreview
        code={`<Spinner size="${size}" />`}
        controls={
          <div className="preview-control-group">
            <label htmlFor="spinner-size-select"><strong>Size:</strong></label>
            <select
              id="spinner-size-select"
              value={size}
              onChange={(e) => setSize(e.target.value as SpinnerSize)}
              style={{ padding: "0.25rem 0.5rem", borderRadius: "4px" }}
            >
              <option value="xs">Extra Small (xs)</option>
              <option value="sm">Small (sm)</option>
              <option value="md">Medium (md)</option>
              <option value="lg">Large (lg)</option>
            </select>
          </div>
        }
      >
        <Spinner size={size} />
      </ComponentPreview>

      <h2 className="docs-section-heading">Size Scale</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", margin: "1.5rem 0" }}>
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>

      <h2 className="docs-section-heading">Custom Colors</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", margin: "1.5rem 0" }}>
        <Spinner size="md" color="var(--ch-color-primary)" />
        <Spinner size="md" color="var(--ch-color-success)" />
        <Spinner size="md" color="var(--ch-color-danger)" />
      </div>

      <h2 className="docs-section-heading">Props Reference</h2>
      <PropsTable props={spinnerPropsData} />
    </article>
  );
};
