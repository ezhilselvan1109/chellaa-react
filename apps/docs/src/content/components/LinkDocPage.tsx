import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { Link, Box, Stack, Text } from "@chellaa/react";

export const linkToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "underline-variants", title: "Underline Variants" },
  { id: "color-schemes", title: "Color Schemes" },
  { id: "external-links", title: "External Links" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const linkPropsData: PropRow[] = [
  {
    name: "href",
    type: "string",
    default: "undefined",
    description: "Target URL destination for native navigation.",
  },
  {
    name: "underline",
    type: '"hover" | "always" | "none"',
    default: '"hover"',
    description: "Underline presentation style.",
  },
  {
    name: "colorScheme",
    type: '"primary" | "neutral" | "subtle"',
    default: '"primary"',
    description: "Semantic text color scheme.",
  },
  {
    name: "isExternal",
    type: "boolean",
    default: "false",
    description: "Opens in new tab with noopener noreferrer and renders external link icon.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Renders aria-disabled link, removes href, and suppresses activation.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to child component using Slot composition.",
  },
];

const linkRoles = [
  { attributeOrKey: "a[href]", description: "Semantic anchor link element for screen readers." },
  { attributeOrKey: "aria-disabled='true'", description: "Exposes non-navigable disabled link state." },
  { attributeOrKey: "svg[aria-hidden='true']", description: "Hides external icon from assistive tech." },
];

const linkKeyboardKeys = [
  { attributeOrKey: "Enter", description: "Navigates to the link destination." },
  { attributeOrKey: "Tab", description: "Focuses the link with visible focus indicator." },
];

export function LinkDocPage() {
  return (
    <ComponentDocLayout
      title="Link"
      description="Accessible hyperlink primitive wrapping native anchors with theme color schemes, security guards, and Slot composition."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock code={`import { Link } from "@chellaa/react";`} language="tsx" />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Text>
            Discover our comprehensive documentation at{" "}
            <Link href="https://chellaa.dev">Chellaa Docs</Link>.
          </Text>
        </Box>
      </section>

      <section id="underline-variants">
        <h2>Underline Variants</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Stack direction="column" spacing={2}>
            <Text>Hover (default): <Link href="#" underline="hover">Hover over this link</Link></Text>
            <Text>Always: <Link href="#" underline="always">Permanently underlined link</Link></Text>
            <Text>None: <Link href="#" underline="none">Unadorned link text</Link></Text>
          </Stack>
        </Box>
      </section>

      <section id="color-schemes">
        <h2>Color Schemes</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Stack direction="row" spacing={4}>
            <Link href="#" colorScheme="primary">Primary Brand</Link>
            <Link href="#" colorScheme="neutral">Neutral Text</Link>
            <Link href="#" colorScheme="subtle">Subtle Muted</Link>
          </Stack>
        </Box>
      </section>

      <section id="external-links">
        <h2>External Links</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Link href="https://github.com/ezhilselvan1109/chellaa-react" isExternal>
            Source code on GitHub
          </Link>
        </Box>
      </section>

      <section id="accessibility">
        <h2>Accessibility</h2>
        <AccessibilitySection componentName="Link" roles={linkRoles} keyboardKeys={linkKeyboardKeys} />
      </section>

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="Link" props={linkPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
