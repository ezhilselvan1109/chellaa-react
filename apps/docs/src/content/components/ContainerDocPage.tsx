import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Container, Box, Text } from "@chellaa/react";

export const containerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "max-width", title: "Max-Width Constraints" },
  { id: "fixed-gutters", title: "Fixed Width & Gutters" },
  { id: "api-reference", title: "API Reference" },
];

const containerPropsData: PropRow[] = [
  {
    name: "maxWidth",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
    default: '"lg"',
    description: "Determines the maximum horizontal width constraint mapped to breakpoint tokens.",
  },
  {
    name: "fixed",
    type: "boolean",
    default: "false",
    description: "Locks the max-width to the current viewport breakpoint instead of fluid scaling.",
  },
  {
    name: "disableGutters",
    type: "boolean",
    default: "false",
    description: "Removes left and right padding gutters.",
  },
  {
    name: "component",
    type: "ElementType",
    default: '"div"',
    description: "Semantic HTML element to render (e.g. 'main', 'section').",
  },
];

export function ContainerDocPage() {
  return (
    <ComponentDocLayout
      title="Container"
      description="Centers your content horizontally and constrains it to standardized breakpoint dimensions."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Container } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Container maxWidth="sm">
            <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", textAlign: "center", borderRadius: 1 }}>
              <Text size="sm">Container maxWidth=&quot;sm&quot; (640px)</Text>
            </Box>
          </Container>
        </Box>
        <CodeBlock
          code={`<Container maxWidth="sm">
  <Box sx={{ p: 2, textAlign: "center" }}>
    Container maxWidth="sm" (640px)
  </Box>
</Container>`}
          language="tsx"
        />
      </section>

      <section id="max-width" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Max-Width Constraints</span>
          <a href="#max-width" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Text size="sm" color="text.secondary">
            Supported sizes: <code>xs (480px)</code>, <code>sm (640px)</code>, <code>md (768px)</code>, <code>lg (1024px)</code>, <code>xl (1280px)</code>, or <code>false</code> for 100% full width.
          </Text>
        </Box>
      </section>

      <section id="fixed-gutters" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Fixed Width & Disable Gutters</span>
          <a href="#fixed-gutters" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Container fixed disableGutters maxWidth="md">
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>
              Fixed Width without side gutters
            </Box>
          </Container>
        </Box>
        <CodeBlock
          code={`<Container fixed disableGutters maxWidth="md">
  <div>Fixed Width without side gutters</div>
</Container>`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Container" props={containerPropsData} />
    </ComponentDocLayout>
  );
}
