import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Badge, Spinner, Input, useTheme } from "@chella-ui/react";
import { CodeBlock } from "../components/CodeBlock";

interface PaletteOption {
  name: string;
  primary: string;
  hover: string;
  active: string;
  subtle: string;
}

const colorPalettes: PaletteOption[] = [
  {
    name: "Chakra Teal",
    primary: "#00C49F",
    hover: "#00A887",
    active: "#008A6F",
    subtle: "rgba(0, 196, 159, 0.15)",
  },
  {
    name: "Cyber Violet",
    primary: "#7C3AED",
    hover: "#6D28D9",
    active: "#5B21B6",
    subtle: "rgba(124, 58, 237, 0.15)",
  },
  {
    name: "Ocean Blue",
    primary: "#2563EB",
    hover: "#1D4ED8",
    active: "#1E40AF",
    subtle: "rgba(37, 99, 235, 0.15)",
  },
  {
    name: "Emerald Green",
    primary: "#10B981",
    hover: "#059669",
    active: "#047857",
    subtle: "rgba(16, 185, 129, 0.15)",
  },
  {
    name: "Sunset Rose",
    primary: "#F43F5E",
    hover: "#E11D48",
    active: "#BE123C",
    subtle: "rgba(244, 63, 94, 0.15)",
  },
  {
    name: "Solar Amber",
    primary: "#F59E0B",
    hover: "#D97706",
    active: "#B45309",
    subtle: "rgba(245, 158, 11, 0.15)",
  },
];

const radiusOptions = [
  { label: "None (0px)", value: "0px" },
  { label: "Small (4px)", value: "4px" },
  { label: "Medium (8px)", value: "8px" },
  { label: "Large (12px)", value: "12px" },
  { label: "Full (9999px)", value: "9999px" },
];

const defaultPalette = colorPalettes[0]!;

export const ThemingPage: React.FC = () => {
  const { resolvedTheme, toggleTheme, setCustomTheme } = useTheme();
  const [selectedPalette, setSelectedPalette] = useState<PaletteOption>(defaultPalette);
  const [radiusIndex, setRadiusIndex] = useState(2); // Medium (8px)

  const selectedRadius = radiusOptions[radiusIndex] ?? radiusOptions[2]!;
  const activeRadius = selectedRadius.value;

  // Apply custom tokens live to document when user changes theme settings in this studio
  useEffect(() => {
    setCustomTheme({
      colors: {
        primary: selectedPalette.primary,
        primaryHover: selectedPalette.hover,
        primaryActive: selectedPalette.active,
        primarySubtle: selectedPalette.subtle,
      },
      radii: {
        md: activeRadius,
      },
    });
  }, [selectedPalette, activeRadius, setCustomTheme]);

  const generatedCss = `:root {
  --ch-color-primary: ${selectedPalette.primary};
  --ch-color-primary-hover: ${selectedPalette.hover};
  --ch-color-primary-active: ${selectedPalette.active};
  --ch-radius-md: ${activeRadius};
}`;


  const generatedProviderJsx = `<ChellaProvider
  defaultTheme="${resolvedTheme}"
  theme={{
    colors: {
      primary: "${selectedPalette.primary}",
      primaryHover: "${selectedPalette.hover}",
      primaryActive: "${selectedPalette.active}",
    },
    radii: {
      md: "${activeRadius}",
    },
  }}
>
  <App />
</ChellaProvider>`;

  return (
    <article className="docs-content" style={{ maxWidth: "68rem" }}>
      <div className="docs-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Docs</span>
        <span>/</span>
        <span>Theming & Dark Mode</span>
      </div>

      <div className="docs-title-row">
        <h1 className="docs-title">Theming & Token Studio</h1>
        <Badge variant="primary" size="md">
          Live Interactive
        </Badge>
      </div>
      <p className="docs-description">
        Chella UI delivers zero-runtime theming powered by CSS custom properties. Customize palettes,
        radii, and typography with instant real-time live preview.
      </p>

      {/* Interactive Studio Canvas */}
      <div className="theme-studio-wrapper">
        <h2 className="theme-studio-title">Interactive Theme Customizer</h2>
        <p className="theme-studio-desc">
          Select a brand primary accent and border radius scale to watch the components adapt instantly in real time:
        </p>

        <div className="theme-studio-grid">
          {/* Left: Customizer Controls */}
          <div>
            <label className="control-label" style={{ display: "block", marginBottom: "0.5rem" }}>
              Brand Primary Palette:
            </label>
            <div className="theme-palette-picker">
              {colorPalettes.map((pal) => (
                <div
                  key={pal.name}
                  className={`theme-color-swatch ${selectedPalette.name === pal.name ? "active" : ""}`}
                  style={{ backgroundColor: pal.primary }}
                  onClick={() => setSelectedPalette(pal)}
                  title={pal.name}
                />
              ))}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--docs-fg-muted)", marginTop: "0.5rem" }}>
              Active: <strong>{selectedPalette.name}</strong> ({selectedPalette.primary})
            </div>

            <div className="theme-radius-slider-wrapper">
              <label className="control-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                Component Corner Radius: <strong>{selectedRadius.label}</strong>
              </label>
              <input
                type="range"
                className="theme-radius-slider"
                min="0"
                max="4"
                step="1"
                value={radiusIndex}
                onChange={(e) => setRadiusIndex(parseInt(e.target.value, 10))}
              />
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Button variant="secondary" size="sm" onClick={toggleTheme}>
                Toggle {resolvedTheme === "dark" ? "Light" : "Dark"} Mode
              </Button>
            </div>
          </div>

          {/* Right: Real-time Live Component Canvas */}
          <div className="theme-live-preview-box">
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Button variant="primary" size="md">
                Primary Button
              </Button>
              <Button variant="outline" size="md">
                Outline
              </Button>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Badge variant="primary" size="md">
                Primary Badge
              </Badge>
              <Badge variant="success" size="md">
                Success
              </Badge>
              <Spinner size="md" color={selectedPalette.primary} />
            </div>

            <div style={{ width: "100%", maxWidth: 280 }}>
              <Input placeholder="Theme-responsive input..." size="md" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="docs-section-heading">Applying Custom Themes in Code</h2>
      <p className="docs-p">
        You can provide your customized design tokens directly into <code>&lt;ChellaProvider /&gt;</code>:
      </p>
      <CodeBlock code={generatedProviderJsx} language="tsx" />

      <h2 className="docs-section-heading">Global CSS Variable Overrides</h2>
      <p className="docs-p">
        Alternatively, you can override the semantic custom properties in your global stylesheet:
      </p>
      <CodeBlock code={generatedCss} language="css" />

      <h2 className="docs-section-heading">The Three-Tier Architecture</h2>
      <p className="docs-p">
        Chella UI tokens are organized into three distinct tiers:
      </p>
      <ul>
        <li>
          <strong>Tier 1: Global Primitives:</strong> Raw color scales, base spacing increments, and typography scales (e.g. <code>--ch-space-4</code>, <code>--ch-font-sans</code>).
        </li>
        <li>
          <strong>Tier 2: Semantic Tokens:</strong> Contextual tokens that automatically change values between Light and Dark mode (e.g. <code>--ch-color-bg-canvas</code>, <code>--ch-color-fg-default</code>, <code>--ch-color-primary</code>).
        </li>
        <li>
          <strong>Tier 3: Component Tokens:</strong> Scoped local variables powering individual components (e.g. <code>--ch-btn-bg</code>, <code>--ch-btn-height</code>).
        </li>
      </ul>

      <h2 className="docs-section-heading">SSR Anti-Flicker Protection</h2>
      <p className="docs-p">
        In Server-Side Rendering environments like Next.js (App Router) or Remix, include <code>&lt;ThemeScript /&gt;</code> in your document <code>&lt;head&gt;</code> to eliminate flash of incorrect theme (FOIT/FOUC):
      </p>
      <CodeBlock
        code={`import { ThemeScript } from "@chella-ui/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}`}
        language="tsx"
      />
    </article>
  );
};
