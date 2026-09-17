import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  FlexOrientation,
  FlexGap,
  Button,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const flexProps: PropItem[] = [
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Children elements to layout inside the flex container.",
  },
  {
    name: "vertical",
    type: "boolean",
    defaultValue: "false",
    description: "Is direction of the flex vertical (flex-direction: column). Prioritized over orientation.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    defaultValue: '"horizontal"',
    description: "Direction of the flex container.",
  },
  {
    name: "wrap",
    type: "boolean | CSSProperties['flexWrap']",
    defaultValue: '"nowrap"',
    description: "Set whether elements are displayed in a single line or multiple lines (true maps to 'wrap').",
  },
  {
    name: "justify",
    type: "CSSProperties['justifyContent']",
    defaultValue: '"normal"',
    description: "Sets alignment of elements along the main axis (flex-start, center, flex-end, space-between, space-around, space-evenly).",
  },
  {
    name: "align",
    type: "CSSProperties['alignItems']",
    defaultValue: '"normal"',
    description: "Sets alignment of elements along the cross axis (flex-start, center, flex-end, stretch).",
  },
  {
    name: "gap",
    type: '"small" | "medium" | "large" | string | number',
    defaultValue: "undefined",
    description: "Sets gap between elements. Supports presets ('small'=8px, 'medium'=16px, 'large'=24px) or custom numbers/strings.",
  },
  {
    name: "flex",
    type: "CSSProperties['flex']",
    defaultValue: '"normal"',
    description: "Flex CSS shorthand property applied to the container.",
  },
  {
    name: "component",
    type: "React.ElementType",
    defaultValue: '"div"',
    description: "Custom element type for the flex container (e.g. 'section', 'nav', 'header').",
  },
];

const flexTokens: PropItem[] = [
  {
    name: "paddingXS",
    type: "number",
    defaultValue: "8",
    description: "Extra small spacing used for gap='small'.",
  },
  {
    name: "padding",
    type: "number",
    defaultValue: "16",
    description: "Medium spacing used for gap='medium'.",
  },
  {
    name: "paddingLG",
    type: "number",
    defaultValue: "24",
    description: "Large spacing used for gap='large'.",
  },
];

export const FlexDocPage: React.FC = () => {
  const [orientation, setOrientation] = useState<FlexOrientation>("horizontal");
  const [justify, setJustify] = useState<React.CSSProperties["justifyContent"]>("flex-start");
  const [align, setAlign] = useState<React.CSSProperties["alignItems"]>("center");
  const [gapPreset, setGapPreset] = useState<FlexGap | "none">("small");
  const [isWrap, setIsWrap] = useState(false);

  const boxStyle: React.CSSProperties = {
    width: 100,
    height: 48,
    borderRadius: 8,
    background: "var(--ch-color-primary)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "0.875rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const interactiveCode = `<Flex
  ${orientation === "vertical" ? "vertical" : ""}
  justify="${justify}"
  align="${align}"
  ${gapPreset !== "none" ? `gap="${gapPreset}"` : ""}
  ${isWrap ? "wrap" : ""}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Flex>`.replace(/^\s*\n/gm, "");

  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Flex</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Flex</h1>
        <Badge variant="primary" size="md">
          Layout
        </Badge>
      </div>

      <p className="docs-description">
        A flex layout container for alignment and spacing. Unlike <code>Space</code>, <code>Flex</code> operates on block-level children without introducing additional wrapper DOM nodes, providing complete layout flexibility and control.
      </p>

      {/* Difference Callout */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderRadius: 8,
          background: "var(--docs-bg-muted)",
          border: "1px solid var(--docs-border)",
          margin: "1.5rem 0",
          fontSize: "0.875rem",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "var(--docs-fg-default)" }}>
          Difference with Space component:
        </strong>
        <p style={{ margin: "0.5rem 0 0", color: "var(--docs-fg-muted)" }}>
          <code>Space</code> is designed to arrange inline elements with equidistant wrapper elements around each child. <code>Flex</code> arranges block-level elements directly using standard CSS Flexbox rules without wrapping children in extra tags.
        </p>
      </div>

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={interactiveCode}
        controls={
          <>
            <div className="preview-control-group">
              <span className="control-label">Direction:</span>
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
              <span className="control-label">Justify:</span>
              <div className="control-segmented-group">
                {(["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"] as const).map(
                  (j) => (
                    <button
                      key={j}
                      type="button"
                      className={`control-pill ${justify === j ? "active" : ""}`}
                      onClick={() => setJustify(j)}
                    >
                      {j.replace("flex-", "")}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">Align:</span>
              <div className="control-segmented-group">
                {(["flex-start", "center", "flex-end", "stretch"] as const).map(
                  (a) => (
                    <button
                      key={a}
                      type="button"
                      className={`control-pill ${align === a ? "active" : ""}`}
                      onClick={() => setAlign(a)}
                    >
                      {a.replace("flex-", "")}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">Gap:</span>
              <div className="control-segmented-group">
                {(["none", "small", "medium", "large"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`control-pill ${gapPreset === g ? "active" : ""}`}
                    onClick={() => setGapPreset(g)}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-control-group">
              <label className="control-toggle-label">
                <input
                  type="checkbox"
                  checked={isWrap}
                  onChange={(e) => setIsWrap(e.target.checked)}
                />
                Wrap
              </label>
            </div>
          </>
        }
      >
        <div style={{ width: "100%", padding: "1.5rem", minHeight: 220, background: "var(--docs-bg-muted)", borderRadius: 8 }}>
          <Flex
            vertical={orientation === "vertical"}
            justify={justify}
            align={align}
            wrap={isWrap}
            gap={gapPreset === "none" ? undefined : gapPreset}
            style={{ width: "100%", height: "100%", minHeight: 180 }}
          >
            <div style={boxStyle}>Item 1</div>
            <div style={{ ...boxStyle, background: "var(--ch-color-secondary, #6366f1)" }}>Item 2</div>
            <div style={{ ...boxStyle, background: "var(--ch-color-accent, #06b6d4)" }}>Item 3</div>
            <div style={{ ...boxStyle, background: "var(--ch-color-success, #10b981)" }}>Item 4</div>
          </Flex>
        </div>
      </ComponentPreview>

      {/* Basic Usage */}
      <h2 className="docs-section-heading">Basic Usage</h2>
      <p className="docs-p">
        Default horizontal flex container and vertical arrangement via <code>vertical</code>:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", margin: "1.5rem 0" }}>
        <div>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>Horizontal (Default)</h4>
          <Flex gap="small">
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="link">Link</Button>
          </Flex>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>Vertical (vertical=true)</h4>
          <Flex vertical gap="small" style={{ width: 140 }}>
            <Button type="primary" block>Primary</Button>
            <Button block>Default</Button>
            <Button type="dashed" block>Dashed</Button>
          </Flex>
        </div>
      </div>
      <CodeBlock
        code={`import { Flex, Button } from "@chella-ui/react";

// Horizontal
<Flex gap="small">
  <Button type="primary">Primary</Button>
  <Button>Default</Button>
  <Button type="dashed">Dashed</Button>
</Flex>

// Vertical
<Flex vertical gap="small">
  <Button type="primary">Primary</Button>
  <Button>Default</Button>
</Flex>`}
        language="tsx"
      />

      {/* Alignment & Justify */}
      <h2 className="docs-section-heading">Alignment & Justify</h2>
      <p className="docs-p">
        Use <code>justify</code> and <code>align</code> to configure main and cross axis alignment:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Flex justify="space-between" align="center" style={{ padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--ch-color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
              C
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>Chella UI Dashboard</div>
              <div style={{ fontSize: "0.75rem", color: "var(--docs-fg-muted)" }}>Enterprise React Layouts</div>
            </div>
          </div>
          <Flex gap="small">
            <Button size="small">Docs</Button>
            <Button type="primary" size="small">Install</Button>
          </Flex>
        </Flex>
      </div>
      <CodeBlock
        code={`<Flex justify="space-between" align="center">
  <div>Header Left</div>
  <Flex gap="small">
    <Button size="small">Docs</Button>
    <Button type="primary" size="small">Install</Button>
  </Flex>
</Flex>`}
        language="tsx"
      />

      {/* Gap Presets & Custom Values */}
      <h2 className="docs-section-heading">Gap Presets & Custom Sizes</h2>
      <p className="docs-p">
        Set element spacing with presets (<code>small</code>: 8px, <code>medium</code>: 16px, <code>large</code>: 24px) or custom numbers/strings:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
        <Flex gap="small">
          <Badge variant="primary">gap="small" (8px)</Badge>
          <Badge variant="default">Tag 1</Badge>
          <Badge variant="default">Tag 2</Badge>
        </Flex>
        <Flex gap="medium">
          <Badge variant="success">gap="medium" (16px)</Badge>
          <Badge variant="default">Tag 1</Badge>
          <Badge variant="default">Tag 2</Badge>
        </Flex>
        <Flex gap="large">
          <Badge variant="warning">gap="large" (24px)</Badge>
          <Badge variant="default">Tag 1</Badge>
          <Badge variant="default">Tag 2</Badge>
        </Flex>
        <Flex gap={32}>
          <Badge variant="danger">gap=&#123;32&#125; (32px)</Badge>
          <Badge variant="default">Tag 1</Badge>
          <Badge variant="default">Tag 2</Badge>
        </Flex>
      </div>
      <CodeBlock
        code={`<Flex gap="small">...</Flex>   {/* 8px */}
<Flex gap="medium">...</Flex>  {/* 16px */}
<Flex gap="large">...</Flex>   {/* 24px */}
<Flex gap={32}>...</Flex>      {/* 32px */}
<Flex gap="1.5rem">...</Flex>  {/* 1.5rem */}`}
        language="tsx"
      />

      {/* Auto Wrap */}
      <h2 className="docs-section-heading">Auto Wrap</h2>
      <p className="docs-p">
        Set <code>wrap=&#123;true&#125;</code> or <code>wrap="wrap"</code> to allow items to wrap onto subsequent rows automatically:
      </p>
      <div style={{ margin: "1.5rem 0", padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
        <Flex wrap gap="small">
          {Array.from({ length: 16 }).map((_, i) => (
            <Button key={i} size="small">
              Button {i + 1}
            </Button>
          ))}
        </Flex>
      </div>
      <CodeBlock
        code={`<Flex wrap gap="small">
  {items.map((item, i) => (
    <Button key={i}>Button {i + 1}</Button>
  ))}
</Flex>`}
        language="tsx"
      />

      {/* Combination / Nesting */}
      <h2 className="docs-section-heading">Combination & Complex Nesting</h2>
      <p className="docs-p">
        Nesting Flex components enables rich card and dashboard layouts without writing custom CSS:
      </p>
      <div style={{ margin: "1.5rem 0", maxWidth: 440, padding: "1.25rem", borderRadius: 12, border: "1px solid var(--docs-border)", background: "var(--docs-bg-surface)" }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: "1rem" }}>
          <Flex align="center" gap="small">
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--ch-color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
              AD
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Ant Design v5 Architecture</div>
              <div style={{ fontSize: "0.75rem", color: "var(--docs-fg-muted)" }}>Published 2 hours ago</div>
            </div>
          </Flex>
          <Badge variant="primary" size="sm">New</Badge>
        </Flex>

        <p style={{ margin: "0 0 1rem", fontSize: "0.875rem", color: "var(--docs-fg-muted)", lineHeight: 1.5 }}>
          “antd is an enterprise-class UI design language and React UI library providing powerful layouts and zero CSS setup.”
        </p>

        <Flex justify="space-between" align="center">
          <Flex gap="small">
            <Badge variant="default" size="sm">#React</Badge>
            <Badge variant="default" size="sm">#Flexbox</Badge>
          </Flex>
          <Flex gap="small">
            <Button size="small">Dismiss</Button>
            <Button type="primary" size="small">Explore</Button>
          </Flex>
        </Flex>
      </div>
      <CodeBlock
        code={`<Flex justify="space-between" align="center">
  <Flex align="center" gap="small">
    <Avatar />
    <ProfileInfo />
  </Flex>
  <Badge>New</Badge>
</Flex>`}
        language="tsx"
      />

      {/* Polymorphism (component prop) */}
      <h2 className="docs-section-heading">Polymorphic Element Type (<code>component</code>)</h2>
      <p className="docs-p">
        Change the underlying DOM element rendered by Flex using the <code>component</code> prop:
      </p>
      <CodeBlock
        code={`<Flex component="nav" justify="space-between">
  <a href="/">Home</a>
  <a href="/about">About</a>
</Flex>

<Flex component="section" vertical gap="medium">
  <h2>Featured Content</h2>
</Flex>`}
        language="tsx"
      />

      {/* API Reference */}
      <h2 className="docs-section-heading">API Reference</h2>
      <PropsTable props={flexProps} />

      {/* Design Tokens */}
      <h2 className="docs-section-heading" style={{ marginTop: "3rem" }}>Design Tokens</h2>
      <p className="docs-p">
        Flex tokens match Ant Design spacing dimensions:
      </p>
      <PropsTable props={flexTokens} />
    </article>
  );
};
