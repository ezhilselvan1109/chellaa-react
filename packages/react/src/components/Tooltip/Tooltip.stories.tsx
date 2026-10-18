import * as React from "react";
import { Tooltip } from "./Tooltip";
import type { TooltipProps, TooltipPlacement } from "./Tooltip.types";
import { Button } from "../Button/Button";
import { ThemeProvider } from "../../theme/ThemeProvider";

export interface StoryMeta<T> {
  title: string;
  component?: React.ComponentType<T>;
  tags?: string[];
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}

export interface StoryObject<T> {
  args?: Partial<T>;
  render?: (args: T) => React.ReactNode;
}

const meta: StoryMeta<TooltipProps> = {
  title: "Components/Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    hasArrow: { control: "boolean" },
    isDisabled: { control: "boolean" },
    openDelay: { control: "number" },
    closeDelay: { control: "number" },
    offset: { control: "number" },
  },
};

export default meta;

export const Default: StoryObject<TooltipProps> = {
  render: () => (
    <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
      <Tooltip content="Save your ongoing project changes">
        <Button variant="solid" colorScheme="primary">
          Save Document
        </Button>
      </Tooltip>
    </div>
  ),
};

const PLACEMENTS: TooltipPlacement[] = [
  "top-start",
  "top",
  "top-end",
  "right-start",
  "right",
  "right-end",
  "bottom-end",
  "bottom",
  "bottom-start",
  "left-end",
  "left",
  "left-start",
];

export const Placements: StoryObject<TooltipProps> = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        padding: "64px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {PLACEMENTS.map((placement) => (
        <Tooltip
          key={placement}
          placement={placement}
          content={`Tooltip: ${placement}`}
        >
          <Button variant="outline" size="sm">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithShortcut: StoryObject<TooltipProps> = {
  render: () => (
    <div style={{ padding: "48px", display: "flex", gap: "16px", justifyContent: "center" }}>
      <Tooltip content="Quick Search" shortcut="Ctrl+K">
        <Button variant="outline">Search Commands</Button>
      </Tooltip>
      <Tooltip content="Create New File" shortcut="Ctrl+N">
        <Button variant="solid" colorScheme="secondary">New File</Button>
      </Tooltip>
    </div>
  ),
};

export const InteractiveHover: StoryObject<TooltipProps> = {
  render: () => (
    <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
      <Tooltip
        content="You can move pointer across the gap onto this tooltip without dismissal (WCAG 1.4.13)"
        openDelay={100}
        closeDelay={300}
      >
        <Button variant="subtle">Hover and Move Inside</Button>
      </Tooltip>
    </div>
  ),
};

export const WithIconButton: StoryObject<TooltipProps> = {
  render: () => (
    <div style={{ padding: "48px", display: "flex", gap: "12px", justifyContent: "center" }}>
      <Tooltip content="Delete this item">
        <button
          type="button"
          aria-label="Delete item"
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "#f8fafc",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Bookmark this page">
        <button
          type="button"
          aria-label="Bookmark page"
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "#f8fafc",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};

export const DarkTheme: StoryObject<TooltipProps> = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", padding: "48px" }}>
      <ThemeProvider defaultMode="light">
        <div style={{ padding: "24px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <h4>Light Theme</h4>
          <Tooltip content="Light mode tooltip" defaultOpen>
            <Button size="sm">Trigger Light</Button>
          </Tooltip>
        </div>
      </ThemeProvider>

      <ThemeProvider defaultMode="dark">
        <div
          style={{
            padding: "24px",
            border: "1px solid #334155",
            borderRadius: "8px",
            background: "#0f172a",
            color: "#f8fafc",
          }}
        >
          <h4>Dark Theme</h4>
          <Tooltip content="Dark mode tooltip" defaultOpen>
            <Button size="sm">Trigger Dark</Button>
          </Tooltip>
        </div>
      </ThemeProvider>
    </div>
  ),
};
