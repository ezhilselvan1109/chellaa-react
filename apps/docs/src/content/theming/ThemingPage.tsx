import { Button, useTheme } from "@chellaa/react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Callout } from "../../components/Common/Callout";

export function ThemingPage() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <article className="docs-page">
      <h1 className="docs-page-title">Theming &amp; Dark Mode</h1>
      <p className="docs-page-desc">
        Chellaa React includes a battle-tested Theme Engine featuring{" "}
        <code>ThemeProvider</code>, <code>useTheme</code>, and zero-FOUC{" "}
        <code>ThemeScript</code>.
      </p>

      {/* Live Interactive Simulator */}
      <section
        style={{
          margin: "32px 0 48px 0",
          padding: "28px",
          border: "1px solid var(--docs-border)",
          borderRadius: "16px",
          backgroundColor: "var(--docs-card)",
          boxShadow: "var(--docs-shadow-md)",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.15rem" }}>
          Live Theme Controller
        </h3>
        <p
          style={{
            margin: "0 0 20px 0",
            color: "var(--docs-text-muted)",
            fontSize: "0.9rem",
          }}
        >
          Toggle the theme below to watch this documentation site and all live
          components react instantly:
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <Button
            variant={theme === "light" ? "solid" : "outline"}
            colorScheme="primary"
            startIcon={<FiSun size={15} />}
            onClick={() => setTheme("light")}
          >
            Force Light
          </Button>

          <Button
            variant={theme === "dark" ? "solid" : "outline"}
            colorScheme="primary"
            startIcon={<FiMoon size={15} />}
            onClick={() => setTheme("dark")}
          >
            Force Dark
          </Button>

          <Button
            variant={theme === "system" ? "solid" : "outline"}
            colorScheme="neutral"
            startIcon={<FiMonitor size={15} />}
            onClick={() => setTheme("system")}
          >
            Follow System ({systemTheme})
          </Button>
        </div>

        <div
          style={{
            padding: "14px 18px",
            borderRadius: "8px",
            backgroundColor: "var(--docs-surface)",
            border: "1px solid var(--docs-border)",
            display: "flex",
            gap: "24px",
            fontSize: "0.88rem",
          }}
        >
          <div>
            Current Theme:{" "}
            <strong style={{ color: "var(--docs-primary)" }}>{theme}</strong>
          </div>
          <div>
            System Preference: <strong>{systemTheme}</strong>
          </div>
        </div>
      </section>

      {/* Using useTheme */}
      <section id="use-theme" style={{ marginTop: "40px" }}>
        <h2 className="docs-heading-2">
          <span>
            Using <code>useTheme</code>
          </span>
          <a href="#use-theme" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)" }}>
          Access the current theme state and mutate it from any component in
          your application tree:
        </p>
        <CodeBlock
          code={`import { useTheme, Button } from "@chellaa/react";

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <div>
      <p>Active: {theme} (System: {systemTheme})</p>
      <Button onClick={() => setTheme("light")}>Light</Button>
      <Button onClick={() => setTheme("dark")}>Dark</Button>
      <Button onClick={() => setTheme("system")}>System</Button>
    </div>
  );
}`}
          language="tsx"
          title="ThemeSwitcher.tsx"
        />
      </section>

      {/* Preventing FOUC */}
      <section id="theme-script" style={{ marginTop: "40px" }}>
        <h2 className="docs-heading-2">
          <span>
            Preventing SSR FOUC with <code>ThemeScript</code>
          </span>
          <a href="#theme-script" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)" }}>
          In Next.js App Router or SSR frameworks, inject{" "}
          <code>ThemeScript</code> into your document <code>&lt;head&gt;</code>{" "}
          to prevent visual flash before client hydration:
        </p>
        <CodeBlock
          code={`import { ThemeScript } from "@chellaa/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="system" />
      </head>
      <body>{children}</body>
    </html>
  );
}`}
          language="tsx"
          title="app/layout.tsx"
        />
        <Callout type="tip" title="Zero-Runtime Performance">
          <code>ThemeScript</code> reads localStorage or system preference
          synchronously via inline JavaScript before the page renders,
          completely eliminating visual flash.
        </Callout>
      </section>
    </article>
  );
}
