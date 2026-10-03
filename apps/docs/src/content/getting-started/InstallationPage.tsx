import { CodeBlock } from "../../components/Common/CodeBlock";
import { Callout } from "../../components/Common/Callout";

export function InstallationPage() {
  return (
    <article className="docs-page">
      <h1>Installation</h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        Add Chellaa React to your existing React project using your preferred
        package manager.
      </p>

      <section id="package-install" style={{ marginTop: "28px" }}>
        <h2 className="docs-heading-2">
          <span>1. Package Installation</span>
          <a href="#package-install" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <CodeBlock
          code="pnpm add @chellaa/react"
          language="bash"
          title="PNPM"
        />
        <CodeBlock
          code="npm install @chellaa/react"
          language="bash"
          title="NPM"
        />
        <CodeBlock
          code="yarn add @chellaa/react"
          language="bash"
          title="YARN"
        />
      </section>

      <section id="peer-dependencies" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>2. Peer Dependencies</span>
          <a href="#peer-dependencies" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>Chellaa React requires React 18 or 19 as peer dependencies:</p>
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

      <section id="zero-config" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>3. Zero-Configuration Styling Delivery</span>
          <a href="#zero-config" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Unlike legacy UI libraries, you <strong>do not</strong> need to
          manually import a global stylesheet like{" "}
          <code>import &quot;@chellaa/react/styles.css&quot;</code> in modern
          applications.
        </p>
        <p>
          Chellaa React automatically injects component-scoped stylesheets when
          components are imported.
        </p>
        <Callout type="success" title="Zero Configuration Contract">
          Your components look and behave consistently straight out of the box
          with zero bundler plugins required.
        </Callout>
      </section>
    </article>
  );
}
