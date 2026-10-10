import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Flex, Button, Text, Box } from "@chellaa/react";

export const flexToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "center-inline", title: "Center & Inline Shorthands" },
  { id: "api-reference", title: "API Reference" },
];

const flexPropsData: PropRow[] = [
  {
    name: "center",
    type: "boolean",
    default: "false",
    description: "Shorthand setting alignItems='center' and justifyContent='center'.",
  },
  {
    name: "inline",
    type: "boolean",
    default: "false",
    description: "Renders display='inline-flex' instead of block flex.",
  },
  {
    name: "gap",
    type: "number | string | Array | Object",
    default: "0",
    description: "Gap spacing between flex items mapped to theme spacing tokens.",
  },
  {
    name: "direction",
    type: '"row" | "column" | "row-reverse" | "column-reverse" | Array | Object',
    default: '"row"',
    description: "Flex direction flow.",
  },
];

export function FlexDocPage() {
  return (
    <ComponentDocLayout
      title="Flex"
      description="Ergonomic flexbox layout component with built-in centering, inline shorthands, and tokenized gap distribution."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Flex } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={2}>
            <Button size="sm" variant="solid" colorScheme="primary">Save</Button>
            <Button size="sm" variant="outline">Cancel</Button>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex gap={2}>
  <Button size="sm">Save</Button>
  <Button size="sm" variant="outline">Cancel</Button>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="center-inline" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Center & Inline Shorthands</span>
          <a href="#center-inline" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex center gap={2} sx={{ p: 3, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>
            <Text variant="subtitle1">Perfect Center Alignment (center=true)</Text>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex center gap={2}>
  <Text>Perfect Center Alignment</Text>
</Flex>`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Flex" props={flexPropsData} />
    </ComponentDocLayout>
  );
}
