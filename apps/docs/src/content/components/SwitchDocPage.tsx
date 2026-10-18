import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Switch, Box, Stack } from "@chellaa/react";

export const switchToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "sizes-colors", title: "Sizes & Color Schemes" },
  { id: "label-placement", title: "Label Placement" },
  { id: "loading-state", title: "Loading State" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const switchPropsData: PropRow[] = [
  {
    name: "checked",
    type: "boolean",
    default: "undefined",
    description: "Controlled checked state boolean.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Initial checked state when uncontrolled.",
  },
  {
    name: "onChange",
    type: "(event: ChangeEvent<HTMLInputElement>) => void",
    default: "undefined",
    description: "Callback fired when toggle state changes.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "success" | "error" | "warning" | "info" | "default"',
    default: '"primary"',
    description: "Active track and thumb highlight color when switch is toggled ON.",
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
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Prevents toggling while remaining focusable.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Disables interaction and displays a micro-spinner inside the thumb.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Displays an error state outline around the switch track.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const switchA11yRoles = [
  {
    attributeOrKey: "role='switch'",
    description: "Informs assistive technologies that the control represents a two-state toggle switch.",
  },
  {
    attributeOrKey: "aria-checked='true | false'",
    description: "Reflects the current toggle state.",
  },
];

const switchKeyboardKeys = [
  {
    attributeOrKey: "Space",
    description: "Toggles the switch between ON and OFF states.",
  },
  {
    attributeOrKey: "Tab",
    description: "Moves focus to the switch control with a high-contrast focus ring.",
  },
];

export function SwitchDocPage() {
  return (
    <ComponentDocLayout
      title="Switch"
      description="Accessible toggle switch for binary on/off settings with smooth thumb transitions and micro-spinner states."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-switch--docs"
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
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Switch</code> provides a sleek toggle control for binary preferences, activating immediately upon click or keyboard interaction.
        </p>
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
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Switch supports three sizes (<code>sm</code>, <code>md</code>, <code>lg</code>) and theme color schemes.
        </p>
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

      <section id="label-placement" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Label Placement</span>
          <a href="#label-placement" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Position label text before or after the switch using <code>labelPlacement</code> (<code>start</code> or <code>end</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Switch defaultChecked labelPlacement="end">Label on End</Switch>
            <Switch defaultChecked labelPlacement="start">Label on Start</Switch>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Switch defaultChecked labelPlacement="end">Label on End</Switch>
<Switch defaultChecked labelPlacement="start">Label on Start</Switch>`}
          language="tsx"
        />
      </section>

      <section id="loading-state" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Loading State</span>
          <a href="#loading-state" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Setting <code>loading=&#123;true&#125;</code> renders a micro-spinner inside the thumb and prevents interaction during async operations.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Switch loading defaultChecked>Saving preferences...</Switch>
        </Box>
        <CodeBlock
          code={`<Switch loading defaultChecked>Saving preferences...</Switch>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Switch"
        roles={switchA11yRoles}
        keyboardKeys={switchKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Switch" props={switchPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
