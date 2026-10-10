import * as React from "react";
import {
  Box,
  Stack,
  Container,
  Grid,
  Paper,
  Button,
  TouchRipple,
  useRipple,
} from "@chellaa/react";
import { CodeBlock } from "../../components/Common/CodeBlock";
import type { TocItem } from "../../components/DocsLayout/TableOfContents";

export const materialPrimitivesToc: TocItem[] = [
  { id: "box", title: "Box Primitive & sx Prop" },
  { id: "stack", title: "Stack Layout" },
  { id: "grid", title: "12-Column Grid" },
  { id: "container", title: "Responsive Container" },
  { id: "paper", title: "Paper & 24 Elevations" },
  { id: "touch-ripple", title: "TouchRipple & useRipple" },
];

export function MaterialPrimitivesDocPage() {
  const [elevation, setElevation] = React.useState<number>(3);
  const [direction, setDirection] = React.useState<"column" | "row">("row");

  const { rippleProps, getRippleHandlers } = useRipple();

  return (
    <article className="docs-page">
      <h1 className="docs-page-title">Material Engine &amp; Primitives</h1>
      <p className="docs-page-desc">
        MUI-compatible CSS-in-JS Emotion styling runtime featuring tactile Google Material 3 elevations,
        the responsive <code>sx</code> prop parser, 8px grid mathematical spacing, and zero-DOM composition primitives.
      </p>

      {/* Section 1: Box & sx Prop */}
      <section id="box" style={{ marginTop: "40px" }}>
        <h2>Box &amp; Responsive sx Prop</h2>
        <p>
          The <code>Box</code> component serves as the foundational polymorphic wrapper. It accepts the responsive <code>sx</code> prop, which automatically resolves theme palette paths, 8px spacing shortcuts (<code>m</code>, <code>p</code>, <code>gap</code>), and breakpoint arrays/objects:
        </p>

        <div style={{ margin: "20px 0" }}>
          <Box
            sx={{
              p: [2, 3, 4],
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: 2,
              textAlign: "center",
            }}
          >
            Responsive Box: Padding scales with breakpoints (sx: p: [2, 3, 4])
          </Box>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Box } from "@chellaa/react";

<Box
  sx={{
    p: [2, 3, 4],
    bgcolor: "primary.main",
    color: "primary.contrastText",
    borderRadius: 2,
    boxShadow: 2,
  }}
>
  Hello Material Box
</Box>`}
        />
      </section>

      {/* Section 2: Stack */}
      <section id="stack" style={{ marginTop: "48px" }}>
        <h2>Stack (1D Flex Layout)</h2>
        <p>
          <code>Stack</code> manages horizontal and vertical flow with responsive gaps and optional divider elements between child nodes.
        </p>

        <div
          style={{
            padding: "20px",
            border: "1px solid var(--docs-border)",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <Button
              size="sm"
              variant={direction === "row" ? "solid" : "outline"}
              onClick={() => setDirection("row")}
            >
              Row
            </Button>
            <Button
              size="sm"
              variant={direction === "column" ? "solid" : "outline"}
              onClick={() => setDirection("column")}
            >
              Column
            </Button>
          </div>

          <Stack direction={direction} spacing={2}>
            <Box sx={{ p: 2, bgcolor: "secondary.light", borderRadius: 1 }}>Item 1</Box>
            <Box sx={{ p: 2, bgcolor: "secondary.light", borderRadius: 1 }}>Item 2</Box>
            <Box sx={{ p: 2, bgcolor: "secondary.light", borderRadius: 1 }}>Item 3</Box>
          </Stack>
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Stack, Box } from "@chellaa/react";

<Stack direction="row" spacing={2}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>`}
        />
      </section>

      {/* Section 3: Grid */}
      <section id="grid" style={{ marginTop: "48px" }}>
        <h2>12-Column Responsive Grid</h2>
        <p>
          The <code>Grid</code> component creates 12-column responsive fluid layouts using Material Design breakpoint tracks.
        </p>

        <div style={{ margin: "20px 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 2, bgcolor: "background.paper", border: "1px solid var(--docs-border)", borderRadius: 1, textAlign: "center" }}>
                xs=12 md=8 (Main Content)
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 2, bgcolor: "background.paper", border: "1px solid var(--docs-border)", borderRadius: 1, textAlign: "center" }}>
                xs=12 md=4 (Sidebar)
              </Box>
            </Grid>
          </Grid>
        </div>
      </section>

      {/* Section 4: Container */}
      <section id="container" style={{ marginTop: "48px" }}>
        <h2>Responsive Container</h2>
        <p>
          Centers content horizontally and constrains maximum viewport width with fluid horizontal gutters.
        </p>

        <Container maxWidth="md" sx={{ bgcolor: "background.paper", p: 3, border: "1px dashed var(--docs-border)", borderRadius: 2 }}>
          Centered Container (maxWidth="md")
        </Container>
      </section>

      {/* Section 5: Paper */}
      <section id="paper" style={{ marginTop: "48px" }}>
        <h2>Paper &amp; 24-Level Elevation Surfaces</h2>
        <p>
          <code>Paper</code> renders surfaces with Google Material 3 elevation shadows (levels 0–24) and automatic dark-mode semi-transparent white tint overlays.
        </p>

        <div style={{ margin: "24px 0" }}>
          <div style={{ marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontWeight: 600 }}>Elevation Level:</span>
            {[0, 1, 3, 6, 12, 24].map((lvl) => (
              <Button
                key={lvl}
                size="xs"
                variant={elevation === lvl ? "solid" : "outline"}
                onClick={() => setElevation(lvl)}
              >
                {lvl}
              </Button>
            ))}
          </div>

          <Paper
            elevation={elevation}
            sx={{
              p: 4,
              textAlign: "center",
              fontWeight: "bold",
              maxWidth: 400,
            }}
          >
            Paper Elevation: {elevation}
          </Paper>
        </div>
      </section>

      {/* Section 6: TouchRipple */}
      <section id="touch-ripple" style={{ marginTop: "48px" }}>
        <h2>TouchRipple &amp; useRipple Hook</h2>
        <p>
          Every interactive click and touch event in Chellaa React is powered by the tactile Material Design ripple engine:
        </p>

        <div style={{ margin: "24px 0" }}>
          <Paper
            elevation={2}
            {...getRippleHandlers({
              style: {
                width: "100%",
                maxWidth: 400,
                height: 120,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                userSelect: "none",
                fontWeight: 600,
                color: "var(--cl-color-primary)",
              },
            })}
          >
            Click anywhere on this surface to trigger radial ripples!
            <TouchRipple {...rippleProps} />
          </Paper>
        </div>
      </section>
    </article>
  );
}
