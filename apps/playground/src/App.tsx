import * as React from "react";
import {
  Button,
  ButtonGroup,
  ThemeProvider,
  useTheme,
  type ButtonColorScheme,
  type ButtonSize,
  type ButtonVariant,
} from "@chellaa/react";
import "./Playground.css";

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="pg-header">
      <div className="pg-brand">
        Chellaa React{" "}
        <span style={{ opacity: 0.6, fontSize: "0.9rem" }}>Playground</span>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Button>
      </div>
    </header>
  );
}

function InteractiveSandbox() {
  const [variant, setVariant] = React.useState<ButtonVariant>("solid");
  const [size, setSize] = React.useState<ButtonSize>("md");
  const [colorScheme, setColorScheme] =
    React.useState<ButtonColorScheme>("primary");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullWidth, setIsFullWidth] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  return (
    <div className="pg-card">
      <h2 className="pg-card-title">Interactive Component Sandbox</h2>
      <p className="pg-card-desc">
        Dynamically adjust public props and observe real-time rendering,
        keyboard focus rings, and tactile micro-animations.
      </p>

      <div className="pg-controls">
        <label className="pg-field">
          Variant:
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as ButtonVariant)}
          >
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
            <option value="subtle">Subtle</option>
            <option value="link">Link</option>
          </select>
        </label>

        <label className="pg-field">
          Size:
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as ButtonSize)}
          >
            <option value="xs">xs (28px)</option>
            <option value="sm">sm (32px)</option>
            <option value="md">md (40px)</option>
            <option value="lg">lg (48px)</option>
            <option value="xl">xl (56px)</option>
          </select>
        </label>

        <label className="pg-field">
          Color Scheme:
          <select
            value={colorScheme}
            onChange={(e) =>
              setColorScheme(e.target.value as ButtonColorScheme)
            }
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="neutral">Neutral</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
            <option value="info">Info</option>
          </select>
        </label>

        <label
          className="pg-field"
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            marginTop: "18px",
          }}
        >
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
          />
          Disabled
        </label>

        <label
          className="pg-field"
          style={{ flexDirection: "row", alignItems: "center", gap: "8px" }}
        >
          <input
            type="checkbox"
            checked={isLoading}
            onChange={(e) => setIsLoading(e.target.checked)}
          />
          Loading State
        </label>

        <label
          className="pg-field"
          style={{ flexDirection: "row", alignItems: "center", gap: "8px" }}
        >
          <input
            type="checkbox"
            checked={isFullWidth}
            onChange={(e) => setIsFullWidth(e.target.checked)}
          />
          Full Width
        </label>
      </div>

      <div className="pg-preview-box">
        <Button
          variant={variant}
          size={size}
          colorScheme={colorScheme}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isFullWidth={isFullWidth}
          onClick={() => setClickCount((c) => c + 1)}
        >
          {variant === "link"
            ? "Inline Action Link"
            : `Execute Action (${clickCount})`}
        </Button>
      </div>
    </div>
  );
}

function FormSimulation() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Saving data securely to API...");

    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage("✅ Changes successfully saved!");
      setTimeout(() => setStatusMessage(null), 3000);
    }, 1500);
  };

  return (
    <div className="pg-card">
      <h2 className="pg-card-title">Real Form Scenario & Double-Click Guard</h2>
      <p className="pg-card-desc">
        Validates native form integration (`type="submit"`), double-click
        prevention, and asynchronous loading spinner states.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              marginBottom: "6px",
            }}
          >
            Workspace Project Name
          </label>
          <input
            type="text"
            defaultValue="Chellaa Enterprise Cloud"
            style={{
              width: "100%",
              padding: "8px 12px",
              boxSizing: "border-box",
              borderRadius: "6px",
              border: "1px solid var(--pg-border)",
              background: "var(--pg-card-bg)",
              color: "inherit",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Button
            type="submit"
            variant="solid"
            colorScheme="primary"
            isLoading={isSubmitting}
            loadingText="Saving..."
          >
            Save Project
          </Button>

          <Button
            type="reset"
            variant="outline"
            colorScheme="neutral"
            isDisabled={isSubmitting}
          >
            Reset
          </Button>
        </div>

        {statusMessage && (
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--cl-color-success-base)",
              fontWeight: 500,
            }}
          >
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
}

function ToolbarComposition() {
  const [alignment, setAlignment] = React.useState("left");

  return (
    <div className="pg-card">
      <h2 className="pg-card-title">Attached ButtonGroup Toolbars</h2>
      <p className="pg-card-desc">
        Demonstrates collapsed shared borders, unified hover/focus z-indexes,
        and semantic group composition.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            Text Alignment
          </div>
          <ButtonGroup isAttached variant="outline" colorScheme="primary">
            <Button
              variant={alignment === "left" ? "solid" : "outline"}
              onClick={() => setAlignment("left")}
            >
              Left
            </Button>
            <Button
              variant={alignment === "center" ? "solid" : "outline"}
              onClick={() => setAlignment("center")}
            >
              Center
            </Button>
            <Button
              variant={alignment === "right" ? "solid" : "outline"}
              onClick={() => setAlignment("right")}
            >
              Right
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.85rem",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            Editor Actions
          </div>
          <ButtonGroup
            isAttached
            variant="solid"
            colorScheme="neutral"
            size="sm"
          >
            <Button>Cut</Button>
            <Button>Copy</Button>
            <Button>Paste</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

function SlotComposition() {
  return (
    <div className="pg-card">
      <h2 className="pg-card-title">
        Zero-DOM Router Link Delegation (`asChild`)
      </h2>
      <p className="pg-card-desc">
        Demonstrates composition with semantic anchor links using the
        Radix-style `Slot` primitive without redundant wrapper tags.
      </p>

      <div className="pg-row">
        <Button asChild variant="solid" colorScheme="secondary">
          <a
            href="https://github.com/chellaa/chellaa-react"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository ↗
          </a>
        </Button>

        <Button asChild variant="outline" colorScheme="neutral">
          <a href="#demo-section">In-Page Anchor</a>
        </Button>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="pg-layout">
        <Header />
        <main className="pg-main">
          <div className="pg-grid">
            <InteractiveSandbox />
            <FormSimulation />
            <ToolbarComposition />
            <SlotComposition />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
