import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonColorScheme,
  ButtonLoadingPosition,
} from "@chellaa/react";
import { FiSend, FiArrowRight, FiRefreshCw, FiSliders } from "react-icons/fi";
import { CodeBlock } from "../Common/CodeBlock";

export function InteractiveButtonSandbox() {
  const [variant, setVariant] = React.useState<ButtonVariant>("solid");
  const [size, setSize] = React.useState<ButtonSize>("md");
  const [colorScheme, setColorScheme] =
    React.useState<ButtonColorScheme>("primary");
  const [buttonText, setButtonText] = React.useState("Interactive Button");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isFullWidth, setIsFullWidth] = React.useState(false);
  const [loadingPosition, setLoadingPosition] =
    React.useState<ButtonLoadingPosition>("start");
  const [iconMode, setIconMode] = React.useState<"none" | "start" | "end">(
    "none",
  );

  const handleReset = () => {
    setVariant("solid");
    setSize("md");
    setColorScheme("primary");
    setButtonText("Interactive Button");
    setIsLoading(false);
    setIsDisabled(false);
    setIsFullWidth(false);
    setLoadingPosition("start");
    setIconMode("none");
  };

  const startIcon =
    iconMode === "start" ? (
      <FiSend style={{ marginRight: "2px" }} />
    ) : undefined;
  const endIcon =
    iconMode === "end" ? (
      <FiArrowRight style={{ marginLeft: "2px" }} />
    ) : undefined;

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
    if (iconMode === "start") propsList.push("startIcon={<FiSend />}");
    if (iconMode === "end") propsList.push("endIcon={<FiArrowRight />}");

    if (propsList.length === 0) {
      return `<Button>\n  ${buttonText || "Button"}\n</Button>`;
    }

    if (propsList.length <= 2) {
      return `<Button ${propsList.join(" ")}>\n  ${buttonText || "Button"}\n</Button>`;
    }

    return `<Button\n  ${propsList.join("\n  ")}\n>\n  ${buttonText || "Button"}\n</Button>`;
  }, [
    variant,
    size,
    colorScheme,
    buttonText,
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
      {/* Sandbox Header */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--docs-border)",
          backgroundColor: "var(--docs-surface)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "var(--docs-primary-bg)",
              color: "var(--docs-primary)",
            }}
          >
            <FiSliders size={16} />
          </div>
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
              Configure props below and test real-time behavior and generated
              code.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid var(--docs-border)",
            backgroundColor: "var(--docs-card)",
            color: "var(--docs-text-muted)",
            fontSize: "0.82rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--docs-text)";
            e.currentTarget.style.borderColor = "var(--docs-border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--docs-text-muted)";
            e.currentTarget.style.borderColor = "var(--docs-border)";
          }}
        >
          <FiRefreshCw size={13} />
          <span>Reset</span>
        </button>
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
          minHeight: "170px",
        }}
      >
        <div
          style={{
            width: isFullWidth ? "100%" : "auto",
            maxWidth: isFullWidth ? "480px" : "auto",
            textAlign: "center",
            transition: "all 0.2s ease",
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
            {buttonText || "Button"}
          </Button>
        </div>
      </div>

      {/* Controls Grid */}
      <div
        style={{
          padding: "24px",
          borderTop: "1px solid var(--docs-border)",
          backgroundColor: "var(--docs-surface)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Row 1: Core Style Props */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
                letterSpacing: "0.04em",
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
                cursor: "pointer",
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
                letterSpacing: "0.04em",
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
                cursor: "pointer",
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
                letterSpacing: "0.04em",
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
                cursor: "pointer",
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
        </div>

        {/* Row 2: Content & State Props */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Icon Option */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--docs-text-dim)",
                marginBottom: "6px",
                letterSpacing: "0.04em",
              }}
            >
              Icon Attachment
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
                cursor: "pointer",
              }}
            >
              <option value="none">No icon</option>
              <option value="start">Start icon (FiSend)</option>
              <option value="end">End icon (FiArrowRight)</option>
            </select>
          </div>

          {/* Spinner Position */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--docs-text-dim)",
                marginBottom: "6px",
                letterSpacing: "0.04em",
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
                cursor: "pointer",
              }}
            >
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
            </select>
          </div>

          {/* Button Label Text */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--docs-text-dim)",
                marginBottom: "6px",
                letterSpacing: "0.04em",
              }}
            >
              Button Label
            </label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Button text..."
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--docs-border)",
                backgroundColor: "var(--docs-card)",
                color: "var(--docs-text)",
                fontSize: "0.9rem",
              }}
            />
          </div>
        </div>

        {/* Row 3: Modern Toggle Chips */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--docs-text-dim)",
              marginBottom: "8px",
              letterSpacing: "0.04em",
            }}
          >
            Interactive State Flags
          </label>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* isLoading Toggle Chip */}
            <button
              type="button"
              onClick={() => setIsLoading(!isLoading)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                border: `1px solid ${
                  isLoading ? "var(--docs-primary)" : "var(--docs-border)"
                }`,
                backgroundColor: isLoading
                  ? "var(--docs-primary-bg)"
                  : "var(--docs-card)",
                color: isLoading
                  ? "var(--docs-primary)"
                  : "var(--docs-text-muted)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: isLoading
                    ? "var(--docs-primary)"
                    : "var(--docs-border)",
                  boxShadow: isLoading ? "0 0 6px var(--docs-primary)" : "none",
                }}
              />
              <span>isLoading</span>
            </button>

            {/* isDisabled Toggle Chip */}
            <button
              type="button"
              onClick={() => setIsDisabled(!isDisabled)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                border: `1px solid ${
                  isDisabled ? "var(--docs-primary)" : "var(--docs-border)"
                }`,
                backgroundColor: isDisabled
                  ? "var(--docs-primary-bg)"
                  : "var(--docs-card)",
                color: isDisabled
                  ? "var(--docs-primary)"
                  : "var(--docs-text-muted)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: isDisabled
                    ? "var(--docs-primary)"
                    : "var(--docs-border)",
                  boxShadow: isDisabled
                    ? "0 0 6px var(--docs-primary)"
                    : "none",
                }}
              />
              <span>isDisabled</span>
            </button>

            {/* isFullWidth Toggle Chip */}
            <button
              type="button"
              onClick={() => setIsFullWidth(!isFullWidth)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                border: `1px solid ${
                  isFullWidth ? "var(--docs-primary)" : "var(--docs-border)"
                }`,
                backgroundColor: isFullWidth
                  ? "var(--docs-primary-bg)"
                  : "var(--docs-card)",
                color: isFullWidth
                  ? "var(--docs-primary)"
                  : "var(--docs-text-muted)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: isFullWidth
                    ? "var(--docs-primary)"
                    : "var(--docs-border)",
                  boxShadow: isFullWidth
                    ? "0 0 6px var(--docs-primary)"
                    : "none",
                }}
              />
              <span>isFullWidth</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Display */}
      <CodeBlock
        code={generatedCode}
        language="tsx"
        title="GENERATED CODE"
        flush
      />
    </div>
  );
}
