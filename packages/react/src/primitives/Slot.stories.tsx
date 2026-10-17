import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slot } from "./Slot";

const meta: Meta<typeof Slot> = {
  title: "Components/Utilities/Slot",
  component: Slot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Slot is a headless polymorphic utility that merges parent props, classNames, styles, ref callbacks, and event handlers directly onto its immediate single child element. Powers the asChild prop pattern across Chellaa React.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slot>;

export const AsChildPattern: Story = {
  render: () => {
    return (
      <div
        style={{
          fontFamily: "var(--cl-font-sans, system-ui, sans-serif)",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <h4 style={{ margin: "0 0 8px 0" }}>1. Polymorphic Link Anchor via Slot</h4>
          <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted, #64748b)", margin: "0 0 12px 0" }}>
            The <code>Slot</code> renders an <code>&lt;a&gt;</code> element directly with parent button styling and click handlers:
          </p>
          <Slot
            className="cl-slot-demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 18px",
              backgroundColor: "var(--cl-color-primary-base, #4f46e5)",
              color: "#ffffff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
            }}
            onClick={() => alert("Slot merged onClick handler executed!")}
          >
            <a href="#changelog" target="_blank" rel="noreferrer">
              External Documentation Link ↗
            </a>
          </Slot>
        </div>

        <div style={{ padding: "16px", backgroundColor: "var(--cl-color-bg-muted, #f1f5f9)", borderRadius: "8px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--cl-color-fg-muted, #64748b)", marginBottom: "4px" }}>
            DOM INSPECTION RESULT
          </div>
          <p style={{ margin: 0, fontSize: "13px" }}>
            Notice that NO extra wrapper <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code> was created in the DOM. The props were cloned directly onto the native <code>&lt;a&gt;</code> tag.
          </p>
        </div>
      </div>
    );
  },
};
