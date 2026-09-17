import React from "react";
import { CodeBlock } from "../components/CodeBlock";

export const InstallationPage: React.FC = () => {
  return (
    <article className="docs-content">
      <h1 className="docs-title">Installation</h1>
      <p className="docs-description">
        Install Chella UI into your React application in seconds.
      </p>

      <h2 className="docs-section-heading">Package Installation</h2>
      <p className="docs-p">Install the core package using your preferred package manager:</p>
      <CodeBlock code="npm install @chella-ui/react" language="bash" />

      <h2 className="docs-section-heading">Usage (Zero CSS Imports Required!)</h2>
      <p className="docs-p">
        Unlike older UI libraries, <strong>Chella UI components own their own styling</strong> (inspired by Ant Design v5).
        When you import and render a component, its styles and design tokens are automatically injected into <code>document.head</code> on demand.
        You do <strong>NOT</strong> need to manually import any CSS files!
      </p>

      <h2 className="docs-section-heading">Quick Start Example</h2>
      <p className="docs-p">
        Simply import components and use them directly:
      </p>
      <CodeBlock
        code={`import React from "react";
import ReactDOM from "react-dom/client";
import { Button, ChellaProvider } from "@chella-ui/react";

function App() {
  return (
    <ChellaProvider defaultTheme="system">
      <Button variant="primary" onClick={() => alert("Action triggered!")}>
        Get Started
      </Button>
    </ChellaProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}
      />

      <h2 className="docs-section-heading">Optional: Static CSS for SSR</h2>
      <p className="docs-p">
        For advanced SSR frameworks where you prefer static stylesheet links, the compiled stylesheet is also available at <code>@chella-ui/react/styles.css</code>:
      </p>
      <CodeBlock code='import "@chella-ui/react/styles.css";' language="tsx" />
    </article>
  );
};
