import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Portal } from "./Portal";

const meta: Meta<typeof Portal> = {
  title: "Components/Utilities/Portal",
  component: Portal,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Portal is a headless primitive that renders children into a DOM container outside the parent component tree (default: document.body) using ReactDOM.createPortal. Preserves React Context across the portal boundary and is completely SSR and hydration safe.",
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: "React child elements to teleport outside the DOM hierarchy.",
    },
    container: {
      control: false,
      description: "Target DOM HTMLElement to mount children into. Defaults to document.body.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const TeleportToBody: Story = {
  render: () => {
    function PortalDemo() {
      const [showPortal, setShowPortal] = React.useState(false);

      return (
        <div
          style={{
            padding: "24px",
            border: "2px dashed var(--cl-color-border-subtle, #cbd5e1)",
            borderRadius: "8px",
            fontFamily: "var(--cl-font-sans, system-ui, sans-serif)",
            maxWidth: 500,
          }}
        >
          <h4 style={{ margin: "0 0 8px 0" }}>Parent Container with Overflow Hidden</h4>
          <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted, #64748b)", margin: "0 0 16px 0" }}>
            The banner below is rendered via <code>&lt;Portal&gt;</code> directly into <code>document.body</code>, breaking free of this container.
          </p>
          <button
            type="button"
            onClick={() => setShowPortal((v) => !v)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "var(--cl-color-primary-base, #4f46e5)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {showPortal ? "Dismiss Portal Banner" : "Mount Portal Banner"}
          </button>

          {showPortal && (
            <Portal>
              <div
                style={{
                  position: "fixed",
                  bottom: "24px",
                  right: "24px",
                  backgroundColor: "var(--cl-color-bg-surface, #1e293b)",
                  color: "var(--cl-color-fg-primary, #ffffff)",
                  padding: "16px 20px",
                  borderRadius: "8px",
                  boxShadow: "var(--cl-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.2))",
                  border: "1px solid var(--cl-color-border-strong, #334155)",
                  zIndex: 9999,
                  fontFamily: "var(--cl-font-sans, system-ui, sans-serif)",
                  fontSize: "14px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <span>🚀 Content teleported to <code>document.body</code></span>
                <button
                  type="button"
                  onClick={() => setShowPortal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: "16px",
                    opacity: 0.8,
                  }}
                >
                  ✕
                </button>
              </div>
            </Portal>
          )}
        </div>
      );
    }

    return <PortalDemo />;
  },
};

export const CustomContainer: Story = {
  render: () => {
    function CustomContainerDemo() {
      const containerRef = React.useRef<HTMLDivElement>(null);
      const [mounted, setMounted] = React.useState(false);

      React.useEffect(() => {
        setMounted(true);
      }, []);

      return (
        <div style={{ fontFamily: "var(--cl-font-sans, system-ui, sans-serif)", maxWidth: 500 }}>
          <div
            ref={containerRef}
            style={{
              minHeight: 120,
              padding: "16px",
              backgroundColor: "var(--cl-color-bg-muted, #f1f5f9)",
              borderRadius: "8px",
              border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
              marginBottom: "16px",
            }}
          >
            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--cl-color-fg-muted, #64748b)" }}>
              TARGET PORTAL CONTAINER REF
            </div>
          </div>

          <div style={{ padding: "16px", border: "1px solid var(--cl-color-border-subtle, #e2e8f0)", borderRadius: "8px" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
              Parent Component Node (Renders Portal into the target container above):
            </p>
            {mounted && containerRef.current && (
              <Portal container={containerRef.current}>
                <div
                  style={{
                    backgroundColor: "var(--cl-color-primary-base, #4f46e5)",
                    color: "#ffffff",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginTop: "8px",
                  }}
                >
                  ✓ Child element rendered into containerRef via Portal
                </div>
              </Portal>
            )}
          </div>
        </div>
      );
    }

    return <CustomContainerDemo />;
  },
};
