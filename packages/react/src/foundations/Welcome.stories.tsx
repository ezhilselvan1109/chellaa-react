import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Introduction/Welcome",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Welcome to Chellaa React — an accessible, design-token-driven React component library built with semantic CSS variables, strict accessibility compliance, and ergonomic polymorphic components.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
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
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--cl-palette-indigo-600, #4f46e5) 0%, var(--cl-palette-violet-600, #7c3aed) 100%)",
          color: "#ffffff",
          padding: "48px 36px",
          borderRadius: "var(--cl-radius-xl, 12px)",
          marginBottom: "36px",
          boxShadow: "var(--cl-shadow-lg)",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            opacity: 0.9,
          }}
        >
          Design System & Component Library
        </span>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 800,
            margin: "12px 0",
            lineHeight: 1.2,
          }}
        >
          Chellaa React
        </h1>
        <p
          style={{
            fontSize: "18px",
            opacity: 0.95,
            maxWidth: 620,
            margin: 0,
          }}
        >
          Production-grade UI primitives and composite components crafted for
          modern web applications with first-class accessibility, theme tokens,
          and robust developer experience.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            padding: "24px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
            backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>🎨</div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 8px 0",
            }}
          >
            Tiered Design Tokens
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--cl-color-fg-muted, #64748b)",
              margin: 0,
            }}
          >
            Mathematical palettes, semantic color intentions, and component-level
            custom properties driven by CSS layers.
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
            backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>♿</div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 8px 0",
            }}
          >
            WAI-ARIA & Axe-Core
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--cl-color-fg-muted, #64748b)",
              margin: 0,
            }}
          >
            Built-in roving tabindex, focus management, screen-reader
            announcements, and zero-violation accessibility baselines.
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
            backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>🧩</div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 8px 0",
            }}
          >
            Polymorphic Composition
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--cl-color-fg-muted, #64748b)",
              margin: 0,
            }}
          >
            Seamless delegation using <code>asChild</code> Slot pattern,
            compound subcomponents, and responsive styling.
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
        Core Pillars
      </h2>
      <ul style={{ paddingLeft: "24px", fontSize: "15px" }}>
        <li style={{ marginBottom: "8px" }}>
          <strong>32 Public Components:</strong> Full coverage from basic actions
          to advanced tables, pagination, and comboboxes.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Zero Runtime Lock-In:</strong> Native CSS variables with
          optional Emotion <code>styled()</code> integration.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Instant Light & Dark Mode:</strong> Zero-flash theme switching
          using <code>data-theme</code> and <code>ThemeScript</code>.
        </li>
        <li style={{ marginBottom: "8px" }}>
          <strong>Strictly Typed:</strong> Complete TypeScript types, generic
          polymorphic refs, and verified exports.
        </li>
      </ul>
    </div>
  ),
};
