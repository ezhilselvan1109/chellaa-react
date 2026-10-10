import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Stack, Divider, Text, Box } from "@chellaa/react";

export const stackToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "direction-spacing", title: "Direction & Spacing Tokens" },
  { id: "embedded-divider", title: "Embedded Dividers" },
  { id: "api-reference", title: "API Reference" },
];

const stackPropsData: PropRow[] = [
  {
    name: "direction",
    type: '"row" | "row-reverse" | "column" | "column-reverse" | Array | Object',
    default: '"column"',
    description: "Flex direction layout flow supporting responsive breakpoints.",
  },
  {
    name: "spacing",
    type: "number | string | Array | Object",
    default: "0",
    description: "Spacing gap between child items mapped to theme spacing tokens.",
  },
  {
    name: "divider",
    type: "ReactElement",
    default: "undefined",
    description: "Custom divider element automatically injected between child nodes.",
  },
  {
    name: "wrap",
    type: '"nowrap" | "wrap" | "wrap-reverse"',
    default: '"nowrap"',
    description: "Flex wrap behavior.",
  },
];

export function StackDocPage() {
  return (
    <ComponentDocLayout
      title="Stack"
      description="Linear layout primitive managing 1-dimensional item distribution, spacing tokens, and embedded dividers."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Stack } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>Item 1</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>Item 2</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>Item 3</Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="column" spacing={2}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>`}
          language="tsx"
        />
      </section>

      <section id="direction-spacing" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Direction & Spacing Tokens</span>
          <a href="#direction-spacing" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3}>
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>Col A</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>Col B</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>Col C</Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="row" spacing={3}>
  <Box>Col A</Box>
  <Box>Col B</Box>
</Stack>`}
          language="tsx"
        />
      </section>

      <section id="embedded-divider" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Embedded Dividers</span>
          <a href="#embedded-divider" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2} divider={<Divider lineStyle="dashed" />}>
            <Text size="sm">Header Section</Text>
            <Text size="sm">Body Content</Text>
            <Text size="sm">Footer Section</Text>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="column" spacing={2} divider={<Divider lineStyle="dashed" />}>
  <Text>Header Section</Text>
  <Text>Body Content</Text>
  <Text>Footer Section</Text>
</Stack>`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Stack" props={stackPropsData} />
    </ComponentDocLayout>
  );
}
