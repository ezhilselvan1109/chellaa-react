import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Box, Heading, Text } from "@chellaa/react";

export const boxToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "polymorphism", title: "Polymorphic Tag Selection" },
  { id: "as-child", title: "Slot Composition (asChild)" },
  { id: "sx-styling", title: "Responsive Theme sx Styling" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const boxPropsData: PropRow[] = [
  {
    name: "component",
    type: "ElementType",
    default: '"div"',
    description: "Semantic HTML element or custom component to render (e.g. 'section', 'article', 'main').",
  },
  {
    name: "as",
    type: "ElementType",
    default: "undefined",
    description: "Alias for component prop for polymorphic element selection.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using the Slot primitive.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop supporting design token paths, CSS shorthands, and responsive array/object breakpoints.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS class names appended to the root element ('cl-box').",
  },
  {
    name: "style",
    type: "CSSProperties",
    default: "undefined",
    description: "Direct inline styles applied to the root element.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    description: "Content nodes to be rendered within the box container.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Semantic HTML",
    description:
      "By default, Box renders a non-semantic <div> element. Use component='section', component='article', or component='main' to provide meaningful document outline landmarks.",
  },
  {
    attributeOrKey: "Interactive Roles",
    description:
      "When using Box as an interactive surface (e.g. component='button'), ensure appropriate ARIA roles, tabindex, and keyboard event handlers are supplied, or prefer the dedicated Button component.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Presentational",
    description:
      "Non-interactive Box containers are excluded from the keyboard navigation sequence and do not receive tab focus.",
  },
];

export function BoxDocPage() {
  return (
    <ComponentDocLayout
      title="Box"
      description="Foundational polymorphic layout primitive supporting arbitrary design tokens via sx, semantic element selection, and Radix-style asChild Slot composition."
      status="stable"
      version="v0.2.0"
      storybookId="components-layout-box--docs"
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
          <span>Polymorphic Tag Selection</span>
          <a href="#polymorphism" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box component="section" sx={{ p: 2, border: "1px dashed var(--docs-border)", borderRadius: 1 }}>
            <Heading level={4}>Rendered as &lt;section&gt;</Heading>
            <Text size="sm">Inspect DOM to verify semantic section tag.</Text>
          </Box>
        </Box>
        <CodeBlock
          code={`<Box component="section" sx={{ p: 2, border: "1px dashed #ccc", borderRadius: 1 }}>
  <Heading level={4}>Rendered as &lt;section&gt;</Heading>
  <Text size="sm">Inspect DOM to verify semantic section tag.</Text>
</Box>`}
          language="tsx"
        />
      </section>

      <section id="as-child" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Slot Composition (asChild)</span>
          <a href="#as-child" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box asChild sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1, display: "inline-block" }}>
            <a href="#as-child" style={{ textDecoration: "none", color: "var(--docs-primary)", fontWeight: 500 }}>
              Rendered as an anchor element via Slot composition
            </a>
          </Box>
        </Box>
        <CodeBlock
          code={`<Box asChild sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1, display: "inline-block" }}>
  <a href="#as-child" style={{ textDecoration: "none", color: "inherit", fontWeight: 500 }}>
    Rendered as an anchor element via Slot composition
  </a>
</Box>`}
          language="tsx"
        />
      </section>

      <section id="sx-styling" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Responsive Theme sx Styling</span>
          <a href="#sx-styling" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box
            sx={{
              p: { xs: 1, sm: 2, md: 3 },
              width: { xs: "100%", sm: "80%", md: "60%" },
              bgcolor: "var(--docs-surface)",
              border: "1px solid var(--docs-border)",
              borderRadius: 2,
            }}
          >
            Responsive padding and width: scales smoothly across xs, sm, and md breakpoints.
          </Box>
        </Box>
        <CodeBlock
          code={`<Box
  sx={{
    p: { xs: 1, sm: 2, md: 3 },
    width: { xs: "100%", sm: "80%", md: "60%" },
    bgcolor: "background.paper",
    borderRadius: 2,
  }}
>
  Responsive padding and width
</Box>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Box"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Box" props={boxPropsData} />
    </ComponentDocLayout>
  );
}
