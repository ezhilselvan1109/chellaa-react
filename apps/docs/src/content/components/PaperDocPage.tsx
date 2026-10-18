import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Paper, Flex, Box, Text } from "@chellaa/react";

export const paperToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "elevations", title: "24-Level Elevation Shadows" },
  { id: "variants", title: "Variants & Shapes" },
  { id: "as-child", title: "Slot Composition (asChild)" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const paperPropsData: PropRow[] = [
  {
    name: "elevation",
    type: "number (0..24)",
    default: "1",
    description: "Material shadow depth level mapped to design system elevation tokens.",
  },
  {
    name: "variant",
    type: '"elevation" | "outlined"',
    default: '"elevation"',
    description: "Visual style: elevated box shadow or 1px subtle divider border.",
  },
  {
    name: "square",
    type: "boolean",
    default: "false",
    description: "Removes default border-radius for seamless flush edges.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using the Slot primitive.",
  },
  {
    name: "component",
    type: "ElementType",
    default: '"div"',
    description: "Semantic HTML element to render (e.g. 'article', 'section', 'div').",
  },
  {
    name: "as",
    type: "ElementType",
    default: "undefined",
    description: "Alias for the component prop for polymorphic element selection.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop for custom theme overrides.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    description: "Content nodes to be rendered within the paper surface.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Surface Contrast",
    description:
      "Paper surfaces automatically adjust background tint in dark mode via theme elevation tokens to maintain WCAG 2.2 AA text contrast against elevated surfaces.",
  },
  {
    attributeOrKey: "Semantic Tags",
    description:
      "Use component='article' or component='section' when Paper contains self-contained syndicatable or grouped content.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Presentational Surface",
    description:
      "Paper elevation surfaces are structural containers and do not receive keyboard tab focus.",
  },
];

export function PaperDocPage() {
  return (
    <ComponentDocLayout
      title="Paper"
      description="Fundamental surface container implementing standardized theme elevation shadows, background colors, and border radii."
      status="stable"
      version="v0.2.0"
      storybookId="components-layout-paper--docs"
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
          <span>24-Level Elevation Shadows</span>
          <a href="#elevations" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Flex gap={2} sx={{ flexWrap: "wrap" }}>
            {[0, 1, 2, 4, 8, 16, 24].map((lvl) => (
              <Paper key={lvl} elevation={lvl} sx={{ p: 2, minWidth: 100, textAlign: "center" }}>
                <Text size="sm">Elev {lvl}</Text>
              </Paper>
            ))}
          </Flex>
        </Box>
        <CodeBlock
          code={`<Paper elevation={0}>Flat (0)</Paper>
<Paper elevation={1}>Default (1)</Paper>
<Paper elevation={2}>Card (2)</Paper>
<Paper elevation={4}>Dropdown (4)</Paper>
<Paper elevation={8}>Modal (8)</Paper>
<Paper elevation={16}>Nav Drawer (16)</Paper>
<Paper elevation={24}>Floating Dialog (24)</Paper>`}
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

      <section id="as-child" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Slot Composition (asChild)</span>
          <a href="#as-child" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Paper asChild elevation={3} sx={{ p: 3 }}>
            <article>
              <Text variant="subtitle1" sx={{ fontWeight: 600 }}>Composed Semantic &lt;article&gt;</Text>
              <Text size="sm" color="text.secondary">
                Paper styling and elevation shadow merged onto native article element via Slot.
              </Text>
            </article>
          </Paper>
        </Box>
        <CodeBlock
          code={`<Paper asChild elevation={3} sx={{ p: 3 }}>
  <article>
    <Text variant="subtitle1">Composed Semantic Article</Text>
  </article>
</Paper>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Paper"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Paper" props={paperPropsData} />
    </ComponentDocLayout>
  );
}
