import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";

export const portalToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "custom-container", title: "Custom DOM Container" },
  { id: "ssr-safety", title: "SSR & Hydration Safety" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const portalPropsData: PropRow[] = [
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    description: "Child elements to teleport outside the DOM hierarchy.",
  },
  {
    name: "container",
    type: "HTMLElement | null",
    default: "document.body",
    description: "Target DOM HTMLElement to mount children into. Defaults to document.body when omitted.",
  },
];

const portalA11yRoles = [
  {
    attributeOrKey: "DOM Order vs Focus Order",
    description: "Teleporting DOM elements changes their document placement. Always maintain accessible keyboard navigation and focus trapping for floating overlays.",
  },
  {
    attributeOrKey: "React Context Preservation",
    description: "React event bubbling and Context values cross the portal boundary seamlessly.",
  },
];

const portalKeyboardKeys = [
  {
    attributeOrKey: "Natural Keyboard Flow",
    description: "Keyboard Tab order follows DOM structure unless explicitly managed by an overlay focus trap.",
  },
];

export function PortalDocPage() {
  return (
    <ComponentDocLayout
      title="Portal"
      description="Headless primitive that renders child elements into an external DOM container outside the parent component tree while preserving React Context and event bubbling."
      status="stable"
      version="v0.2.0"
      storybookId="components-utilities-portal--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Portal } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          By default, <code>Portal</code> teleports children directly into <code>document.body</code>. This breaks free of parent <code>overflow: hidden</code> or <code>z-index</code> stacking contexts.
        </p>
        <CodeBlock
          code={`<Box sx={{ overflow: "hidden", position: "relative" }}>
  <Text>Parent container with overflow hidden.</Text>
  <Portal>
    {/* Renders at the root of document.body */}
    <div className="my-floating-menu">Teleported Content</div>
  </Portal>
</Box>`}
          language="tsx"
        />
      </section>

      <section id="custom-container" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Custom DOM Container</span>
          <a href="#custom-container" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Pass a specific DOM element via the <code>container</code> prop to mount teleports into an existing target (e.g. a dedicated drawer or modal root).
        </p>
        <CodeBlock
          code={`const targetNode = document.getElementById("custom-portal-target");

<Portal container={targetNode}>
  <div>Mounted into #custom-portal-target</div>
</Portal>`}
          language="tsx"
        />
      </section>

      <section id="ssr-safety" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>SSR & Hydration Safety</span>
          <a href="#ssr-safety" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Portal</code> waits until client-side hydration completes before creating the portal root, preventing hydration mismatch warnings in Next.js and SSR frameworks.
        </p>
      </section>

      <AccessibilitySection
        componentName="Portal"
        roles={portalA11yRoles}
        keyboardKeys={portalKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Portal" props={portalPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
