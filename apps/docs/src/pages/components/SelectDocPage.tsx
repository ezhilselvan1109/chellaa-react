import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectVariant,
  SelectSize,
  SelectStatus,
  SelectPlacement,
  SelectMode,
  Button,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";

const selectProps: PropItem[] = [
  {
    name: "options",
    type: "{ label: ReactNode, value: string | number, disabled?: boolean, options?: ... }[]",
    defaultValue: "undefined",
    description: "Select options data array. Faster and more ergonomic than JSX Option elements.",
  },
  {
    name: "mode",
    type: "'multiple' | 'tags'",
    defaultValue: "undefined",
    description: "Set mode of Select: undefined for single select, 'multiple' for tag-based multi-selection, 'tags' for custom freeform tag entry.",
  },
  {
    name: "value",
    type: "string | number | (string | number)[] | LabeledValue | LabeledValue[]",
    defaultValue: "undefined",
    description: "Current controlled selected option(s).",
  },
  {
    name: "defaultValue",
    type: "string | number | (string | number)[] | LabeledValue | LabeledValue[]",
    defaultValue: "undefined",
    description: "Initial uncontrolled selected option(s).",
  },
  {
    name: "variant",
    type: "'outlined' | 'filled' | 'borderless' | 'underlined'",
    defaultValue: "'outlined'",
    description: "Visual variant of the selector input box (Ant Design 5.13+).",
  },
  {
    name: "size",
    type: "'large' | 'medium' | 'small'",
    defaultValue: "'medium'",
    description: "The height of the select input field: large (40px), medium (32px), small (24px).",
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
    description: "Show clear icon button when item is selected. Supports custom clear icon.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Whether the select component is disabled.",
  },
  {
    name: "loading",
    type: "boolean",
    defaultValue: "false",
    description: "Indicate loading state with spinner icon.",
  },
  {
    name: "showSearch",
    type: "boolean | { filterSort?: Function }",
    defaultValue: "single: false, multiple: true",
    description: "Whether select is searchable. Displays an inline search input.",
  },
  {
    name: "filterOption",
    type: "boolean | ((inputValue: string, option: BaseOptionType) => boolean)",
    defaultValue: "true",
    description: "If true, filter options by input text. If function, filter options against it.",
  },
  {
    name: "filterSort",
    type: "(optionA: Option, optionB: Option, info: { searchValue: string }) => number",
    defaultValue: "undefined",
    description: "Sort function for search options sorting.",
  },
  {
    name: "optionFilterProp",
    type: "string | string[]",
    defaultValue: "'value'",
    description: "Which prop value of option will be used for filtering. Supports string[] for multi-field search.",
  },
  {
    name: "maxCount",
    type: "number",
    defaultValue: "undefined",
    description: "Max number of items that can be selected in multiple or tags mode.",
  },
  {
    name: "maxTagCount",
    type: "number | 'responsive'",
    defaultValue: "undefined",
    description: "Max tag count to show before collapsing excess items into a counter badge.",
  },
  {
    name: "maxTagPlaceholder",
    type: "ReactNode | ((omittedValues: any[]) => ReactNode)",
    defaultValue: "undefined",
    description: "Placeholder for collapsed hidden tags (defaults to '+ N...').",
  },
  {
    name: "maxTagTextLength",
    type: "number",
    defaultValue: "undefined",
    description: "Max tag text length to show before truncating with ellipsis.",
  },
  {
    name: "tokenSeparators",
    type: "string[] | ((input: string) => string[])",
    defaultValue: "undefined",
    description: "Separators used to automatically tokenize input when pasting or typing (e.g. [',', ' ']).",
  },
  {
    name: "labelInValue",
    type: "boolean",
    defaultValue: "false",
    description: "Whether to embed label in value, turning value to { value, label }.",
  },
  {
    name: "labelRender",
    type: "(props: LabeledValue) => ReactNode",
    defaultValue: "undefined",
    description: "Customize selected label display in the trigger.",
  },
  {
    name: "optionRender",
    type: "(option: BaseOptionType, info: { index: number }) => ReactNode",
    defaultValue: "undefined",
    description: "Customize the rendering of dropdown options.",
  },
  {
    name: "popupRender",
    type: "(originNode: ReactElement) => ReactNode",
    defaultValue: "undefined",
    description: "Customize the dropdown popup content (e.g. adding custom header, divider, or action footer).",
  },
  {
    name: "tagRender",
    type: "(props: CustomTagProps) => ReactNode",
    defaultValue: "undefined",
    description: "Customize tag chip rendering in multiple or tags mode.",
  },
  {
    name: "placement",
    type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'",
    defaultValue: "'bottomLeft'",
    description: "The position where the dropdown selection box pops up relative to the input trigger.",
  },
  {
    name: "popupMatchSelectWidth",
    type: "boolean | number",
    defaultValue: "true",
    description: "Whether dropdown menu matches select input width, or fixed numeric width in px.",
  },
  {
    name: "prefix",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Custom prefix icon or node displayed on the left side of the selector.",
  },
  {
    name: "suffixIcon",
    type: "ReactNode",
    defaultValue: "<DownOutlined />",
    description: "The custom suffix arrow icon.",
  },
  {
    name: "placeholder",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Placeholder text displayed when no option is selected.",
  },
  {
    name: "notFoundContent",
    type: "ReactNode",
    defaultValue: "'No data'",
    description: "Specify content to show when no option matches the search query.",
  },
  {
    name: "open",
    type: "boolean",
    defaultValue: "undefined",
    description: "Controlled open state of the dropdown menu.",
  },
  {
    name: "classNames",
    type: "Record<SemanticDOM, string> | ((info: { props }) => Record<SemanticDOM, string>)",
    defaultValue: "undefined",
    description: "Customize class for each semantic DOM slot.",
  },
  {
    name: "styles",
    type: "Record<SemanticDOM, CSSProperties> | ((info: { props }) => Record<SemanticDOM, CSSProperties>)",
    defaultValue: "undefined",
    description: "Customize inline styles for each semantic DOM slot.",
  },
  {
    name: "onChange",
    type: "(value, option) => void",
    defaultValue: "undefined",
    description: "Callback fired when selected value changes.",
  },
  {
    name: "onSelect",
    type: "(value, option) => void",
    defaultValue: "undefined",
    description: "Callback fired when an option is selected.",
  },
  {
    name: "onDeselect",
    type: "(value) => void",
    defaultValue: "undefined",
    description: "Callback fired when an option is deselected in multiple or tags mode.",
  },
  {
    name: "onClear",
    type: "() => void",
    defaultValue: "undefined",
    description: "Callback fired when the clear button is clicked.",
  },
  {
    name: "onSearch",
    type: "(value: string) => void",
    defaultValue: "undefined",
    description: "Callback fired when search input text changes.",
  },
];

const standardPeopleOptions = [
  { label: "Jack", value: "jack" },
  { label: "Lucy", value: "lucy" },
  { label: "Tom", value: "tom" },
  { label: "Disabled", value: "disabled", disabled: true },
  { label: "Yiminghe", value: "yiminghe" },
];

const cityGroupOptions = [
  {
    label: "Zhejiang",
    options: [
      { label: "Hangzhou", value: "hangzhou" },
      { label: "Ningbo", value: "ningbo" },
      { label: "Wenzhou", value: "wenzhou" },
    ],
  },
  {
    label: "Jiangsu",
    options: [
      { label: "Nanjing", value: "nanjing" },
      { label: "Suzhou", value: "suzhou" },
      { label: "Wuxi", value: "wuxi" },
    ],
  },
];

export const SelectDocPage: React.FC = () => {
  // Playground state
  const [mode, setMode] = useState<SelectMode | undefined>(undefined);
  const [variant, setVariant] = useState<SelectVariant>("outlined");
  const [size, setSize] = useState<SelectSize>("medium");
  const [status, setStatus] = useState<SelectStatus | undefined>(undefined);
  const [allowClear, setAllowClear] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [placement, setPlacement] = useState<SelectPlacement>("bottomLeft");
  const [limitTagCount, setLimitTagCount] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>("lucy");

  // Example state for multiple mode
  const [multipleValue, setMultipleValue] = useState<(string | number)[]>([
    "lucy",
    "tom",
  ]);

  // Example state for custom tags
  const [tagsValue, setTagsValue] = useState<(string | number)[]>([
    "React",
    "TypeScript",
  ]);

  // Example state for custom dropdown additions
  const [customItems, setCustomItems] = useState([
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
  ]);
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setCustomItems([
      ...customItems,
      { label: newItemName, value: String(Date.now()) },
    ]);
    setNewItemName("");
  };

  const playgroundCode = `<Select
${mode ? `  mode="${mode}"\n` : ""}${variant !== "outlined" ? `  variant="${variant}"\n` : ""}${size !== "medium" ? `  size="${size}"\n` : ""}${status ? `  status="${status}"\n` : ""}${allowClear ? `  allowClear\n` : ""}${disabled ? `  disabled\n` : ""}${loading ? `  loading\n` : ""}${showSearch ? `  showSearch\n` : ""}${limitTagCount ? `  maxTagCount={2}\n` : ""}${placement !== "bottomLeft" ? `  placement="${placement}"\n` : ""}  placeholder="Select a person"
  options={[
    { label: "Jack", value: "jack" },
    { label: "Lucy", value: "lucy" },
    { label: "Tom", value: "tom" },
    { label: "Disabled", value: "disabled", disabled: true },
    { label: "Yiminghe", value: "yiminghe" },
  ]}
  value={value}
  onChange={setValue}
  style={{ width: 320 }}
/>`;

  return (
    <article className="docs-content" style={{ maxWidth: "68rem" }}>
      {/* Breadcrumb */}
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Select</span>
      </div>

      {/* Header */}
      <div className="docs-title-row">
        <h1 className="docs-title">Select</h1>
        <Badge variant="primary" size="md">
          Data Entry
        </Badge>
        <Badge variant="success" size="md">
          Ant Design 5 & 6 Spec
        </Badge>
      </div>

      <p className="docs-description">
        A dropdown menu for displaying choices — an elegant, accessible alternative to the native <code>&lt;select&gt;</code> element with single selection, multiple tags, and custom freeform tags mode.
      </p>

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <p className="docs-p">
        Test the full interactive capabilities of Select with live controls below:
      </p>

      <ComponentPreview
        code={playgroundCode}
        controls={
          <>
            {/* Mode */}
            <div className="preview-control-group">
              <span className="control-label">Mode:</span>
              <div className="control-segmented-group">
                {(
                  [
                    { label: "Single", value: undefined },
                    { label: "Multiple", value: "multiple" },
                    { label: "Tags", value: "tags" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={String(opt.label)}
                    type="button"
                    className={`control-pill ${mode === opt.value ? "active" : ""}`}
                    onClick={() => {
                      setMode(opt.value as any);
                      setSelectedValue(opt.value ? ["lucy"] : "lucy");
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant */}
            <div className="preview-control-group">
              <span className="control-label">Variant:</span>
              <div className="control-segmented-group">
                {(["outlined", "filled", "borderless", "underlined"] as const).map((v) => (
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

            {/* Size */}
            <div className="preview-control-group">
              <span className="control-label">Size:</span>
              <div className="control-segmented-group">
                {(["small", "medium", "large"] as const).map((s) => (
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

            {/* Status */}
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
                    {st ? st : "normal"}
                  </button>
                ))}
              </div>
            </div>

            {/* Placement */}
            <div className="preview-control-group">
              <span className="control-label">Placement:</span>
              <div className="control-segmented-group">
                {(["bottomLeft", "bottomRight", "topLeft", "topRight"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`control-pill ${placement === p ? "active" : ""}`}
                    onClick={() => setPlacement(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="preview-control-group" style={{ flexWrap: "wrap", gap: "12px" }}>
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
                  checked={showSearch}
                  onChange={(e) => setShowSearch(e.target.checked)}
                />
                showSearch
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                disabled
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={loading}
                  onChange={(e) => setLoading(e.target.checked)}
                />
                loading
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={limitTagCount}
                  onChange={(e) => setLimitTagCount(e.target.checked)}
                />
                maxTagCount 2
              </label>
            </div>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%", maxWidth: 360 }}>
          <Select
            mode={mode}
            variant={variant}
            size={size}
            status={status}
            allowClear={allowClear}
            disabled={disabled}
            loading={loading}
            showSearch={showSearch}
            placement={placement}
            maxTagCount={limitTagCount ? 2 : undefined}
            placeholder="Select a person"
            options={standardPeopleOptions}
            value={selectedValue}
            onChange={(val) => setSelectedValue(val)}
            style={{ width: "100%" }}
          />

          <div
            style={{
              fontSize: 12,
              color: "var(--docs-fg-muted)",
              fontFamily: "monospace",
              background: "var(--docs-bg-subtle)",
              border: "1px solid var(--docs-border)",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            Value: {JSON.stringify(selectedValue ?? null)}
          </div>
        </div>
      </ComponentPreview>

      {/* Code Examples */}
      <h2 className="docs-section-heading">Basic Usage</h2>
      <p className="docs-p">
        Basic usage with the <code>options</code> array property or JSX <code>&lt;Select.Option&gt;</code> children:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Select } from '@chella-ui/react';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'yiminghe', label: 'Yiminghe' },
  { value: 'disabled', label: 'Disabled', disabled: true },
];

export const App = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Select defaultValue="lucy" style={{ width: 160 }} options={options} />
    <Select defaultValue="lucy" style={{ width: 160 }} disabled options={options} />
    <Select defaultValue="lucy" style={{ width: 160 }} loading options={options} />
    <Select defaultValue="lucy" style={{ width: 160 }} allowClear placeholder="Clearable" options={options} />
  </div>
);`}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <Select
            defaultValue="lucy"
            style={{ width: 160 }}
            options={standardPeopleOptions}
          />
          <Select
            defaultValue="lucy"
            style={{ width: 160 }}
            disabled
            options={standardPeopleOptions}
          />
          <Select
            defaultValue="lucy"
            style={{ width: 160 }}
            loading
            options={standardPeopleOptions}
          />
          <Select
            defaultValue="lucy"
            style={{ width: 160 }}
            allowClear
            placeholder="Clearable"
            options={standardPeopleOptions}
          />
        </div>
      </ComponentPreview>

      {/* 2. Search and Filter */}
      <h2 className="docs-section-heading">Search and Filter</h2>
      <p className="docs-p">
        Filter options dynamically with <code>showSearch</code>, custom <code>filterOption</code> comparator, and sorted options with <code>filterSort</code>:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Select } from '@chella-ui/react';

export const App = () => (
  <Select
    showSearch
    placeholder="Search a person (sorted A-Z)"
    optionFilterProp="label"
    filterOption={(input, option) =>
      String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    filterSort={(a, b) =>
      String(a?.label ?? '').localeCompare(String(b?.label ?? ''))
    }
    options={[
      { label: 'Jack', value: 'jack' },
      { label: 'Lucy', value: 'lucy' },
      { label: 'Tom', value: 'tom' },
      { label: 'Yiminghe', value: 'yiminghe' },
    ]}
    style={{ width: 280 }}
  />
);`}
      >
        <Select
          showSearch
          placeholder="Search a person (sorted A-Z)"
          optionFilterProp="label"
          filterOption={(input, option) =>
            String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(a, b) =>
            String(a?.label ?? "").localeCompare(String(b?.label ?? ""))
          }
          options={standardPeopleOptions}
          style={{ width: 280 }}
        />
      </ComponentPreview>

      {/* 3. Multiple Selection & Selection Limits */}
      <h2 className="docs-section-heading">Multiple Selection & Selection Limits</h2>
      <p className="docs-p">
        Select multiple items simultaneously. Set <code>maxCount</code> to cap selection quantity — once reached, remaining options are automatically disabled:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Select } from '@chella-ui/react';

export const App = () => {
  const [value, setValue] = useState(['lucy', 'tom']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 440 }}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Select people (Max 3)"
        maxCount={3}
        value={value}
        onChange={setValue}
        options={[
          { label: 'Jack', value: 'jack' },
          { label: 'Lucy', value: 'lucy' },
          { label: 'Tom', value: 'tom' },
          { label: 'Edward', value: 'edward' },
          { label: 'Felicia', value: 'felicia' },
        ]}
      />
      <span style={{ fontSize: 13, color: 'var(--docs-fg-muted)' }}>
        Selected: {value.join(', ')} (Maximum 3 items allowed)
      </span>
    </div>
  );
};`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 440 }}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select people (Max 3)"
            maxCount={3}
            value={multipleValue}
            onChange={(val) => setMultipleValue(val as (string | number)[])}
            options={[
              { label: "Jack", value: "jack" },
              { label: "Lucy", value: "lucy" },
              { label: "Tom", value: "tom" },
              { label: "Edward", value: "edward" },
              { label: "Felicia", value: "felicia" },
            ]}
          />
          <span style={{ fontSize: 13, color: "var(--docs-fg-muted)" }}>
            Selected: {multipleValue.join(", ")} (Maximum 3 items allowed)
          </span>
        </div>
      </ComponentPreview>

      {/* 4. Tags Mode & Tokenization */}
      <h2 className="docs-section-heading">Tags Mode & Automatic Tokenization</h2>
      <p className="docs-p">
        In tags mode (<code>mode="tags"</code>), users can select from list or type custom tags. Using <code>tokenSeparators</code> automatically splits pasted or typed strings:
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Select } from '@chella-ui/react';

export const App = () => {
  const [tags, setTags] = useState(['React', 'TypeScript']);

  return (
    <Select
      mode="tags"
      style={{ width: '100%', maxWidth: 480 }}
      placeholder="Type tags or paste comma-separated values"
      tokenSeparators={[',', ' ']}
      value={tags}
      onChange={setTags}
      options={[
        { label: 'React', value: 'React' },
        { label: 'Vue', value: 'Vue' },
        { label: 'TypeScript', value: 'TypeScript' },
        { label: 'Node.js', value: 'Node.js' },
      ]}
    />
  );
};`}
      >
        <Select
          mode="tags"
          style={{ width: "100%", maxWidth: 480 }}
          placeholder="Type tags or paste comma-separated values"
          tokenSeparators={[",", " "]}
          value={tagsValue}
          onChange={(val) => setTagsValue(val as (string | number)[])}
          options={[
            { label: "React", value: "React" },
            { label: "Vue", value: "Vue" },
            { label: "TypeScript", value: "TypeScript" },
            { label: "Node.js", value: "Node.js" },
          ]}
        />
      </ComponentPreview>

      {/* 5. Variants */}
      <h2 className="docs-section-heading">Variants</h2>
      <p className="docs-p">
        Four visual variants are supported: <code>outlined</code> (default), <code>filled</code>, <code>borderless</code>, and <code>underlined</code>:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Select } from '@chella-ui/react';

export const App = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Select variant="outlined" placeholder="Outlined" style={{ width: 140 }} options={options} />
    <Select variant="filled" placeholder="Filled" style={{ width: 140 }} options={options} />
    <Select variant="borderless" placeholder="Borderless" style={{ width: 140 }} options={options} />
    <Select variant="underlined" placeholder="Underlined" style={{ width: 140 }} options={options} />
  </div>
);`}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Select
            variant="outlined"
            placeholder="Outlined"
            style={{ width: 140 }}
            options={standardPeopleOptions}
          />
          <Select
            variant="filled"
            placeholder="Filled"
            style={{ width: 140 }}
            options={standardPeopleOptions}
          />
          <Select
            variant="borderless"
            placeholder="Borderless"
            style={{ width: 140 }}
            options={standardPeopleOptions}
          />
          <Select
            variant="underlined"
            placeholder="Underlined"
            style={{ width: 140 }}
            options={standardPeopleOptions}
          />
        </div>
      </ComponentPreview>

      {/* 6. Sizes */}
      <h2 className="docs-section-heading">Sizes</h2>
      <p className="docs-p">
        Three standard heights: <code>large</code> (40px), <code>medium</code> (32px), and <code>small</code> (24px):
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Select } from '@chella-ui/react';

export const App = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
    <Select size="large" defaultValue="lucy" style={{ width: 140 }} options={options} />
    <Select size="medium" defaultValue="lucy" style={{ width: 140 }} options={options} />
    <Select size="small" defaultValue="lucy" style={{ width: 140 }} options={options} />
  </div>
);`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <Select
            size="large"
            defaultValue="lucy"
            style={{ width: 140 }}
            options={standardPeopleOptions}
          />
          <Select
            size="medium"
            defaultValue="lucy"
            style={{ width: 140 }}
            options={standardPeopleOptions}
          />
          <Select
            size="small"
            defaultValue="lucy"
            style={{ width: 140 }}
            options={standardPeopleOptions}
          />
        </div>
      </ComponentPreview>

      {/* 7. Option Groups */}
      <h2 className="docs-section-heading">Option Groups</h2>
      <p className="docs-p">
        Group options using the <code>options</code> array hierarchy or declarative JSX <code>&lt;Select.OptGroup&gt;</code>:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Select } from '@chella-ui/react';

export const App = () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    {/* Using Options Array */}
    <Select
      defaultValue="hangzhou"
      style={{ width: 200 }}
      options={[
        {
          label: 'Zhejiang',
          options: [
            { label: 'Hangzhou', value: 'hangzhou' },
            { label: 'Ningbo', value: 'ningbo' },
          ],
        },
        {
          label: 'Jiangsu',
          options: [{ label: 'Nanjing', value: 'nanjing' }],
        },
      ]}
    />

    {/* Using JSX OptGroup */}
    <Select defaultValue="jack" style={{ width: 200 }}>
      <Select.OptGroup label="Manager">
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select.OptGroup>
      <Select.OptGroup label="Engineer">
        <Select.Option value="yiminghe">yiminghe</Select.Option>
      </Select.OptGroup>
    </Select>
  </div>
);`}
      >
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Select
            defaultValue="hangzhou"
            style={{ width: 200 }}
            options={cityGroupOptions}
          />
          <Select defaultValue="jack" style={{ width: 200 }}>
            <Select.OptGroup label="Manager">
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
            </Select.OptGroup>
            <Select.OptGroup label="Engineer">
              <Select.Option value="yiminghe">yiminghe</Select.Option>
            </Select.OptGroup>
          </Select>
        </div>
      </ComponentPreview>

      {/* 8. Custom Dropdown Render */}
      <h2 className="docs-section-heading">Custom Dropdown Render (popupRender)</h2>
      <p className="docs-p">
        Attach custom action headers or footers with <code>popupRender</code> (e.g. quick inline addition of new items):
      </p>
      <ComponentPreview
        code={`import React, { useState } from 'react';
import { Select, Button } from '@chella-ui/react';

export const App = () => {
  const [items, setItems] = useState([
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
  ]);
  const [text, setText] = useState('');

  return (
    <Select
      style={{ width: 300 }}
      placeholder="Custom popup menu"
      options={items}
      popupRender={(menu) => (
        <div>
          {menu}
          <div style={{ borderTop: '1px solid var(--docs-border)', padding: 8, display: 'flex', gap: 6 }}>
            <input
              type="text"
              value={text}
              placeholder="Enter item"
              onChange={(e) => setText(e.target.value)}
              style={{ flex: 1, padding: '4px 8px', border: '1px solid var(--docs-border)', borderRadius: 4 }}
            />
            <Button
              type="primary"
              size="small"
              onClick={() => {
                if (text) {
                  setItems([...items, { label: text, value: text }]);
                  setText('');
                }
              }}
            >
              + Add
            </Button>
          </div>
        </div>
      )}
    />
  );
};`}
      >
        <Select
          style={{ width: 300 }}
          placeholder="Custom popup menu"
          options={customItems}
          popupRender={(menu) => (
            <div>
              {menu}
              <div
                style={{
                  borderTop: "1px solid var(--docs-border)",
                  padding: 8,
                  display: "flex",
                  gap: 6,
                }}
              >
                <input
                  type="text"
                  value={newItemName}
                  placeholder="Enter item name"
                  onChange={(e) => setNewItemName(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "4px 8px",
                    border: "1px solid var(--docs-border)",
                    borderRadius: 4,
                    background: "var(--docs-bg-surface)",
                    color: "inherit",
                  }}
                />
                <Button
                  type="primary"
                  size="small"
                  onClick={handleAddItem}
                >
                  + Add Item
                </Button>
              </div>
            </div>
          )}
        />
      </ComponentPreview>

      {/* 9. Custom Tag Render */}
      <h2 className="docs-section-heading">Custom Tag Render (tagRender)</h2>
      <p className="docs-p">
        Customize the appearance of tag chips using <code>tagRender</code>:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Select } from '@chella-ui/react';

const colors: Record<string, string> = {
  gold: '#faad14',
  cyan: '#13c2c2',
  blue: '#1677ff',
  green: '#52c41a',
};

export const App = () => (
  <Select
    mode="multiple"
    defaultValue={['gold', 'cyan']}
    style={{ width: '100%', maxWidth: 420 }}
    tagRender={({ label, value, closable, onClose }) => (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '2px 8px',
          borderRadius: 4,
          fontSize: 12,
          margin: '2px 4px 2px 0',
          background: colors[String(value)] || '#1677ff',
          color: '#ffffff',
          fontWeight: 600,
        }}
      >
        {label}
        {closable && (
          <span onClick={onClose} style={{ cursor: 'pointer', fontSize: 10, opacity: 0.8 }}>
            ✕
          </span>
        )}
      </span>
    )}
    options={[
      { label: 'Gold', value: 'gold' },
      { label: 'Cyan', value: 'cyan' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ]}
  />
);`}
      >
        <Select
          mode="multiple"
          defaultValue={["gold", "cyan"]}
          style={{ width: "100%", maxWidth: 420 }}
          tagRender={({ label, value, closable, onClose }) => {
            const colorMap: Record<string, string> = {
              gold: "#faad14",
              cyan: "#13c2c2",
              blue: "#1677ff",
              green: "#52c41a",
            };
            return (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                  margin: "2px 4px 2px 0",
                  background: colorMap[String(value)] || "#1677ff",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                {label}
                {closable && (
                  <span
                    onClick={onClose}
                    style={{ cursor: "pointer", fontSize: 10, opacity: 0.8 }}
                  >
                    ✕
                  </span>
                )}
              </span>
            );
          }}
          options={[
            { label: "Gold", value: "gold" },
            { label: "Cyan", value: "cyan" },
            { label: "Blue", value: "blue" },
            { label: "Green", value: "green" },
          ]}
        />
      </ComponentPreview>

      {/* 10. Status and Prefix */}
      <h2 className="docs-section-heading">Status & Prefix</h2>
      <p className="docs-p">
        Add validation state styling (<code>error</code> or <code>warning</code>) and custom prefix or suffix icons:
      </p>
      <ComponentPreview
        code={`import React from 'react';
import { Select } from '@chella-ui/react';

export const App = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Select status="error" placeholder="Error status" style={{ width: 180 }} options={options} />
    <Select status="warning" placeholder="Warning status" style={{ width: 180 }} options={options} />
    <Select prefix="👤" placeholder="With prefix" style={{ width: 200 }} options={options} />
  </div>
);`}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Select
            status="error"
            placeholder="Error status"
            style={{ width: 180 }}
            options={standardPeopleOptions}
          />
          <Select
            status="warning"
            placeholder="Warning status"
            style={{ width: 180 }}
            options={standardPeopleOptions}
          />
          <Select
            prefix="👤"
            placeholder="With prefix"
            style={{ width: 200 }}
            options={standardPeopleOptions}
          />
        </div>
      </ComponentPreview>

      {/* Semantic DOM */}
      <h2 className="docs-section-heading">Semantic DOM Styling</h2>
      <p className="docs-p">
        Custom styling can be applied to individual semantic DOM nodes via <code>classNames</code> and <code>styles</code>:
      </p>

      <table className="props-table">
        <thead>
          <tr>
            <th>Semantic Slot</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>root</code></td>
            <td>Root element with inline-flex layout, border, and basic selector container styles.</td>
          </tr>
          <tr>
            <td><code>prefix</code></td>
            <td>Prefix element with layout and styling for prefix content.</td>
          </tr>
          <tr>
            <td><code>content</code></td>
            <td>Multiple selection container with layout, spacing, and wrapping styles for selected items.</td>
          </tr>
          <tr>
            <td><code>placeholder</code></td>
            <td>Placeholder element with font styles and colors for placeholder text.</td>
          </tr>
          <tr>
            <td><code>clear</code></td>
            <td>Clear button element with interactive hover effects and layout.</td>
          </tr>
          <tr>
            <td><code>input</code></td>
            <td>Search input element with font inheritance and cursor control.</td>
          </tr>
          <tr>
            <td><code>suffix</code></td>
            <td>Suffix element containing chevron arrow icon and clear button.</td>
          </tr>
          <tr>
            <td><code>popup.root</code></td>
            <td>Popup element with positioning, z-index, background, and box-shadow.</td>
          </tr>
          <tr>
            <td><code>popup.list</code></td>
            <td>Popup list element with max-height and scrolling container styles.</td>
          </tr>
          <tr>
            <td><code>popup.listItem</code></td>
            <td>Popup option item element with padding, hover, selected, and disabled states.</td>
          </tr>
        </tbody>
      </table>

      {/* Props Reference */}
      <h2 className="docs-section-heading">API Reference</h2>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "1.5rem 0 0.75rem" }}>Select Props</h3>
      <PropsTable props={selectProps} />

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "2rem 0 0.75rem" }}>Select.Option Props</h3>
      <table className="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>value</code></td>
            <td>Default to filter and identify this option.</td>
            <td>string | number</td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>disabled</code></td>
            <td>Disable this option.</td>
            <td>boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td><code>title</code></td>
            <td>Title tooltip attribute of Select Option.</td>
            <td>string</td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>className</code></td>
            <td>Additional CSS class for option item.</td>
            <td>string</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "2rem 0 0.75rem" }}>Select.OptGroup Props</h3>
      <table className="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>label</code></td>
            <td>Group label title.</td>
            <td>ReactNode</td>
            <td>-</td>
          </tr>
          <tr>
            <td><code>key</code></td>
            <td>Group key identifier.</td>
            <td>string</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      {/* Design Tokens */}
      <h2 className="docs-section-heading">Design Tokens</h2>
      <p className="docs-p">
        Select utilizes Ant Design 5 & 6 CSS design tokens with full zero-runtime dark mode integration:
      </p>

      <table className="props-table">
        <thead>
          <tr>
            <th>Token Name</th>
            <th>Description</th>
            <th>Default Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--select-active-border</code></td>
            <td>Active border color on focus / open.</td>
            <td><code>#1677ff</code></td>
          </tr>
          <tr>
            <td><code>--select-active-outline</code></td>
            <td>Active outline focus ring.</td>
            <td><code>rgba(5, 145, 255, 0.1)</code></td>
          </tr>
          <tr>
            <td><code>--select-hover-border</code></td>
            <td>Hover border color.</td>
            <td><code>#4096ff</code></td>
          </tr>
          <tr>
            <td><code>--select-clear-bg</code></td>
            <td>Background color of the clear button.</td>
            <td><code>#ffffff</code></td>
          </tr>
          <tr>
            <td><code>--select-multi-item-bg</code></td>
            <td>Background color of multiple tag chip.</td>
            <td><code>rgba(0, 0, 0, 0.06)</code></td>
          </tr>
          <tr>
            <td><code>--select-multi-item-height</code></td>
            <td>Height of multiple tag chip.</td>
            <td><code>24px</code> (LG: 32px, SM: 16px)</td>
          </tr>
          <tr>
            <td><code>--select-option-active-bg</code></td>
            <td>Background color when hovering an option.</td>
            <td><code>rgba(0, 0, 0, 0.04)</code></td>
          </tr>
          <tr>
            <td><code>--select-option-selected-bg</code></td>
            <td>Background color when option is selected.</td>
            <td><code>#e6f4ff</code></td>
          </tr>
          <tr>
            <td><code>--select-popup-zindex</code></td>
            <td>Z-index of the dropdown portal layer.</td>
            <td><code>1050</code></td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};
