import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Box,
} from "@chellaa/react";

export const breadcrumbsToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "custom-separator", title: "Custom Separator" },
  { id: "collapsed-overflow", title: "Collapsed Overflow" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const breadcrumbsPropsData: PropRow[] = [
  {
    name: "aria-label",
    type: "string",
    default: '"Breadcrumb"',
    description: "Accessible navigation landmark label announced by assistive tech.",
  },
  {
    name: "separator",
    type: "React.ReactNode",
    default: "Chevron Icon",
    description: "Default separator node inserted between breadcrumb items.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "required",
    description: "Ordered list of breadcrumb items.",
  },
];

const breadcrumbsRoles = [
  { attributeOrKey: "nav[aria-label]", description: "Semantic navigation landmark container." },
  { attributeOrKey: "ol", description: "Semantic ordered list describing sequence of pages." },
  { attributeOrKey: "aria-current='page'", description: "Identifies the terminal active page in the hierarchy." },
  { attributeOrKey: "li[role='presentation'][aria-hidden]", description: "Decorative separators hidden from assistive tech." },
];

const breadcrumbsKeyboardKeys = [
  { attributeOrKey: "Tab", description: "Moves keyboard focus between navigable breadcrumb links." },
  { attributeOrKey: "Enter", description: "Activates focused breadcrumb link." },
];

export function BreadcrumbsDocPage() {
  return (
    <ComponentDocLayout
      title="Breadcrumbs"
      description="Accessible navigation landmark indicating user hierarchy and trail within the application."
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock
          code={`import {\n  Breadcrumbs,\n  BreadcrumbList,\n  BreadcrumbItem,\n  BreadcrumbLink,\n  BreadcrumbPage,\n  BreadcrumbSeparator,\n  BreadcrumbEllipsis,\n} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Breadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumbs>
        </Box>
        <CodeBlock
          code={`<Breadcrumbs>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/components">Components</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumbs>`}
          language="tsx"
        />
      </section>

      <section id="custom-separator">
        <h2>Custom Separator</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Breadcrumbs separator="/">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/analytics">Analytics</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Realtime</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumbs>
        </Box>
      </section>

      <section id="collapsed-overflow">
        <h2>Collapsed Overflow</h2>
        <Box sx={{ p: 4, my: 3, border: "1px solid", borderColor: "border.default", borderRadius: "md" }}>
          <Breadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumbs>
        </Box>
      </section>

      <section id="accessibility">
        <h2>Accessibility</h2>
        <AccessibilitySection
          componentName="Breadcrumbs"
          roles={breadcrumbsRoles}
          keyboardKeys={breadcrumbsKeyboardKeys}
        />
      </section>

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="Breadcrumbs" props={breadcrumbsPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
