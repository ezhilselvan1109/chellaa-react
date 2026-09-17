import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Masonry,
  MasonryItem,
  Button,
  Badge,
} from "@chella-ui/react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PropsTable, PropItem } from "../../components/PropsTable";
import { CodeBlock } from "../../components/CodeBlock";

const masonryProps: PropItem[] = [
  {
    name: "columns",
    type: "number | Partial<Record<Breakpoint, number>>",
    defaultValue: "3",
    description: "Number of columns, can be a fixed value or a responsive configuration object ({ xs: 1, sm: 2, md: 3, lg: 4 }).",
  },
  {
    name: "gutter",
    type: "Gap | [Gap, Gap]",
    defaultValue: "0",
    description: "Spacing between items. Number (px), responsive object, or [horizontal, vertical] array.",
  },
  {
    name: "items",
    type: "MasonryItem[]",
    defaultValue: "[]",
    description: "Array of items to layout inside the masonry columns.",
  },
  {
    name: "itemRender",
    type: "(item: MasonryItem & { index: number }, index: number) => ReactNode",
    defaultValue: "undefined",
    description: "Custom item rendering function for items.",
  },
  {
    name: "fresh",
    type: "boolean",
    defaultValue: "false",
    description: "Whether to continuously monitor the size changes of child items using ResizeObserver.",
  },
  {
    name: "onLayoutChange",
    type: "({ key: Key, column: number }[]) => void",
    defaultValue: "undefined",
    description: "Callback triggered when column sorting and layout assignments change.",
  },
  {
    name: "classNames",
    type: "Record<'root' | 'item', string> | ((info: { props }) => Record<...>)",
    defaultValue: "undefined",
    description: "Customize class for each semantic structure (root, item). Supports object or function (Ant Design 6.0).",
  },
  {
    name: "styles",
    type: "Record<'root' | 'item', CSSProperties> | ((info: { props }) => Record<...>)",
    defaultValue: "undefined",
    description: "Customize inline style for each semantic structure (root, item). Supports object or function (Ant Design 6.0).",
  },
  {
    name: "rootClassName",
    type: "string",
    defaultValue: "undefined",
    description: "Additional class name for the root container element.",
  },
];

const masonryItemProps: PropItem[] = [
  {
    name: "key",
    type: "React.Key",
    defaultValue: "required",
    description: "Unique identifier for the item.",
  },
  {
    name: "height",
    type: "number",
    defaultValue: "undefined",
    description: "Optional pre-known height of the item in pixels to avoid initial layout shift.",
  },
  {
    name: "column",
    type: "number",
    defaultValue: "undefined",
    description: "Specifies the exact column (0-indexed) to which the item belongs for manual pinning.",
  },
  {
    name: "children",
    type: "ReactNode",
    defaultValue: "undefined",
    description: "Custom display content. Takes precedence over itemRender.",
  },
  {
    name: "data",
    type: "any",
    defaultValue: "undefined",
    description: "Custom data payload passed to itemRender.",
  },
];

const masonryTokens: PropItem[] = [
  {
    name: "motionDurationFast",
    type: "string",
    defaultValue: "0.1s",
    description: "Fast animation speed used for small element interaction.",
  },
  {
    name: "motionDurationSlow",
    type: "string",
    defaultValue: "0.3s",
    description: "Slow animation speed used for masonry reorder and resize transitions.",
  },
  {
    name: "motionEaseOut",
    type: "string",
    defaultValue: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    description: "Preset cubic bezier motion curve for smooth spring-like layout transitions.",
  },
];

const initialPlaygroundItems: MasonryItem[] = [
  { key: "1", height: 110, data: { title: "Card 1", desc: "First content block with standard height.", color: "#00C49F" } },
  { key: "2", height: 170, data: { title: "Card 2", desc: "Taller card with extensive details and metadata tags.", color: "#6366f1" } },
  { key: "3", height: 130, data: { title: "Card 3", desc: "Compact update notice with badge.", color: "#06b6d4" } },
  { key: "4", height: 210, data: { title: "Card 4", desc: "Featured article showcase with full summary and link.", color: "#ec4899" } },
  { key: "5", height: 140, data: { title: "Card 5", desc: "Medium block with action buttons.", color: "#f59e0b" } },
  { key: "6", height: 160, data: { title: "Card 6", desc: "System notification preview and stats.", color: "#10b981" } },
  { key: "7", height: 120, data: { title: "Card 7", desc: "Quick metrics snapshot.", color: "#8b5cf6" } },
  { key: "8", height: 190, data: { title: "Card 8", desc: "Analytics overview report with visual chart placeholder.", color: "#3b82f6" } },
];

export const MasonryDocPage: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [gutter, setGutter] = useState(16);
  const [items, setItems] = useState<MasonryItem[]>(initialPlaygroundItems);

  const addItem = () => {
    const nextId = String(items.length + 1);
    const randomHeight = Math.floor(Math.random() * 120) + 100;
    const colors = ["#00C49F", "#6366f1", "#06b6d4", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6"];
    const randomColor = colors[items.length % colors.length];

    setItems((prev) => [
      ...prev,
      {
        key: nextId,
        height: randomHeight,
        data: {
          title: `Card ${nextId}`,
          desc: `Dynamically added card with calculated height of ${randomHeight}px.`,
          color: randomColor,
        },
      },
    ]);
  };

  const removeItem = () => {
    if (items.length > 2) {
      setItems((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const playgroundCode = `<Masonry columns={${columns}} gutter={${gutter}} items={items} itemRender={(item) => (
  <Card title={item.data.title} height={item.height} />
)} />`;

  return (
    <article className="docs-content">
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/docs/components">Components</Link>
        <span>/</span>
        <span>Masonry</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Masonry</h1>
        <Badge variant="primary" size="md">
          Layout
        </Badge>
        <Badge variant="success" size="md">
          v6.0.0
        </Badge>
      </div>

      <p className="docs-description">
        A masonry layout component for displaying content with different heights. Distributes irregular cards and media into balanced columns with smooth transitions and responsive controls.
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
                {[2, 3, 4, 5].map((col) => (
                  <button
                    key={col}
                    type="button"
                    className={`control-pill ${columns === col ? "active" : ""}`}
                    onClick={() => setColumns(col)}
                  >
                    {col} Cols
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-control-group">
              <span className="control-label">Gutter: {gutter}px</span>
              <input
                type="range"
                min="0"
                max="32"
                step="8"
                value={gutter}
                onChange={(e) => setGutter(Number(e.target.value))}
              />
            </div>

            <div className="preview-control-group">
              <Button size="small" type="primary" onClick={addItem}>
                + Add Card
              </Button>
              <Button size="small" onClick={removeItem} disabled={items.length <= 2}>
                - Remove
              </Button>
            </div>
          </>
        }
      >
        <div style={{ width: "100%", padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
          <Masonry
            columns={columns}
            gutter={gutter}
            items={items}
            itemRender={(item) => (
              <div
                style={{
                  height: item.height,
                  borderRadius: 10,
                  background: "var(--docs-bg-surface)",
                  border: "1px solid var(--docs-border)",
                  padding: "1rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.data.title}</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.data.color }} />
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--docs-fg-muted)", lineHeight: 1.4 }}>
                    {item.data.desc}
                  </p>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--docs-fg-muted)", borderTop: "1px solid var(--docs-border)", paddingTop: "0.5rem" }}>
                  Height: {item.height}px
                </div>
              </div>
            )}
          />
        </div>
      </ComponentPreview>

      {/* Basic Usage */}
      <h2 className="docs-section-heading">Basic Usage</h2>
      <p className="docs-p">
        Set number of columns with <code>columns</code> and item spacing with <code>gutter</code>:
      </p>
      <div style={{ margin: "1.5rem 0", padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
        <Masonry
          columns={3}
          gutter={16}
          items={[
            { key: "1", height: 90, children: <div style={{ height: 90, background: "var(--ch-color-primary)", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 600 }}>1</div> },
            { key: "2", height: 160, children: <div style={{ height: 160, background: "var(--ch-color-secondary, #6366f1)", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 600 }}>2 (Tall)</div> },
            { key: "3", height: 120, children: <div style={{ height: 120, background: "var(--ch-color-accent, #06b6d4)", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 600 }}>3</div> },
            { key: "4", height: 180, children: <div style={{ height: 180, background: "#ec4899", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 600 }}>4 (Taller)</div> },
            { key: "5", height: 100, children: <div style={{ height: 100, background: "#f59e0b", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 600 }}>5</div> },
            { key: "6", height: 140, children: <div style={{ height: 140, background: "#10b981", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 600 }}>6</div> },
          ]}
        />
      </div>
      <CodeBlock
        code={`import { Masonry } from "@chella-ui/react";

<Masonry
  columns={3}
  gutter={16}
  items={[
    { key: "1", height: 90, children: <Card>1</Card> },
    { key: "2", height: 160, children: <Card>2</Card> },
    { key: "3", height: 120, children: <Card>3</Card> },
    { key: "4", height: 180, children: <Card>4</Card> },
  ]}
/>`}
        language="tsx"
      />

      {/* Responsive Columns */}
      <h2 className="docs-section-heading">Responsive Breakpoints</h2>
      <p className="docs-p">
        Use an object with breakpoint keys to specify column counts across screen sizes:
      </p>
      <CodeBlock
        code={`<Masonry
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gutter={[16, 16]}
  items={items}
  itemRender={(item) => <ProductCard item={item} />}
/>`}
        language="tsx"
      />

      {/* Image Loading Demo */}
      <h2 className="docs-section-heading">Image Dynamic Loading (<code>[Image]</code>)</h2>
      <p className="docs-p">
        Dynamically adjusts the masonry height and item positions as images load. Items smoothly settle into their optimal columns:
      </p>
      <div style={{ margin: "1.5rem 0", padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          gutter={16}
          items={[
            {
              key: "img-1",
              data: {
                title: "Mountain Vista",
                height: 180,
                bg: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                tag: "Landscape",
              },
            },
            {
              key: "img-2",
              data: {
                title: "Emerald Forest",
                height: 260,
                bg: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
                tag: "Tall Portrait",
              },
            },
            {
              key: "img-3",
              data: {
                title: "Golden Hour Sunset",
                height: 150,
                bg: "linear-gradient(135deg, #9a3412 0%, #f59e0b 100%)",
                tag: "Panorama",
              },
            },
            {
              key: "img-4",
              data: {
                title: "Ocean Tide",
                height: 220,
                bg: "linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)",
                tag: "Medium",
              },
            },
            {
              key: "img-5",
              data: {
                title: "Nebula Cluster",
                height: 190,
                bg: "linear-gradient(135deg, #581c87 0%, #8b5cf6 100%)",
                tag: "Square",
              },
            },
            {
              key: "img-6",
              data: {
                title: "Crimson Aurora",
                height: 140,
                bg: "linear-gradient(135deg, #9f1239 0%, #f43f5e 100%)",
                tag: "Banner",
              },
            },
          ]}
          itemRender={(item) => (
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                background: "var(--docs-bg-surface)",
                border: "1px solid var(--docs-border)",
              }}
            >
              <div
                style={{
                  height: item.data.height,
                  background: item.data.bg,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1rem",
                  color: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.7rem",
                      background: "rgba(0,0,0,0.3)",
                      padding: "2px 8px",
                      borderRadius: 12,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.data.tag}
                  </span>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    {item.data.title}
                  </div>
                </div>
              </div>
              <div style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--docs-fg-muted)" }}>
                Rendered height: {item.data.height}px
              </div>
            </div>
          )}
        />
      </div>
      <CodeBlock
        code={`<Masonry
  columns={{ xs: 1, sm: 2, md: 3 }}
  gutter={16}
  items={mediaItems}
  itemRender={(item) => (
    <div className="media-card">
      <img src={item.data.src} alt={item.data.title} />
      <span>{item.data.title}</span>
    </div>
  )}
/>`}
        language="tsx"
      />

      {/* Manual Column Pinning */}
      <h2 className="docs-section-heading">Manual Column Pinning (<code>item.column</code>)</h2>
      <p className="docs-p">
        Use <code>item.column</code> to pin specific items to an explicit column index:
      </p>
      <div style={{ margin: "1.5rem 0", padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
        <Masonry
          columns={3}
          gutter={12}
          items={[
            { key: "pin-0", column: 0, height: 120, children: <div style={{ height: 120, background: "var(--ch-color-primary)", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 700 }}>Pinned to Column 0</div> },
            { key: "pin-2", column: 2, height: 120, children: <div style={{ height: 120, background: "#ec4899", borderRadius: 8, color: "#fff", padding: "1rem", fontWeight: 700 }}>Pinned to Column 2</div> },
            { key: "auto-1", height: 80, children: <div style={{ height: 80, background: "var(--docs-bg-surface)", border: "1px solid var(--docs-border)", borderRadius: 8, padding: "1rem" }}>Auto Allocated</div> },
            { key: "auto-2", height: 100, children: <div style={{ height: 100, background: "var(--docs-bg-surface)", border: "1px solid var(--docs-border)", borderRadius: 8, padding: "1rem" }}>Auto Allocated</div> },
          ]}
        />
      </div>
      <CodeBlock
        code={`<Masonry
  columns={3}
  items={[
    { key: "1", column: 0, children: <div>Pinned to Column 0</div> },
    { key: "2", column: 2, children: <div>Pinned to Column 2</div> },
    { key: "3", children: <div>Auto-balanced into shortest column</div> },
  ]}
/>`}
        language="tsx"
      />

      {/* Semantic DOM Custom Styling */}
      <h2 className="docs-section-heading">Custom Semantic DOM Styling (Ant Design 6.0)</h2>
      <p className="docs-p">
        Customize classes and inline styles for the semantic DOM parts (<code>root</code> and <code>item</code>) using object or function syntax:
      </p>
      <div style={{ margin: "1.5rem 0", padding: "1rem", background: "var(--docs-bg-muted)", borderRadius: 8 }}>
        <Masonry
          columns={2}
          gutter={12}
          classNames={({ props }) => ({
            root: "custom-masonry-root",
            item: `custom-masonry-item-cols-${props.columns}`,
          })}
          styles={{
            item: { borderRadius: 10, overflow: "hidden" },
          }}
          items={[
            { key: "s1", height: 90, children: <div style={{ height: 90, background: "var(--ch-color-primary)", color: "#fff", padding: "1rem", fontWeight: 600 }}>Semantic DOM Item 1</div> },
            { key: "s2", height: 110, children: <div style={{ height: 110, background: "var(--ch-color-secondary, #6366f1)", color: "#fff", padding: "1rem", fontWeight: 600 }}>Semantic DOM Item 2</div> },
          ]}
        />
      </div>
      <CodeBlock
        code={`// Function and Object syntax (Ant Design 6.0):
<Masonry
  columns={2}
  gutter={12}
  classNames={({ props }) => ({
    root: "custom-masonry-root",
    item: \`custom-item-cols-\${props.columns}\`,
  })}
  styles={{
    item: { borderRadius: 10, overflow: "hidden" },
  }}
  items={items}
/>`}
        language="tsx"
      />

      {/* API Reference */}
      <h2 className="docs-section-heading">Masonry API Reference</h2>
      <PropsTable props={masonryProps} />

      <h2 className="docs-section-heading" style={{ marginTop: "3rem" }}>MasonryItem API Reference</h2>
      <PropsTable props={masonryItemProps} />

      {/* Design Tokens */}
      <h2 className="docs-section-heading" style={{ marginTop: "3rem" }}>Design Tokens</h2>
      <PropsTable props={masonryTokens} />
    </article>
  );
};
