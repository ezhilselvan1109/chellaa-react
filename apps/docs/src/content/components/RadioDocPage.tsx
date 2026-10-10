import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Radio, RadioGroup, Box } from "@chellaa/react";

export const radioToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "horizontal-orientation", title: "Horizontal Orientation" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const radioPropsData: PropRow[] = [
  {
    name: "value",
    type: "string | number",
    default: "undefined",
    description: "Unique value identifying this radio option.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "neutral" | "success" | "warning" | "danger"',
    default: '"primary"',
    description: "Semantic color intent for selected radio indicator.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Dimension scale of the radio indicator and label.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction on individual radio or group.",
  },
];

export function RadioDocPage() {
  return (
    <ComponentDocLayout
      title="Radio & RadioGroup"
      description="Mutually exclusive single-selection controls with roving tabindex keyboard navigation and accessible state management."
      status="stable"
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

      <section id="horizontal-orientation" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Horizontal Orientation</span>
          <a href="#horizontal-orientation" className="docs-heading-anchor">#</a>
        </h2>
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
        roles={[
          {
            attributeOrKey: "role='radiogroup'",
            description: "Applied to RadioGroup container to inform assistive technology.",
          },
          {
            attributeOrKey: "type='radio'",
            description: "Native input ensures browser focus synchronization.",
          },
        ]}
        keyboardKeys={[
          {
            attributeOrKey: "Arrow Up / Arrow Down",
            description: "Moves focus and selects adjacent radio option in vertical group.",
          },
          {
            attributeOrKey: "Arrow Left / Arrow Right",
            description: "Moves focus and selects adjacent radio option in horizontal group.",
          },
        ]}
      />

      <ApiTable componentName="Radio" props={radioPropsData} />
    </ComponentDocLayout>
  );
}
