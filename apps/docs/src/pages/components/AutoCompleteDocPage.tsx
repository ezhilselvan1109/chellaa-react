import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AutoComplete,
  AutoCompleteOption,
  AutoCompleteVariant,
  AutoCompleteSize,
  AutoCompleteStatus,
  Button,
  Badge,
  Select,
  UserOutlined,
  SearchOutlined,
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
  const [prefixIcon, setPrefixIcon] = useState<"none" | "user" | "search">("none");
  const [playgroundVal, setPlaygroundVal] = useState<string>("");

  // Controlled mode state
  const [controlledVal, setControlledVal] = useState<string>("");

  // Dynamic email completion state
  const [emailValue, setEmailValue] = useState("");
  const [emailOptions, setEmailOptions] = useState<AutoCompleteOption[]>([]);

  const handleEmailSearch = (text: string) => {
    if (!text || text.includes("@")) {
      setEmailOptions([]);
    } else {
      setEmailOptions([
        { value: `${text}@gmail.com`, label: `${text}@gmail.com` },
        { value: `${text}@163.com`, label: `${text}@163.com` },
        { value: `${text}@qq.com`, label: `${text}@qq.com` },
        { value: `${text}@outlook.com`, label: `${text}@outlook.com` },
      ]);
    }
  };

  // Uncertain category state
  const [uncertainVal, setUncertainVal] = useState("");
  const [uncertainOptions, setUncertainOptions] = useState<AutoCompleteOption[]>([]);

  const handleUncertainSearch = (query: string) => {
    if (!query) {
      setUncertainOptions([]);
      return;
    }
    setUncertainOptions([
      {
        value: query,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span>Search <strong>{query}</strong> in Topics</span>
            <span style={{ color: "var(--docs-fg-muted)", fontSize: "0.8rem" }}>12,000 results</span>
          </div>
        ),
      },
      {
        value: `${query} tutorial`,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span>Search <strong>{query}</strong> in Articles</span>
            <span style={{ color: "var(--docs-fg-muted)", fontSize: "0.8rem" }}>8,400 results</span>
          </div>
        ),
      },
      {
        value: `${query} questions`,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span>Search <strong>{query}</strong> in Questions</span>
            <span style={{ color: "var(--docs-fg-muted)", fontSize: "0.8rem" }}>1,500 results</span>
          </div>
        ),
      },
    ]);
  };

  // Custom clear button state
  const [clearableState, setClearableState] = useState<boolean>(true);

  const prefixCodeSnippet =
    prefixIcon === "user"
      ? '\n  prefix={<UserOutlined />}'
      : prefixIcon === "search"
      ? '\n  prefix={<SearchOutlined />}'
      : "";

  const playgroundCode = `<AutoComplete
  options={options}
  placeholder="Type a street name..."
  variant="${variant}"
  size="${size}"${status ? `\n  status="${status}"` : ""}${prefixCodeSnippet}${allowClear ? `\n  allowClear` : ""}${backfill ? `\n  backfill` : ""}${disabled ? `\n  disabled` : ""}
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
              <Select
                value={variant}
                onChange={(val) => setVariant(val as AutoCompleteVariant)}
                options={[
                  { value: "outlined", label: "Outlined" },
                  { value: "filled", label: "Filled" },
                  { value: "borderless", label: "Borderless" },
                  { value: "underlined", label: "Underlined" },
                ]}
                style={{ width: 130 }}
                size="small"
              />
            </div>

            <div className="preview-control-group">
              <span className="control-label">Size:</span>
              <Select
                value={size}
                onChange={(val) => setSize(val as AutoCompleteSize)}
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                style={{ width: 110 }}
                size="small"
              />
            </div>

            <div className="preview-control-group">
              <span className="control-label">Status:</span>
              <Select
                value={status || "default"}
                onChange={(val) => setStatus(val === "default" ? undefined : (val as AutoCompleteStatus))}
                options={[
                  { value: "default", label: "Default" },
                  { value: "error", label: "Error" },
                  { value: "warning", label: "Warning" },
                ]}
                style={{ width: 110 }}
                size="small"
              />
            </div>

            <div className="preview-control-group">
              <span className="control-label">Prefix:</span>
              <Select
                value={prefixIcon}
                onChange={(val) => setPrefixIcon(val as "none" | "user" | "search")}
                options={[
                  { value: "none", label: "None" },
                  { value: "user", label: "UserOutlined" },
                  { value: "search", label: "SearchOutlined" },
                ]}
                style={{ width: 140 }}
                size="small"
              />
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
            prefix={
              prefixIcon === "user" ? (
                <UserOutlined />
              ) : prefixIcon === "search" ? (
                <SearchOutlined />
              ) : undefined
            }
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

      {/* Prefix Icon */}
      <h2 className="docs-section-heading">Prefix Icon (<code>prefix=&lt;UserOutlined /&gt;</code>)</h2>
      <p className="docs-p">
        Use <code>prefix</code> with icon components (e.g. <code>&lt;UserOutlined /&gt;</code> or <code>&lt;SearchOutlined /&gt;</code>) to render a clean leading hint in the input:
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1.5rem 0", maxWidth: 720 }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <AutoComplete
            prefix={<UserOutlined />}
            options={sampleStreets}
            placeholder="Search address with user prefix..."
            allowClear
          />
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <AutoComplete
            prefix={<SearchOutlined />}
            options={sampleStreets}
            placeholder="Search query with search prefix..."
            allowClear
          />
        </div>
      </div>
      <CodeBlock
        code={`import { AutoComplete, UserOutlined, SearchOutlined } from "@chella-ui/react";

<AutoComplete
  prefix={<UserOutlined />}
  placeholder="Search with user icon..."
  options={options}
  allowClear
/>

<AutoComplete
  prefix={<SearchOutlined />}
  placeholder="Search with search icon..."
  options={options}
  allowClear
/>`}
        language="tsx"
      />

      {/* Controlled Mode */}
      <h2 className="docs-section-heading">Controlled Mode (<code>control mode</code>)</h2>
      <p className="docs-p">
        Manage input value externally using <code>value</code> and <code>onChange</code>:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <Button size="small" onClick={() => setControlledVal("Downing Street")}>
            Set "Downing Street"
          </Button>
          <Button size="small" onClick={() => setControlledVal("")}>
            Clear
          </Button>
        </div>
        <AutoComplete
          options={sampleStreets}
          placeholder="Controlled autocomplete..."
          value={controlledVal}
          onChange={setControlledVal}
          allowClear
        />
        <div style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", marginTop: "0.5rem" }}>
          Current controlled value: <code>{controlledVal || "(empty)"}</code>
        </div>
      </div>
      <CodeBlock
        code={`const [val, setVal] = useState("");

<Button onClick={() => setVal("Downing Street")}>Set Downing Street</Button>
<AutoComplete
  value={val}
  onChange={setVal}
  options={options}
/>;`}
        language="tsx"
      />

      {/* Customized Option Label / Email Completion */}
      <h2 className="docs-section-heading">Customized Option Label (Email Suggestion)</h2>
      <p className="docs-p">
        Dynamically generate options with customized labels based on user input (e.g. email domain hints):
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <AutoComplete
          options={emailOptions}
          value={emailValue}
          placeholder="Enter username (e.g. alex)"
          onSearch={handleEmailSearch}
          onChange={setEmailValue}
          filterOption={false}
          allowClear
        />
      </div>
      <CodeBlock
        code={`const [options, setOptions] = useState([]);

const onSearch = (searchText) => {
  if (!searchText || searchText.includes("@")) {
    setOptions([]);
  } else {
    setOptions([
      { value: \`\${searchText}@gmail.com\` },
      { value: \`\${searchText}@163.com\` },
      { value: \`\${searchText}@qq.com\` },
      { value: \`\${searchText}@outlook.com\` },
    ]);
  }
};

<AutoComplete
  options={options}
  onSearch={onSearch}
  filterOption={false}
  placeholder="Enter username..."
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

      {/* Lookup Patterns: Uncertain Category */}
      <h2 className="docs-section-heading">Lookup Patterns: Uncertain Category</h2>
      <p className="docs-p">
        Dynamically prompt search actions across diverse categories with result metrics:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <AutoComplete
          options={uncertainOptions}
          value={uncertainVal}
          placeholder="Try typing 'react' or 'antd'..."
          onSearch={handleUncertainSearch}
          onChange={setUncertainVal}
          filterOption={false}
          allowClear
        />
      </div>
      <CodeBlock
        code={`const onSearch = (query) => {
  setOptions([
    {
      value: query,
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Search \${query} in Topics</span>
          <span>12,000 results</span>
        </div>
      ),
    },
  ]);
};

<AutoComplete
  options={options}
  onSearch={onSearch}
  filterOption={false}
  placeholder="Search across categories..."
/>;`}
        language="tsx"
      />

      {/* Non-case-sensitive AutoComplete */}
      <h2 className="docs-section-heading">Non-case-sensitive AutoComplete</h2>
      <p className="docs-p">
        Try typing <code>b</code> or <code>B</code> to see matching regardless of case using a custom <code>filterOption</code>:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 360 }}>
        <AutoComplete
          placeholder="Try to type 'b'..."
          options={sampleStreets}
          filterOption={(inputValue, option) =>
            (option.value ?? "").toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
      <CodeBlock
        code={`<AutoComplete
  options={options}
  placeholder="Try to type 'b'..."
  filterOption={(inputValue, option) =>
    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  }
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

      {/* Customize Clear Button */}
      <h2 className="docs-section-heading">Customize Clear Button</h2>
      <p className="docs-p">
        Toggle clearability or configure custom clear icons using <code>allowClear</code>:
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
        <div style={{ width: 220 }}>
          <div style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", marginBottom: 4 }}>
            {clearableState ? "Clearable" : "UnClearable"}
          </div>
          <AutoComplete
            defaultValue="Chella UI"
            allowClear={clearableState}
            options={sampleStreets}
          />
          <button
            type="button"
            className="control-pill"
            style={{ marginTop: 8 }}
            onClick={() => setClearableState((prev) => !prev)}
          >
            Toggle clearable
          </button>
        </div>
        <div style={{ width: 220 }}>
          <div style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", marginBottom: 4 }}>
            Customized Clear Icon
          </div>
          <AutoComplete
            defaultValue="Custom Clear Icon"
            allowClear={{
              clearIcon: <span style={{ color: "var(--ch-color-primary)", fontWeight: "bold" }}>✕</span>,
            }}
            options={sampleStreets}
          />
        </div>
      </div>
      <CodeBlock
        code={`// Unclearable vs Custom Icon:
<AutoComplete allowClear={false} defaultValue="UnClearable" />
<AutoComplete
  defaultValue="Custom Clear"
  allowClear={{ clearIcon: <span style={{ color: "blue" }}>✕</span> }}
/>`}
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
        Customize classes and inline styles for semantic DOM elements using object or function syntax:
      </p>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
        <div style={{ width: 280 }}>
          <div style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", marginBottom: 6 }}>Object styles</div>
          <AutoComplete
            options={sampleStreets}
            placeholder="Object styles..."
            classNames={{
              root: "custom-object-root",
              input: "custom-object-input",
            }}
            styles={{
              root: { borderRadius: 12, borderColor: "#6366f1" },
            }}
          />
        </div>
        <div style={{ width: 280 }}>
          <div style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", marginBottom: 6 }}>Function styles</div>
          <AutoComplete
            options={sampleStreets}
            placeholder="Function styles..."
            classNames={({ props }) => ({
              root: `custom-fn-root-${props.size}`,
            })}
            styles={({ props }) => ({
              root: { borderRadius: props.size === "medium" ? 8 : 4 },
            })}
          />
        </div>
      </div>
      <CodeBlock
        code={`// Object syntax:
<AutoComplete
  classNames={{ root: "custom-root", input: "custom-input" }}
  styles={{ root: { borderRadius: 12 } }}
/>

// Function syntax (Ant Design 6.0):
<AutoComplete
  classNames={({ props }) => ({
    root: \`custom-root-\${props.size}\`,
  })}
  styles={({ props }) => ({
    root: { borderRadius: props.size === "medium" ? 8 : 4 },
  })}
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
