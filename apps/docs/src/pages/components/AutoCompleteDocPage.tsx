import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AutoComplete,
  AutoCompleteOption,
  AutoCompleteVariant,
  AutoCompleteSize,
  AutoCompleteStatus,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const autoCompleteProps: PropItem[] = [
  {
    name: "options",
    type: "AutoCompleteOption[]",
    defaultValue: "[]",
    description: "Data source of autocomplete options, supporting flat or grouped category structures.",
  },
  {
    name: "value",
    type: "string",
    defaultValue: "undefined",
    description: "Controlled selected option / input value.",
  },
  {
    name: "defaultValue",
    type: "string",
    defaultValue: "''",
    description: "Initial selected option / input value.",
  },
  {
    name: "placeholder",
    type: "string",
    defaultValue: "undefined",
    description: "The placeholder text of the input box.",
  },
  {
    name: "variant",
    type: "'outlined' | 'filled' | 'borderless' | 'underlined'",
    defaultValue: "'outlined'",
    description: "Visual variant of the input box (Ant Design 5.13+).",
  },
  {
    name: "size",
    type: "'large' | 'medium' | 'small'",
    defaultValue: "'medium'",
    description: "The size of the input box.",
  },
  {
    name: "status",
    type: "'error' | 'warning'",
    defaultValue: "undefined",
    description: "Set validation status.",
  },
  {
    name: "allowClear",
    type: "boolean | { clearIcon?: ReactNode }",
    defaultValue: "false",
    description: "Show clear button when input has text. Supports custom clear icon.",
  },
  {
    name: "backfill",
    type: "boolean",
    defaultValue: "false",
    description: "If true, backfills selected item into the input during keyboard navigation.",
  },
  {
    name: "filterOption",
    type: "boolean | ((inputValue: string, option: AutoCompleteOption) => boolean)",
    defaultValue: "true",
    description: "Filter options by input text. Set to false to disable client-side filtering.",
  },
  {
    name: "children",
    type: "ReactElement",
    defaultValue: "<input />",
    description: "Customize the input element (e.g. <textarea />, custom <Input />).",
  },
  {
    name: "defaultActiveFirstOption",
    type: "boolean",
    defaultValue: "true",
    description: "Whether the first option in the dropdown list is active by default.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the autocomplete component is disabled.",
  },
  {
    name: "open",
    type: "boolean",
    defaultValue: "undefined",
    description: "Controlled open state of the dropdown.",
  },
  {
    name: "popupMatchSelectWidth",
    type: "boolean | number",
    defaultValue: "true",
    description: "Whether dropdown menu matches select input width, or numeric width in px.",
  },
  {
    name: "notFoundContent",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Specify content to show when no result matches the search query.",
  },
  {
    name: "classNames",
    type: "Record<SemanticDOM, string> | ((info: { props }) => Record<SemanticDOM, string>)",
    defaultValue: "undefined",
    description: "Customize class for each semantic structure (root, prefix, input, clear, popup.root, popup.list, popup.listItem).",
  },
  {
    name: "styles",
    type: "Record<SemanticDOM, CSSProperties> | ((info: { props }) => Record<SemanticDOM, CSSProperties>)",
    defaultValue: "undefined",
    description: "Customize inline style for each semantic structure.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    defaultValue: "undefined",
    description: "Called when typing or selecting an option.",
  },
  {
    name: "onSelect",
    type: "(value: string, option: AutoCompleteOption) => void",
    defaultValue: "undefined",
    description: "Called when an option is selected from the dropdown.",
  },
  {
    name: "onSearch",
    type: "(value: string) => void",
    defaultValue: "undefined",
    description: "Called when searching / typing in the input box.",
  },
  {
    name: "onClear",
    type: "() => void",
    defaultValue: "undefined",
    description: "Called when the clear button is clicked.",
  },
];

const optionProps: PropItem[] = [
  {
    name: "value",
    type: "string",
    defaultValue: "required",
    description: "Value of the option.",
  },
  {
    name: "label",
    type: "ReactNode",
    defaultValue: "value",
    description: "Display label for the option. Defaults to value if not provided.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether this option is disabled.",
  },
  {
    name: "options",
    type: "AutoCompleteOption[]",
    defaultValue: "undefined",
    description: "Grouped children options for category headers.",
  },
];

const designTokens: PropItem[] = [
  {
    name: "activeBorderColor",
    type: "string",
    defaultValue: "#1677ff",
    description: "Active and focus border color.",
  },
  {
    name: "activeOutlineColor",
    type: "string",
    defaultValue: "rgba(5, 145, 255, 0.1)",
    description: "Focus glow / outline ring halo.",
  },
  {
    name: "hoverBorderColor",
    type: "string",
    defaultValue: "#4096ff",
    description: "Hover border color.",
  },
  {
    name: "optionSelectedBg",
    type: "string",
    defaultValue: "#e6f4ff",
    description: "Background color of selected option.",
  },
  {
    name: "optionActiveBg",
    type: "string",
    defaultValue: "rgba(0, 0, 0, 0.04)",
    description: "Background color of hovered / active option.",
  },
  {
    name: "zIndexPopup",
    type: "number",
    defaultValue: "1050",
    description: "Z-index of the dropdown popup layer.",
  },
];

const sampleStreets: AutoCompleteOption[] = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
  { value: "Baker Street" },
  { value: "Abbey Road" },
  { value: "Pennsylvania Avenue" },
  { value: "Champs-Élysées" },
];

export const AutoCompleteDocPage: React.FC = () => {
  const [variant, setVariant] = useState<AutoCompleteVariant>("outlined");
  const [size, setSize] = useState<AutoCompleteSize>("medium");
  const [status, setStatus] = useState<AutoCompleteStatus | undefined>(undefined);
  const [allowClear, setAllowClear] = useState<boolean>(true);
  const [backfill, setBackfill] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [playgroundVal, setPlaygroundVal] = useState<string>("");

  const playgroundCode = `<AutoComplete
  options={options}
  placeholder="Type a street name..."
  variant="${variant}"
  size="${size}"${status ? `\n  status="${status}"` : ""}${allowClear ? `\n  allowClear` : ""}${backfill ? `\n  backfill` : ""}${disabled ? `\n  disabled` : ""}
  value={value}
  onChange={setValue}
/>`;

  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>AutoComplete</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">AutoComplete</h1>
        <Badge variant="primary" size="md">
          Data Entry
        </Badge>
        <Badge variant="success" size="md">
          v5.13+ / v6.0
        </Badge>
      </div>

      <p className="docs-description">
        Autocomplete function of an input field. Provides helping text and intelligent input suggestions while allowing users to type freely.
      </p>

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={playgroundCode}
        controls={
          <>
            <div className="preview-control-group">
              <span className="control-label">Variant:</span>
              <div className="control-segmented-group">
                {(["outlined", "filled", "borderless", "underlined"] as AutoCompleteVariant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`control-pill ${variant === v ? "active" : ""}`}
                    onClick={() => setVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">Size:</span>
              <div className="control-segmented-group">
                {(["small", "medium", "large"] as AutoCompleteSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`control-pill ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">Status:</span>
              <div className="control-segmented-group">
                {[undefined, "error", "warning"].map((st) => (
                  <button
                    key={String(st)}
                    type="button"
                    className={`control-pill ${status === st ? "active" : ""}`}
                    onClick={() => setStatus(st as any)}
                  >
                    {st ? st : "default"}
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-control-group">
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={allowClear}
                  onChange={(e) => setAllowClear(e.target.checked)}
                />
                allowClear
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={backfill}
                  onChange={(e) => setBackfill(e.target.checked)}
                />
                backfill
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                disabled
              </label>
            </div>
          </>
        }
      >
        <div style={{ width: "320px", maxWidth: "100%" }}>
          <AutoComplete
            options={sampleStreets}
            placeholder="Type a street name..."
            variant={variant}
            size={size}
            status={status}
            allowClear={allowClear}
            backfill={backfill}
            disabled={disabled}
            value={playgroundVal}
            onChange={setPlaygroundVal}
          />
        </div>
      </ComponentPreview>

      {/* Basic Usage */}
      <h2 className="docs-section-heading">Basic Usage</h2>
      <p className="docs-p">
        Basic usage, set the data source of autocomplete with the <code>options</code> property:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <AutoComplete
          options={sampleStreets}
          placeholder="Input here..."
          allowClear
        />
      </div>
      <CodeBlock
        code={`import { AutoComplete } from "@chella-ui/react";

const options = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

<AutoComplete
  options={options}
  placeholder="Input here..."
  allowClear
/>;`}
        language="tsx"
      />

      {/* Lookup Patterns: Certain Category */}
      <h2 className="docs-section-heading">Lookup Patterns: Certain Category</h2>
      <p className="docs-p">
        Group options by categories with custom headers using nested <code>options</code>:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <AutoComplete
          placeholder="Input topic, query, or design..."
          allowClear
          options={[
            {
              label: "Libraries",
              options: [
                { label: "Ant Design (2.4M)", value: "Ant Design" },
                { label: "Chella UI (Fast, Modern)", value: "Chella UI" },
              ],
            },
            {
              label: "Frameworks",
              options: [
                { label: "React (Modern UI)", value: "React" },
                { label: "Next.js (Fullstack)", value: "Next.js" },
                { label: "Vite (Fast Bundler)", value: "Vite" },
              ],
            },
          ]}
        />
      </div>
      <CodeBlock
        code={`<AutoComplete
  placeholder="Input topic, query, or design..."
  options={[
    {
      label: "Libraries",
      options: [
        { label: "Ant Design", value: "Ant Design" },
        { label: "Chella UI", value: "Chella UI" },
      ],
    },
    {
      label: "Frameworks",
      options: [
        { label: "React", value: "React" },
        { label: "Next.js", value: "Next.js" },
      ],
    },
  ]}
/>`}
        language="tsx"
      />

      {/* Customize Input Component */}
      <h2 className="docs-section-heading">Customize Input Component</h2>
      <p className="docs-p">
        Pass custom elements like <code>&lt;textarea /&gt;</code> via <code>children</code>:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <AutoComplete options={sampleStreets}>
          <textarea
            placeholder="Multiline textarea input..."
            style={{ height: 64, resize: "none", padding: "8px 11px" }}
          />
        </AutoComplete>
      </div>
      <CodeBlock
        code={`<AutoComplete options={options}>
  <textarea
    placeholder="Multiline textarea input..."
    style={{ height: 64, resize: "none" }}
  />
</AutoComplete>`}
        language="tsx"
      />

      {/* Status */}
      <h2 className="docs-section-heading">Validation Status</h2>
      <p className="docs-p">
        Add validation status with <code>status="error"</code> or <code>status="warning"</code>:
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
        <div style={{ width: 240 }}>
          <AutoComplete status="error" placeholder="Error status" options={sampleStreets} />
        </div>
        <div style={{ width: 240 }}>
          <AutoComplete status="warning" placeholder="Warning status" options={sampleStreets} />
        </div>
      </div>
      <CodeBlock
        code={`<AutoComplete status="error" placeholder="Error status" options={options} />
<AutoComplete status="warning" placeholder="Warning status" options={options} />`}
        language="tsx"
      />

      {/* Variants */}
      <h2 className="docs-section-heading">Variants</h2>
      <p className="docs-p">
        Choose from four distinct variants: <code>outlined</code> (default), <code>filled</code>, <code>borderless</code>, and <code>underlined</code>:
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", margin: "1.5rem 0" }}>
        <div>
          <span style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", display: "block", marginBottom: 6 }}>Outlined</span>
          <AutoComplete variant="outlined" placeholder="Outlined" options={sampleStreets} />
        </div>
        <div>
          <span style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", display: "block", marginBottom: 6 }}>Filled</span>
          <AutoComplete variant="filled" placeholder="Filled" options={sampleStreets} />
        </div>
        <div>
          <span style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", display: "block", marginBottom: 6 }}>Borderless</span>
          <AutoComplete variant="borderless" placeholder="Borderless" options={sampleStreets} />
        </div>
        <div>
          <span style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", display: "block", marginBottom: 6 }}>Underlined</span>
          <AutoComplete variant="underlined" placeholder="Underlined" options={sampleStreets} />
        </div>
      </div>
      <CodeBlock
        code={`<AutoComplete variant="outlined" placeholder="Outlined" />
<AutoComplete variant="filled" placeholder="Filled" />
<AutoComplete variant="borderless" placeholder="Borderless" />
<AutoComplete variant="underlined" placeholder="Underlined" />`}
        language="tsx"
      />

      {/* Semantic DOM Styling */}
      <h2 className="docs-section-heading">Custom Semantic DOM Styling (Ant Design 6.0)</h2>
      <p className="docs-p">
        Customize classes and inline styles for semantic DOM elements (<code>root</code>, <code>input</code>, <code>popup.root</code>, <code>popup.listItem</code>) using object or function syntax:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <AutoComplete
          options={sampleStreets}
          placeholder="Semantic styling..."
          classNames={({ props }) => ({
            root: `custom-ac-root-${props.variant}`,
          })}
          styles={{
            root: { borderRadius: 12 },
          }}
        />
      </div>
      <CodeBlock
        code={`<AutoComplete
  options={options}
  classNames={({ props }) => ({
    root: \`custom-ac-root-\${props.variant}\`,
  })}
  styles={{
    root: { borderRadius: 12 },
  }}
/>`}
        language="tsx"
      />

      {/* API Reference */}
      <h2 className="docs-section-heading">AutoComplete API Reference</h2>
      <PropsTable props={autoCompleteProps} />

      <h2 className="docs-section-heading" style={{ marginTop: "3rem" }}>AutoCompleteOption API Reference</h2>
      <PropsTable props={optionProps} />

      <h2 className="docs-section-heading" style={{ marginTop: "3rem" }}>Design Tokens</h2>
      <PropsTable props={designTokens} />
    </article>
  );
};
