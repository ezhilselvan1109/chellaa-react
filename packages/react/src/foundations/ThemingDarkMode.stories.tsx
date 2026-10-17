import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { Button } from "../components/Button/Button";
import { Card } from "../components/Card/Card";
import { Badge } from "../components/Badge/Badge";
import { Input } from "../components/Input/Input";

const meta: Meta = {
  title: "Foundations/Theming & Dark Mode",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chellaa React theming is powered by CSS custom properties and the data-theme attribute. The ThemeProvider manages active theme state, system preference detection, and nested theme scoping without re-rendering stylesheets.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const SideBySideComparison: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
        Light vs Dark Theme Parity
      </h2>
      <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted)", marginBottom: "28px" }}>
        Components dynamically adapt their surface, foreground, border, and focus-ring tokens based on the active theme container.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {/* Light Theme Container */}
        <ThemeProvider defaultTheme="light">
          <div
            data-theme="light"
            style={{
              padding: "24px",
              borderRadius: "var(--cl-radius-xl, 12px)",
              backgroundColor: "var(--cl-color-bg-canvas, #ffffff)",
              border: "1px solid var(--cl-color-border-subtle, #e2e8f0)",
              color: "var(--cl-color-fg-primary, #0f172a)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "16px", fontWeight: 700 }}>☀️ Light Theme</span>
              <Badge colorScheme="primary" variant="subtle">Default</Badge>
            </div>

            <Card variant="outline" style={{ marginBottom: "16px" }}>
              <Card.Header>
                <Card.Title>Account Settings</Card.Title>
                <Card.Description>Manage your workspace security and profile.</Card.Description>
              </Card.Header>
              <Card.Body>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                    Email Address
                  </label>
                  <Input defaultValue="alex@example.com" size="md" />
                </div>
              </Card.Body>
              <Card.Footer style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="solid" colorScheme="primary" size="sm">Save Changes</Button>
              </Card.Footer>
            </Card>
          </div>
        </ThemeProvider>

        {/* Dark Theme Container */}
        <ThemeProvider defaultTheme="dark">
          <div
            data-theme="dark"
            style={{
              padding: "24px",
              borderRadius: "var(--cl-radius-xl, 12px)",
              backgroundColor: "var(--cl-color-bg-canvas, #090d16)",
              border: "1px solid var(--cl-color-border-subtle, #1e293b)",
              color: "var(--cl-color-fg-primary, #f8fafc)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "16px", fontWeight: 700 }}>🌙 Dark Theme</span>
              <Badge colorScheme="secondary" variant="solid">Active</Badge>
            </div>

            <Card variant="outline" style={{ marginBottom: "16px" }}>
              <Card.Header>
                <Card.Title>Account Settings</Card.Title>
                <Card.Description>Manage your workspace security and profile.</Card.Description>
              </Card.Header>
              <Card.Body>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                    Email Address
                  </label>
                  <Input defaultValue="alex@example.com" size="md" />
                </div>
              </Card.Body>
              <Card.Footer style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="solid" colorScheme="primary" size="sm">Save Changes</Button>
              </Card.Footer>
            </Card>
          </div>
        </ThemeProvider>
      </div>
    </div>
  ),
};
