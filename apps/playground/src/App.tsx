import React, { useState } from "react";
import { Button, Spinner, useTheme } from "@chellaa/react";

export function App() {
  const { theme, setTheme } = useTheme();

  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [borderRadius, setBorderRadius] = useState(6);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const customStyle: React.CSSProperties = {
    // Dynamically override Chella UI component and semantic tokens
    ["--ch-color-primary" as any]: primaryColor,
    ["--ch-color-primary-hover" as any]: primaryColor,
    ["--ch-radius-md" as any]: `${borderRadius}px`,
    ["--ch-radius-lg" as any]: `${borderRadius + 4}px`,
    ["--ch-radius-sm" as any]: `${Math.max(2, borderRadius - 2)}px`,
  };

  const exportedCSS = `:root {
  --ch-color-primary: ${primaryColor};
  --ch-radius-md: ${borderRadius}px;
  --ch-radius-lg: ${borderRadius + 4}px;
  --ch-radius-sm: ${Math.max(2, borderRadius - 2)}px;
}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="playground-shell" style={customStyle}>
      {/* Sidebar Controls */}
      <aside className="playground-sidebar">
        <div className="playground-brand">
          <div className="playground-brand-mark">W</div>
          <div>Chella Workbench</div>
        </div>

        <div className="control-card">
          <div className="control-title">Theme Mode</div>
          <div className="component-row">
            <Button
              size="sm"
              variant={theme === "light" ? "primary" : "secondary"}
              onClick={() => setTheme("light")}
            >
              Light
            </Button>
            <Button
              size="sm"
              variant={theme === "dark" ? "primary" : "secondary"}
              onClick={() => setTheme("dark")}
            >
              Dark
            </Button>
            <Button
              size="sm"
              variant={theme === "system" ? "primary" : "secondary"}
              onClick={() => setTheme("system")}
            >
              System
            </Button>
          </div>
        </div>

        <div className="control-card">
          <div className="control-title">Primary Brand Color</div>
          <div className="control-field">
            <label htmlFor="primary-color-input">
              <span>Color Hex</span>
              <code>{primaryColor}</code>
            </label>
            <input
              id="primary-color-input"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: "100%", height: "2.25rem", cursor: "pointer", borderRadius: "4px" }}
            />
          </div>
        </div>

        <div className="control-card">
          <div className="control-title">Border Radius</div>
          <div className="control-field">
            <label htmlFor="border-radius-slider">
              <span>Radius (px)</span>
              <code>{borderRadius}px</code>
            </label>
            <input
              id="border-radius-slider"
              type="range"
              min="0"
              max="24"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
            />
          </div>
        </div>

        <Button variant="primary" onClick={() => setIsExportOpen(true)}>
          Export Theme CSS
        </Button>
      </aside>

      {/* Live Stress-Testing Canvas */}
      <main className="playground-canvas">
        <div className="canvas-section">
          <h2 className="canvas-section-title">Button Variants & Micro-Interactions</h2>
          <div className="component-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button isLoading loadingText="Saving...">
              Saving
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <div className="canvas-section">
          <h2 className="canvas-section-title">Size Hierarchy</h2>
          <div className="component-row">
            <Button size="sm">Small Action</Button>
            <Button size="md">Medium Action</Button>
            <Button size="lg">Large Action</Button>
          </div>
        </div>

        <div className="canvas-section">
          <h2 className="canvas-section-title">Spinner Scale & Custom Colors</h2>
          <div className="component-row">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="lg" color={primaryColor} />
          </div>
        </div>

        <div className="canvas-section" data-theme="dark" style={{ backgroundColor: "var(--ch-color-bg-surface)" }}>
          <h2 className="canvas-section-title">Nested Contrast Test (Forced Dark Container)</h2>
          <p style={{ color: "var(--ch-color-fg-muted)", fontSize: "0.875rem" }}>
            Components seamlessly inherit nested theme contexts via pure CSS variables:
          </p>
          <div className="component-row">
            <Button variant="primary">Nested Primary</Button>
            <Button variant="secondary">Nested Secondary</Button>
            <Button variant="outline">Nested Outline</Button>
            <Button variant="danger">Nested Danger</Button>
          </div>
        </div>
      </main>

      {/* Export Theme Modal */}
      {isExportOpen && (
        <div className="export-modal-backdrop" onClick={() => setIsExportOpen(false)}>
          <div className="export-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 1rem" }}>Export Custom Theme CSS</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--ch-color-fg-muted)", margin: "0 0 1rem" }}>
              Copy and paste these CSS variables into your root stylesheet to apply your customized design tokens:
            </p>
            <pre
              style={{
                backgroundColor: "var(--ch-color-bg-subtle)",
                padding: "1rem",
                borderRadius: "6px",
                fontFamily: "var(--ch-font-mono)",
                fontSize: "0.85rem",
                overflowX: "auto",
              }}
            >
              {exportedCSS}
            </pre>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
              <Button variant="ghost" onClick={() => setIsExportOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCopy}>
                {copied ? "✓ Copied!" : "Copy CSS"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
