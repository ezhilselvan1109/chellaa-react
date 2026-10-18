import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Checkbox, CheckboxGroup, Box, Stack } from "@chellaa/react";

export const checkboxToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "colors-sizes", title: "Color Schemes & Sizes" },
  { id: "indeterminate", title: "Indeterminate State" },
  { id: "group-management", title: "CheckboxGroup Multi-Select" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const checkboxPropsData: PropRow[] = [
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
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Renders horizontal dash icon for partially selected lists and sets aria-checked='mixed'.",
  },
  {
    name: "onChange",
    type: "(event: ChangeEvent<HTMLInputElement>) => void",
    default: "undefined",
    description: "Callback fired when checked state toggles.",
  },
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Value identifier when used inside a CheckboxGroup.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "success" | "error" | "warning" | "info" | "default"',
    default: '"primary"',
    description: "Theme palette color for the active checked background.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Checkbox dimension and label typography scale.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims opacity.",
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
    description: "Marks input as required for form submission.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Applies error border outline to the checkbox control.",
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

const checkboxGroupPropsData: PropRow[] = [
  {
    name: "value",
    type: "string[]",
    default: "undefined",
    description: "Controlled array of selected checkbox values.",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    description: "Initial selected checkbox values when uncontrolled.",
  },
  {
    name: "onChange",
    type: "(value: string[]) => void",
    default: "undefined",
    description: "Callback fired when group selection changes.",
  },
  {
    name: "name",
    type: "string",
    default: "undefined",
    description: "Form name attribute cascaded to all child checkboxes.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Flex layout direction of the child checkboxes.",
  },
  {
    name: "spacing",
    type: "number | string",
    default: "2",
    description: "Gap spacing between individual checkboxes in the group.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size scale cascaded to all child checkboxes.",
  },
  {
    name: "colorScheme",
    type: "CheckboxColorScheme",
    default: '"primary"',
    description: "Color scheme cascaded to all child checkboxes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables all child checkboxes in the group.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Marks all child checkboxes in the group as read-only.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Applies error state to all child checkboxes in the group.",
  },
];

const checkboxA11yRoles = [
  {
    attributeOrKey: "type='checkbox'",
    description: "Native input element ensuring full assistive technology and screen reader support.",
  },
  {
    attributeOrKey: "aria-checked='mixed'",
    description: "Announced automatically by screen readers when indeterminate is set to true.",
  },
  {
    attributeOrKey: "role='group'",
    description: "CheckboxGroup wraps child inputs in a semantic grouping container.",
  },
];

const checkboxKeyboardKeys = [
  {
    attributeOrKey: "Space",
    description: "Toggles checked and unchecked states when the control is focused.",
  },
  {
    attributeOrKey: "Tab",
    description: "Moves focus to the next interactive form element.",
  },
];

export function CheckboxDocPage() {
  return (
    <ComponentDocLayout
      title="Checkbox & CheckboxGroup"
      description="Accessible binary and indeterminate selection control supporting individual items and multi-select group arrays."
      status="stable"
      version="v0.2.0"
      storybookId="components-forms-inputs-checkbox--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Checkbox, CheckboxGroup, useCheckboxGroup } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Checkbox</code> wraps a native hidden input with custom-styled boxes and focus rings. Clicking the label toggles the state.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Checkbox defaultChecked colorScheme="primary">
            I accept the terms and conditions
          </Checkbox>
        </Box>
        <CodeBlock
          code={`<Checkbox defaultChecked colorScheme="primary">
  I accept the terms and conditions
</Checkbox>`}
          language="tsx"
        />
      </section>

      <section id="colors-sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Color Schemes & Sizes</span>
          <a href="#colors-sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Customize visual styling via theme <code>colorScheme</code> (primary, secondary, success, error) and <code>size</code> (sm, md, lg).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Checkbox size="sm" defaultChecked colorScheme="primary">
              Small (sm)
            </Checkbox>
            <Checkbox size="md" defaultChecked colorScheme="success">
              Medium Success (md)
            </Checkbox>
            <Checkbox size="lg" defaultChecked colorScheme="secondary">
              Large Secondary (lg)
            </Checkbox>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Checkbox size="sm" defaultChecked colorScheme="primary">Small (sm)</Checkbox>
<Checkbox size="md" defaultChecked colorScheme="success">Medium Success (md)</Checkbox>
<Checkbox size="lg" defaultChecked colorScheme="secondary">Large Secondary (lg)</Checkbox>`}
          language="tsx"
        />
      </section>

      <section id="indeterminate" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Indeterminate State</span>
          <a href="#indeterminate" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          The <code>indeterminate</code> prop renders a horizontal dash icon, indicating a parent checkbox whose children are partially selected.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Checkbox indeterminate colorScheme="primary">
              Select all options (2 of 4 selected)
            </Checkbox>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Checkbox indeterminate colorScheme="primary">
  Select all options (2 of 4 selected)
</Checkbox>`}
          language="tsx"
        />
      </section>

      <section id="group-management" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>CheckboxGroup Multi-Select</span>
          <a href="#group-management" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Use <code>CheckboxGroup</code> to coordinate array state across multiple options with automatic horizontal or vertical layout.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <CheckboxGroup defaultValue={["react", "ts"]}>
            <Checkbox value="react">React 18 / 19</Checkbox>
            <Checkbox value="ts">TypeScript 5+</Checkbox>
            <Checkbox value="lightning">LightningCSS</Checkbox>
          </CheckboxGroup>
        </Box>
        <CodeBlock
          code={`<CheckboxGroup defaultValue={["react", "ts"]}>
  <Checkbox value="react">React 18 / 19</Checkbox>
  <Checkbox value="ts">TypeScript 5+</Checkbox>
  <Checkbox value="lightning">LightningCSS</Checkbox>
</CheckboxGroup>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Checkbox"
        roles={checkboxA11yRoles}
        keyboardKeys={checkboxKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Checkbox" props={checkboxPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="CheckboxGroup" props={checkboxGroupPropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
