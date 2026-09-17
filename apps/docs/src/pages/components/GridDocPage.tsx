import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Grid,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const rowProps: PropItem[] = [
  {
    name: "gutter",
    type: "number | string | object | [Gutter, Gutter]",
    defaultValue: "0",
    description: "Spacing between grids. Number, string units, responsive object ({ xs: 8, sm: 16 }), or [horizontal, vertical] array.",
  },
  {
    name: "align",
    type: '"top" | "middle" | "bottom" | "stretch" | object',
    defaultValue: '"top"',
    description: "Vertical alignment of columns inside row. Supports responsive breakpoint object.",
  },
  {
    name: "justify",
    type: '"start" | "end" | "center" | "space-around" | "space-between" | "space-evenly" | object',
    defaultValue: '"start"',
    description: "Horizontal arrangement of columns inside row. Supports responsive breakpoint object.",
  },
  {
    name: "wrap",
    type: "boolean",
    defaultValue: "true",
    description: "Whether to auto-wrap columns onto new rows when exceeding 24 spans.",
  },
];

const colProps: PropItem[] = [
  {
    name: "span",
    type: "number (0-24)",
    defaultValue: "undefined",
    description: "Raster number of cells to occupy (1 to 24, or 0 for display: none).",
  },
  {
    name: "offset",
    type: "number (0-24)",
    defaultValue: "0",
    description: "The number of cells to offset Col from the left.",
  },
  {
    name: "order",
    type: "number",
    defaultValue: "0",
    description: "Flex layout raster order.",
  },
  {
    name: "pull",
    type: "number",
    defaultValue: "0",
    description: "The number of cells that raster is moved to the left.",
  },
  {
    name: "push",
    type: "number",
    defaultValue: "0",
    description: "The number of cells that raster is moved to the right.",
  },
  {
    name: "flex",
    type: "string | number",
    defaultValue: "undefined",
    description: "Flex layout style: number for 'flex: n n auto', string for direct value (e.g. '100px', 'auto', '1 1 200px').",
  },
  {
    name: "xs / sm / md / lg / xl / xxl / xxxl",
    type: "number | object",
    defaultValue: "undefined",
    description: "Responsive breakpoint dimensions. Number for span, or object { span, offset, pull, push, order, flex }.",
  },
];

export const GridDocPage: React.FC = () => {
  const [columnCount, setColumnCount] = useState(4);
  const [gutterH, setGutterH] = useState(16);
  const [gutterV, setGutterV] = useState(16);

  // Live breakpoint monitoring
  const screens = Grid.useBreakpoint();

  const colBoxStyle = (isOdd: boolean): React.CSSProperties => ({
    background: isOdd ? "var(--ch-color-primary)" : "var(--ch-color-secondary, #6366f1)",
    color: "#fff",
    textAlign: "center",
    padding: "16px 0",
    borderRadius: 6,
    fontWeight: 600,
    fontSize: "0.875rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  });

  const spanVal = 24 / columnCount;

  const playgroundCode = `<Row gutter={[${gutterH}, ${gutterV}]}>
${Array.from({ length: columnCount * 2 })
  .map(() => `  <Col span={${spanVal}}>col-${spanVal}</Col>`)
  .join("\n")}
</Row>`;

  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Grid</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Grid (24 Grids System)</h1>
        <Badge variant="primary" size="md">
          Layout
        </Badge>
      </div>

      <p className="docs-description">
        Based on a 24-column proportional grid system using modern CSS Flexbox. Features multi-axis gutters, column offsets, flex stretching, and dynamic breakpoint monitoring across 7 screen tiers.
      </p>

      {/* Interactive Playground */}
      <h2 className="docs-section-heading">Interactive Playground</h2>
      <ComponentPreview
        code={playgroundCode}
        controls={
          <>
            <div className="preview-control-group">
              <span className="control-label">Columns:</span>
              <div className="control-segmented-group">
                {[2, 3, 4, 6].map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={`control-pill ${columnCount === count ? "active" : ""}`}
                    onClick={() => setColumnCount(count)}
                  >
                    {count} Cols
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">H-Gutter: {gutterH}px</span>
              <input
                type="range"
                min="0"
                max="48"
                step="8"
                value={gutterH}
                onChange={(e) => setGutterH(Number(e.target.value))}
              />
            </div>

            <div className="preview-control-group">
              <span className="control-label">V-Gutter: {gutterV}px</span>
              <input
                type="range"
                min="0"
                max="48"
                step="8"
                value={gutterV}
                onChange={(e) => setGutterV(Number(e.target.value))}
              />
            </div>
          </>
        }
      >
        <div style={{ width: "100%", padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
          <Row gutter={[gutterH, gutterV]}>
            {Array.from({ length: columnCount * 2 }).map((_, i) => (
              <Col key={i} span={spanVal}>
                <div style={colBoxStyle(i % 2 === 0)}>col-{spanVal}</div>
              </Col>
            ))}
          </Row>
        </div>
      </ComponentPreview>

      {/* Basic Grid */}
      <h2 className="docs-section-heading">Basic 24-Grid System</h2>
      <p className="docs-p">
        Divide horizontal space into 24 sections using <code>Row</code> and <code>Col</code>:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
        <Row gutter={[0, 8]}>
          <Col span={24}><div style={colBoxStyle(true)}>col-24 (100%)</div></Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12}><div style={colBoxStyle(false)}>col-12 (50%)</div></Col>
          <Col span={12}><div style={colBoxStyle(true)}>col-12 (50%)</div></Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={8}><div style={colBoxStyle(true)}>col-8 (33.3%)</div></Col>
          <Col span={8}><div style={colBoxStyle(false)}>col-8 (33.3%)</div></Col>
          <Col span={8}><div style={colBoxStyle(true)}>col-8 (33.3%)</div></Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={6}><div style={colBoxStyle(false)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(true)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(false)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(true)}>col-6</div></Col>
        </Row>
      </div>
      <CodeBlock
        code={`<Row>
  <Col span={24}>col-24</Col>
</Row>
<Row gutter={8}>
  <Col span={12}>col-12</Col>
  <Col span={12}>col-12</Col>
</Row>
<Row gutter={8}>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
</Row>`}
        language="tsx"
      />

      {/* Grid Gutters */}
      <h2 className="docs-section-heading">Grid Gutters (Horizontal & Vertical)</h2>
      <p className="docs-p">
        Use <code>gutter</code> to specify spacing between columns. Supports numbers, string units, responsive objects, and <code>[horizontal, vertical]</code> arrays:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Row gutter={[16, 16]}>
          <Col span={6}><div style={colBoxStyle(true)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(false)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(true)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(false)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(false)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(true)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(false)}>col-6</div></Col>
          <Col span={6}><div style={colBoxStyle(true)}>col-6</div></Col>
        </Row>
      </div>
      <CodeBlock
        code={`// Single number (horizontal only)
<Row gutter={16}>...</Row>

// Horizontal and Vertical
<Row gutter={[16, 24]}>...</Row>

// Responsive Breakpoint Object
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>...</Row>`}
        language="tsx"
      />

      {/* Column Offset */}
      <h2 className="docs-section-heading">Column Offset</h2>
      <p className="docs-p">
        Use <code>offset</code> to shift columns to the right by a specified number of grid cells:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "1.5rem 0" }}>
        <Row gutter={[8, 8]}>
          <Col span={8}><div style={colBoxStyle(true)}>col-8</div></Col>
          <Col span={8} offset={8}><div style={colBoxStyle(false)}>col-8 offset-8</div></Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={6} offset={6}><div style={colBoxStyle(false)}>col-6 offset-6</div></Col>
          <Col span={6} offset={6}><div style={colBoxStyle(true)}>col-6 offset-6</div></Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={12} offset={6}><div style={colBoxStyle(true)}>col-12 offset-6</div></Col>
        </Row>
      </div>
      <CodeBlock
        code={`<Row>
  <Col span={8}>col-8</Col>
  <Col span={8} offset={8}>col-8 offset-8</Col>
</Row>
<Row>
  <Col span={12} offset={6}>col-12 offset-6</Col>
</Row>`}
        language="tsx"
      />

      {/* Grid Sort (Push & Pull) */}
      <h2 className="docs-section-heading">Grid Sort (Push & Pull)</h2>
      <p className="docs-p">
        Reorder columns visually without altering DOM hierarchy using <code>push</code> and <code>pull</code>:
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Row gutter={[8, 8]}>
          <Col span={18} push={6}><div style={colBoxStyle(true)}>col-18 push-6 (Rendered 1st, Placed 2nd)</div></Col>
          <Col span={6} pull={18}><div style={colBoxStyle(false)}>col-6 pull-18 (Rendered 2nd, Placed 1st)</div></Col>
        </Row>
      </div>
      <CodeBlock
        code={`<Row>
  <Col span={18} push={6}>col-18 push-6</Col>
  <Col span={6} pull={18}>col-6 pull-18</Col>
</Row>`}
        language="tsx"
      />

      {/* Typesetting (Justify) & Alignment (Align) */}
      <h2 className="docs-section-heading">Alignment (<code>align</code>) & Typesetting (<code>justify</code>)</h2>
      <p className="docs-p">
        Align child columns along horizontal (<code>justify</code>) and vertical (<code>align</code>) axes:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.5rem 0" }}>
        <div>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>justify="center"</h4>
          <Row justify="center" gutter={8}>
            <Col span={4}><div style={colBoxStyle(true)}>col-4</div></Col>
            <Col span={4}><div style={colBoxStyle(false)}>col-4</div></Col>
            <Col span={4}><div style={colBoxStyle(true)}>col-4</div></Col>
          </Row>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>justify="space-between"</h4>
          <Row justify="space-between" gutter={8}>
            <Col span={4}><div style={colBoxStyle(true)}>col-4</div></Col>
            <Col span={4}><div style={colBoxStyle(false)}>col-4</div></Col>
            <Col span={4}><div style={colBoxStyle(true)}>col-4</div></Col>
          </Row>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--docs-fg-muted)" }}>align="middle"</h4>
          <Row align="middle" justify="center" gutter={8} style={{ minHeight: 90, background: "var(--docs-bg-muted)", borderRadius: 8, padding: 8 }}>
            <Col span={4}><div style={{ ...colBoxStyle(true), padding: "28px 0" }}>Tall</div></Col>
            <Col span={4}><div style={colBoxStyle(false)}>Medium</div></Col>
            <Col span={4}><div style={{ ...colBoxStyle(true), padding: "8px 0" }}>Short</div></Col>
          </Row>
        </div>
      </div>
      <CodeBlock
        code={`<Row justify="center">...</Row>
<Row justify="space-between">...</Row>
<Row align="middle" justify="center">...</Row>`}
        language="tsx"
      />

      {/* Flex Stretch */}
      <h2 className="docs-section-heading">Flex Stretch (Fill Rest)</h2>
      <p className="docs-p">
        Use <code>flex</code> prop on <code>Col</code> for fixed pixel widths, percentage distribution, or auto-fill:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", margin: "1.5rem 0" }}>
        <Row gutter={8}>
          <Col flex="100px"><div style={colBoxStyle(true)}>100px</div></Col>
          <Col flex="auto"><div style={colBoxStyle(false)}>Fill Rest (flex="auto")</div></Col>
        </Row>
        <Row gutter={8}>
          <Col flex="2 / 5"><div style={colBoxStyle(false)}>2 / 5 (40%)</div></Col>
          <Col flex="3 / 5"><div style={colBoxStyle(true)}>3 / 5 (60%)</div></Col>
        </Row>
        <Row gutter={8}>
          <Col flex="1 1 200px"><div style={colBoxStyle(true)}>1 1 200px</div></Col>
          <Col flex="0 1 300px"><div style={colBoxStyle(false)}>0 1 300px</div></Col>
        </Row>
      </div>
      <CodeBlock
        code={`<Row>
  <Col flex="100px">100px</Col>
  <Col flex="auto">Fill Rest</Col>
</Row>
<Row>
  <Col flex="2 / 5">2 / 5</Col>
  <Col flex="3 / 5">3 / 5</Col>
</Row>`}
        language="tsx"
      />

      {/* Responsive Grid */}
      <h2 className="docs-section-heading">Responsive Breakpoints</h2>
      <p className="docs-p">
        Configure distinct column spans across 7 preset breakpoints (<code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>xxl</code>, <code>xxxl</code>):
      </p>
      <div style={{ margin: "1.5rem 0" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={colBoxStyle(true)}>xs=24 sm=12 md=8 lg=6</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={colBoxStyle(false)}>xs=24 sm=12 md=8 lg=6</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={colBoxStyle(true)}>xs=24 sm=12 md=8 lg=6</div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div style={colBoxStyle(false)}>xs=24 sm=12 md=8 lg=6</div>
          </Col>
        </Row>
      </div>
      <CodeBlock
        code={`<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} md={8} lg={6}>Col 1</Col>
  <Col xs={24} sm={12} md={8} lg={6}>Col 2</Col>
  <Col xs={24} sm={12} md={8} lg={6}>Col 3</Col>
  <Col xs={24} sm={12} md={8} lg={6}>Col 4</Col>
</Row>`}
        language="tsx"
      />

      {/* useBreakpoint Hook */}
      <h2 className="docs-section-heading"><code>Grid.useBreakpoint()</code> Hook</h2>
      <p className="docs-p">
        Use <code>Grid.useBreakpoint()</code> (or <code>useBreakpoint()</code>) to access active viewport match states directly in React:
      </p>
      <div style={{ padding: "1.25rem", borderRadius: 10, border: "1px solid var(--docs-border)", background: "var(--docs-bg-surface)", margin: "1.5rem 0" }}>
        <h4 style={{ margin: "0 0 1rem", fontSize: "0.875rem" }}>Live Screen Breakpoint State:</h4>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {(["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"] as const).map((bp) => (
            <div
              key={bp}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 6,
                border: "1px solid var(--docs-border)",
                background: screens[bp] ? "var(--ch-color-primary)" : "var(--docs-bg-muted)",
                color: screens[bp] ? "#fff" : "var(--docs-fg-muted)",
                fontWeight: 600,
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>{bp}</span>
              <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                {screens[bp] ? "✓ Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CodeBlock
        code={`import { Grid } from "@chella-ui/react";

const MyComponent = () => {
  const screens = Grid.useBreakpoint();

  return (
    <div>
      Current Breakpoints:
      {screens.md && <span>Medium or larger screen</span>}
      {screens.lg && <span>Large or larger screen</span>}
    </div>
  );
};`}
        language="tsx"
      />

      {/* API Reference */}
      <h2 className="docs-section-heading">Row API Reference</h2>
      <PropsTable props={rowProps} />

      <h2 className="docs-section-heading" style={{ marginTop: "3rem" }}>Col API Reference</h2>
      <PropsTable props={colProps} />
    </article>
  );
};
