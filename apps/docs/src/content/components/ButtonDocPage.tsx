import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Callout } from "../../components/Common/Callout";
import {
  Button,
  ButtonGroup,
  Box,
  Stack,
  Text,
} from "@chellaa/react";
import { FiSend, FiArrowRight, FiDownload, FiTrash2, FiSearch } from "react-icons/fi";

export const buttonToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "variants", title: "Aesthetic Variants" },
  { id: "sizes", title: "Size Scale" },
  { id: "colors", title: "Color Schemes" },
  { id: "states", title: "Interaction & Loading States" },
  { id: "icons", title: "Icons & Icon Placement" },
  { id: "as-child", title: "Polymorphism (asChild)" },
  { id: "button-group", title: "ButtonGroup Integration" },
  { id: "theming", title: "Theming & Custom Styling" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const buttonPropsData: PropRow[] = [
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost" | "subtle" | "link"',
    default: '"solid"',
    description: "Visual aesthetic treatment of the button surface and borders.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Spatial height, padding, font size, and icon sizing scale mapped to the baseline grid.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "secondary" | "neutral" | "success" | "warning" | "danger" | "info"',
    default: '"primary"',
    description: "Semantic color intent mapped to design system tokens.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Prevents user interaction, sets native disabled attribute, and applies aria-disabled='true'.",
  },
  {
    name: "isLoading",
    type: "boolean",
    default: "false",
    description: "Displays animated SVG spinner, sets aria-busy='true', and blocks pointer interaction.",
  },
  {
    name: "loadingText",
    type: "string",
    default: "undefined",
    description: "Accessible text displayed adjacent to the spinner during loading state.",
  },
  {
    name: "loadingPosition",
    type: '"start" | "end" | "center"',
    default: '"start"',
    description: "Placement of the loading spinner relative to button label.",
  },
  {
    name: "startIcon",
    type: "ReactNode",
    default: "undefined",
    description: "Decorative leading icon element rendered before the label with aria-hidden='true'.",
  },
  {
    name: "endIcon",
    type: "ReactNode",
    default: "undefined",
    description: "Decorative trailing icon element rendered after the label with aria-hidden='true'.",
  },
  {
    name: "isFullWidth",
    type: "boolean",
    default: "false",
    description: "Expands button width to 100% of parent container.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to child element using the Slot primitive.",
  },
  {
    name: "disableRipple",
    type: "boolean",
    default: "false",
    description: "Disables the Material tactile touch ripple feedback animation.",
  },
  {
    name: "sx",
    type: "SxProps",
    default: "undefined",
    description: "System-aware sx styling prop for Emotion-backed theme token overrides.",
  },
];

const buttonA11yRoles = [
  {
    attributeOrKey: "<button>",
    description: "Native HTML button element providing implicit button role and keyboard semantics.",
  },
  {
    attributeOrKey: 'aria-busy="true"',
    description: "Automatically applied when isLoading is active to inform screen readers of pending activity.",
  },
  {
    attributeOrKey: 'aria-disabled="true"',
    description: "Set when isDisabled is true or when an asChild anchor element is rendered disabled.",
  },
  {
    attributeOrKey: "aria-label",
    description: "Required accessible name for icon-only buttons lacking visible text content.",
  },
];

const buttonKeyboardKeys = [
  {
    attributeOrKey: "Tab / Shift+Tab",
    description: "Moves focus into and out of the button in natural DOM tab order.",
  },
  {
    attributeOrKey: "Enter",
    description: "Activates the button action or submits the enclosing HTML form.",
  },
  {
    attributeOrKey: "Space",
    description: "Activates the button on key down and fires onClick on key release.",
  },
];

function InteractiveStatesDemo() {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ alignItems: "center" }}>
      <Button
        isLoading={loading}
        loadingText="Saving..."
        colorScheme="primary"
        onClick={handleClick}
      >
        Click to Simulate Save
      </Button>
      <Button isLoading loadingPosition="end" colorScheme="secondary">
        Uploading
      </Button>
      <Button isDisabled colorScheme="neutral">
        Disabled Button
      </Button>
    </Stack>
  );
}

export function ButtonDocPage() {
  return (
    <ComponentDocLayout
      title="Button"
      description="Buttons initiate actions and communicate status across interactive touchpoints, dialogs, forms, and toolbars."
      version="1.0.0"
      status="stable"
      storybookId="components-actions-button--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type ButtonColorScheme,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Button provides accessible defaults, high-contrast focus rings, touch ripple feedback, and double-click protection out of the box.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Button variant="solid" colorScheme="primary">Primary Action</Button>
            <Button variant="outline" colorScheme="neutral">Secondary Action</Button>
            <Button variant="ghost" colorScheme="neutral">Ghost Action</Button>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Stack direction="row" spacing={3}>
  <Button variant="solid" colorScheme="primary">Primary Action</Button>
  <Button variant="outline" colorScheme="neutral">Secondary Action</Button>
  <Button variant="ghost" colorScheme="neutral">Ghost Action</Button>
</Stack>`}
          language="tsx"
        />
      </section>


      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Aesthetic Variants</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Use the <code>variant</code> prop to establish visual hierarchy across primary, secondary, and tertiary actions.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="link">Link</Button>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="subtle">Subtle</Button>
<Button variant="link">Link</Button>`}
          language="tsx"
        />
      </section>

      <section id="sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Size Scale</span>
          <a href="#sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Buttons strictly adhere to the 4px/8px spatial baseline grid with heights of 28px (xs), 32px (sm), 40px (md), 48px (lg), and 56px (xl).
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ alignItems: "center" }}>
            <Button size="xs">Size XS (28px)</Button>
            <Button size="sm">Size SM (32px)</Button>
            <Button size="md">Size MD (40px)</Button>
            <Button size="lg">Size LG (48px)</Button>
            <Button size="xl">Size XL (56px)</Button>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Button size="xs">Size XS</Button>
<Button size="sm">Size SM</Button>
<Button size="md">Size MD</Button>
<Button size="lg">Size LG</Button>
<Button size="xl">Size XL</Button>`}
          language="tsx"
        />
      </section>

      <section id="colors" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Color Schemes</span>
          <a href="#colors" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Configure semantic color intent with <code>colorScheme</code>, supporting 7 token-mapped palettes.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Button colorScheme="primary">Primary</Button>
            <Button colorScheme="secondary">Secondary</Button>
            <Button colorScheme="neutral">Neutral</Button>
            <Button colorScheme="success">Success</Button>
            <Button colorScheme="warning">Warning</Button>
            <Button colorScheme="danger">Danger</Button>
            <Button colorScheme="info">Info</Button>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Button colorScheme="primary">Primary</Button>
<Button colorScheme="secondary">Secondary</Button>
<Button colorScheme="neutral">Neutral</Button>
<Button colorScheme="success">Success</Button>
<Button colorScheme="warning">Warning</Button>
<Button colorScheme="danger">Danger</Button>
<Button colorScheme="info">Info</Button>`}
          language="tsx"
        />
      </section>

      <section id="states" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Interaction & Loading States</span>
          <a href="#states" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Buttons manage async processing states gracefully. Setting <code>isLoading</code> renders an animated SVG indicator and sets <code>aria-busy="true"</code>.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <InteractiveStatesDemo />
        </Box>
        <CodeBlock
          code={`// Interactive async trigger
<Button isLoading={isSaving} loadingText="Saving..." onClick={handleSave}>
  Save Changes
</Button>

// Spinner trailing position
<Button isLoading loadingPosition="end" colorScheme="secondary">
  Uploading Files
</Button>

// Fully non-interactive disabled state
<Button isDisabled colorScheme="neutral">
  Disabled Action
</Button>`}
          language="tsx"
        />
      </section>

      <section id="icons" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Icons & Icon Placement</span>
          <a href="#icons" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Supply <code>startIcon</code> or <code>endIcon</code> for decorative glyphs. The button automatically marks them <code>aria-hidden="true"</code>. For icon-only buttons, supply an accessible <code>aria-label</code>.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ alignItems: "center" }}>
            <Button startIcon={<FiSend />} colorScheme="primary">Send Message</Button>
            <Button endIcon={<FiArrowRight />} variant="outline">Continue</Button>
            <Button startIcon={<FiDownload />} variant="subtle" colorScheme="secondary">Export PDF</Button>
            <Button startIcon={<FiTrash2 />} variant="ghost" colorScheme="danger">Delete</Button>
            <Button aria-label="Search items" variant="outline"><FiSearch /></Button>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Button startIcon={<FiSend />}>Send Message</Button>
<Button endIcon={<FiArrowRight />} variant="outline">Continue</Button>
<Button startIcon={<FiDownload />} variant="subtle">Export PDF</Button>
<Button startIcon={<FiTrash2 />} variant="ghost" colorScheme="danger">Delete</Button>

{/* Accessible Icon-Only Button */}
<Button aria-label="Search items" variant="outline">
  <FiSearch />
</Button>`}
          language="tsx"
        />
      </section>

      <section id="as-child" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Polymorphic Composition (<code>asChild</code>)</span>
          <a href="#as-child" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Pass <code>asChild</code> to delegate rendering to child elements such as framework navigation links while preserving full button appearance and event merging.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Button asChild variant="solid" colorScheme="primary">
              <a href="#as-child">Anchor as Button</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#theming">Navigate to Theming</a>
            </Button>
          </Stack>
        </Box>
        <CodeBlock
          code={`import { Button } from "@chellaa/react";
import Link from "next/link";

// Next.js Link composition
<Button asChild variant="solid" colorScheme="primary">
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>`}
          language="tsx"
        />
        <Callout type="tip" title="Framework Link Integration">
          When using Next.js <code>&lt;Link&gt;</code> or React Router <code>&lt;Link&gt;</code>, use <code>asChild</code> to prevent illegal HTML markup like nesting a <code>&lt;button&gt;</code> inside an <code>&lt;a&gt;</code> element.
        </Callout>
      </section>

      <section id="button-group" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>ButtonGroup Integration</span>
          <a href="#button-group" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Combine multiple buttons using <code>ButtonGroup</code> to control attached borders, unified sizing, and orientation across related controls.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <Text sx={{ fontSize: "0.875rem", fontWeight: 600, color: "text.secondary" }}>
              Attached Horizontal Group (Segmented Controls)
            </Text>
            <ButtonGroup isAttached variant="outline">
              <Button>Day</Button>
              <Button>Week</Button>
              <Button>Month</Button>
              <Button>Year</Button>
            </ButtonGroup>
          </Stack>
        </Box>
        <CodeBlock
          code={`<ButtonGroup isAttached variant="outline">
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
  <Button>Year</Button>
</ButtonGroup>`}
          language="tsx"
        />
      </section>

      <section id="theming" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Theming & Custom Styling</span>
          <a href="#theming" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Customize buttons with the Emotion <code>sx</code> prop, CSS classes within <code>@layer cl-components</code>, or custom token properties.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Button
            colorScheme="primary"
            sx={{
              borderRadius: "9999px",
              px: 6,
              boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
            }}
          >
            Custom Pill Button with Shadow
          </Button>
        </Box>
        <CodeBlock
          code={`<Button
  colorScheme="primary"
  sx={{
    borderRadius: "9999px",
    px: 6,
    boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
  }}
>
  Custom Pill Button
</Button>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Button"
        roles={buttonA11yRoles}
        keyboardKeys={buttonKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Button" props={buttonPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
