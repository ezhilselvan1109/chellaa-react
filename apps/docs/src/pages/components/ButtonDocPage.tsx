import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonType,
  ButtonVariant,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const antDesignButtonProps: PropItem[] = [
  {
    name: "type",
    type: '"primary" | "default" | "dashed" | "text" | "link"',
    defaultValue: '"default"',
    description: "Syntactic sugar. Set button type preset styling. Follows color & variant if provided.",
  },
  {
    name: "variant",
    type: '"solid" | "outlined" | "dashed" | "filled" | "text" | "link"',
    defaultValue: '"outlined"',
    description: "Set button variant (Ant Design 5.21+ / 6.0).",
  },
  {
    name: "color",
    type: '"default" | "primary" | "danger" | PresetColors',
    defaultValue: '"default"',
    description: "Set button color. Supports preset colors like cyan, purple, green, orange, red, blue, etc.",
  },
  {
    name: "danger",
    type: "boolean",
    defaultValue: "false",
    description: "Syntactic sugar. Set the danger status of button across any type or variant.",
  },
  {
    name: "ghost",
    type: "boolean",
    defaultValue: "false",
    description: "Make background transparent and invert text and border colors.",
  },
  {
    name: "shape",
    type: '"default" | "circle" | "round"',
    defaultValue: '"default"',
    description: "Can be used to set button shape (circle for icon buttons, round for pills).",
  },
  {
    name: "size",
    type: '"large" | "medium" | "small"',
    defaultValue: '"medium"',
    description: "Set the size of button.",
  },
  {
    name: "loading",
    type: "boolean | { delay?: number, icon?: ReactNode }",
    defaultValue: "false",
    description: "Set the loading status of button with animated spinner and click lock.",
  },
  {
    name: "loadingIcon",
    type: "ReactNode",
    defaultValue: "<Spinner />",
    description: "Custom loading icon element.",
  },
  {
    name: "block",
    type: "boolean",
    defaultValue: "false",
    description: "Option to fit button width to its parent width.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disabled state of button.",
  },
  {
    name: "icon",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Set the icon component of button.",
  },
  {
    name: "iconPlacement",
    type: '"start" | "end"',
    defaultValue: '"start"',
    description: "Set the icon position of button.",
  },
  {
    name: "autoInsertSpace",
    type: "boolean",
    defaultValue: "true",
    description: "Automatically inserts a space between two Chinese characters.",
  },
  {
    name: "wave",
    type: "boolean | { disabled?: boolean }",
    defaultValue: "true",
    description: "Configuration for Ant Design radiating click wave ripple animation.",
  },
  {
    name: "classNames",
    type: "Record<'root' | 'icon' | 'content', string>",
    defaultValue: "undefined",
    description: "Customize class for each semantic structure inside the component.",
  },
  {
    name: "styles",
    type: "Record<'root' | 'icon' | 'content', CSSProperties>",
    defaultValue: "undefined",
    description: "Customize inline style for each semantic structure inside the component.",
  },
  {
    name: "href",
    type: "string",
    defaultValue: "undefined",
    description: "Redirect url of link button (renders as <a> tag).",
  },
  {
    name: "htmlType",
    type: '"submit" | "reset" | "button"',
    defaultValue: '"button"',
    description: "Set the original html type of button.",
  },
  {
    name: "onClick",
    type: "(event: React.MouseEvent) => void",
    defaultValue: "undefined",
    description: "Handler for click event with click wave effect trigger.",
  },
];

const types: ButtonType[] = ["primary", "default", "dashed", "text", "link"];
const variants: ButtonVariant[] = ["solid", "outlined", "dashed", "filled", "text", "link"];
const colors: ButtonColor[] = ["default", "primary", "danger", "cyan", "purple", "green", "orange"];
const shapes: ButtonShape[] = ["default", "round", "circle"];
const sizes: ButtonSize[] = ["small", "medium", "large"];

export const ButtonDocPage: React.FC = () => {
  const [mode, setMode] = useState<"type" | "colorVariant">("type");
  const [type, setType] = useState<ButtonType>("primary");
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [color, setColor] = useState<ButtonColor>("primary");
  const [shape, setShape] = useState<ButtonShape>("default");
  const [size, setSize] = useState<ButtonSize>("medium");
  const [danger, setDanger] = useState(false);
  const [ghost, setGhost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [block, setBlock] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const interactiveCode =
    mode === "type"
      ? `<Button
  type="${type}"
  size="${size}"${shape !== "default" ? `\n  shape="${shape}"` : ""}${danger ? "\n  danger" : ""}${ghost ? "\n  ghost" : ""}${loading ? "\n  loading" : ""}${block ? "\n  block" : ""}${disabled ? "\n  disabled" : ""}
>
  ${shape === "circle" ? "🔍" : type.charAt(0).toUpperCase() + type.slice(1) + " Button"}
</Button>`
      : `<Button
  color="${color}"
  variant="${variant}"
  size="${size}"${shape !== "default" ? `\n  shape="${shape}"` : ""}${ghost ? "\n  ghost" : ""}${loading ? "\n  loading" : ""}${block ? "\n  block" : ""}${disabled ? "\n  disabled" : ""}
>
  ${shape === "circle" ? "🔍" : `${color} ${variant}`}
</Button>`;

  return (
    <article className="docs-content" style={{ maxWidth: "68rem" }}>
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
          Ant Design Specification
        </Badge>
        <Badge variant="success" size="md">
          100% WAI-ARIA
        </Badge>
      </div>

      <p className="docs-description">
        A button means an operation (or a series of operations). Clicking a button will trigger its corresponding business logic with an interactive wave effect.
      </p>

      {/* Package Import */}
      <CodeBlock code='import { Button } from "@chella-ui/react";' language="tsx" />

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
            {/* Mode selector */}
            <div className="preview-control-group">
              <span className="control-label">Mode:</span>
              <div className="control-segmented-group">
                <button
                  type="button"
                  className={`control-pill ${mode === "type" ? "active" : ""}`}
                  onClick={() => setMode("type")}
                >
                  Type (Sugar)
                </button>
                <button
                  type="button"
                  className={`control-pill ${mode === "colorVariant" ? "active" : ""}`}
                  onClick={() => setMode("colorVariant")}
                >
                  Color & Variant
                </button>
              </div>
            </div>

            {mode === "type" ? (
              <div className="preview-control-group">
                <span className="control-label">Type:</span>
                <div className="control-segmented-group">
                  {types.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`control-pill ${type === t ? "active" : ""}`}
                      onClick={() => setType(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
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
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="preview-control-group">
                  <span className="control-label">Color:</span>
                  <div className="control-segmented-group">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`control-pill ${color === c ? "active" : ""}`}
                        onClick={() => setColor(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Shape selector */}
            <div className="preview-control-group">
              <span className="control-label">Shape:</span>
              <div className="control-segmented-group">
                {shapes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`control-pill ${shape === s ? "active" : ""}`}
                    onClick={() => setShape(s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="preview-control-group">
              <span className="control-label">Size:</span>
              <div className="control-segmented-group">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`control-pill ${size === sz ? "active" : ""}`}
                    onClick={() => setSize(sz)}
                  >
                    {sz.charAt(0).toUpperCase() + sz.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={danger}
                  onChange={(e) => setDanger(e.target.checked)}
                />
                Danger
              </label>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={ghost}
                  onChange={(e) => setGhost(e.target.checked)}
                />
                Ghost
              </label>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={loading}
                  onChange={(e) => setLoading(e.target.checked)}
                />
                Loading
              </label>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={block}
                  onChange={(e) => setBlock(e.target.checked)}
                />
                Block
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
        <div
          style={{
            width: block ? "100%" : "auto",
            padding: ghost ? "1.5rem" : 0,
            background: ghost ? "#111827" : "transparent",
            borderRadius: ghost ? 8 : 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {mode === "type" ? (
            <Button
              type={type}
              shape={shape}
              size={size}
              danger={danger}
              ghost={ghost}
              loading={loading}
              block={block}
              disabled={disabled}
              onClick={() => {}}
            >
              {shape === "circle" ? "🔍" : `${type.charAt(0).toUpperCase() + type.slice(1)} Button`}
            </Button>
          ) : (
            <Button
              color={color}
              variant={variant}
              shape={shape}
              size={size}
              ghost={ghost}
              loading={loading}
              block={block}
              disabled={disabled}
              onClick={() => {}}
            >
              {shape === "circle" ? "🔍" : `${color} ${variant}`}
            </Button>
          )}
        </div>
      </ComponentPreview>

      {/* 5 Types Section */}
      <h2 className="docs-section-heading">5 Button Types (Syntactic Sugar)</h2>
      <p className="docs-p">
        In Ant Design we provide 5 types of button:
      </p>
      <ul>
        <li>🔵 <strong>Primary button:</strong> used for the main action, there can be at most one primary button in a section.</li>
        <li>⚪️ <strong>Default button:</strong> used for a series of actions without priority.</li>
        <li>😶 <strong>Dashed button:</strong> commonly used for adding more actions.</li>
        <li>🔤 <strong>Text button:</strong> used for the most secondary action.</li>
        <li>🔗 <strong>Link button:</strong> used for external links.</li>
      </ul>
      <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", margin: "1.5rem 0", alignItems: "center" }}>
        <Button type="primary">Primary Button</Button>
        <Button type="default">Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
      <CodeBlock
        code={`<Button type="primary">Primary Button</Button>
<Button type="default">Default Button</Button>
<Button type="dashed">Dashed Button</Button>
<Button type="text">Text Button</Button>
<Button type="link">Link Button</Button>`}
        language="tsx"
      />

      {/* Color & Variant (Ant Design 5.21+) */}
      <h2 className="docs-section-heading">Color & Variant (Ant Design 5.21+)</h2>
      <p className="docs-p">
        You can set the <code>color</code> and <code>variant</code> attributes at the same time to derive more button variants across preset colors (cyan, purple, green, orange, etc.):
      </p>
      <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", margin: "1.5rem 0", alignItems: "center" }}>
        <Button color="cyan" variant="solid">Cyan Solid</Button>
        <Button color="purple" variant="outlined">Purple Outlined</Button>
        <Button color="green" variant="dashed">Green Dashed</Button>
        <Button color="orange" variant="filled">Orange Filled</Button>
        <Button color="primary" variant="text">Primary Text</Button>
        <Button color="danger" variant="link">Danger Link</Button>
      </div>
      <CodeBlock
        code={`<Button color="cyan" variant="solid">Cyan Solid</Button>
<Button color="purple" variant="outlined">Purple Outlined</Button>
<Button color="green" variant="dashed">Green Dashed</Button>
<Button color="orange" variant="filled">Orange Filled</Button>
<Button color="primary" variant="text">Primary Text</Button>
<Button color="danger" variant="link">Danger Link</Button>`}
        language="tsx"
      />

      {/* Danger Buttons */}
      <h2 className="docs-section-heading">Danger Buttons</h2>
      <p className="docs-p">
        The <code>danger</code> property is available across all button types for actions of risk (like deletion, termination, or irreversible changes):
      </p>
      <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", margin: "1.5rem 0", alignItems: "center" }}>
        <Button type="primary" danger>Primary Danger</Button>
        <Button type="default" danger>Default Danger</Button>
        <Button type="dashed" danger>Dashed Danger</Button>
        <Button type="text" danger>Text Danger</Button>
        <Button type="link" danger>Link Danger</Button>
      </div>
      <CodeBlock
        code={`<Button type="primary" danger>Primary Danger</Button>
<Button type="default" danger>Default Danger</Button>
<Button type="dashed" danger>Dashed Danger</Button>
<Button type="text" danger>Text Danger</Button>
<Button type="link" danger>Link Danger</Button>`}
        language="tsx"
      />

      {/* Ghost Buttons */}
      <h2 className="docs-section-heading">Ghost Button</h2>
      <p className="docs-p">
        The <code>ghost</code> property makes a button's background transparent and inverts text and border colors, commonly used on colored or dark hero surfaces:
      </p>
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          padding: "1.5rem",
          borderRadius: 8,
          display: "flex",
          gap: "0.85rem",
          flexWrap: "wrap",
          margin: "1.5rem 0",
        }}
      >
        <Button type="primary" ghost>Primary Ghost</Button>
        <Button type="default" ghost>Default Ghost</Button>
        <Button type="dashed" ghost>Dashed Ghost</Button>
        <Button danger ghost>Danger Ghost</Button>
      </div>
      <CodeBlock
        code={`<div style={{ background: "rgb(190, 200, 200)", padding: 24 }}>
  <Button type="primary" ghost>Primary Ghost</Button>
  <Button type="default" ghost>Default Ghost</Button>
  <Button type="dashed" ghost>Dashed Ghost</Button>
  <Button danger ghost>Danger Ghost</Button>
</div>`}
        language="tsx"
      />

      {/* Shapes & Icon Placement */}
      <h2 className="docs-section-heading">Button Shapes & Icons</h2>
      <p className="docs-p">
        Set <code>shape="circle"</code> for circular icon triggers, or <code>shape="round"</code> for pill buttons. Icons can be placed at <code>start</code> or <code>end</code>:
      </p>
      <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", margin: "1.5rem 0", alignItems: "center" }}>
        <Button type="primary" shape="circle">🔍</Button>
        <Button type="primary" shape="round">Download Now</Button>
        <Button type="default" icon={<span>★</span>} iconPlacement="start">Favorite</Button>
        <Button type="default" icon={<span>→</span>} iconPlacement="end">Next Step</Button>
      </div>
      <CodeBlock
        code={`<Button type="primary" shape="circle">🔍</Button>
<Button type="primary" shape="round">Download Now</Button>
<Button type="default" icon={<SearchIcon />} iconPlacement="start">Favorite</Button>
<Button type="default" icon={<ArrowRightIcon />} iconPlacement="end">Next Step</Button>`}
        language="tsx"
      />

      {/* Sizes */}
      <h2 className="docs-section-heading">Size Scale</h2>
      <p className="docs-p">
        Supports three sizes: <code>large</code> (40px), <code>medium</code> (32px, default), and <code>small</code> (24px):
      </p>
      <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", margin: "1.5rem 0", alignItems: "center" }}>
        <Button type="primary" size="large">Large Button</Button>
        <Button type="primary" size="medium">Medium Button</Button>
        <Button type="primary" size="small">Small Button</Button>
      </div>
      <CodeBlock
        code={`<Button type="primary" size="large">Large Button</Button>
<Button type="primary" size="medium">Medium Button</Button>
<Button type="primary" size="small">Small Button</Button>`}
        language="tsx"
      />

      {/* Loading & Block */}
      <h2 className="docs-section-heading">Loading & Block Width</h2>
      <p className="docs-p">
        A loading indicator is added by setting <code>loading</code>. The <code>block</code> property fits the button width to 100% of its parent:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 380, margin: "1.5rem 0" }}>
        <Button type="primary" loading>Loading Primary</Button>
        <Button type="primary" block>Block Button (100% Width)</Button>
      </div>

      {/* Custom Semantic DOM Styling */}
      <h2 className="docs-section-heading">Custom Semantic DOM Styling</h2>
      <p className="docs-p">
        You can customize the semantic DOM style of Button by passing objects through <code>classNames</code> and <code>styles</code> for <code>root</code>, <code>icon</code>, and <code>content</code>:
      </p>
      <CodeBlock
        code={`<Button
  type="primary"
  classNames={{
    root: "custom-btn-root",
    icon: "custom-btn-icon",
    content: "custom-btn-content",
  }}
  styles={{
    root: { boxShadow: "0 4px 12px rgba(22, 119, 255, 0.4)" },
    content: { letterSpacing: "1px" },
  }}
>
  Semantic Button
</Button>`}
        language="tsx"
      />

      {/* Ant Design Click Wave Effect */}
      <h2 className="docs-section-heading">Ant Design Click Wave Effect</h2>
      <p className="docs-p">
        Clicking any solid or bordered button triggers the dynamic Ant Design radiating wave pulse animation around the border. Click the button below to observe the wave effect:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Button type="primary" size="large" onClick={() => {}}>
          Click Me for Wave Effect ⚡
        </Button>
      </div>

      {/* Props Reference */}
      <h2 className="docs-section-heading">API Reference</h2>
      <PropsTable props={antDesignButtonProps} />
    </article>
  );
};
