import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Checkbox, CheckboxGroup, Box, Stack } from "@chellaa/react";

export const checkboxToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "group-management", title: "CheckboxGroup Multi-Select" },
  { id: "indeterminate", title: "Indeterminate State" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const checkboxPropsData: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    description: "Value identifier when used inside a CheckboxGroup.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "neutral" | "success" | "warning" | "danger"',
    default: '"primary"',
    description: "Semantic active background and checkmark fill color.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Checkbox box dimension and label font size scale.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Renders horizontal dash icon for partially selected lists.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and reduces opacity.",
  },
];

export function CheckboxDocPage() {
  return (
    <ComponentDocLayout
      title="Checkbox & CheckboxGroup"
      description="Accessible binary and indeterminate selection control supporting individual items and multi-select group arrays."
      status="stable"
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

      <section id="group-management" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>CheckboxGroup Multi-Select</span>
          <a href="#group-management" className="docs-heading-anchor">#</a>
        </h2>
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

      <section id="indeterminate" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Indeterminate State</span>
          <a href="#indeterminate" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Checkbox indeterminate colorScheme="primary">
              Parent Item (2 of 4 selected)
            </Checkbox>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Checkbox indeterminate colorScheme="primary">
  Parent Item (2 of 4 selected)
</Checkbox>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Checkbox"
        roles={[
          {
            attributeOrKey: "type='checkbox'",
            description: "Native checkbox input element ensures 100% assistive technology compatibility.",
          },
          {
            attributeOrKey: "aria-checked='mixed'",
            description: "Screen reader announcement when indeterminate is true.",
          },
        ]}
        keyboardKeys={[
          {
            attributeOrKey: "Space",
            description: "Toggles checked / unchecked state.",
          },
        ]}
      />

      <ApiTable componentName="Checkbox" props={checkboxPropsData} />
    </ComponentDocLayout>
  );
}
