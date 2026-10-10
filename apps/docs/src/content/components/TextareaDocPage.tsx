import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Textarea, Box, Stack } from "@chellaa/react";

export const textareaToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "resizing", title: "Resize Control" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const textareaPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"outlined" | "filled" | "standard"',
    default: '"outlined"',
    description: "Visual aesthetic style of border and background.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Padding, line height, and font size scale.",
  },
  {
    name: "resize",
    type: '"none" | "vertical" | "horizontal" | "both"',
    default: '"vertical"',
    description: "Controls the CSS resize capability of the multi-line input.",
  },
  {
    name: "rows",
    type: "number",
    default: "3",
    description: "Initial visible line rows count.",
  },
  {
    name: "error",
    type: "boolean",
    default: "false",
    description: "Sets destructive error outline and aria-invalid='true'.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and dims opacity.",
  },
];

export function TextareaDocPage() {
  return (
    <ComponentDocLayout
      title="Textarea"
      description="Multi-line accessible text input with auto-wrap, configurable resize constraints, and validation styling."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Textarea } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Textarea placeholder="Write your notes here..." rows={4} />
        </Box>
        <CodeBlock
          code={`<Textarea placeholder="Write your notes here..." rows={4} />`}
          language="tsx"
        />
      </section>

      <section id="resizing" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Resize Control</span>
          <a href="#resizing" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Textarea resize="none" placeholder="Fixed size (resize='none')" rows={2} />
            <Textarea resize="vertical" placeholder="Vertical only (resize='vertical')" rows={2} />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Textarea resize="none" placeholder="Fixed size" rows={2} />
<Textarea resize="vertical" placeholder="Vertical only" rows={2} />`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Textarea"
        roles={[
          {
            attributeOrKey: "aria-invalid='true'",
            description: "Applied automatically when error is present.",
          },
          {
            attributeOrKey: "aria-describedby",
            description: "Links textarea to error or helper text.",
          },
        ]}
        keyboardKeys={[
          {
            attributeOrKey: "Tab",
            description: "Focuses the textarea control with clear outline indicator.",
          },
        ]}
      />

      <ApiTable componentName="Textarea" props={textareaPropsData} />
    </ComponentDocLayout>
  );
}
