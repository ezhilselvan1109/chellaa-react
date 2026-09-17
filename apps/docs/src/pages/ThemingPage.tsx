import React from "react";
import { CodeBlock } from "../components/CodeBlock";

export const ThemingPage: React.FC = () => {
  return (
    <article className="docs-content">
      <h1 className="docs-title">Theming & Dark Mode</h1>
      <p className="docs-description">
        Learn how Chella UI delivers zero-runtime, instantaneous theme transitions with full SSR protection.
      </p>

      <h2 className="docs-section-heading">Theme Modes</h2>
      <p className="docs-p">Chella UI supports three modes out of the box:</p>
      <ul>
        <li><code>light</code>: Clean, modern high-contrast aesthetic.</li>
        <li><code>dark</code>: Deep slate background with elevated surfaces and luminous accents.</li>
        <li><code>system</code>: Automatically responds to the user's OS color scheme preference.</li>
      </ul>

      <h2 className="docs-section-heading">Using the useTheme Hook</h2>
      <CodeBlock
        code={`import { useTheme, Button } from "@chella-ui/react";

function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Active mode: {resolvedTheme} (preference: {theme})</p>
      <Button variant="secondary" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </div>
  );
}`}
      />

      <h2 className="docs-section-heading">SSR Anti-Flicker Protection</h2>
      <p className="docs-p">
        In SSR frameworks like Next.js or Remix, use <code>ThemeScript</code> inside your document head to prevent any flash of incorrect theme before hydration:
      </p>
      <CodeBlock
        code={`import { ThemeScript } from "@chella-ui/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}`}
      />
    </article>
  );
};
