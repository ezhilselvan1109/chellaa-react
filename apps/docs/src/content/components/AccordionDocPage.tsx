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
  AccordionActions,
  AccordionExpandAll,
  AccordionCollapseAll,
  Box,
  Stack,
  Text,
} from "@chellaa/react";

export const accordionToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "multiple-expansion", title: "Multiple Simultaneous Expansion" },
  { id: "variants", title: "Visual Variants" },
  { id: "sizes", title: "Density & Sizes" },
  { id: "rich-headers", title: "Rich Header Content" },
  { id: "bulk-actions", title: "Expand All & Collapse All" },
  { id: "controlled-state", title: "Controlled State" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
  { id: "migration-notes", title: "Redesign & Migration Notes" },
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
    type: '"default" | "separated" | "borderless" | "filled" | "outline" | "flush"',
    default: '"default"',
    description: "Visual container styling treatment: default (clean border), separated (independent cards), borderless (minimal dividers), or filled (subtle surface background).",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Density scale controlling trigger padding, typography size, icon dimensions, and content spacing.",
  },
  {
    name: "indicatorPosition",
    type: '"start" | "end"',
    default: '"end"',
    description: "Global alignment of the expand/collapse indicator chevron icon.",
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

const accordionTriggerPropsData: PropRow[] = [
  {
    name: "title",
    type: "React.ReactNode",
    default: "undefined",
    description: "Primary header title text or element.",
  },
  {
    name: "description",
    type: "React.ReactNode",
    default: "undefined",
    description: "Optional secondary description or subtitle rendered beneath the title.",
  },
  {
    name: "leadingIcon",
    type: "React.ReactNode",
    default: "undefined",
    description: "Optional decorative leading icon placed before the title text.",
  },
  {
    name: "trailingBadge",
    type: "React.ReactNode",
    default: "undefined",
    description: "Optional metadata element or badge aligned before the chevron indicator.",
  },
  {
    name: "indicator",
    type: "React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode)",
    default: "undefined",
    description: "Custom indicator element or render function.",
  },
  {
    name: "indicatorPosition",
    type: '"start" | "end"',
    default: '"end"',
    description: "Overrides global indicator position for this specific trigger.",
  },
  {
    name: "hideIndicator",
    type: "boolean",
    default: "false",
    description: "Suppresses rendering the default expand/collapse chevron.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates button rendering to immediate child element via Slot primitive.",
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
      description="Vertically stacked interactive disclosure headings and collapsible content panels supporting single or multiple expansion modes, rich header content, density sizing, and bulk actions."
      status="stable"
      version="v0.2.3"
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
  AccordionActions,
  AccordionExpandAll,
  AccordionCollapseAll,
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
          By default, <code>Accordion</code> operates in <code>single</code> mode, keeping at most one panel expanded at any time. Adding <code>collapsible</code> allows the open item to collapse when clicked again.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Accordion defaultValue="item-1" collapsible>
            <AccordionItem value="item-1">
              <AccordionHeader>
                <AccordionTrigger
                  title="What is Chellaa React?"
                  description="Architectural philosophy and foundations"
                />
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
                <AccordionTrigger
                  title="Does it support server-side rendering (SSR)?"
                  description="Compatibility with Next.js, Remix, and Node"
                />
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">
                    Yes. All components are precompiled and operate cleanly in SSR environments with zero hydration mismatches.
                  </Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Box>
        <CodeBlock
          code={`<Accordion defaultValue="item-1" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger
        title="What is Chellaa React?"
        description="Architectural philosophy and foundations"
      />
    </Accordion.Header>
    <Accordion.Content>
      Chellaa React is an accessible design system...
    </Accordion.Content>
  </Accordion.Item>
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
          Configure <code>type="multiple"</code> to allow multiple items to remain open simultaneously. Pass an array of values to <code>defaultValue</code> or <code>value</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
            <AccordionItem value="item-1">
              <AccordionHeader>
                <AccordionTrigger
                  title="Section 1: General Preferences"
                  description="Notifications and system locale"
                />
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">Configure notifications, themes, and locale settings.</Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionHeader>
                <AccordionTrigger
                  title="Section 2: Privacy & Security"
                  description="MFA and session management"
                />
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
          Choose from four distinct design treatments: <code>default</code> (clean bordered container), <code>separated</code> (discrete card panels), <code>borderless</code> (minimal dividers), or <code>filled</code> (soft tinted background).
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={3}>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Separated Variant (Floating Cards)</Text>
              <Accordion variant="separated" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionHeader>
                    <AccordionTrigger title="Separated Card Item" description="Self-contained card panel" />
                  </AccordionHeader>
                  <AccordionContent>
                    <Box sx={{ p: 2 }}><Text size="sm">Separated items appear in distinct floating cards with elevation shadows.</Text></Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
            <Box>
              <Text size="sm" color="text.secondary" block sx={{ mb: 1 }}>Filled Variant (Subtle Background)</Text>
              <Accordion variant="filled" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionHeader>
                    <AccordionTrigger title="Filled Panel Item" description="Soft surface background emphasis" />
                  </AccordionHeader>
                  <AccordionContent>
                    <Box sx={{ p: 2 }}><Text size="sm">Filled items have a soft tinted background transitioning to canvas on expansion.</Text></Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Box>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Accordion variant="default" defaultValue="item-1">...</Accordion>
<Accordion variant="separated" defaultValue="item-1">...</Accordion>
<Accordion variant="borderless" defaultValue="item-1">...</Accordion>
<Accordion variant="filled" defaultValue="item-1">...</Accordion>`}
          language="tsx"
        />
      </section>

      <section id="sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Density & Sizes</span>
          <a href="#sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Control density with <code>size="sm"</code>, <code>size="md"</code>, or <code>size="lg"</code>. Size adjusts trigger padding, typography scale, icon dimensions, and panel content spacing uniformly.
        </p>
        <CodeBlock
          code={`<Accordion size="sm" defaultValue="1">...</Accordion>
<Accordion size="md" defaultValue="1">...</Accordion>
<Accordion size="lg" defaultValue="1">...</Accordion>`}
          language="tsx"
        />
      </section>

      <section id="rich-headers" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Rich Header Content</span>
          <a href="#rich-headers" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Easily supply structured props to <code>Accordion.Trigger</code>: <code>title</code>, <code>description</code>, <code>leadingIcon</code>, and <code>trailingBadge</code>.
        </p>
        <CodeBlock
          code={`<Accordion.Trigger
  title="Security Audit"
  description="SOC 2 Type II compliance controls"
  leadingIcon={<ShieldIcon />}
  trailingBadge={<Badge variant="success">Verified</Badge>}
  indicatorPosition="end"
/>`}
          language="tsx"
        />
      </section>

      <section id="bulk-actions" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Expand All & Collapse All</span>
          <a href="#bulk-actions" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Render optional bulk operation helpers inside <code>Accordion.Actions</code>. Disabled items are automatically excluded from bulk expansion.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Accordion type="multiple" defaultValue={["1"]}>
            <AccordionActions>
              <AccordionExpandAll />
              <AccordionCollapseAll />
            </AccordionActions>
            <AccordionItem value="1">
              <AccordionHeader>
                <AccordionTrigger title="Section 1: Architecture Guidelines" />
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">Pure static CSS layers, zero runtime overhead, and strict TypeScript types.</Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionHeader>
                <AccordionTrigger>
                  <span>Section 2: Manual Icon Composition</span>
                  <AccordionIcon />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box sx={{ p: 2 }}>
                  <Text size="sm">Consumers can use structured props or manually compose custom chevron icons.</Text>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Box>
        <CodeBlock
          code={`<Accordion type="multiple" defaultValue={[]}>
  <Accordion.Actions>
    <Accordion.ExpandAll />
    <Accordion.CollapseAll />
  </Accordion.Actions>
  <Accordion.Item value="1">...</Accordion.Item>
  <Accordion.Item value="2">...</Accordion.Item>
</Accordion>`}
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
          <ApiTable componentName="AccordionTrigger" props={accordionTriggerPropsData} />
        </div>
        <div style={{ marginTop: "32px" }}>
          <ApiTable componentName="AccordionHeader" props={accordionHeaderPropsData} />
        </div>
      </section>

      <section id="migration-notes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Redesign & Migration Notes</span>
          <a href="#migration-notes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph">
          The Wave 6 redesign introduces full backwards compatibility:
        </p>
        <ul className="docs-list" style={{ marginTop: "8px" }}>
          <li><code>variant="outline"</code> is preserved as an alias for <code>variant="default"</code>.</li>
          <li><code>variant="flush"</code> is preserved as an alias for <code>variant="borderless"</code>.</li>
          <li>Existing manual compositions using <code>&lt;Accordion.Icon /&gt;</code> continue to work with no duplicate icons.</li>
          <li>New convenience props (<code>title</code>, <code>description</code>, <code>leadingIcon</code>, <code>trailingBadge</code>, <code>size</code>) are fully optional.</li>
        </ul>
      </section>
    </ComponentDocLayout>
  );
}
