import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Slot, Box } from "@chellaa/react";

export const slotToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "prop-merging", title: "Prop, Style & Event Merging" },
  { id: "as-child-pattern", title: "Powering asChild Across Chellaa" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const slotPropsData: PropRow[] = [
  {
    name: "children",
    type: "ReactElement",
    default: "Required (Single Child)",
    description: "The immediate single React child element to receive merged parent properties, classes, styles, and refs.",
  },
];

const slotA11yRoles = [
  {
    attributeOrKey: "Preserves Semantic HTML",
    description: "Slot renders zero extra DOM nodes, transferring parent button/link/interactive semantics directly to the child element.",
  },
  {
    attributeOrKey: "ARIA Attribute Delegation",
    description: "ARIA states (such as aria-expanded, aria-controls, aria-haspopup) are cleanly delegated onto the child target.",
  },
];

const slotKeyboardKeys = [
  {
    attributeOrKey: "Inherits Child Keymap",
    description: "Keyboard interaction depends on the underlying slotted element (e.g. <a> for links, <button> for actions).",
  },
];

export function SlotDocPage() {
  return (
    <ComponentDocLayout
      title="Slot"
      description="Headless polymorphic utility that merges parent props, classNames, styles, ref callbacks, and event handlers directly onto its immediate single child element."
      status="stable"
      version="v0.2.0"
      storybookId="components-utilities-slot--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Slot } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Slot</code> clones its immediate child element and merges parent properties, avoiding extra wrapping <code>&lt;div&gt;</code> elements in the DOM.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Slot className="custom-slotted-anchor" style={{ color: "var(--cl-color-primary-main)", fontWeight: 600 }}>
            <a href="#as-child-pattern">Slotted Link with Parent Styling</a>
          </Slot>
        </Box>
        <CodeBlock
          code={`<Slot className="custom-slotted-anchor" style={{ color: "var(--cl-color-primary-main)" }}>
  <a href="#as-child-pattern">Slotted Link with Parent Styling</a>
</Slot>`}
          language="tsx"
        />
      </section>

      <section id="prop-merging" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Prop, Style & Event Merging</span>
          <a href="#prop-merging" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          When props conflict, <code>Slot</code> intelligently merges them:
        </p>
        <ul style={{ paddingLeft: "20px", color: "var(--docs-text-muted)", lineHeight: 1.8 }}>
          <li><strong>Event Handlers:</strong> Both parent and child event handlers execute sequentially unless <code>event.defaultPrevented</code> is called.</li>
          <li><strong>CSS Classes:</strong> Class strings are joined seamlessly.</li>
          <li><strong>Styles:</strong> Inline style objects are merged cleanly with child precedence.</li>
          <li><strong>Refs:</strong> Ref forwarding assigns DOM nodes to both parent and child refs.</li>
        </ul>
      </section>

      <section id="as-child-pattern" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Powering asChild Across Chellaa</span>
          <a href="#as-child-pattern" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Every Chellaa component that supports <code>asChild</code> internally renders through <code>Slot</code>. For in-depth architectural guidance, consult the dedicated{" "}
          <a href="/guides/as-child" style={{ color: "var(--docs-primary)", textDecoration: "underline" }}>
            Polymorphism (asChild) Guide
          </a>.
        </p>
        <CodeBlock
          code={`// Button delegates rendering to Next.js or React Router Link:
<Button asChild variant="solid" colorScheme="primary">
  <a href="/dashboard">Go to Dashboard</a>
</Button>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Slot"
        roles={slotA11yRoles}
        keyboardKeys={slotKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Slot" props={slotPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
