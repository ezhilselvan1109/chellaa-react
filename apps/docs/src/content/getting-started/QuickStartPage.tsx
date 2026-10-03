import { CodeBlock } from "../../components/Common/CodeBlock";
import { Button } from "@chellaa/react";

export function QuickStartPage() {
  return (
    <article className="docs-page">
      <h1>Quick Start</h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        Get up and running with Chellaa React in under 2 minutes.
      </p>

      <section style={{ marginTop: "28px" }}>
        <h2>1. Wrap with ThemeProvider</h2>
        <p>
          Wrap your root component with <code>ThemeProvider</code> to enable
          automatic theme switching and token propagation:
        </p>
        <CodeBlock
          code={`import * as React from "react";
import { ThemeProvider } from "@chellaa/react";
import { App } from "./App";

export function Root() {
  return (
    <ThemeProvider defaultTheme="system">
      <App />
    </ThemeProvider>
  );
}`}
          language="tsx"
          title="main.tsx / layout.tsx"
        />
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>2. Import and Render Components</h2>
        <p>
          Import any component directly from <code>@chellaa/react</code>:
        </p>
        <CodeBlock
          code={`import { Button, ButtonGroup } from "@chellaa/react";

export function Dashboard() {
  return (
    <div>
      <h1>Welcome back!</h1>
      <ButtonGroup isAttached variant="outline" colorScheme="primary">
        <Button>Overview</Button>
        <Button>Analytics</Button>
        <Button>Settings</Button>
      </ButtonGroup>
    </div>
  );
}`}
          language="tsx"
          title="Dashboard.tsx"
        />
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>3. Live Interactive Output</h2>
        <div
          style={{
            padding: "24px",
            border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
            borderRadius: "8px",
            margin: "16px 0",
          }}
        >
          <h3 style={{ margin: "0 0 16px 0" }}>Welcome back!</h3>
          <Button variant="solid" colorScheme="primary">
            Click Me
          </Button>
        </div>
      </section>
    </article>
  );
}
