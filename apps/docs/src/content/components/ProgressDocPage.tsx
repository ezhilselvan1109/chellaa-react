import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Progress, Box } from "@chellaa/react";

export const progressToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "determinate", title: "Determinate Progress" },
  { id: "indeterminate", title: "Indeterminate Progress" },
  { id: "circular", title: "Circular Variant" },
  { id: "colors", title: "Color Schemes" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const progressPropsData: PropRow[] = [
  {
    name: "value",
    type: "number",
    default: "undefined",
    description: "Current numeric value. If omitted, progress renders indeterminate.",
  },
  {
    name: "min",
    type: "number",
    default: "0",
    description: "Minimum scale value.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum scale value.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg"',
    default: '"md"',
    description: "Track thickness or diameter.",
  },
  {
    name: "variant",
    type: '"linear" | "circular"',
    default: '"linear"',
    description: "Visual layout shape.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "success" | "warning" | "danger"',
    default: '"primary"',
    description: "Semantic fill color.",
  },
  {
    name: "hasStripe",
    type: "boolean",
    default: "false",
    description: "Displays diagonal striping across linear bar.",
  },
  {
    name: "isAnimated",
    type: "boolean",
    default: "false",
    description: "Animates striped gradient.",
  },
  {
    name: "showValueLabel",
    type: "boolean",
    default: "false",
    description: "Renders visible text percentage.",
  },
];

const progressRoles = [
  {
    attributeOrKey: 'role="progressbar"',
    description: "Identifies the element as a progress bar to assistive technologies.",
  },
  {
    attributeOrKey: "aria-valuenow",
    description: "Current clamped value when determinate. Omitted when indeterminate.",
  },
  {
    attributeOrKey: "aria-valuemin",
    description: "Minimum scale value.",
  },
  {
    attributeOrKey: "aria-valuemax",
    description: "Maximum scale value.",
  },
];

export function ProgressDocPage() {
  return (
    <ComponentDocLayout
      title="Progress"
      description="Visual indicator displaying the completion status of a deterministic or ongoing task."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { Progress, type ProgressProps } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, width: 320 }}>
          <Progress value={65} aria-label="Task progress" showValueLabel />
        </Box>
        <CodeBlock code={`<Progress value={65} showValueLabel />`} language="tsx" />
      </section>

      <section id="indeterminate">
        <h2>Indeterminate Progress</h2>
        <Box sx={{ p: 4, width: 320, display: "flex", flexDirection: "column", gap: 3 }}>
          <Progress aria-label="Loading task" />
        </Box>
        <CodeBlock code={`<Progress aria-label="Loading task" />`} language="tsx" />
      </section>

      <section id="circular">
        <h2>Circular Variant</h2>
        <Box sx={{ p: 4, display: "flex", gap: 4, alignItems: "center" }}>
          <Progress variant="circular" value={45} showValueLabel />
          <Progress variant="circular" aria-label="Loading circular" />
        </Box>
        <CodeBlock
          code={`<Progress variant="circular" value={45} showValueLabel />
<Progress variant="circular" aria-label="Loading..." />`}
          language="tsx"
        />
      </section>

      <section id="colors">
        <h2>Color Schemes</h2>
        <Box sx={{ p: 4, width: 320, display: "flex", flexDirection: "column", gap: 3 }}>
          <Progress value={30} colorScheme="primary" />
          <Progress value={60} colorScheme="success" />
          <Progress value={75} colorScheme="warning" />
          <Progress value={90} colorScheme="danger" />
        </Box>
        <CodeBlock
          code={`<Progress value={30} colorScheme="primary" />
<Progress value={60} colorScheme="success" />
<Progress value={75} colorScheme="warning" />
<Progress value={90} colorScheme="danger" />`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Progress"
        roles={progressRoles}
        keyboardKeys={[]}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="Progress" props={progressPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
