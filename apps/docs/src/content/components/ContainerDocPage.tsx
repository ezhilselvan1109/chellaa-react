import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Container, Box, Text, Heading } from "@chellaa/react";

export const containerToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "breakpoints", title: "Breakpoint Dimensions & Scaling" },
  { id: "fixed-mode", title: "Fixed Stepping Mode" },
  { id: "gutters", title: "Fluid Gutters & Gutter Suppression" },
  { id: "landmarks", title: "Semantic Document Landmarks" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const containerPropsData: PropRow[] = [
  {
    name: "maxWidth",
    type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
    default: '"lg"',
    description: "Determines the maximum horizontal width constraint mapped to theme breakpoint tokens. Set to false for 100% fluid width.",
  },
  {
    name: "fixed",
    type: "boolean",
    default: "false",
    description: "When true, snaps the max-width to discrete breakpoint tiers rather than scaling fluidly.",
  },
  {
    name: "disableGutters",
    type: "boolean",
    default: "false",
    description: "Removes left and right padding gutters (16px on mobile, 24px on desktop).",
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
    description: "Semantic HTML element or custom component to render (e.g. 'main', 'section', 'article').",
  },
  {
    name: "as",
    type: "ElementType",
    default: "undefined",
    description: "Alias for component prop for polymorphic element selection.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop supporting design token paths and responsive array/object breakpoints.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description: "Additional CSS class names appended to the root element ('cl-container').",
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
    description: "Content nodes to be rendered within the container.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Semantic Landmarks",
    description:
      "By default, Container renders a non-semantic <div>. Use component='main' for primary page content, or component='section' / component='header' / component='footer' to establish meaningful WCAG document landmarks.",
  },
  {
    attributeOrKey: "Reading Line Length",
    description:
      "Constraining text content to maxWidth='sm' (600px) or maxWidth='md' (900px) adheres to WCAG guidelines recommending comfortable character line lengths (45–80 characters per line) to prevent reading fatigue.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Structural Container",
    description:
      "Containers are structural boundary primitives that do not receive keyboard tab focus and do not interfere with internal keyboard navigation.",
  },
];

export function ContainerDocPage() {
  return (
    <ComponentDocLayout
      title="Container"
      description="Horizontal viewport boundary primitive that centers content, applies fluid padding gutters, and constrains layout width to design system breakpoints."
      status="stable"
      version="v0.2.0"
      storybookId="components-layout-container--docs"
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
          <Container maxWidth="md">
            <Box sx={{ p: 3, bgcolor: "var(--docs-primary-bg)", textAlign: "center", borderRadius: 1 }}>
              <Heading level={4}>Centered Container (maxWidth=&quot;md&quot; / 900px)</Heading>
              <Text size="sm" color="text.secondary">
                Automatically centered with responsive horizontal gutters (16px on mobile, 24px on desktop).
              </Text>
            </Box>
          </Container>
        </Box>
        <CodeBlock
          code={`<Container maxWidth="md">
  <Box sx={{ p: 3, textAlign: "center", bgcolor: "primary.subtle", borderRadius: 1 }}>
    <Heading level={4}>Centered Container (maxWidth="md")</Heading>
    <Text size="sm">Automatically centered with responsive gutters.</Text>
  </Box>
</Container>`}
          language="tsx"
        />
      </section>

      <section id="breakpoints" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Breakpoint Dimensions & Scaling</span>
          <a href="#breakpoints" className="docs-heading-anchor">#</a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>
          The <code>maxWidth</code> prop maps directly to the design system&apos;s authoritative breakpoint token contracts:
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Container maxWidth="sm">
              <Box sx={{ p: 1.5, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1, textAlign: "center" }}>
                <Text size="sm"><code>maxWidth=&quot;sm&quot;</code> — 600px ceiling (Optimal for reading prose & forms)</Text>
              </Box>
            </Container>
            <Container maxWidth="md">
              <Box sx={{ p: 1.5, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1, textAlign: "center" }}>
                <Text size="sm"><code>maxWidth=&quot;md&quot;</code> — 900px ceiling (Standard documentation & articles)</Text>
              </Box>
            </Container>
            <Container maxWidth="lg">
              <Box sx={{ p: 1.5, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1, textAlign: "center" }}>
                <Text size="sm"><code>maxWidth=&quot;lg&quot;</code> — 1200px ceiling (Default: standard web application shell)</Text>
              </Box>
            </Container>
          </Box>
        </Box>
        <CodeBlock
          code={`{/* 600px maximum width */}
<Container maxWidth="sm">...</Container>

{/* 900px maximum width */}
<Container maxWidth="md">...</Container>

{/* 1200px maximum width (Default) */}
<Container maxWidth="lg">...</Container>

{/* 1536px maximum width */}
<Container maxWidth="xl">...</Container>

{/* 100% fluid unconstrained width */}
<Container maxWidth={false}>...</Container>`}
          language="tsx"
        />
      </section>

      <section id="fixed-mode" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Fixed Stepping Mode</span>
          <a href="#fixed-mode" className="docs-heading-anchor">#</a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>
          By default, <code>Container</code> scales fluidly up to the declared <code>maxWidth</code>. Enabling <code>fixed</code> snaps the container width to discrete breakpoint tiers (600px at sm, 900px at md, 1200px at lg) rather than continuous stretching.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Container fixed maxWidth="lg">
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1, textAlign: "center" }}>
              <Text size="sm">Fixed Stepped Container (snaps at 600px, 900px, and 1200px)</Text>
            </Box>
          </Container>
        </Box>
        <CodeBlock
          code={`<Container fixed maxWidth="lg">
  <Box>Content snaps to discrete breakpoint widths</Box>
</Container>`}
          language="tsx"
        />
      </section>

      <section id="gutters" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Fluid Gutters & Gutter Suppression</span>
          <a href="#gutters" className="docs-heading-anchor">#</a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>
          Horizontal gutters provide <code>16px</code> padding on viewports below 600px and <code>24px</code> padding on viewports 600px and above. Use <code>disableGutters</code> when nesting full-bleed banners or when gutters are handled by inner layout grids.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Container disableGutters maxWidth="md">
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px dashed var(--docs-border)", borderRadius: 1, textAlign: "center" }}>
              <Text size="sm">Container with disableGutters=true (flush 0px side padding)</Text>
            </Box>
          </Container>
        </Box>
        <CodeBlock
          code={`<Container disableGutters maxWidth="md">
  <div>Flush layout content without container gutters</div>
</Container>`}
          language="tsx"
        />
      </section>

      <section id="landmarks" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Semantic Document Landmarks</span>
          <a href="#landmarks" className="docs-heading-anchor">#</a>
        </h2>
        <p style={{ color: "var(--docs-text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>
          Supply <code>component=&quot;main&quot;</code>, <code>component=&quot;section&quot;</code>, or <code>component=&quot;article&quot;</code> to generate accessible HTML5 landmark elements without extra DOM wrapper divs.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Container component="main" maxWidth="md">
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>
              <Heading level={4}>Rendered as &lt;main&gt;</Heading>
              <Text size="sm">Inspect DOM to verify semantic main landmark tag.</Text>
            </Box>
          </Container>
        </Box>
        <CodeBlock
          code={`<Container component="main" maxWidth="md">
  <Heading level={1}>Page Heading</Heading>
  <Text>Main article body content...</Text>
</Container>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Container"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Container" props={containerPropsData} />
    </ComponentDocLayout>
  );
}
