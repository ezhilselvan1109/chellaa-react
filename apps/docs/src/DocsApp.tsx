import * as React from "react";
import { Button, ButtonGroup, ThemeProvider, useTheme } from "@chellaa/react";
import "./DocsApp.css";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}

export function DocsApp() {
  const [activeSection, setActiveSection] = React.useState("button");

  return (
    <ThemeProvider defaultTheme="light">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              Chellaa React
            </span>
            <ThemeToggle />
          </div>

          <div className="docs-nav-group">
            <div className="docs-nav-title">Overview</div>
            <a
              href="#getting-started"
              className="docs-nav-link"
              onClick={() => setActiveSection("getting-started")}
            >
              Getting Started
            </a>
            <a
              href="#theming"
              className="docs-nav-link"
              onClick={() => setActiveSection("theming")}
            >
              Theming & Tokens
            </a>
          </div>

          <div className="docs-nav-group">
            <div className="docs-nav-title">Components</div>
            <a
              href="#button"
              className={`docs-nav-link ${activeSection === "button" ? "active" : ""}`}
              onClick={() => setActiveSection("button")}
            >
              Button
            </a>
            <a
              href="#button-group"
              className={`docs-nav-link ${activeSection === "button-group" ? "active" : ""}`}
              onClick={() => setActiveSection("button-group")}
            >
              ButtonGroup
            </a>
          </div>
        </aside>

        <main className="docs-content">
          <section id="getting-started" style={{ marginBottom: "48px" }}>
            <h1>Chellaa React Documentation</h1>
            <p>
              Chellaa React is a production-grade, accessible React component
              library built with zero-runtime CSS custom properties.
            </p>

            <h2>Installation</h2>
            <pre className="docs-code-block">
              <code>pnpm add @chellaa/react</code>
            </pre>
            <p>
              Chellaa React features <strong>Zero-Configuration Styling</strong>
              . Importing components delivers styles automatically without
              requiring manual stylesheet imports in modern bundlers.
            </p>
          </section>

          <section id="button" style={{ marginBottom: "64px" }}>
            <h1>Button</h1>
            <p>
              The <code>Button</code> component is the primary interactive
              element used to trigger actions, submit forms, and open modals.
            </p>

            <h2>Live Interactive Example</h2>
            <div className="docs-preview">
              <Button variant="solid" colorScheme="primary">
                Primary
              </Button>
              <Button variant="outline" colorScheme="primary">
                Outline
              </Button>
              <Button variant="ghost" colorScheme="primary">
                Ghost
              </Button>
              <Button variant="subtle" colorScheme="primary">
                Subtle
              </Button>
              <Button variant="link" colorScheme="primary">
                Link
              </Button>
            </div>

            <pre className="docs-code-block">
              <code>{`import { Button } from "@chellaa/react";

export function Example() {
  return (
    <>
      <Button variant="solid">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="link">Link</Button>
    </>
  );
}`}</code>
            </pre>

            <h2>Sizes Scale</h2>
            <p>
              Mapped to the 4px/8px spatial baseline grid with 1:1 optical
              matching to form inputs.
            </p>
            <div className="docs-preview">
              <Button size="xs">Extra Small (28px)</Button>
              <Button size="sm">Small (32px)</Button>
              <Button size="md">Medium (40px)</Button>
              <Button size="lg">Large (48px)</Button>
              <Button size="xl">Extra Large (56px)</Button>
            </div>

            <h2>Loading States</h2>
            <div className="docs-preview">
              <Button isLoading loadingPosition="start">
                Loading Start
              </Button>
              <Button isLoading loadingPosition="end">
                Loading End
              </Button>
              <Button isLoading loadingPosition="center">
                Loading Center
              </Button>
              <Button isLoading loadingText="Saving...">
                Custom Text
              </Button>
            </div>

            <h2>
              Polymorphic Slot Delegation (<code>asChild</code>)
            </h2>
            <p>
              Use <code>asChild</code> to delegate rendering to Next.js or React
              Router links without redundant DOM wrappers.
            </p>
            <div className="docs-preview">
              <Button asChild variant="outline">
                <a href="https://chellaa.dev" target="_blank" rel="noreferrer">
                  External Anchor Link ↗
                </a>
              </Button>
            </div>

            <h2>Props Reference</h2>
            <table className="docs-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>variant</code>
                  </td>
                  <td>
                    <code>
                      "solid" | "outline" | "ghost" | "subtle" | "link"
                    </code>
                  </td>
                  <td>
                    <code>"solid"</code>
                  </td>
                  <td>Visual aesthetic treatment.</td>
                </tr>
                <tr>
                  <td>
                    <code>size</code>
                  </td>
                  <td>
                    <code>"xs" | "sm" | "md" | "lg" | "xl"</code>
                  </td>
                  <td>
                    <code>"md"</code>
                  </td>
                  <td>Spatial height and padding scale.</td>
                </tr>
                <tr>
                  <td>
                    <code>colorScheme</code>
                  </td>
                  <td>
                    <code>
                      "primary" | "secondary" | "neutral" | "success" |
                      "warning" | "danger" | "info"
                    </code>
                  </td>
                  <td>
                    <code>"primary"</code>
                  </td>
                  <td>Semantic color intent.</td>
                </tr>
                <tr>
                  <td>
                    <code>isDisabled</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>
                    Prevents user interaction and attaches native{" "}
                    <code>disabled</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>isLoading</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>
                    Renders SVG spinner, sets <code>aria-busy="true"</code>, and
                    blocks clicks.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>startIcon</code>
                  </td>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>
                    Leading icon slot with <code>aria-hidden="true"</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>endIcon</code>
                  </td>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>
                    Trailing icon slot with <code>aria-hidden="true"</code>.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>asChild</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>
                    Enables Radix-style <code>Slot</code> delegation.
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="button-group" style={{ marginBottom: "64px" }}>
            <h1>ButtonGroup</h1>
            <p>
              Groups related buttons with shared borders, unified sizing, and
              context propagation.
            </p>

            <h2>Attached Group</h2>
            <div className="docs-preview">
              <ButtonGroup isAttached variant="outline" colorScheme="primary">
                <Button>Day</Button>
                <Button>Week</Button>
                <Button>Month</Button>
                <Button>Year</Button>
              </ButtonGroup>
            </div>

            <pre className="docs-code-block">
              <code>{`<ButtonGroup isAttached variant="outline" colorScheme="primary">
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
  <Button>Year</Button>
</ButtonGroup>`}</code>
            </pre>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
