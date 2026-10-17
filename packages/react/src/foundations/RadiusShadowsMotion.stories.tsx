import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Radius, Shadows & Motion",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Curvature scales (border-radius), elevation layers (box-shadows), and motion timing curves (durations and easings) powering tactile depth across Chellaa React.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const RADII = [
  { token: "--cl-radius-none", alias: "--cl-rad-none", val: "0px" },
  { token: "--cl-radius-xs", alias: "--cl-rad-xs", val: "2px" },
  { token: "--cl-radius-sm", alias: "--cl-rad-sm", val: "4px" },
  { token: "--cl-radius-md", alias: "--cl-rad-md", val: "6px" },
  { token: "--cl-radius-lg", alias: "--cl-rad-lg", val: "8px" },
  { token: "--cl-radius-xl", alias: "--cl-rad-xl", val: "12px" },
  { token: "--cl-radius-2xl", alias: "--cl-rad-2xl", val: "16px" },
  { token: "--cl-radius-full", alias: "--cl-rad-full", val: "9999px (Pill)" },
];

const SHADOWS = [
  { token: "--cl-shadow-xs", desc: "Cards, subtle badges" },
  { token: "--cl-shadow-sm", desc: "Dropdown triggers, low buttons" },
  { token: "--cl-shadow-md", desc: "Floating menus, select popups" },
  { token: "--cl-shadow-lg", desc: "Snackbars, toasts, tooltips" },
  { token: "--cl-shadow-xl", desc: "Modals, dialogs, drawers" },
  { token: "--cl-shadow-2xl", desc: "Deep overlay lightboxes" },
];

const MOTIONS = [
  { token: "--cl-duration-fast", val: "150ms", desc: "Micro-interactions, hover states, toggles" },
  { token: "--cl-duration-normal", val: "200ms", desc: "Dialog fade, tooltip disclosure, accordion fold" },
  { token: "--cl-duration-slow", val: "300ms", desc: "Drawer slides, page transitions, complex modals" },
];

export const BorderRadiusScale: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Border Radius Scale
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "24px" }}>
        Standardized curvature tokens with verified <code>--cl-rad-*</code> backward-compatibility aliases.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {RADII.map((r) => (
          <div
            key={r.token}
            style={{
              padding: "16px",
              borderRadius: `var(${r.token})`,
              border: "2px solid var(--cl-color-primary-base, #4f46e5)",
              backgroundColor: "var(--cl-color-primary-subtle, #eef2ff)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "90px",
            }}
          >
            <code style={{ fontSize: "12px", fontWeight: 700 }}>{r.token}</code>
            <div style={{ fontSize: "11px", color: "var(--cl-color-fg-muted)", marginTop: "4px" }}>
              {r.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ElevationShadows: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Elevation & Box Shadows
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "24px" }}>
        6 elevation layers providing spatial hierarchy for cards, popovers, dialogs, and snackbars.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        {SHADOWS.map((s) => (
          <div
            key={s.token}
            style={{
              padding: "24px",
              borderRadius: "var(--cl-radius-lg, 8px)",
              backgroundColor: "var(--cl-color-bg-surface, #ffffff)",
              border: "1px solid var(--cl-color-border-subtle, #f1f5f9)",
              boxShadow: `var(${s.token})`,
              textAlign: "center",
            }}
          >
            <code style={{ fontSize: "13px", fontWeight: 700 }}>{s.token}</code>
            <div style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)", marginTop: "6px" }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const MotionDurations: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 880,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Motion Durations & Reduced Motion
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "24px" }}>
        Timing curves designed for swift, natural UI responses with automatic <code>prefers-reduced-motion</code> compliance.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {MOTIONS.map((m) => (
          <div
            key={m.token}
            style={{
              padding: "16px 20px",
              borderRadius: "var(--cl-radius-md, 6px)",
              border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
              backgroundColor: "var(--cl-color-bg-surface, #f8fafc)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <code style={{ fontSize: "13px", fontWeight: 700 }}>{m.token}</code>
              <div style={{ fontSize: "12px", color: "var(--cl-color-fg-muted)", marginTop: "4px" }}>
                {m.desc}
              </div>
            </div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--cl-color-primary-base)" }}>
              {m.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
