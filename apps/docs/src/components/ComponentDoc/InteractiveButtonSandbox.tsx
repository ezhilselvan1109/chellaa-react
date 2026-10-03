import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonColorScheme,
  ButtonLoadingPosition,
} from "@chellaa/react";
import { CodeBlock } from "../Common/CodeBlock";

export function InteractiveButtonSandbox() {
  const [variant, setVariant] = React.useState<ButtonVariant>("solid");
  const [size, setSize] = React.useState<ButtonSize>("md");
  const [colorScheme, setColorScheme] =
    React.useState<ButtonColorScheme>("primary");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isFullWidth, setIsFullWidth] = React.useState(false);
  const [loadingPosition, setLoadingPosition] =
    React.useState<ButtonLoadingPosition>("start");
  const [iconMode, setIconMode] = React.useState<"none" | "start" | "end">(
    "none",
  );

  const startIcon = iconMode === "start" ? <span>🚀</span> : undefined;
  const endIcon = iconMode === "end" ? <span>→</span> : undefined;

  const generatedCode = React.useMemo(() => {
    const propsList: string[] = [];
    if (variant !== "solid") propsList.push(`variant="${variant}"`);
    if (size !== "md") propsList.push(`size="${size}"`);
    if (colorScheme !== "primary")
      propsList.push(`colorScheme="${colorScheme}"`);
    if (isLoading) propsList.push("isLoading");
    if (isLoading && loadingPosition !== "start")
      propsList.push(`loadingPosition="${loadingPosition}"`);
    if (isDisabled) propsList.push("isDisabled");
    if (isFullWidth) propsList.push("isFullWidth");
    if (iconMode === "start") propsList.push("startIcon={<RocketIcon />}");
    if (iconMode === "end") propsList.push("endIcon={<ArrowRightIcon />}");

    const propsStr = propsList.length > 0 ? " " + propsList.join(" ") : "";
    return `<Button${propsStr}>\n  Interactive Button\n</Button>`;
  }, [
    variant,
    size,
    colorScheme,
    isLoading,
    loadingPosition,
    isDisabled,
    isFullWidth,
    iconMode,
  ]);

  return (
    <div
      style={{
        border: "1px solid var(--docs-border)",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "var(--docs-card)",
        boxShadow: "var(--docs-shadow-md)",
        margin: "24px 0 48px 0",
      }}
    >
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--docs-border)",
          backgroundColor: "var(--docs-surface)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>
            Interactive Component Playground
          </span>
          <p
            style={{
              margin: "2px 0 0 0",
              fontSize: "0.85rem",
              color: "var(--docs-text-muted)",
            }}
          >
            Customize props below and inspect real-time behavior and generated
            code.
          </p>
        </div>
      </div>

      {/* Live Preview Canvas */}
      <div
        style={{
          padding: "48px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--docs-card)",
          backgroundImage:
            "radial-gradient(var(--docs-dot-color) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          minHeight: "160px",
        }}
      >
        <div
          style={{
            width: isFullWidth ? "100%" : "auto",
            maxWidth: "340px",
            textAlign: "center",
          }}
        >
          <Button
            variant={variant}
            size={size}
            colorScheme={colorScheme}
            isLoading={isLoading}
            loadingPosition={loadingPosition}
            isDisabled={isDisabled}
            isFullWidth={isFullWidth}
            startIcon={startIcon}
            endIcon={endIcon}
          >
            Interactive Button
          </Button>
        </div>
      </div>

      {/* Control Knobs Bar */}
      <div
        style={{
          padding: "20px 24px",
          borderTop: "1px solid var(--docs-border)",
          backgroundColor: "var(--docs-surface)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {/* Variant */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--docs-text-dim)",
              marginBottom: "6px",
            }}
          >
            Variant
          </label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as ButtonVariant)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              color: "var(--docs-text)",
              fontSize: "0.9rem",
            }}
          >
            <option value="solid">solid</option>
            <option value="outline">outline</option>
            <option value="ghost">ghost</option>
            <option value="subtle">subtle</option>
            <option value="link">link</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--docs-text-dim)",
              marginBottom: "6px",
            }}
          >
            Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as ButtonSize)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              color: "var(--docs-text)",
              fontSize: "0.9rem",
            }}
          >
            <option value="xs">xs (28px)</option>
            <option value="sm">sm (32px)</option>
            <option value="md">md (40px)</option>
            <option value="lg">lg (48px)</option>
            <option value="xl">xl (56px)</option>
          </select>
        </div>

        {/* Color Scheme */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--docs-text-dim)",
              marginBottom: "6px",
            }}
          >
            Color Scheme
          </label>
          <select
            value={colorScheme}
            onChange={(e) =>
              setColorScheme(e.target.value as ButtonColorScheme)
            }
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              color: "var(--docs-text)",
              fontSize: "0.9rem",
            }}
          >
            <option value="primary">primary</option>
            <option value="secondary">secondary</option>
            <option value="neutral">neutral</option>
            <option value="success">success</option>
            <option value="warning">warning</option>
            <option value="danger">danger</option>
            <option value="info">info</option>
          </select>
        </div>

        {/* Icons */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--docs-text-dim)",
              marginBottom: "6px",
            }}
          >
            Icons
          </label>
          <select
            value={iconMode}
            onChange={(e) =>
              setIconMode(e.target.value as "none" | "start" | "end")
            }
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              color: "var(--docs-text)",
              fontSize: "0.9rem",
            }}
          >
            <option value="none">No icon</option>
            <option value="start">Start icon</option>
            <option value="end">End icon</option>
          </select>
        </div>

        {/* Loading Position */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--docs-text-dim)",
              marginBottom: "6px",
            }}
          >
            Spinner Position
          </label>
          <select
            value={loadingPosition}
            onChange={(e) =>
              setLoadingPosition(e.target.value as ButtonLoadingPosition)
            }
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid var(--docs-border)",
              backgroundColor: "var(--docs-card)",
              color: "var(--docs-text)",
              fontSize: "0.9rem",
            }}
          >
            <option value="start">start</option>
            <option value="center">center</option>
            <option value="end">end</option>
          </select>
        </div>

        {/* Boolean Flags */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            gridColumn: "1 / -1",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isLoading}
              onChange={(e) => setIsLoading(e.target.checked)}
            />
            <code>isLoading</code>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
            <code>isDisabled</code>
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isFullWidth}
              onChange={(e) => setIsFullWidth(e.target.checked)}
            />
            <code>isFullWidth</code>
          </label>
        </div>
      </div>

      {/* Code Display */}
      <div style={{ borderTop: "1px solid var(--docs-border)" }}>
        <CodeBlock code={generatedCode} language="tsx" title="GENERATED CODE" />
      </div>
    </div>
  );
}
