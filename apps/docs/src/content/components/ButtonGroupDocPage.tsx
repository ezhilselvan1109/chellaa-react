import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { ButtonGroupBasicExample } from "../../examples/button-group/ButtonGroupBasicExample";
import { ButtonGroupVerticalExample } from "../../examples/button-group/ButtonGroupVerticalExample";

export const buttonGroupToc = [
  { id: "import", title: "Import" },
  { id: "attached", title: "Attached Group" },
  { id: "vertical", title: "Vertical & Overrides" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const buttonGroupPropsData: PropRow[] = [
  {
    name: "isAttached",
    type: "boolean",
    default: "false",
    description:
      "Flattens interior borders to produce an attached, segmented control appearance.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of grouped child buttons.",
  },
  {
    name: "spacing",
    type: "string | number",
    default: "undefined",
    description: "Custom gap between buttons when isAttached is false.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description:
      "Propagates spatial size down to all descendant buttons via React Context.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost" | "subtle" | "link"',
    default: '"solid"',
    description:
      "Propagates visual variant down to all descendant buttons via React Context.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info"',
    default: '"primary"',
    description:
      "Propagates semantic color scheme down to all descendant buttons via React Context.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables all buttons within the group simultaneously.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates group container rendering to child slot element.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "role='group'",
    description:
      "Applied on the container to signal a grouping of related controls to screen readers.",
  },
  {
    attributeOrKey: "aria-label",
    description:
      "Recommended on <ButtonGroup> to describe the group's purpose (e.g. 'View mode').",
  },
];

const keyboardKeys = [
  {
    attributeOrKey: "Tab / Shift+Tab",
    description: "Navigates between individual buttons inside the group.",
  },
];

export function ButtonGroupDocPage() {
  return (
    <ComponentDocLayout
      title="ButtonGroup"
      description="ButtonGroup wraps and manages a collection of related Button components, providing unified spacing, attached borders, and Context-driven prop propagation."
      status="stable"
      version="v0.1.0"
      storybookId="components-buttongroup--default"
    >
      <section id="import" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <CodeBlock
          code='import { Button, ButtonGroup } from "@chellaa/react";'
          language="tsx"
        />
      </section>

      <section id="attached" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Attached Segmented Control</span>
          <a href="#attached" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Pass <code>isAttached</code> to merge adjacent buttons into a seamless
          toolbar or segmented controller.
        </p>
        <ButtonGroupBasicExample />
      </section>

      <section id="vertical" style={{ marginBottom: "40px" }}>
        <h2 className="docs-heading-2">
          <span>Vertical Orientation & Child Overrides</span>
          <a href="#vertical" className="docs-heading-anchor">
            #
          </a>
        </h2>
        <p>
          Configure <code>orientation=&quot;vertical&quot;</code> to stack
          buttons vertically. Individual buttons can override group context
          props.
        </p>
        <ButtonGroupVerticalExample />
      </section>

      <AccessibilitySection
        componentName="ButtonGroup"
        roles={a11yRoles}
        keyboardKeys={keyboardKeys}
      />

      <ApiTable componentName="ButtonGroup" props={buttonGroupPropsData} />
    </ComponentDocLayout>
  );
}
