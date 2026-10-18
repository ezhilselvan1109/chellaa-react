import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  Box,
  Stack,
  Text,
} from "@chellaa/react";

export const accordionToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "multiple-expansion", title: "Multiple Simultaneous Expansion" },
  { id: "variants", title: "Visual Variants" },
  { id: "controlled-state", title: "Controlled State" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const accordionRootPropsData: PropRow[] = [
  {
    name: "type",
    type: '"single" | "multiple"',
    default: '"single"',
    description: "Expansion mode: 'single' (only one open item) or 'multiple' (any number of items open).",
  },
  {
    name: "collapsible",
    type: "boolean",
    default: "false",
    description: "When type='single', allows an expanded item to collapse upon clicking again.",
  },
  {
    name: "value",
    type: "string | string[]",
    default: "undefined",
    description: "Controlled expanded item value(s).",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    default: "undefined",
    description: "Initial expanded item value(s) when uncontrolled.",
  },
  {
    name: "onValueChange",
    type: "((value: string) => void) | ((value: string[]) => void)",
    default: "undefined",
    description: "Callback fired when expansion state changes.",
  },
  {
    name: "variant",
    type: '"outline" | "separated" | "flush"',
    default: '"outline"',
    description: "Visual container styling treatment: outline (bordered card), separated (discrete boxes), or flush (borderless).",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction across all child accordion items.",
  },
];

const accordionItemPropsData: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "Required",
    description: "Unique string identifier for this accordion panel.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Disables expanding or collapsing this specific item.",
  },
];

const accordionHeaderPropsData: PropRow[] = [
  {
    name: "level",
    type: "2 | 3 | 4 | 5 | 6",
    default: "3",
    description: "Semantic heading level (h2 through h6) wrapping the trigger button.",
  },
];

const accordionA11yRoles = [
  {
    attributeOrKey: "aria-expanded='true | false'",
    description: "Exposed by AccordionTrigger button communicating expansion state to assistive technologies.",
  },
  {
    attributeOrKey: "aria-controls",
    description: "Points to the id of the corresponding AccordionContent panel.",
  },
  {
    attributeOrKey: "role='region'",
    description: "Exposed by AccordionContent panel linked to the trigger via aria-labelledby.",
  },
  {
    attributeOrKey: "Semantic Headings (h2-h6)",
    description: "AccordionHeader wraps triggers in structural heading landmarks per W3C APG patterns.",
  },
];

const accordionKeyboardKeys = [
  {
    attributeOrKey: "Enter / Space",
    description: "Toggles expansion of the focused accordion item.",
  },
  {
    attributeOrKey: "Arrow Down",
    description: "Moves focus to the next enabled accordion trigger.",
  },
  {
    attributeOrKey: "Arrow Up",
    description: "Moves focus to the previous enabled accordion trigger.",
  },
  {
    attributeOrKey: "Home / End",
    description: "Moves focus directly to the first or last enabled accordion trigger.",
  },
];

export function AccordionDocPage() {
  return (
    <ComponentDocLayout
      title="Accordion"
      description="Vertically stacked interactive disclosure headings and collapsible content panels supporting single or multiple expansion modes."
      status="stable"
      version="v0.2.0"
      storybookId="components-navigation-accordion--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
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
          By default, <code>Accordion</code> operates in <code>single</code> mode, keeping exactly one panel expanded at any time.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Accordion defaultValue="item-1" collapsible>
            <AccordionItem value="item-1">
              <AccordionHeader>
                <AccordionTrigger>
                  <span>What is Chellaa React?</span>
                  <AccordionIcon />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">
                    Chellaa React is a production design system built on React 18 / 19, zero-runtime static cascade layers, and accessible WAI-ARIA primitives.
                  </Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionHeader>
                <AccordionTrigger>
                  <span>Does it support server-side rendering (SSR)?</span>
                  <AccordionIcon />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">
                    Yes. All components are precompiled and include ThemeScript to prevent Flash of Unstyled Content (FOUC) across Next.js and Remix.
                  </Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Box>
        <CodeBlock
          code={`<Accordion defaultValue="item-1" collapsible>
  <AccordionItem value="item-1">
    <AccordionHeader>
      <AccordionTrigger>
        <span>What is Chellaa React?</span>
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <Box sx={{ p: 2 }}>
        <Text size="sm">Chellaa React is an accessible design system...</Text>
      </Box>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          language="tsx"
        />
      </section>

      <section id="multiple-expansion" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Multiple Simultaneous Expansion</span>
          <a href="#multiple-expansion" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Configure <code>type="multiple"</code> to allow multiple items to remain open simultaneously.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
            <AccordionItem value="item-1">
              <AccordionHeader>
                <AccordionTrigger>
                  <span>Section 1: General Preferences</span>
                  <AccordionIcon />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">Configure notifications, themes, and locale settings.</Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionHeader>
                <AccordionTrigger>
                  <span>Section 2: Privacy & Security</span>
                  <AccordionIcon />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">Manage two-factor authentication, active sessions, and authorized devices.</Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Box>
        <CodeBlock
          code={`<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Visual Variants</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Choose from three design treatments: <code>outline</code> (bordered card), <code>separated</code> (independent cards), or <code>flush</code> (borderless inline lines).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Separated Variant</Text>
              <Accordion variant="separated" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionHeader>
                    <AccordionTrigger>
                      <span>Discrete Card Item</span>
                      <AccordionIcon />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Box sx={{ p: 2 }}><Text size="sm">Separated items appear in distinct floating cards.</Text></Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Flush Variant</Text>
              <Accordion variant="flush" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionHeader>
                    <AccordionTrigger>
                      <span>Flush Borderless Item</span>
                      <AccordionIcon />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <Box sx={{ p: 2 }}><Text size="sm">Flush items sit directly inside ambient content without outer borders.</Text></Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Accordion variant="separated" defaultValue="item-1">...</Accordion>
<Accordion variant="flush" defaultValue="item-1">...</Accordion>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Accordion"
        roles={accordionA11yRoles}
        keyboardKeys={accordionKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Accordion (AccordionRoot)" props={accordionRootPropsData} />
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="AccordionItem" props={accordionItemPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="AccordionHeader" props={accordionHeaderPropsData} />
        </div>
      </section>
    </ComponentDocLayout>
  );
}
