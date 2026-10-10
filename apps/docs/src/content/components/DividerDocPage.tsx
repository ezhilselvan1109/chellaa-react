import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Divider, Flex, Text, Box, Stack } from "@chellaa/react";

export const dividerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "vertical-divider", title: "Vertical Orientation" },
  { id: "labels", title: "Text Labels & Alignment" },
  { id: "variants", title: "Variants & Line Styles" },
  { id: "api-reference", title: "API Reference" },
];

const dividerPropsData: PropRow[] = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Orientation direction of the separator rule.",
  },
  {
    name: "variant",
    type: '"fullWidth" | "inset" | "middle"',
    default: '"fullWidth"',
    description: "Spatial width treatment (full width, left inset, or centered middle inset).",
  },
  {
    name: "lineStyle",
    type: '"solid" | "dashed" | "dotted"',
    default: '"solid"',
    description: "Border stroke pattern.",
  },
  {
    name: "flexItem",
    type: "boolean",
    default: "false",
    description: "Enables vertical divider to stretch to flex container height without height 0 collapse.",
  },
  {
    name: "textAlign",
    type: '"left" | "center" | "right"',
    default: '"center"',
    description: "Alignment of embedded child text label.",
  },
];

export function DividerDocPage() {
  return (
    <ComponentDocLayout
      title="Divider"
      description="Visual or semantic separator rule between content sections with support for text chips, vertical flex items, and dashed line styles."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Divider } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Text size="sm">Top content section</Text>
          <Divider sx={{ my: 2 }} />
          <Text size="sm">Bottom content section</Text>
        </Box>
        <CodeBlock
          code={`<Text>Top content section</Text>
<Divider sx={{ my: 2 }} />
<Text>Bottom content section</Text>`}
          language="tsx"
        />
      </section>

      <section id="vertical-divider" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Vertical Orientation</span>
          <a href="#vertical-divider" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex center gap={2}>
            <Text size="sm">Option A</Text>
            <Divider orientation="vertical" flexItem />
            <Text size="sm">Option B</Text>
            <Divider orientation="vertical" flexItem />
            <Text size="sm">Option C</Text>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Flex center gap={2}>
  <Text>Option A</Text>
  <Divider orientation="vertical" flexItem />
  <Text>Option B</Text>
</Flex>`}
          language="tsx"
        />
      </section>

      <section id="labels" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Text Labels & Alignment</span>
          <a href="#labels" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <Divider textAlign="center">CENTER LABEL</Divider>
            <Divider textAlign="left">LEFT LABEL</Divider>
            <Divider textAlign="right">RIGHT LABEL</Divider>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Divider textAlign="center">CENTER LABEL</Divider>
<Divider textAlign="left">LEFT LABEL</Divider>
<Divider textAlign="right">RIGHT LABEL</Divider>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Line Styles</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Divider lineStyle="dashed" />
            <Divider lineStyle="dotted" />
            <Divider variant="middle" />
          </Stack>
        </Box>
        <CodeBlock
          code={`<Divider lineStyle="dashed" />
<Divider lineStyle="dotted" />
<Divider variant="middle" />`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Divider" props={dividerPropsData} />
    </ComponentDocLayout>
  );
}
