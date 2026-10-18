import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Grid, Box } from "@chellaa/react";

export const gridToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic 12-Column Grid" },
  { id: "responsive-spans", title: "Responsive Breakpoint Spans" },
  { id: "nested-grid", title: "Row and Column Spacing" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const gridPropsData: PropRow[] = [
  {
    name: "container",
    type: "boolean",
    default: "false",
    description: "Declares component as a grid flexbox container.",
  },
  {
    name: "item",
    type: "boolean",
    default: "false",
    description: "Declares component as a grid child column item.",
  },
  {
    name: "columns",
    type: "number",
    default: "12",
    description: "Total number of fractional column tracks in the grid layout.",
  },
  {
    name: "spacing",
    type: "number | string | Array | Object",
    default: "0",
    description: "Gap spacing between grid columns and rows mapped to theme spacing tokens.",
  },
  {
    name: "rowSpacing",
    type: "number | string | Array | Object",
    default: "undefined",
    description: "Vertical gap spacing between rows (overrides spacing).",
  },
  {
    name: "columnSpacing",
    type: "number | string | Array | Object",
    default: "undefined",
    description: "Horizontal gap spacing between columns (overrides spacing).",
  },
  {
    name: "xs, sm, md, lg, xl",
    type: '1..12 | "auto" | boolean',
    default: "undefined",
    description: "Column span at specified responsive breakpoint. True enables auto-grow, 'auto' fits natural content width.",
  },
  {
    name: "direction",
    type: '"row" | "column" | "row-reverse" | "column-reverse" | Array | Object',
    default: '"row"',
    description: "Flex direction layout flow.",
  },
  {
    name: "wrap",
    type: '"nowrap" | "wrap" | "wrap-reverse"',
    default: '"wrap"',
    description: "Flex item wrapping behavior.",
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
    description: "Semantic HTML element to render (e.g. 'ul', 'ol', 'section').",
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
    description: "Child grid items or content nodes to be rendered.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Semantic Lists",
    description:
      "When using Grid to render card collections, use component='ul' on the container and component='li' on each grid item to preserve screen reader item count and list semantics.",
  },
  {
    attributeOrKey: "Reading Order",
    description:
      "Responsive column restructuring (e.g. stacking on mobile, expanding to 4 columns on desktop) preserves natural DOM tab order and reading order.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Structural Grid",
    description:
      "CSS Grid/Flexbox layout wrappers do not receive tab focus and do not disrupt interactive children's keyboard traversal.",
  },
];

export function GridDocPage() {
  return (
    <ComponentDocLayout
      title="Grid"
      description="Fluid 12-column responsive layout system supporting granular breakpoint spans, spacing multipliers, and zero-runtime static CSS classes."
      status="stable"
      version="v0.2.0"
      storybookId="components-layout-grid--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Grid } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic 12-Column Grid</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", textAlign: "center", borderRadius: 1 }}>
                xs=12 (Full Width)
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", textAlign: "center", borderRadius: 1 }}>
                xs=6 (Half Width)
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", textAlign: "center", borderRadius: 1 }}>
                xs=6 (Half Width)
              </Box>
            </Grid>
          </Grid>
        </Box>
        <CodeBlock
          code={`<Grid container spacing={2}>
  <Grid item xs={12}>Full Width (12)</Grid>
  <Grid item xs={6}>Half Width (6)</Grid>
  <Grid item xs={6}>Half Width (6)</Grid>
</Grid>`}
          language="tsx"
        />
      </section>

      <section id="responsive-spans" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Responsive Breakpoint Spans</span>
          <a href="#responsive-spans" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", textAlign: "center", borderRadius: 1 }}>
                xs=12, sm=6, md=4
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", textAlign: "center", borderRadius: 1 }}>
                xs=12, sm=6, md=4
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", textAlign: "center", borderRadius: 1 }}>
                xs=12, sm=12, md=4
              </Box>
            </Grid>
          </Grid>
        </Box>
        <CodeBlock
          code={`<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>Column 1</Grid>
  <Grid item xs={12} sm={6} md={4}>Column 2</Grid>
  <Grid item xs={12} sm={12} md={4}>Column 3</Grid>
</Grid>`}
          language="tsx"
        />
      </section>

      <section id="nested-grid" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Row and Column Spacing</span>
          <a href="#nested-grid" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={6}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px dashed var(--docs-border)", textAlign: "center", borderRadius: 1 }}>
                Row 1, Col 1
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px dashed var(--docs-border)", textAlign: "center", borderRadius: 1 }}>
                Row 1, Col 2
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px dashed var(--docs-border)", textAlign: "center", borderRadius: 1 }}>
                Row 2, Col 1
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px dashed var(--docs-border)", textAlign: "center", borderRadius: 1 }}>
                Row 2, Col 2
              </Box>
            </Grid>
          </Grid>
        </Box>
        <CodeBlock
          code={`<Grid container rowSpacing={3} columnSpacing={2}>
  <Grid item xs={6}>Row 1, Col 1</Grid>
  <Grid item xs={6}>Row 1, Col 2</Grid>
  <Grid item xs={6}>Row 2, Col 1</Grid>
  <Grid item xs={6}>Row 2, Col 2</Grid>
</Grid>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Grid"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Grid" props={gridPropsData} />
    </ComponentDocLayout>
  );
}
