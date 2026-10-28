import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Spinner, Box } from "@chellaa/react";

export const spinnerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "sizes", title: "Sizes" },
  { id: "colors", title: "Color Schemes" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const spinnerPropsData: PropRow[] = [
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Dimension scale of the spinner.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "neutral" | "success" | "danger" | "warning"',
    default: '"primary"',
    description: "Semantic color applied to the rotating indicator arc.",
  },
  {
    name: "label",
    type: "string",
    default: '"Loading..."',
    description: "Accessible name announced to screen readers. If empty string, spinner is marked aria-hidden.",
  },
  {
    name: "thickness",
    type: "number",
    default: "3",
    description: "Stroke width in SVG viewBox coordinates.",
  },
];

const spinnerRoles = [
  {
    attributeOrKey: 'role="status"',
    description: 'Applied when an accessible label is provided.',
  },
  {
    attributeOrKey: "aria-label",
    description: "Provides screen reader announcement text.",
  },
  {
    attributeOrKey: 'aria-hidden="true"',
    description: "Applied when label is explicitly empty for purely decorative spinners.",
  },
];

export function SpinnerDocPage() {
  return (
    <ComponentDocLayout
      title="Spinner"
      description="Indeterminate loading indicator communicating background activity and data fetching."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { Spinner, type SpinnerProps } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, display: "flex", gap: 3, alignItems: "center" }}>
          <Spinner />
        </Box>
        <CodeBlock code={`<Spinner />`} language="tsx" />
      </section>

      <section id="sizes">
        <h2>Sizes</h2>
        <Box sx={{ p: 4, display: "flex", gap: 4, alignItems: "center" }}>
          <Spinner size="xs" label="XS" />
          <Spinner size="sm" label="SM" />
          <Spinner size="md" label="MD" />
          <Spinner size="lg" label="LG" />
          <Spinner size="xl" label="XL" />
        </Box>
        <CodeBlock
          code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
          language="tsx"
        />
      </section>

      <section id="colors">
        <h2>Color Schemes</h2>
        <Box sx={{ p: 4, display: "flex", gap: 4, alignItems: "center" }}>
          <Spinner colorScheme="primary" label="Primary" />
          <Spinner colorScheme="neutral" label="Neutral" />
          <Spinner colorScheme="success" label="Success" />
          <Spinner colorScheme="danger" label="Danger" />
          <Spinner colorScheme="warning" label="Warning" />
        </Box>
        <CodeBlock
          code={`<Spinner colorScheme="primary" />
<Spinner colorScheme="neutral" />
<Spinner colorScheme="success" />
<Spinner colorScheme="danger" />
<Spinner colorScheme="warning" />`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Spinner"
        roles={spinnerRoles}
        keyboardKeys={[]}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="Spinner" props={spinnerPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
