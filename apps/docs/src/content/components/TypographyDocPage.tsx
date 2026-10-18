import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Typography,
  Heading,
  Text,
  Paragraph,
  Code,
  Stack,
  Box,
} from "@chellaa/react";

export const typographyToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants", title: "Scale Variants" },
  { id: "headings", title: "Heading Component & Hierarchy" },
  { id: "paragraphs-text", title: "Text & Paragraph Components" },
  { id: "code", title: "Code Monospace Primitive" },
  { id: "alignment-color", title: "Alignment, Color & Truncation" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const typographyPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "button" | "caption" | "overline"',
    default: '"body1"',
    description: "Typographic scale style mapped to theme typography tokens.",
  },
  {
    name: "component",
    type: "ElementType",
    default: "Mapped by variant (e.g. h1 for 'h1', p for 'body1')",
    description: "The underlying HTML element or custom component to render.",
  },
  {
    name: "as",
    type: "ElementType",
    default: "undefined",
    description: "Polymorphic tag override alias for component.",
  },
  {
    name: "align",
    type: '"inherit" | "left" | "center" | "right" | "justify"',
    default: '"inherit"',
    description: "Sets text-align CSS property.",
  },
  {
    name: "color",
    type: "string",
    default: '"inherit"',
    description: "Theme palette key (e.g. 'primary.main', 'text.secondary') or raw CSS color value.",
  },
  {
    name: "gutterBottom",
    type: "boolean",
    default: "false",
    description: "Adds margin-bottom to maintain standardized vertical typographic rhythm.",
  },
  {
    name: "noWrap",
    type: "boolean",
    default: "false",
    description: "Prevents text wrapping and applies single-line ellipsis truncation.",
  },
  {
    name: "lineClamp",
    type: "number",
    default: "undefined",
    description: "Clamps multiline text to specified number of lines using webkit box clamping.",
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
    description: "System sx prop supporting token resolution and responsive breakpoints.",
  },
];

const headingPropsData: PropRow[] = [
  {
    name: "level",
    type: "1 | 2 | 3 | 4 | 5 | 6",
    default: "2",
    description: "Semantic heading level (1-6). Controls both the rendered HTML tag and default scale variant.",
  },
  {
    name: "variant",
    type: "TypographyVariant",
    default: "Mapped by level (e.g. 'h2' for level 2)",
    description: "Visual scale variant override, allowing decoupling of visual presentation from semantic heading level.",
  },
  {
    name: "component",
    type: "ElementType",
    default: "Mapped by level (e.g. 'h2')",
    description: "HTML element override when custom semantic tags are required.",
  },
  {
    name: "gutterBottom",
    type: "boolean",
    default: "false",
    description: "Applies bottom margin for section rhythm.",
  },
  {
    name: "color",
    type: "string",
    default: '"inherit"',
    description: "Theme color token or CSS color.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Passes heading semantics to child component using Slot.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const textPropsData: PropRow[] = [
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Ergonomic text size shorthand mapping: xs (caption), sm (body2), md (body1), lg (subtitle1), xl (h6).",
  },
  {
    name: "block",
    type: "boolean",
    default: "false",
    description: "When true, renders as block element ('p'). Defaults to inline 'span'.",
  },
  {
    name: "color",
    type: "string",
    default: '"inherit"',
    description: "Text color token (e.g. 'text.secondary', 'primary.main').",
  },
  {
    name: "noWrap",
    type: "boolean",
    default: "false",
    description: "Truncates single line text with ellipsis.",
  },
  {
    name: "lineClamp",
    type: "number",
    default: "undefined",
    description: "Limits multiline content to specified row count.",
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
    description: "System sx styling prop.",
  },
];

const paragraphPropsData: PropRow[] = [
  {
    name: "gutterBottom",
    type: "boolean",
    default: "true",
    description: "Maintains optimal paragraph reading rhythm with vertical margin.",
  },
  {
    name: "spacing",
    type: "number | string",
    default: "undefined",
    description: "Custom bottom margin spacing multiplier or CSS value.",
  },
  {
    name: "color",
    type: "string",
    default: '"inherit"',
    description: "Theme palette key or CSS color value.",
  },
  {
    name: "component",
    type: "ElementType",
    default: '"p"',
    description: "HTML element for paragraph content.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System sx styling prop.",
  },
];

const codePropsData: PropRow[] = [
  {
    name: "colorScheme",
    type: '"default" | "primary" | "secondary"',
    default: '"default"',
    description: "Visual palette token for background tint and text border accent.",
  },
  {
    name: "component",
    type: "ElementType",
    default: '"code"',
    description: "Underlying HTML element.",
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
    description: "System sx styling prop.",
  },
];

const typographyA11yRoles = [
  {
    attributeOrKey: "Heading landmarks (h1-h6)",
    description: "Provides screen readers with a hierarchical outline of the document structure (WCAG 2.2 1.3.1).",
  },
  {
    attributeOrKey: "p, span, code",
    description: "Semantic elements conveying body copy, inline text, and monospace technical terms.",
  },
];

const typographyKeyboardKeys = [
  {
    attributeOrKey: "Tab / Shift+Tab",
    description: "When typography elements contain links or interactive elements via asChild, standard focus applies.",
  },
];

export function TypographyDocPage() {
  return (
    <ComponentDocLayout
      title="Typography"
      description="Typographic family including Typography, Heading, Text, Paragraph, and inline Code primitives with fluid theme scale."
      status="stable"
      version="v0.2.0"
      storybookId="components-data-display-typography--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import { Typography, Heading, Text, Paragraph, Code } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Typography components enforce structured typographic scales, line heights, and font weights defined in the design token architecture.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Heading level={2}>Product Overview</Heading>
            <Paragraph>
              Chellaa React components provide fully accessible, token-driven interfaces built for modern React applications.
            </Paragraph>
            <Text size="sm" color="text.secondary">
              Published on October 18, 2026. Updated for design tokens v0.2.0.
            </Text>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="column" spacing={2}>
  <Heading level={2}>Product Overview</Heading>
  <Paragraph>
    Chellaa React components provide fully accessible, token-driven interfaces built for modern React applications.
  </Paragraph>
  <Text size="sm" color="text.secondary">
    Published on October 18, 2026. Updated for design tokens v0.2.0.
  </Text>
</Stack>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Scale Variants</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          The root <code>Typography</code> component supports 13 typographic scale variants mapping to theme typography tokens.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h3">Heading 3 (h3)</Typography>
            <Typography variant="h5">Heading 5 (h5)</Typography>
            <Typography variant="subtitle1">Subtitle 1 — prominent lead text</Typography>
            <Typography variant="body1">Body 1 — primary reading content</Typography>
            <Typography variant="body2">Body 2 — compact secondary content</Typography>
            <Typography variant="caption">Caption — timestamps and annotations</Typography>
            <Typography variant="overline">OVERLINE — CATEGORY LABELS</Typography>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Typography variant="h3">Heading 3 (h3)</Typography>
<Typography variant="subtitle1">Subtitle 1 — prominent lead text</Typography>
<Typography variant="body1">Body 1 — primary reading content</Typography>
<Typography variant="body2">Body 2 — compact secondary content</Typography>
<Typography variant="caption">Caption — annotations</Typography>
<Typography variant="overline">OVERLINE</Typography>`}
          language="tsx"
        />
      </section>

      <section id="headings" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Heading Component & Hierarchy</span>
          <a href="#headings" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          The <code>Heading</code> component pairs semantic HTML levels (<code>level=&#123;1..6&#125;</code>) with visual styling. You can decouple visual scale from semantic level via the <code>variant</code> prop.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={1}>
            <Heading level={1}>Heading Level 1 (h1)</Heading>
            <Heading level={2}>Heading Level 2 (h2)</Heading>
            <Heading level={3}>Heading Level 3 (h3)</Heading>
            <Heading level={4} variant="h6">
              Semantic h4 with visually smaller h6 scale
            </Heading>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Heading level={1}>Heading Level 1</Heading>
<Heading level={2}>Heading Level 2</Heading>
<Heading level={3}>Heading Level 3</Heading>
{/* Semantic h4 rendered with h6 visual size to preserve heading hierarchy */}
<Heading level={4} variant="h6">Semantic h4 with visually smaller h6 scale</Heading>`}
          language="tsx"
        />
      </section>

      <section id="paragraphs-text" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Text & Paragraph Components</span>
          <a href="#paragraphs-text" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Paragraph</code> renders a block <code>&lt;p&gt;</code> element with built-in vertical margins (<code>gutterBottom</code>). <code>Text</code> provides inline or block text with size shorthands (<code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Paragraph gutterBottom>
            This is a body paragraph designed for comfortable readability with optimized line height and vertical margins.
          </Paragraph>
          <Paragraph gutterBottom>
            A second paragraph maintaining standard vertical rhythm without manual margin overrides.
          </Paragraph>
          <Text size="sm" color="text.secondary">
            Inline secondary caption note.
          </Text>
        </Box>
        <CodeBlock
          code={`<Paragraph gutterBottom>
  This is a body paragraph designed for comfortable readability with optimized line height and vertical margins.
</Paragraph>
<Paragraph gutterBottom>
  A second paragraph maintaining standard vertical rhythm without manual margin overrides.
</Paragraph>
<Text size="sm" color="text.secondary">Inline secondary caption note.</Text>`}
          language="tsx"
        />
      </section>

      <section id="code" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Code Monospace Primitive</span>
          <a href="#code" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          <code>Code</code> renders inline monospace text for CLI commands, variables, and identifiers with supported color schemes.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Code colorScheme="default">npm test</Code>
            <Code colorScheme="primary">pnpm add @chellaa/react</Code>
            <Code colorScheme="secondary">git status -s</Code>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Code colorScheme="default">npm test</Code>
<Code colorScheme="primary">pnpm add @chellaa/react</Code>
<Code colorScheme="secondary">git status -s</Code>`}
          language="tsx"
        />
      </section>

      <section id="alignment-color" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Alignment, Color & Truncation</span>
          <a href="#alignment-color" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Control text alignment, theme palette colors, and single or multiline truncation using built-in props.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" align="center" color="primary.main">
              Centered text with theme primary token color.
            </Typography>
            <Box sx={{ width: "240px", border: "1px dashed var(--docs-border)", p: 1 }}>
              <Typography variant="body2" noWrap>
                This is a very long string that will be truncated with an ellipsis automatically.
              </Typography>
            </Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Typography variant="body1" align="center" color="primary.main">
  Centered text with theme primary token color.
</Typography>
<Typography variant="body2" noWrap>
  This is a very long string that will be truncated with an ellipsis automatically.
</Typography>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Typography"
        roles={typographyA11yRoles}
        keyboardKeys={typographyKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Typography" props={typographyPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="Heading" props={headingPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="Text" props={textPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="Paragraph" props={paragraphPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="Code" props={codePropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
