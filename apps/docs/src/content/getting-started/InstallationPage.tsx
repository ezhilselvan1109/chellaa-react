import * as React from "react";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Callout } from "../../components/Common/Callout";

export function InstallationPage() {
  const [activeTab, setActiveTab] = React.useState<
    "pnpm" | "npm" | "yarn" | "bun"
  >("pnpm");

  const commands = {
    pnpm: "pnpm add @chellaa/react",
    npm: "npm install @chellaa/react",
    yarn: "yarn add @chellaa/react",
    bun: "bun add @chellaa/react",
  };

  return (
    <article className="docs-page">
      <h1 className="docs-page-title">Installation</h1>
      <p className="docs-page-desc">
        Install <code>@chellaa/react</code> into your existing React project
        using your package manager of choice.
      </p>

      {/* Package Manager Selector */}
      <section id="package-install" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>1. Package Installation</span>
          <a href="#package-install" className="docs-heading-anchor">
            #
          </a>
        </h2>

        <div style={{ margin: "16px 0" }}>
          {/* Tab selector */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
            {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => (
              <button
                key={pkg}
                type="button"
                onClick={() => setActiveTab(pkg)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--docs-border)",
                  backgroundColor:
                    activeTab === pkg
                      ? "var(--docs-primary-bg)"
                      : "var(--docs-surface)",
                  color:
                    activeTab === pkg
                      ? "var(--docs-primary)"
                      : "var(--docs-text-muted)",
                  fontWeight: activeTab === pkg ? 700 : 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {pkg.toUpperCase()}
              </button>
            ))}
          </div>

          <CodeBlock
            code={commands[activeTab]}
            language="bash"
            title={`${activeTab.toUpperCase()} INSTALL`}
          />
        </div>
      </section>

      {/* Peer Dependencies */}
      <section id="peer-dependencies" style={{ marginTop: "40px" }}>
        <h2 className="docs-heading-2">
          <span>2. Peer Dependencies</span>
          <a href="#peer-dependencies" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)" }}>
          Chellaa React requires React 18 or 19. If not already installed,
          ensure your project includes:
        </p>
        <CodeBlock
          code={`{
  "peerDependencies": {
    "react": "^18.3.0 || ^19.0.0",
    "react-dom": "^18.3.0 || ^19.0.0"
  }
}`}
          language="json"
          title="package.json"
        />
      </section>

      {/* Zero-Config Delivery */}
      <section id="zero-config" style={{ marginTop: "40px" }}>
        <h2 className="docs-heading-2">
          <span>3. Zero-Configuration Styling Delivery</span>
          <a href="#zero-config" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)", lineHeight: 1.6 }}>
          Unlike legacy UI libraries, you <strong>never</strong> need to
          manually import a stylesheet like{" "}
          <code>import &quot;@chellaa/react/styles.css&quot;</code> in your
          applications.
        </p>
        <p style={{ color: "var(--docs-text-muted)", lineHeight: 1.6 }}>
          Importing components delivers their required CSS automatically using{" "}
          <code>@layer cl-components</code>, avoiding stylesheet collisions and
          simplifying setup.
        </p>
        <Callout type="success" title="Zero Configuration Contract">
          Works seamlessly out of the box in Next.js App Router, Vite, Remix,
          Astro, and Create React App with zero bundler plugins required.
        </Callout>
      </section>
    </article>
  );
}
