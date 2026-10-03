import { CodeBlock } from "../../components/Common/CodeBlock";
import { Callout } from "../../components/Common/Callout";

export function ThemingPage() {
  return (
    <article className="docs-page">
      <h1>Theming & Dark Mode</h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        Chellaa React includes a battle-tested Theme Engine featuring{" "}
        <code>ThemeProvider</code>, <code>useTheme</code>, and zero-FOUC{" "}
        <code>ThemeScript</code>.
      </p>

      <section style={{ marginTop: "28px" }}>
        <h2>
          Using <code>useTheme</code>
        </h2>
        <p>Access the current theme state and mutate it from any component:</p>
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

      <section style={{ marginTop: "32px" }}>
        <h2>
          Preventing SSR FOUC with <code>ThemeScript</code>
        </h2>
        <p>
          In Next.js or SSR frameworks, inject <code>ThemeScript</code> into
          your document <code>&lt;head&gt;</code> to prevent flash of wrong
          theme before hydration:
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
