import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Spacing & Layout Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chellaa React uses a strict 4px baseline spatial rhythm for all padding, margins, flex gaps, and container layouts, paired with 5 responsive viewport breakpoints.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const SPACING_STEPS = [
  { token: "--cl-space-0", px: "0px", rem: "0rem" },
  { token: "--cl-space-0-5", px: "2px", rem: "0.125rem" },
  { token: "--cl-space-1", px: "4px", rem: "0.25rem" },
  { token: "--cl-space-1-5", px: "6px", rem: "0.375rem" },
  { token: "--cl-space-2", px: "8px", rem: "0.5rem" },
  { token: "--cl-space-2-5", px: "10px", rem: "0.625rem" },
  { token: "--cl-space-3", px: "12px", rem: "0.75rem" },
  { token: "--cl-space-4", px: "16px", rem: "1rem" },
  { token: "--cl-space-5", px: "20px", rem: "1.25rem" },
  { token: "--cl-space-6", px: "24px", rem: "1.5rem" },
  { token: "--cl-space-8", px: "32px", rem: "2rem" },
  { token: "--cl-space-10", px: "40px", rem: "2.5rem" },
  { token: "--cl-space-12", px: "48px", rem: "3rem" },
  { token: "--cl-space-16", px: "64px", rem: "4rem" },
  { token: "--cl-space-20", px: "80px", rem: "5rem" },
  { token: "--cl-space-24", px: "96px", rem: "6rem" },
];

const BREAKPOINTS = [
  { token: "--cl-breakpoint-xs", width: "0px", desc: "Mobile portrait phones" },
  { token: "--cl-breakpoint-sm", width: "600px", desc: "Mobile landscape & small tablets" },
  { token: "--cl-breakpoint-md", width: "900px", desc: "Tablets & compact laptops" },
  { token: "--cl-breakpoint-lg", width: "1200px", desc: "Desktop monitors" },
  { token: "--cl-breakpoint-xl", width: "1536px", desc: "Ultra-wide displays" },
];

export const SpacingScale: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        4px Baseline Spacing Scale
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "24px" }}>
        Consistent spatial units consumed by <code>Stack</code>, <code>Flex</code>, <code>Grid</code>, <code>Container</code>, and component padding.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {SPACING_STEPS.map((s) => (
          <div
            key={s.token}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 120px 1fr",
              alignItems: "center",
              gap: "16px",
              padding: "6px 0",
              borderBottom: "1px solid var(--cl-color-border-subtle, #f1f5f9)",
            }}
          >
            <div>
              <code style={{ fontSize: "12px", fontWeight: 700 }}>{s.token}</code>
            </div>
            <div style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)" }}>
              {s.px} ({s.rem})
            </div>
            <div>
              <div
                style={{
                  width: `var(${s.token})`,
                  height: 18,
                  backgroundColor: "var(--cl-color-primary-base, #4f46e5)",
                  borderRadius: "2px",
                  minWidth: s.px === "0px" ? 0 : 2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Responsive Breakpoints
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "24px" }}>
        Grid and container breakpoints mapped to CSS media queries and the <code>Container</code> component.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {BREAKPOINTS.map((b) => (
          <div
            key={b.token}
            style={{
              padding: "16px",
              borderRadius: "var(--cl-radius-md, 6px)",
              border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
              backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <code style={{ fontSize: "13px", fontWeight: 700 }}>{b.token}</code>
              <div style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)", marginTop: "4px" }}>
                {b.desc}
              </div>
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--cl-color-primary-base)",
              }}
            >
              min-width: {b.width}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
