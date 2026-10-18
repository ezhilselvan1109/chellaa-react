import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertBody,
  AlertAction,
  AlertCloseButton,
  Button,
  Box,
  Stack,
} from "@chellaa/react";

export const alertToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "statuses", title: "Status Intents" },
  { id: "variants", title: "Visual Variants" },
  { id: "dismissible", title: "Closable Alerts & Actions" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const alertPropsData: PropRow[] = [
  {
    name: "status",
    type: '"info" | "success" | "warning" | "danger" | "neutral"',
    default: '"info"',
    description: "Semantic intent determining surface background color, border tint, and status icon.",
  },
  {
    name: "variant",
    type: '"subtle" | "solid" | "outline" | "left-accent"',
    default: '"subtle"',
    description: "Visual aesthetic style for the alert container surface.",
  },
  {
    name: "isClosable",
    type: "boolean",
    default: "false",
    description: "Renders an accessible close dismissal button inside the alert.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "undefined",
    description: "Callback fired when the user dismisses the alert.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Delegates rendering to immediate child element using Slot.",
  },
];

const alertA11yRoles = [
  {
    attributeOrKey: "role='alert' / role='status'",
    description: "Danger/warning alerts expose role='alert' for immediate announcement; info/success alerts use role='status'.",
  },
  {
    attributeOrKey: "aria-live='polite|assertive'",
    description: "Screen readers announce alert messages as they appear on the page.",
  },
];

const alertKeyboardKeys = [
  {
    attributeOrKey: "Tab to Close Button",
    description: "Keyboard users can navigate to the close button and dismiss via Space or Enter.",
  },
];

export function AlertDocPage() {
  return (
    <ComponentDocLayout
      title="Alert"
      description="Contextual feedback banner communicating informative, cautionary, success, or destructive status messages to users."
      status="stable"
      version="v0.2.0"
      storybookId="components-feedback-alert--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertBody,
  AlertAction,
  AlertCloseButton,
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
          Compose <code>Alert</code> with <code>AlertIcon</code>, <code>AlertTitle</code>, and <code>AlertDescription</code> for structured feedback banners.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Alert status="info">
            <AlertIcon />
            <AlertBody>
              <AlertTitle>System Maintenance Scheduled</AlertTitle>
              <AlertDescription>
                Maintenance will commence on Sunday at 02:00 UTC. System availability may be intermittently affected.
              </AlertDescription>
            </AlertBody>
          </Alert>
        </Box>
        <CodeBlock
          code={`<Alert status="info">
  <AlertIcon />
  <AlertBody>
    <AlertTitle>System Maintenance Scheduled</AlertTitle>
    <AlertDescription>Maintenance will commence on Sunday at 02:00 UTC.</AlertDescription>
  </AlertBody>
</Alert>`}
          language="tsx"
        />
      </section>

      <section id="statuses" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Status Intents</span>
          <a href="#statuses" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Alerts support five semantic statuses: <code>info</code>, <code>success</code>, <code>warning</code>, <code>danger</code>, and <code>neutral</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Alert status="success">
              <AlertIcon />
              <AlertBody><AlertTitle>Deployment successful!</AlertTitle></AlertBody>
            </Alert>
            <Alert status="warning">
              <AlertIcon />
              <AlertBody><AlertTitle>Storage capacity reaching 90% threshold.</AlertTitle></AlertBody>
            </Alert>
            <Alert status="danger">
              <AlertIcon />
              <AlertBody><AlertTitle>Authentication token has expired.</AlertTitle></AlertBody>
            </Alert>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Alert status="success"><AlertIcon /><AlertBody><AlertTitle>Success!</AlertTitle></AlertBody></Alert>
<Alert status="warning"><AlertIcon /><AlertBody><AlertTitle>Warning!</AlertTitle></AlertBody></Alert>
<Alert status="danger"><AlertIcon /><AlertBody><AlertTitle>Error!</AlertTitle></AlertBody></Alert>`}
          language="tsx"
        />
      </section>

      <section id="variants" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Visual Variants</span>
          <a href="#variants" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Choose between <code>subtle</code>, <code>solid</code>, <code>outline</code>, or <code>left-accent</code> styling variants.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Stack direction="column" spacing={2}>
            <Alert status="info" variant="left-accent">
              <AlertIcon />
              <AlertBody><AlertTitle>Left-accent banner treatment.</AlertTitle></AlertBody>
            </Alert>
            <Alert status="success" variant="solid">
              <AlertIcon />
              <AlertBody><AlertTitle>High-prominence solid surface.</AlertTitle></AlertBody>
            </Alert>
            <Alert status="warning" variant="outline">
              <AlertIcon />
              <AlertBody><AlertTitle>Bordered outline banner.</AlertTitle></AlertBody>
            </Alert>
          </Stack>
        </Box>
        <CodeBlock
          code={`<Alert status="info" variant="left-accent">...</Alert>
<Alert status="success" variant="solid">...</Alert>
<Alert status="warning" variant="outline">...</Alert>`}
          language="tsx"
        />
      </section>

      <section id="dismissible" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Closable Alerts & Actions</span>
          <a href="#dismissible" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Enable <code>isClosable=&#123;true&#125;</code> to include an accessible dismissal button, or add action buttons inside <code>AlertAction</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Alert status="info" isClosable>
            <AlertIcon />
            <AlertBody>
              <AlertTitle>New Feature Available</AlertTitle>
              <AlertDescription>Dark mode theming is now enabled for all workspaces.</AlertDescription>
            </AlertBody>
            <AlertAction>
              <Button size="sm" variant="outline">Learn More</Button>
            </AlertAction>
            <AlertCloseButton />
          </Alert>
        </Box>
        <CodeBlock
          code={`<Alert status="info" isClosable>
  <AlertIcon />
  <AlertBody>
    <AlertTitle>New Feature Available</AlertTitle>
  </AlertBody>
  <AlertAction>
    <Button size="sm">Learn More</Button>
  </AlertAction>
  <AlertCloseButton />
</Alert>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Alert"
        roles={alertA11yRoles}
        keyboardKeys={alertKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Alert" props={alertPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
