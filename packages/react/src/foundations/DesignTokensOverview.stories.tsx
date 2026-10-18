import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Design Tokens Overview",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chellaa React organizes design tokens across three distinct conceptual tiers: Tier 1 Primitives (global constants), Tier 2 Semantics (theme-contextual variables), and Tier 3 Components (component-specific overrides).",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Architecture: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        color: "var(--cl-color-fg-primary, #0f172a)",
        maxWidth: 880,
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
        Design Tokens Architecture
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "var(--cl-color-fg-secondary, #475569)",
          marginBottom: "32px",
        }}
      >
        Tokens create a single, immutable source of truth connecting visual design
        decisions to CSS custom properties.
      </p>

      {/* 3 Tier Diagram */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "36px",
        }}
      >
        {/* Tier 1 */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-palette-indigo-200, #c7d2fe)",
            backgroundColor: "var(--cl-palette-indigo-50, #eef2ff)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--cl-palette-indigo-700, #4338ca)",
                textTransform: "uppercase",
              }}
            >
              Tier 1 — Global Primitives
            </span>
            <code
              style={{
                fontSize: "12px",
                backgroundColor: "rgba(255,255,255,0.7)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              tokens.css
            </code>
          </div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 4px 0",
              color: "var(--cl-palette-indigo-900, #312e81)",
            }}
          >
            Raw scales independent of semantic intent
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "var(--cl-palette-indigo-800, #3730a3)",
              margin: 0,
            }}
          >
            Mathematical scales: color ramps (<code>--cl-palette-slate-500</code>,{" "}
            <code>--cl-palette-indigo-600</code>), spacing (<code>--cl-space-4</code>),
            border radius (<code>--cl-radius-md</code>), font families, and shadows.
          </p>
        </div>

        {/* Arrow */}
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "var(--cl-color-fg-muted, #94a3b8)",
          }}
        >
          ↓ referenced by
        </div>

        {/* Tier 2 */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-palette-violet-200, #ddd6fe)",
            backgroundColor: "var(--cl-palette-violet-50, #f5f3ff)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--cl-palette-violet-700, #6d28d9)",
                textTransform: "uppercase",
              }}
            >
              Tier 2 — Semantic Tokens
            </span>
            <code
              style={{
                fontSize: "12px",
                backgroundColor: "rgba(255,255,255,0.7)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              theme.css
            </code>
          </div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 4px 0",
              color: "var(--cl-palette-violet-900, #4c1d95)",
            }}
          >
            Contextual, theme-aware intent mappings
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "var(--cl-palette-violet-800, #5b21b6)",
              margin: 0,
            }}
          >
            Swapped automatically by <code>data-theme="light|dark"</code>:{" "}
            <code>--cl-color-bg-canvas</code>, <code>--cl-color-fg-primary</code>,{" "}
            <code>--cl-color-border-subtle</code>, <code>--cl-color-primary-base</code>.
          </p>
        </div>

        {/* Arrow */}
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "var(--cl-color-fg-muted, #94a3b8)",
          }}
        >
          ↓ consumed by
        </div>

        {/* Tier 3 */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-palette-emerald-200, #a7f3d0)",
            backgroundColor: "var(--cl-palette-emerald-50, #ecfdf5)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--cl-palette-emerald-700, #047857)",
                textTransform: "uppercase",
              }}
            >
              Tier 3 — Component Tokens
            </span>
            <code
              style={{
                fontSize: "12px",
                backgroundColor: "rgba(255,255,255,0.7)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              [Component].styles.css
            </code>
          </div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 4px 0",
              color: "var(--cl-palette-emerald-900, #064e3b)",
            }}
          >
            Component-specific styling and overrides
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "var(--cl-palette-emerald-800, #065f46)",
              margin: 0,
            }}
          >
            Scoped variables: <code>--cl-btn-bg</code>, <code>--cl-input-border</code>,{" "}
            <code>--cl-dialog-bg</code>, <code>--cl-table-border</code>, fallback
            cascading directly to Tier 2 tokens.
          </p>
        </div>
      </div>

      <h2
        style={{
          fontSize: "20px",
          fontWeight: 700,
          borderBottom: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
          paddingBottom: "8px",
          marginTop: "32px",
        }}
      >
        CSS Cascade Layers
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-secondary, #475569)" }}>
        All Chellaa React styles are isolated within standard CSS cascade layers
        to prevent specificity collisions with user stylesheets:
      </p>
      <div
        style={{
          backgroundColor: "var(--cl-palette-slate-900, #0f172a)",
          color: "#f8fafc",
          padding: "16px 20px",
          borderRadius: "var(--cl-radius-md, 6px)",
          fontFamily: "var(--cl-font-mono, monospace)",
          fontSize: "13px",
        }}
      >
        {`@layer cl-reset, cl-tokens, cl-theme, cl-components, cl-utilities;`}
      </div>
    </div>
  ),
};
