import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Box, Heading, Text } from "@chellaa/react";

export const boxToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "polymorphism", title: "Polymorphic Component Rendering" },
  { id: "sx-styling", title: "Theme sx Styling" },
  { id: "api-reference", title: "API Reference" },
];

const boxPropsData: PropRow[] = [
  {
    name: "component",
    type: "ElementType",
    default: '"div"',
    description: "Semantic HTML element or custom component to render.",
  },
  {
    name: "as",
    type: "ElementType",
    default: "undefined",
    description: "Alias for component prop.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "Dynamic Emotion styling with design token access and responsive array/object breakpoints.",
  },
];

export function BoxDocPage() {
  return (
    <ComponentDocLayout
      title="Box"
      description="Foundational polymorphic layout wrapper supporting arbitrary design token styles via sx and zero-runtime static CSS classes."
      status="stable"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Box } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", borderRadius: 1, color: "var(--docs-primary)" }}>
            Box with padding and background theme styling
          </Box>
        </Box>
        <CodeBlock
          code={`<Box sx={{ p: 2, bgcolor: "primary.subtle", borderRadius: 1 }}>
  Box with padding and background theme styling
</Box>`}
          language="tsx"
        />
      </section>

      <section id="polymorphism" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Polymorphic Component Rendering</span>
          <a href="#polymorphism" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box component="section" sx={{ p: 2, border: "1px dashed var(--docs-border)", borderRadius: 1 }}>
            <Heading level={4}>Rendered as &lt;section&gt;</Heading>
            <Text size="sm">Inspect DOM to verify semantic section tag.</Text>
          </Box>
        </Box>
        <CodeBlock
          code={`<Box component="section" sx={{ p: 2, border: "1px dashed #ccc" }}>
  <Heading level={4}>Rendered as &lt;section&gt;</Heading>
</Box>`}
          language="tsx"
        />
      </section>

      <section id="sx-styling" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Responsive sx Styling</span>
          <a href="#sx-styling" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box
            sx={{
              p: { xs: 1, sm: 2, md: 3 },
              bgcolor: "var(--docs-surface)",
              border: "1px solid var(--docs-border)",
              borderRadius: 2,
            }}
          >
            Responsive padding: 4px on xs, 8px on sm, 12px on md.
          </Box>
        </Box>
        <CodeBlock
          code={`<Box sx={{ p: { xs: 1, sm: 2, md: 3 }, bgcolor: "background.paper" }}>
  Responsive padding
</Box>`}
          language="tsx"
        />
      </section>

      <ApiTable componentName="Box" props={boxPropsData} />
    </ComponentDocLayout>
  );
}
