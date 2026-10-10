import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Grid, Box } from "@chellaa/react";

export const gridToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic 12-Column Grid" },
  { id: "responsive-spans", title: "Responsive Breakpoint Spans" },
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
    name: "spacing",
    type: "number | string | Array | Object",
    default: "0",
    description: "Gap spacing between grid columns mapped to theme spacing tokens.",
  },
  {
    name: "xs, sm, md, lg, xl",
    type: '1..12 | "auto" | boolean',
    default: "undefined",
    description: "Column span at specified responsive breakpoint.",
  },
];

export function GridDocPage() {
  return (
    <ComponentDocLayout
      title="Grid"
      description="Fluid 12-column responsive layout system supporting granular breakpoint spans, spacing multipliers, and zero-runtime static CSS classes."
      status="stable"
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

      <ApiTable componentName="Grid" props={gridPropsData} />
    </ComponentDocLayout>
  );
}
