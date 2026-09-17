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

      <h2 className="docs-section-heading">Stylesheet Setup</h2>
      <p className="docs-p">
        Import the bundled stylesheet in your application root (e.g. <code>main.tsx</code> in Vite or <code>layout.tsx</code> in Next.js App Router):
      </p>
      <CodeBlock code='import "@chella-ui/react/styles.css";' language="tsx" />

      <h2 className="docs-section-heading">Theme Provider</h2>
      <p className="docs-p">
        Wrap your application with <code>ChellaProvider</code> to enable automatic system dark mode detection and theme persistence:
      </p>
      <CodeBlock
        code={`import React from "react";
import ReactDOM from "react-dom/client";
import { ChellaProvider } from "@chella-ui/react";
import "@chella-ui/react/styles.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChellaProvider defaultTheme="system">
      <App />
    </ChellaProvider>
  </React.StrictMode>
);`}
      />
    </article>
  );
};
