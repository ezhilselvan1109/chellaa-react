import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Stack, Divider, Text, Box } from "@chellaa/react";

export const stackToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "direction-spacing", title: "Direction & Spacing Tokens" },
  { id: "embedded-divider", title: "Embedded Dividers" },
  { id: "responsive", title: "Responsive Breakpoints" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const stackPropsData: PropRow[] = [
  {
    name: "direction",
    type: '"row" | "row-reverse" | "column" | "column-reverse" | Array | Object',
    default: '"column"',
    description: "Flex direction layout flow supporting responsive breakpoint arrays/objects.",
  },
  {
    name: "spacing",
    type: "number | string | Array | Object",
    default: "0",
    description: "Spacing gap between child items mapped to theme spacing tokens.",
  },
  {
    name: "divider",
    type: "ReactNode",
    default: "undefined",
    description: "Custom divider element automatically injected between child nodes.",
  },
  {
    name: "alignItems",
    type: "CSSProperties['alignItems'] | Array | Object",
    default: "undefined",
    description: "Alignment along the cross axis.",
  },
  {
    name: "justifyContent",
    type: "CSSProperties['justifyContent'] | Array | Object",
    default: "undefined",
    description: "Distribution along the main axis.",
  },
  {
    name: "flexWrap",
    type: "CSSProperties['flexWrap'] | Array | Object",
    default: "undefined",
    description: "Flex wrapping behavior across line breaks.",
  },
  {
    name: "useFlexGap",
    type: "boolean",
    default: "undefined",
    description: "Uses CSS gap property rather than margin distribution.",
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
    description: "Semantic HTML element to render (e.g. 'ul', 'ol', 'nav').",
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
    description: "Child elements to be laid out linearly.",
  },
];

const a11yRoles = [
  {
    attributeOrKey: "Reading Order",
    description:
      "Stack enforces predictable 1D reading order matching standard document flow. Do not use row-reverse or column-reverse unless keyboard navigation order is synchronized.",
  },
  {
    attributeOrKey: "Semantic Lists",
    description:
      "When stacking list items or navigation links, specify component='ul' on the Stack to communicate list semantics to screen readers.",
  },
];

const a11yKeyboard = [
  {
    attributeOrKey: "Structural Wrapper",
    description:
      "Stack containers are purely structural layout wrappers that do not receive tab focus.",
  },
];

export function StackDocPage() {
  return (
    <ComponentDocLayout
      title="Stack"
      description="Linear layout primitive managing 1-dimensional item distribution, spacing tokens, and embedded dividers."
      status="stable"
      version="v0.2.0"
      storybookId="components-layout-stack--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Stack } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>Item 1</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>Item 2</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-primary-bg)", borderRadius: 1 }}>Item 3</Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="column" spacing={2}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>`}
          language="tsx"
        />
      </section>

      <section id="direction-spacing" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Direction & Spacing Tokens</span>
          <a href="#direction-spacing" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3}>
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>Col A</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>Col B</Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1 }}>Col C</Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="row" spacing={3}>
  <Box>Col A</Box>
  <Box>Col B</Box>
  <Box>Col C</Box>
</Stack>`}
          language="tsx"
        />
      </section>

      <section id="embedded-divider" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Embedded Dividers</span>
          <a href="#embedded-divider" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2} divider={<Divider lineStyle="dashed" />}>
            <Text size="sm">Header Section</Text>
            <Text size="sm">Body Content</Text>
            <Text size="sm">Footer Section</Text>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="column" spacing={2} divider={<Divider lineStyle="dashed" />}>
  <Text>Header Section</Text>
  <Text>Body Content</Text>
  <Text>Footer Section</Text>
</Stack>`}
          language="tsx"
        />
      </section>

      <section id="responsive" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Responsive Breakpoints</span>
          <a href="#responsive" className="docs-heading-anchor">#</a>
        </h2>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={[1, 2, 4]}
          >
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1, flex: 1 }}>
              Column on mobile, Row on tablet+
            </Box>
            <Box sx={{ p: 2, bgcolor: "var(--docs-surface)", border: "1px solid var(--docs-border)", borderRadius: 1, flex: 1 }}>
              Responsive Spacing Gap
            </Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={[1, 2, 4]}
>
  <Box sx={{ flex: 1 }}>Column on mobile, Row on tablet+</Box>
  <Box sx={{ flex: 1 }}>Responsive Spacing Gap</Box>
</Stack>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Stack"
        roles={a11yRoles}
        keyboardKeys={a11yKeyboard}
      />

      <ApiTable componentName="Stack" props={stackPropsData} />
    </ComponentDocLayout>
  );
}
