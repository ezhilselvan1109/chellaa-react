import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  DividerOrientation,
  DividerVariant,
  DividerSize,
  DividerTitlePlacement,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const dividerProps: PropItem[] = [
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "The wrapped title text inside divider.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    defaultValue: '"horizontal"',
    description: "Whether the line is horizontal or vertical.",
  },
  {
    name: "vertical",
    type: "boolean",
    defaultValue: "false",
    description: "Shorthand for orientation='vertical'. Simultaneously configure with orientation and prioritize orientation.",
  },
  {
    name: "variant",
    type: '"solid" | "dashed" | "dotted"',
    defaultValue: '"solid"',
    description: "Whether line is solid, dashed, or dotted (Ant Design 5.20+).",
  },
  {
    name: "dashed",
    type: "boolean",
    defaultValue: "false",
    description: "Shorthand for variant='dashed'.",
  },
  {
    name: "plain",
    type: "boolean",
    defaultValue: "false",
    description: "Divider text shown as plain text rather than heading style.",
  },
  {
    name: "size",
    type: '"small" | "medium" | "large"',
    defaultValue: '"medium"',
    description: "The size of margin spacing. Only valid for horizontal layout (small: 8px, medium: 16px, large: 24px).",
  },
  {
    name: "titlePlacement",
    type: '"start" | "center" | "end"',
    defaultValue: '"center"',
    description: "The position of title inside divider.",
  },
  {
    name: "orientationMargin",
    type: "string | number",
    defaultValue: "undefined",
    description: "Distance between title text and edge when titlePlacement is start or end (e.g. 0, '50px', 0.05).",
  },
  {
    name: "classNames",
    type: "Record<SemanticDOM, string> | ((info: { props }) => Record<SemanticDOM, string>)",
    defaultValue: "-",
    description: "Customize class for each semantic structure (root, rail, content). Supports object or function (Ant Design 6.0).",
  },
  {
    name: "styles",
    type: "Record<SemanticDOM, CSSProperties> | ((info: { props }) => Record<SemanticDOM, CSSProperties>)",
    defaultValue: "-",
    description: "Customize inline style for each semantic structure (root, rail, content). Supports object or function (Ant Design 6.0).",
  },
];

interface TokenItem {
  name: string;
  description: string;
  type: string;
  defaultValue: string;
}

const dividerTokens: TokenItem[] = [
  {
    name: "colorSplit",
    description: "Used as the color of separator, matching border color with transparency.",
    type: "string",
    defaultValue: "rgba(5, 5, 5, 0.06)",
  },
  {
    name: "colorText",
    description: "Default text color complying with W3C standards.",
    type: "string",
    defaultValue: "rgba(0, 0, 0, 0.88)",
  },
  {
    name: "colorTextHeading",
    description: "Font color of bold heading divider title.",
    type: "string",
    defaultValue: "rgba(0, 0, 0, 0.88)",
  },
  {
    name: "orientationMargin",
    description: "Distance between text and edge, which should be a number between 0 and 1 (percentage) or pixel value.",
    type: "number | string",
    defaultValue: "0.05",
  },
  {
    name: "textPaddingInline",
    description: "Horizontal padding of inner title text.",
    type: "string | number",
    defaultValue: "1em",
  },
  {
    name: "verticalMarginInline",
    description: "Horizontal margin of vertical Divider.",
    type: "string | number",
    defaultValue: "8px",
  },
  {
    name: "fontSize",
    description: "Standard body font size used in plain style.",
    type: "number",
    defaultValue: "14",
  },
  {
    name: "fontSizeLG",
    description: "Large font size used in heading style.",
    type: "number",
    defaultValue: "16",
  },
  {
    name: "lineHeight",
    description: "Line height of text.",
    type: "number",
    defaultValue: "1.5714285714285714",
  },
  {
    name: "lineWidth",
    description: "Border width of divider separator line.",
    type: "number",
    defaultValue: "1",
  },
  {
    name: "marginXS",
    description: "Margin spacing for small size.",
    type: "number",
    defaultValue: "8",
  },
  {
    name: "margin",
    description: "Default margin spacing for medium size.",
    type: "number",
    defaultValue: "16",
  },
  {
    name: "marginLG",
    description: "Margin spacing for large size.",
    type: "number",
    defaultValue: "24",
  },
];

export const DividerDocPage: React.FC = () => {
  const [orientation, setOrientation] = useState<DividerOrientation>("horizontal");
  const [variant, setVariant] = useState<DividerVariant>("solid");
  const [titlePlacement, setTitlePlacement] = useState<DividerTitlePlacement>("center");
  const [hasText, setHasText] = useState(true);
  const [plain, setPlain] = useState(false);
  const [size, setSize] = useState<DividerSize>("medium");

  const interactiveCode =
    orientation === "vertical"
      ? `<span>Text</span>
<Divider orientation="vertical" variant="${variant}" />
<a href="#">Link</a>
<Divider orientation="vertical" variant="${variant}" />
<a href="#">Action</a>`
      : `<p>First content section.</p>
<Divider
  variant="${variant}"
  size="${size}"${hasText ? `\n  titlePlacement="${titlePlacement}"` : ""}${plain ? "\n  plain" : ""}
>${hasText ? "\n  Section Title\n" : ""}</Divider>
<p>Second content section.</p>`;

  return (
    <article className="docs-content" style={{ maxWidth: "68rem" }}>
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Divider</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Divider</h1>
        <Badge variant="primary" size="md">
          Layout Category
        </Badge>
        <Badge variant="success" size="md">
          Ant Design Specification
        </Badge>
      </div>

      <p className="docs-description">
        A divider line separates different content. Used to divide sections of an article or inline text and links such as table operation columns.
      </p>

      {/* Package Import */}
      <CodeBlock code='import { Divider } from "@chella-ui/react";' language="tsx" />

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
            <div className="preview-control-group">
              <span className="control-label">Orientation:</span>
              <div className="control-segmented-group">
                <button
                  type="button"
                  className={`control-pill ${orientation === "horizontal" ? "active" : ""}`}
                  onClick={() => setOrientation("horizontal")}
                >
                  Horizontal
                </button>
                <button
                  type="button"
                  className={`control-pill ${orientation === "vertical" ? "active" : ""}`}
                  onClick={() => setOrientation("vertical")}
                >
                  Vertical
                </button>
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">Variant:</span>
              <div className="control-segmented-group">
                {(["solid", "dashed", "dotted"] as DividerVariant[]).map((v) => (
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

            {orientation === "horizontal" && (
              <>
                <div className="preview-control-group">
                  <span className="control-label">Size:</span>
                  <div className="control-segmented-group">
                    {(["small", "medium", "large"] as DividerSize[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`control-pill ${size === s ? "active" : ""}`}
                        onClick={() => setSize(s)}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="preview-control-group">
                  <label className="control-toggle-label">
                    <input
                      type="checkbox"
                      checked={hasText}
                      onChange={(e) => setHasText(e.target.checked)}
                    />
                    With Title
                  </label>
                </div>

                {hasText && (
                  <>
                    <div className="preview-control-group">
                      <span className="control-label">Title Placement:</span>
                      <div className="control-segmented-group">
                        {(["start", "center", "end"] as DividerTitlePlacement[]).map((p) => (
                          <button
                            key={p}
                            type="button"
                            className={`control-pill ${titlePlacement === p ? "active" : ""}`}
                            onClick={() => setTitlePlacement(p)}
                          >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="preview-control-group">
                      <label className="control-toggle-label">
                        <input
                          type="checkbox"
                          checked={plain}
                          onChange={(e) => setPlain(e.target.checked)}
                        />
                        Plain Style
                      </label>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        }
      >
        <div style={{ width: "100%", padding: "1.5rem 1rem" }}>
          {orientation === "vertical" ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>User Profile</span>
              <Divider orientation="vertical" variant={variant} />
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--ch-color-primary)" }}>
                Edit Settings
              </a>
              <Divider orientation="vertical" variant={variant} />
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--ch-color-primary)" }}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <p style={{ margin: 0, color: "var(--docs-fg-muted)", fontSize: "0.875rem" }}>
                Chella UI is a production-quality React UI component library designed with zero CSS runtime overhead and 100% WAI-ARIA accessibility compliance.
              </p>
              <Divider
                variant={variant}
                size={size}
                titlePlacement={hasText ? titlePlacement : undefined}
                plain={plain}
              >
                {hasText ? "Section Overview" : undefined}
              </Divider>
              <p style={{ margin: 0, color: "var(--docs-fg-muted)", fontSize: "0.875rem" }}>
                Components follow strict Ant Design and modern design system architectural standards with comprehensive TypeScript typings and seamless dark mode support.
              </p>
            </div>
          )}
        </div>
      </ComponentPreview>

      {/* Horizontal Default */}
      <h2 className="docs-section-heading">Horizontal Divider</h2>
      <p className="docs-p">
        A Divider is horizontal by default and divides two independent content blocks:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <p style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider />
        <p style={{ margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
      </div>
      <CodeBlock
        code={`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
<Divider />
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>`}
        language="tsx"
      />

      {/* Spacing Size Scale */}
      <h2 className="docs-section-heading">Spacing Size Scale</h2>
      <p className="docs-p">
        Set the vertical margin spacing of the divider with the <code>size</code> attribute (<code>small</code>: 8px, <code>medium</code>: 16px, <code>large</code>: 24px):
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>Content before small divider (8px margin)</p>
        <Divider size="small" />
        <p style={{ margin: 0, fontSize: "0.875rem" }}>Content between dividers (16px default margin)</p>
        <Divider size="medium" />
        <p style={{ margin: 0, fontSize: "0.875rem" }}>Content before large divider (24px margin)</p>
        <Divider size="large" />
        <p style={{ margin: 0, fontSize: "0.875rem" }}>Content after large divider</p>
      </div>
      <CodeBlock
        code={`<Divider size="small" />
<Divider size="medium" />
<Divider size="large" />`}
        language="tsx"
      />

      {/* Vertical Divider */}
      <h2 className="docs-section-heading">Vertical Divider</h2>
      <p className="docs-p">
        Use <code>orientation="vertical"</code> or shorthand <code>vertical</code> to create an inline vertical separator between links and buttons:
      </p>
      <div style={{ margin: "1.5rem 0", display: "flex", alignItems: "center" }}>
        <span>Dashboard</span>
        <Divider orientation="vertical" />
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--ch-color-primary)" }}>
          Analytics
        </a>
        <Divider vertical />
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--ch-color-primary)" }}>
          Settings
        </a>
      </div>
      <CodeBlock
        code={`<span>Dashboard</span>
<Divider orientation="vertical" />
<a href="#">Analytics</a>
<Divider vertical />
<a href="#">Settings</a>`}
        language="tsx"
      />

      {/* Divider with Title & Title Placement */}
      <h2 className="docs-section-heading">Divider with Title & Placement</h2>
      <p className="docs-p">
        Divider with inner title text. Set <code>titlePlacement="start"</code>, <code>"center"</code>, or <code>"end"</code> to align the title. Use <code>orientationMargin</code> to customize the distance to the edge:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Divider>Center Title</Divider>
        <Divider titlePlacement="start">Left Title</Divider>
        <Divider titlePlacement="end">Right Title</Divider>
        <Divider titlePlacement="start" orientationMargin={0}>
          Left Title with 0 Margin
        </Divider>
        <Divider titlePlacement="end" orientationMargin="50px">
          Right Title with 50px Margin
        </Divider>
      </div>
      <CodeBlock
        code={`<Divider>Center Title</Divider>
<Divider titlePlacement="start">Left Title</Divider>
<Divider titlePlacement="end">Right Title</Divider>
<Divider titlePlacement="start" orientationMargin={0}>Left Title with 0 Margin</Divider>
<Divider titlePlacement="end" orientationMargin="50px">Right Title with 50px Margin</Divider>`}
        language="tsx"
      />

      {/* Plain Typography Style */}
      <h2 className="docs-section-heading">Plain Text Style</h2>
      <p className="docs-p">
        Use <code>plain</code> to display non-heading, regular weight font style for title text:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Divider>Default Heading Style</Divider>
        <Divider plain>Plain Regular Text Style</Divider>
      </div>
      <CodeBlock
        code={`<Divider>Default Heading Style</Divider>
<Divider plain>Plain Regular Text Style</Divider>`}
        language="tsx"
      />

      {/* Variants */}
      <h2 className="docs-section-heading">Line Variants (Solid, Dashed, Dotted)</h2>
      <p className="docs-p">
        Divider is <code>solid</code> by default. You can change that to either <code>dashed</code> or <code>dotted</code>:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Divider variant="solid">Solid Line</Divider>
        <Divider variant="dashed">Dashed Line</Divider>
        <Divider variant="dotted">Dotted Line</Divider>
      </div>
      <CodeBlock
        code={`<Divider variant="solid">Solid Line</Divider>
<Divider variant="dashed">Dashed Line</Divider>
<Divider variant="dotted">Dotted Line</Divider>`}
        language="tsx"
      />

      {/* Semantic DOM Styling */}
      <h2 className="docs-section-heading">Custom Semantic DOM Styling</h2>
      <p className="docs-p">
        You can customize the semantic DOM style of divider by passing <strong>objects</strong> or <strong>functions</strong> through <code>classNames</code> and <code>styles</code> (Ant Design 6.0):
      </p>

      <div style={{ margin: "1.5rem 0" }}>
        <Divider
          styles={{
            rail: { borderColor: "var(--ch-color-primary)", borderTopWidth: "2px" },
            content: { color: "var(--ch-color-primary)", letterSpacing: "1px", fontWeight: 600 },
          }}
        >
          Custom Semantic DOM (Object)
        </Divider>

        <Divider
          variant="dashed"
          classNames={({ props }) => ({
            root: `custom-fn-root-${props.variant ?? "solid"}`,
            rail: "custom-fn-rail",
          })}
          styles={({ props }) => ({
            content: {
              background: "var(--docs-bg-muted)",
              padding: "0.25rem 1rem",
              borderRadius: "9999px",
              border: `1px ${props.variant ?? "dashed"} var(--ch-color-primary)`,
              color: "var(--ch-color-primary)",
            },
          })}
        >
          Custom Semantic DOM (Function)
        </Divider>
      </div>

      <CodeBlock
        code={`// Object Syntax:
<Divider
  styles={{
    rail: { borderColor: "var(--ch-color-primary)", borderTopWidth: "2px" },
    content: { color: "var(--ch-color-primary)", letterSpacing: "1px", fontWeight: 600 },
  }}
>
  Custom Semantic DOM (Object)
</Divider>

// Function Syntax (Ant Design 6.0):
<Divider
  variant="dashed"
  classNames={({ props }) => ({
    root: "custom-fn-root",
    rail: "custom-fn-rail",
  })}
  styles={({ props }) => ({
    content: {
      background: "var(--docs-bg-muted)",
      padding: "0.25rem 1rem",
      borderRadius: "9999px",
      border: "1px dashed var(--ch-color-primary)",
    },
  })}
>
  Custom Semantic DOM (Function)
</Divider>`}
        language="tsx"
      />

      {/* Semantic DOM Structure */}
      <h2 className="docs-section-heading">Semantic DOM Structure</h2>
      <p className="docs-p">
        Divider is structured into three semantic sub-elements:
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
        <div style={{ padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--docs-border)", background: "var(--docs-bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <code style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ch-color-primary)" }}>root</code>
            <Badge variant="default" size="sm">Container</Badge>
          </div>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>
            Root element with container divider styles, margin spacing, separator role, and orientation modes.
          </p>
        </div>

        <div style={{ padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--docs-border)", background: "var(--docs-bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <code style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ch-color-primary)" }}>rail</code>
            <Badge variant="default" size="sm">Line Element</Badge>
          </div>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>
            Background connection rail elements (<code>start</code> and <code>end</code>) with border style, color split, and orientation margin sizing.
          </p>
        </div>

        <div style={{ padding: "1.25rem", borderRadius: "10px", border: "1px solid var(--docs-border)", background: "var(--docs-bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <code style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ch-color-primary)" }}>content</code>
            <Badge variant="default" size="sm">Inner Text</Badge>
          </div>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>
            Inner wrapped title element with inline-block display, text padding inline, and plain/heading font weight.
          </p>
        </div>
      </div>

      {/* API Reference */}
      <h2 className="docs-section-heading">API Reference</h2>
      <PropsTable props={dividerProps} />

      {/* Design Tokens */}
      <h2 className="docs-section-heading" style={{ marginTop: "3rem" }}>Design Tokens</h2>
      <p className="docs-p">
        Chella UI follows the Ant Design token architecture. You can customize Divider appearance globally via <code>ChellaProvider</code> or CSS custom properties:
      </p>
      <PropsTable props={dividerTokens} />
    </article>
  );
};
