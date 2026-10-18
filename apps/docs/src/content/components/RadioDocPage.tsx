import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Radio, RadioGroup, Box, Stack } from "@chellaa/react";

export const radioToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "colors-sizes", title: "Color Schemes & Sizes" },
  { id: "horizontal-orientation", title: "Horizontal Orientation" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const radioPropsData: PropRow[] = [
  {
    name: "value",
    type: "string | number",
    default: "undefined",
    description: "Unique value identifying this radio option within the group.",
  },
  {
    name: "checked",
    type: "boolean",
    default: "undefined",
    description: "Controlled checked state boolean when used independently.",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Initial checked state when uncontrolled.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "success" | "error" | "warning" | "info" | "default"',
    default: '"primary"',
    description: "Semantic color intent for selected radio indicator circle.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Dimension scale of the radio indicator and label text.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction on individual radio or group.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Prevents toggling while remaining focusable.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Marks radio as required for form submission.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Applies error state outline to the radio circle.",
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

const radioGroupPropsData: PropRow[] = [
  {
    name: "value",
    type: "string | number",
    default: "undefined",
    description: "Controlled selected value of the radio group.",
  },
  {
    name: "defaultValue",
    type: "string | number",
    default: "undefined",
    description: "Initial selected value when uncontrolled.",
  },
  {
    name: "onChange",
    type: "(value: string | number) => void",
    default: "undefined",
    description: "Callback fired when group selection changes.",
  },
  {
    name: "name",
    type: "string",
    default: "auto-generated",
    description: "Name attribute cascaded down to all child radio inputs.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Layout direction of the radio options.",
  },
  {
    name: "spacing",
    type: "number | string",
    default: "2",
    description: "Spacing between radio options in the group.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size scale cascaded to all child radio buttons.",
  },
  {
    name: "colorScheme",
    type: "RadioColorScheme",
    default: '"primary"',
    description: "Color scheme cascaded to all child radio buttons.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables all radio options in the group.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Applies error state to all radio options in the group.",
  },
];

const radioA11yRoles = [
  {
    attributeOrKey: "role='radiogroup'",
    description: "Applied to RadioGroup container to inform assistive technology of the exclusive selection set.",
  },
  {
    attributeOrKey: "type='radio'",
    description: "Native input ensures browser focus synchronization and keyboard roving tabindex.",
  },
];

const radioKeyboardKeys = [
  {
    attributeOrKey: "Arrow Down / Arrow Right",
    description: "Moves focus and selects the next radio button in the group.",
  },
  {
    attributeOrKey: "Arrow Up / Arrow Left",
    description: "Moves focus and selects the previous radio button in the group.",
  },
  {
    attributeOrKey: "Space",
    description: "Selects the currently focused radio button if not already selected.",
  },
];

export function RadioDocPage() {
  return (
    <ComponentDocLayout
      title="Radio & RadioGroup"
      description="Mutually exclusive single-selection controls with roving tabindex keyboard navigation and accessible state management."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-radio--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Radio, RadioGroup, useRadioGroup } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Group mutually exclusive options using <code>RadioGroup</code>. Only one option in the group can be selected at a time.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <RadioGroup defaultValue="hybrid">
            <Radio value="static">Pure Static CSS</Radio>
            <Radio value="hybrid">Hybrid Architecture (ADR-011)</Radio>
            <Radio value="runtime">Pure Runtime Emotion</Radio>
          </RadioGroup>
        </Box>
        <CodeBlock
          code={`<RadioGroup defaultValue="hybrid">
  <Radio value="static">Pure Static CSS</Radio>
  <Radio value="hybrid">Hybrid Architecture (ADR-011)</Radio>
  <Radio value="runtime">Pure Runtime Emotion</Radio>
</RadioGroup>`}
          language="tsx"
        />
      </section>

      <section id="colors-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Color Schemes & Sizes</span>
          <a href="#colors-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Radio buttons support multiple color schemes and three sizes (<code>sm</code>, <code>md</code>, <code>lg</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Radio size="sm" defaultChecked colorScheme="primary" value="sm">
              Small (sm)
            </Radio>
            <Radio size="md" defaultChecked colorScheme="success" value="md">
              Medium Success (md)
            </Radio>
            <Radio size="lg" defaultChecked colorScheme="secondary" value="lg">
              Large Secondary (lg)
            </Radio>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Radio size="sm" defaultChecked colorScheme="primary" value="sm">Small (sm)</Radio>
<Radio size="md" defaultChecked colorScheme="success" value="md">Medium Success (md)</Radio>
<Radio size="lg" defaultChecked colorScheme="secondary" value="lg">Large Secondary (lg)</Radio>`}
          language="tsx"
        />
      </section>

      <section id="horizontal-orientation" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Horizontal Orientation</span>
          <a href="#horizontal-orientation" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Set <code>orientation="horizontal"</code> on <code>RadioGroup</code> to lay out options inline.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <RadioGroup defaultValue="sm" orientation="horizontal">
            <Radio value="sm">Small</Radio>
            <Radio value="md">Medium</Radio>
            <Radio value="lg">Large</Radio>
          </RadioGroup>
        </Box>
        <CodeBlock
          code={`<RadioGroup defaultValue="sm" orientation="horizontal">
  <Radio value="sm">Small</Radio>
  <Radio value="md">Medium</Radio>
  <Radio value="lg">Large</Radio>
</RadioGroup>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Radio"
        roles={radioA11yRoles}
        keyboardKeys={radioKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Radio" props={radioPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="RadioGroup" props={radioGroupPropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
