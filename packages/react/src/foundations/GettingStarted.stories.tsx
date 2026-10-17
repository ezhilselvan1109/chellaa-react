import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Introduction/Getting Started",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Quickstart installation, stylesheet integration, ThemeProvider setup, and foundational component consumption guide for Chellaa React.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const InstallationGuide: Story = {
  render: () => (
    <div
      style={{
        fontFamily: "var(--cl-font-sans, system-ui, -apple-system, sans-serif)",
        color: "var(--cl-color-fg-primary, #0f172a)",
        maxWidth: 840,
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
        Getting Started with Chellaa React
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "var(--cl-color-fg-secondary, #475569)",
          marginBottom: "32px",
        }}
      >
        Follow these steps to install the package, import stylesheets, and mount
        the theme provider.
      </p>

      {/* Step 1 */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
          1. Install the Package
        </h2>
        <div
          style={{
            backgroundColor: "var(--cl-palette-slate-900, #0f172a)",
            color: "#f8fafc",
            padding: "16px 20px",
            borderRadius: "var(--cl-radius-md, 6px)",
            fontFamily: "var(--cl-font-mono, monospace)",
            fontSize: "14px",
          }}
        >
          pnpm add @chellaa/react
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
          2. Import Core Styles
        </h2>
        <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted, #64748b)" }}>
          Import the compiled CSS stylesheet at your application entry point
          (e.g., <code>App.tsx</code> or <code>main.tsx</code>):
        </p>
        <div
          style={{
            backgroundColor: "var(--cl-palette-slate-900, #0f172a)",
            color: "#f8fafc",
            padding: "16px 20px",
            borderRadius: "var(--cl-radius-md, 6px)",
            fontFamily: "var(--cl-font-mono, monospace)",
            fontSize: "14px",
          }}
        >
          import "@chellaa/react/styles.css";
        </div>
      </div>

      {/* Step 3 */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
          3. Wrap with ThemeProvider
        </h2>
        <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted, #64748b)" }}>
          Add the <code>ThemeProvider</code> around your root component tree to
          enable CSS variables and light/dark theme switching:
        </p>
        <pre
          style={{
            backgroundColor: "var(--cl-palette-slate-900, #0f172a)",
            color: "#f8fafc",
            padding: "16px 20px",
            borderRadius: "var(--cl-radius-md, 6px)",
            fontFamily: "var(--cl-font-mono, monospace)",
            fontSize: "13px",
            overflowX: "auto",
          }}
        >
{`import * as React from "react";
import { ThemeProvider, Button, Card, Stack } from "@chellaa/react";
import "@chellaa/react/styles.css";

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Stack spacing="4" sx={{ padding: "24px" }}>
        <Card variant="outline">
          <Card.Header>
            <Card.Title>Welcome to Chellaa React</Card.Title>
            <Card.Description>Your design system is configured.</Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button variant="solid" colorScheme="primary">
              Get Started
            </Button>
          </Card.Footer>
        </Card>
      </Stack>
    </ThemeProvider>
  );
}`}
        </pre>
      </div>

      {/* Step 4 */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
          4. SSR & Zero-FOUC Configuration
        </h2>
        <p style={{ fontSize: "14px", color: "var(--cl-color-fg-muted, #64748b)" }}>
          For Next.js, Remix, or SSR environments, render <code>ThemeScript</code>{" "}
          inside your document <code>&lt;head&gt;</code> to prevent color flash
          on page load:
        </p>
        <div
          style={{
            backgroundColor: "var(--cl-palette-slate-900, #0f172a)",
            color: "#f8fafc",
            padding: "16px 20px",
            borderRadius: "var(--cl-radius-md, 6px)",
            fontFamily: "var(--cl-font-mono, monospace)",
            fontSize: "14px",
          }}
        >
          {`<head>
  <ThemeScript storageKey="cl-theme" defaultTheme="system" />
</head>`}
        </div>
      </div>
    </div>
  ),
};
