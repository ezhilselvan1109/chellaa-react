import * as React from "react";
import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Snackbar,
  ToastProvider,
  useToast,
  Button,
  Box,
} from "@chellaa/react";

export const snackbarToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage (Imperative Toast)" },
  { id: "standalone-snackbar", title: "Standalone Snackbar Component" },
  { id: "statuses", title: "Status Intents" },
  { id: "positions", title: "Viewport Positions" },
  { id: "toast-provider", title: "Toast Provider Setup" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const snackbarPropsData: PropRow[] = [
  {
    name: "isOpen",
    type: "boolean",
    default: "false",
    description: "Controlled open visibility state of the standalone snackbar.",
  },
  {
    name: "message",
    type: "ReactNode",
    default: "undefined",
    description: "Primary headline copy displayed in the notification.",
  },
  {
    name: "description",
    type: "ReactNode",
    default: "undefined",
    description: "Secondary explanatory body copy.",
  },
  {
    name: "status",
    type: '"info" | "success" | "warning" | "danger" | "neutral"',
    default: '"info"',
    description: "Semantic intent determining icon and accent styling.",
  },
  {
    name: "duration",
    type: "number | null",
    default: "5000",
    description: "Auto-dismissal timer in milliseconds. Pass null to disable auto-dismissal.",
  },
  {
    name: "position",
    type: '"top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right"',
    default: '"bottom-right"',
    description: "Viewport anchoring corner for the notification surface.",
  },
  {
    name: "action",
    type: "ReactNode",
    default: "undefined",
    description: "Custom interactive action element (such as an Undo button).",
  },
  {
    name: "isClosable",
    type: "boolean",
    default: "true",
    description: "Whether an accessible close button is rendered.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "undefined",
    description: "Callback fired when the snackbar dismisses.",
  },
];

const toastOptionsPropsData: PropRow[] = [
  {
    name: "id",
    type: "string",
    default: "auto-generated",
    description: "Unique identifier for programmatic dismissal or updates.",
  },
  {
    name: "title",
    type: "ReactNode",
    default: "undefined",
    description: "Primary headline for the imperative toast.",
  },
  {
    name: "description",
    type: "ReactNode",
    default: "undefined",
    description: "Body message text or markup.",
  },
  {
    name: "status",
    type: '"info" | "success" | "warning" | "danger" | "neutral"',
    default: '"info"',
    description: "Semantic theme color and indicator icon.",
  },
  {
    name: "duration",
    type: "number | null",
    default: "5000",
    description: "Auto-dismiss timeout in ms. Use null for sticky alerts.",
  },
  {
    name: "position",
    type: '"top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right"',
    default: '"bottom-right"',
    description: "Anchor position on the screen.",
  },
  {
    name: "isClosable",
    type: "boolean",
    default: "true",
    description: "Shows close button icon.",
  },
  {
    name: "action",
    type: "ReactNode",
    default: "undefined",
    description: "Action slot for buttons or links.",
  },
];

const toastProviderPropsData: PropRow[] = [
  {
    name: "defaultDuration",
    type: "number",
    default: "5000",
    description: "Global fallback lifetime in ms before auto-dismissal.",
  },
  {
    name: "defaultPosition",
    type: '"top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right"',
    default: '"bottom-right"',
    description: "Default anchor corner for dispatched toasts.",
  },
  {
    name: "maxVisibleToasts",
    type: "number",
    default: "5",
    description: "Maximum concurrent toast instances allowed per position.",
  },
];

const snackbarA11yRoles = [
  {
    attributeOrKey: 'role="status"',
    description: "Polite live region semantics for info, success, and neutral notifications.",
  },
  {
    attributeOrKey: 'role="alert"',
    description: "Assertive live region semantics applied automatically for warning and danger notifications.",
  },
  {
    attributeOrKey: 'aria-live',
    description: "Configured to polite or assertive depending on severity status.",
  },
  {
    attributeOrKey: 'aria-atomic="true"',
    description: "Ensures screen readers present the entire message body upon injection.",
  },
];

const snackbarKeyboardKeys = [
  {
    attributeOrKey: "Tab",
    description: "Moves focus into the notification action button or close button.",
  },
  {
    attributeOrKey: "Escape",
    description: "Dismisses the active notification when focus is within its container.",
  },
];

function ToastDemo() {
  const toast = useToast();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      <Button
        variant="solid"
        colorScheme="primary"
        onClick={() =>
          toast({
            title: "Project saved",
            description: "Your layout changes have been saved successfully.",
            status: "success",
          })
        }
      >
        Trigger Success Toast
      </Button>
      <Button
        variant="outline"
        colorScheme="neutral"
        onClick={() =>
          toast({
            title: "Network warning",
            description: "Connection latency detected. Syncing in background.",
            status: "warning",
          })
        }
      >
        Trigger Warning Toast
      </Button>
      <Button
        variant="outline"
        colorScheme="danger"
        onClick={() =>
          toast({
            title: "Action failed",
            description: "Could not establish connection to the remote server.",
            status: "danger",
          })
        }
      >
        Trigger Danger Toast
      </Button>
    </Box>
  );
}

export function SnackbarDocPage() {
  const [isStandaloneOpen, setIsStandaloneOpen] = React.useState(false);

  return (
    <ComponentDocLayout
      title="Snackbar"
      description="Brief, transient feedback messages presented in floating overlays to acknowledge operations and communicate asynchronous system updates."
      version="1.0.0"
      status="stable"
      storybookId="components-feedback-snackbar--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Snackbar,
  ToastProvider,
  useToast,
  type SnackbarProps,
  type ToastOptions,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Basic Usage (Imperative Toast)</span>
          <a href="#basic-usage" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Wrap your root tree in <code>ToastProvider</code> and invoke the <code>useToast()</code> hook anywhere to dispatch queued notifications.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <ToastProvider>
            <ToastDemo />
          </ToastProvider>
        </Box>
        <CodeBlock
          code={`function SaveButton() {
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: "Project saved",
      description: "Your layout changes have been saved successfully.",
      status: "success",
      duration: 4000,
      position: "bottom-right",
    });
  };

  return <Button onClick={handleSave}>Save Changes</Button>;
}`}
          language="tsx"
        />
      </section>

      <section id="standalone-snackbar" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Standalone Snackbar Component</span>
          <a href="#standalone-snackbar" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          For inline or fully declarative state control, use the <code>Snackbar</code> component directly with <code>isOpen</code> and <code>onClose</code>.
        </p>
        <Box sx={{ p: 4, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Button onClick={() => setIsStandaloneOpen(!isStandaloneOpen)}>
            {isStandaloneOpen ? "Hide Snackbar" : "Show Standalone Snackbar"}
          </Button>

          <Snackbar
            isOpen={isStandaloneOpen}
            onClose={() => setIsStandaloneOpen(false)}
            status="info"
            message="Subscription updated"
            description="Your billing cycle starts on the first of each month."
            duration={6000}
            position="bottom-left"
            action={
              <Button size="sm" variant="outline" onClick={() => setIsStandaloneOpen(false)}>
                Dismiss
              </Button>
            }
          />
        </Box>
        <CodeBlock
          code={`const [isOpen, setIsOpen] = React.useState(false);

<Snackbar
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  status="info"
  message="Subscription updated"
  description="Your billing cycle starts on the first of each month."
  duration={6000}
  position="bottom-left"
  action={
    <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
      Dismiss
    </Button>
  }
/>`}
          language="tsx"
        />
      </section>

      <section id="statuses" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Status Intents</span>
          <a href="#statuses" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Toasts support five status intents: <code>info</code>, <code>success</code>, <code>warning</code>, <code>danger</code>, and <code>neutral</code>.
        </p>
        <CodeBlock
          code={`toast({ title: "Informational note", status: "info" });
toast({ title: "Payment confirmed", status: "success" });
toast({ title: "Quota nearly depleted", status: "warning" });
toast({ title: "Failed to load credentials", status: "danger" });
toast({ title: "Cache cleared", status: "neutral" });`}
          language="tsx"
        />
      </section>

      <section id="positions" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Viewport Positions</span>
          <a href="#positions" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Notifications can be anchored to six viewport positions: <code>top</code>, <code>top-left</code>, <code>top-right</code>, <code>bottom</code>, <code>bottom-left</code>, and <code>bottom-right</code>.
        </p>
        <CodeBlock
          code={`toast({
  title: "Top-centered alert",
  position: "top",
});

toast({
  title: "Bottom-left activity",
  position: "bottom-left",
});`}
          language="tsx"
        />
      </section>

      <section id="toast-provider" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Toast Provider Setup</span>
          <a href="#toast-provider" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Mount <code>ToastProvider</code> near the root of your application to establish the portal containers and configure default durations.
        </p>
        <CodeBlock
          code={`import { ToastProvider } from "@chellaa/react";

export function App() {
  return (
    <ToastProvider defaultDuration={4000} defaultPosition="bottom-right" maxVisibleToasts={5}>
      <YourAppContent />
    </ToastProvider>
  );
}`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Snackbar & Toast"
        roles={snackbarA11yRoles}
        keyboardKeys={snackbarKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <h3 className="docs-heading-3">Snackbar Props</h3>
        <ApiTable componentName="Snackbar" props={snackbarPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "24px" }}>ToastOptions (useToast)</h3>
        <ApiTable componentName="ToastOptions" props={toastOptionsPropsData} />

        <h3 className="docs-heading-3" style={{ marginTop: "24px" }}>ToastProvider Props</h3>
        <ApiTable componentName="ToastProvider" props={toastProviderPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
