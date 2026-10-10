import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Switch, Box, Stack } from "@chellaa/react";

export const switchToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "sizes-colors", title: "Sizes & Color Schemes" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const switchPropsData: PropRow[] = [
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "neutral" | "success" | "warning" | "danger"',
    default: '"primary"',
    description: "Active track color when switch is toggled ON.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Track and thumb dimensions.",
  },
  {
    name: "labelPlacement",
    type: '"start" | "end" | "top" | "bottom"',
    default: '"end"',
    description: "Placement of label text relative to the switch track.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims track opacity.",
  },
];

export function SwitchDocPage() {
  return (
    <ComponentDocLayout
      title="Switch"
      description="Accessible toggle switch for binary on/off settings with smooth thumb transitions."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Switch } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Switch defaultChecked colorScheme="primary">
            Enable email notifications
          </Switch>
        </Box>
        <CodeBlock
          code={`<Switch defaultChecked colorScheme="primary">
  Enable email notifications
</Switch>`}
          language="tsx"
        />
      </section>

      <section id="sizes-colors" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Sizes & Color Schemes</span>
          <a href="#sizes-colors" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Switch size="sm" defaultChecked colorScheme="primary">Small Primary</Switch>
            <Switch size="md" defaultChecked colorScheme="success">Medium Success</Switch>
            <Switch size="lg" defaultChecked colorScheme="secondary">Large Secondary</Switch>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Switch size="sm" defaultChecked colorScheme="primary">Small Primary</Switch>
<Switch size="md" defaultChecked colorScheme="success">Medium Success</Switch>
<Switch size="lg" defaultChecked colorScheme="secondary">Large Secondary</Switch>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Switch"
        roles={[
          {
            attributeOrKey: "role='switch'",
            description: "Indicates to assistive technology that this control represents a toggle switch.",
          },
          {
            attributeOrKey: "aria-checked='true | false'",
            description: "Reflects the current toggle state.",
          },
        ]}
        keyboardKeys={[
          {
            attributeOrKey: "Space",
            description: "Toggles switch state between ON and OFF.",
          },
        ]}
      />

      <ApiTable componentName="Switch" props={switchPropsData} />
    </ComponentDocLayout>
  );
}
