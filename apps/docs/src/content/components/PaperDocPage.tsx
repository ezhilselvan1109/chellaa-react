import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Paper, Flex, Box, Text } from "@chellaa/react";

export const paperToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "elevations", title: "Elevation Shadows" },
  { id: "variants", title: "Variants & Shapes" },
  { id: "api-reference", title: "API Reference" },
];

const paperPropsData: PropRow[] = [
  {
    name: "elevation",
    type: "0 | 1 | 2 | 3 | 4 | 5",
    default: "1",
    description: "Shadow depth token mapped to theme design tokens.",
  },
  {
    name: "variant",
    type: '"elevation" | "outlined"',
    default: '"elevation"',
    description: "Visual style: elevated box shadow or 1px subtle border.",
  },
  {
    name: "square",
    type: "boolean",
    default: "false",
    description: "Removes default border-radius for seamless flush edges.",
  },
  {
    name: "component",
    type: "ElementType",
    default: '"div"',
    description: "Underlying HTML element to render.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop for custom theme overrides.",
  },
];

export function PaperDocPage() {
  return (
    <ComponentDocLayout
      title="Paper"
      description="Fundamental surface container implementing standardized theme elevation shadows, background colors, and border radii."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Paper } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Text variant="subtitle1">Default Elevated Paper (Elevation 1)</Text>
          </Paper>
        </Box>
        <CodeBlock
          code={`<Paper elevation={1} sx={{ p: 3 }}>
  <Text variant="subtitle1">Default Elevated Paper (Elevation 1)</Text>
</Paper>`}
          language="tsx"
        />
      </section>

      <section id="elevations" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Elevation Shadows</span>
          <a href="#elevations" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={2} sx={{ flexWrap: "wrap" }}>
            {[0, 1, 2, 3, 4, 5].map((lvl) => (
              <Paper key={lvl} elevation={lvl as 0 | 1 | 2 | 3 | 4 | 5} sx={{ p: 2, minWidth: 100, textAlign: "center" }}>
                <Text size="sm">Elev {lvl}</Text>
              </Paper>
            ))}
          </Flex>
        </Box>
        <CodeBlock
          code={`<Paper elevation={0}>Flat (0)</Paper>
<Paper elevation={1}>Subtle (1)</Paper>
<Paper elevation={2}>Card (2)</Paper>
<Paper elevation={3}>Dropdown (3)</Paper>
<Paper elevation={4}>Modal (4)</Paper>
<Paper elevation={5}>Popout (5)</Paper>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Variants & Shapes</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={3}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Text size="sm">Outlined Paper</Text>
            </Paper>
            <Paper square elevation={2} sx={{ p: 2 }}>
              <Text size="sm">Square Corners</Text>
            </Paper>
          </Flex>
        </Box>
        <CodeBlock
          code={`<Paper variant="outlined">Outlined Paper</Paper>
<Paper square elevation={2}>Square Corners</Paper>`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Paper" props={paperPropsData} />
    </ComponentDocLayout>
  );
}
