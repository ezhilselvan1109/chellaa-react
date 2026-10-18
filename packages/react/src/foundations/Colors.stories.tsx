import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Colors & Semantic Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chellaa React color system consists of 8 harmonic 10-step primitive ramps (Slate, Indigo, Violet, Emerald, Amber, Rose, Sky) and theme-driven semantic intent tokens for actions, surfaces, borders, and status feedback.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const PALETTES = [
  {
    name: "Slate (Neutral)",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    prefix: "--cl-palette-slate-",
  },
  {
    name: "Indigo (Primary Default)",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    prefix: "--cl-palette-indigo-",
  },
  {
    name: "Violet (Secondary / Accent)",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    prefix: "--cl-palette-violet-",
  },
  {
    name: "Emerald (Success)",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    prefix: "--cl-palette-emerald-",
  },
  {
    name: "Amber (Warning)",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    prefix: "--cl-palette-amber-",
  },
  {
    name: "Rose (Danger)",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    prefix: "--cl-palette-rose-",
  },
  {
    name: "Sky (Info)",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    prefix: "--cl-palette-sky-",
  },
];

const SEMANTIC_INTENTS = [
  { intent: "Primary", base: "--cl-color-primary-base", subtle: "--cl-color-primary-subtle", fg: "--cl-color-primary-fg" },
  { intent: "Secondary", base: "--cl-color-secondary-base", subtle: "--cl-color-secondary-subtle", fg: "--cl-color-secondary-fg" },
  { intent: "Neutral", base: "--cl-color-neutral-base", subtle: "--cl-color-neutral-subtle", fg: "--cl-color-neutral-fg" },
  { intent: "Success", base: "--cl-color-success-base", subtle: "--cl-color-success-subtle", fg: "--cl-color-success-fg" },
  { intent: "Warning", base: "--cl-color-warning-base", subtle: "--cl-color-warning-subtle", fg: "--cl-color-warning-fg" },
  { intent: "Danger", base: "--cl-color-danger-base", subtle: "--cl-color-danger-subtle", fg: "--cl-color-danger-fg" },
  { intent: "Info", base: "--cl-color-info-base", subtle: "--cl-color-info-subtle", fg: "--cl-color-info-fg" },
];

export const PrimitivePalettes: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 920,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Tier 1 Primitive Palettes
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "28px" }}>
        Mathematical 10-step scales used to derive semantic intentions across all light and dark themes.
      </p>

      {PALETTES.map((p) => (
        <div key={p.name} style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
            {p.name}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${p.shades.length}, 1fr)`,
              borderRadius: "var(--cl-radius-md, 6px)",
              overflow: "hidden",
              border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
            }}
          >
            {p.shades.map((shade) => {
              const varName = `${p.prefix}${shade}`;
              return (
                <div
                  key={shade}
                  style={{
                    backgroundColor: `var(${varName})`,
                    height: 56,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingBottom: "6px",
                    color: shade >= 500 ? "#ffffff" : "#0f172a",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                  title={varName}
                >
                  {shade}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 920,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Tier 2 Semantic Intentions
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "28px" }}>
        Contextual tokens used by buttons, badges, alerts, switches, and form inputs.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {SEMANTIC_INTENTS.map((item) => (
          <div
            key={item.intent}
            style={{
              padding: "16px",
              borderRadius: "var(--cl-radius-lg, 8px)",
              border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
              backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>
              {item.intent}
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "6px",
                  backgroundColor: `var(${item.base})`,
                }}
              />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600 }}>Base</div>
                <code style={{ fontSize: "11px", color: "var(--cl-color-fg-muted)" }}>
                  {item.base}
                </code>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "6px",
                  backgroundColor: `var(${item.subtle})`,
                  border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
                }}
              />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600 }}>Subtle Background</div>
                <code style={{ fontSize: "11px", color: "var(--cl-color-fg-muted)" }}>
                  {item.subtle}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
