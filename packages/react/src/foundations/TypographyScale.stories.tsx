import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Typography Scale",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chellaa React typographic scale includes font family stacks (Sans and Mono), 10-step size scales with matched line-heights, and 4 font-weight tiers.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const TYPE_SCALE = [
  { token: "--cl-font-size-4xl", size: "36px (2.25rem)", line: "1.2", sample: "Hero Display Headline" },
  { token: "--cl-font-size-3xl", size: "30px (1.875rem)", line: "1.25", sample: "Page Title Headline" },
  { token: "--cl-font-size-2xl", size: "24px (1.5rem)", line: "1.3", sample: "Section Card Header" },
  { token: "--cl-font-size-xl", size: "20px (1.25rem)", line: "1.4", sample: "Sub-section Headline" },
  { token: "--cl-font-size-lg", size: "18px (1.125rem)", line: "1.5", sample: "Lead paragraph and large inputs" },
  { token: "--cl-font-size-base", size: "16px (1rem)", line: "1.5", sample: "Standard body text & default components" },
  { token: "--cl-font-size-sm", size: "14px (0.875rem)", line: "1.4", sample: "Captions, form labels, small buttons" },
  { token: "--cl-font-size-xs", size: "12px (0.75rem)", line: "1.4", sample: "Helper text, badges, footnotes" },
  { token: "--cl-font-size-2xs", size: "10px (0.625rem)", line: "1.3", sample: "Mini badges, tags, micro-labels" },
];

export const FontFamilies: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Font Families
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "24px" }}>
        System-first typographic stacks ensuring crisp cross-platform rendering without network latency.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
        <div
          style={{
            padding: "20px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
            backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--cl-color-primary-base)" }}>
            --cl-font-sans
          </div>
          <div style={{ fontSize: "20px", fontWeight: 600, margin: "6px 0" }}>
            Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
          </div>
          <div style={{ fontSize: "14px", color: "var(--cl-color-fg-secondary)" }}>
            Used for all interface controls, buttons, forms, cards, dialogs, and navigation.
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            borderRadius: "var(--cl-radius-lg, 8px)",
            border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
            backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--cl-color-primary-base)" }}>
            --cl-font-mono
          </div>
          <div
            style={{
              fontFamily: "var(--cl-font-mono, monospace)",
              fontSize: "18px",
              fontWeight: 600,
              margin: "6px 0",
            }}
          >
            ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace
          </div>
          <div style={{ fontSize: "14px", color: "var(--cl-color-fg-secondary)" }}>
            Used for <code>&lt;Code&gt;</code>, <code>&lt;Kbd&gt;</code>, code blocks, and data tables.
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SizeScale: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Type Scale & Line Heights
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "24px" }}>
        Mathematical typographic progression designed for legibility and clear visual hierarchy.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {TYPE_SCALE.map((item) => (
          <div
            key={item.token}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 140px 1fr",
              alignItems: "center",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
              gap: "16px",
            }}
          >
            <div>
              <code style={{ fontSize: "12px", fontWeight: 700 }}>{item.token}</code>
            </div>
            <div style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)" }}>
              {item.size} / {item.line}
            </div>
            <div style={{ fontSize: `var(${item.token})`, fontWeight: 600, lineHeight: item.line }}>
              {item.sample}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
