import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  Button,
  Box,
  Text,
} from "@chellaa/react";

export const dialogToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "modal-alias", title: "Modal Alias" },
  { id: "sizes", title: "Sizing Scale" },
  { id: "focus-management", title: "Focus Management" },
  { id: "accessibility", title: "Accessibility & Standards" },
  { id: "api-reference", title: "API Reference" },
];

const dialogRootPropsData: PropRow[] = [
  {
    name: "isOpen",
    type: "boolean",
    default: "undefined",
    description: "Controlled open state of the dialog.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state when uncontrolled.",
  },
  {
    name: "onClose",
    type: "() => void",
    default: "undefined",
    description: "Callback fired when dismissal is requested via Escape, overlay click, or close button.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl" | "full"',
    default: '"md"',
    description: "Dialog max-width dimension scale.",
  },
  {
    name: "isCentered",
    type: "boolean",
    default: "true",
    description: "Vertically centers the dialog modal within the viewport.",
  },
  {
    name: "closeOnEsc",
    type: "boolean",
    default: "true",
    description: "Whether pressing the Escape key dismisses the dialog.",
  },
  {
    name: "closeOnOverlayClick",
    type: "boolean",
    default: "true",
    description: "Whether clicking outside on the backdrop overlay dismisses the dialog.",
  },
  {
    name: "initialFocusRef",
    type: "RefObject<HTMLElement | null>",
    default: "undefined",
    description: "DOM element to receive focus when dialog finishes mounting.",
  },
  {
    name: "finalFocusRef",
    type: "RefObject<HTMLElement | null>",
    default: "undefined",
    description: "DOM element to receive focus when dialog is dismissed. Defaults to trigger element.",
  },
];

const dialogA11yRoles = [
  {
    attributeOrKey: "role='dialog'",
    description: "Applied to DialogContent with aria-modal='true' to establish an accessible modal context.",
  },
  {
    attributeOrKey: "aria-labelledby",
    description: "Automatically binds DialogTitle ID to DialogContent.",
  },
  {
    attributeOrKey: "aria-describedby",
    description: "Automatically binds DialogDescription ID to DialogContent.",
  },
  {
    attributeOrKey: "Focus Trap",
    description: "Constrains keyboard Tab navigation within the active dialog until dismissed.",
  },
];

const dialogKeyboardKeys = [
  {
    attributeOrKey: "Escape",
    description: "Dismisses the active dialog and restores focus to finalFocusRef.",
  },
  {
    attributeOrKey: "Tab / Shift+Tab",
    description: "Cycles focus exclusively between interactive elements inside the dialog modal.",
  },
];

export function DialogDocPage() {
  return (
    <ComponentDocLayout
      title="Dialog & Modal"
      description="Accessible modal overlay container that interrupts user interaction to present critical workflows, focus-trapped forms, or confirmations."
      status="stable"
      version="v0.2.0"
      storybookId="components-overlays-dialog--docs"
    >
      <section id="import">
        <h2 className="docs-heading-2">
          <span>Import</span>
          <a href="#import" className="docs-heading-anchor">#</a>
        </h2>
        <CodeBlock
          code={`import {
  Dialog,
  Modal,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
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
          Wrap the modal in <code>Dialog</code>. Clicking <code>DialogTrigger</code> automatically mounts the overlay and traps focus inside <code>DialogContent</code>.
        </p>
        <Box sx={{ p: 3, border: "1px solid var(--docs-border)", borderRadius: 2, mb: 2 }}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="solid" colorScheme="primary">Open Confirmation Dialog</Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Workspace Deletion</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. All project repositories and builds will be permanently removed.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <Text size="sm" color="text.secondary">
                    Please confirm that you want to proceed with deleting workspace <strong>production-east</strong>.
                  </Text>
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="solid" colorScheme="danger">Delete Workspace</Button>
                </DialogFooter>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </Box>
        <CodeBlock
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="solid" colorScheme="primary">Open Confirmation Dialog</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Workspace Deletion</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogHeader>
      <DialogBody>
        <Text size="sm">Please confirm that you want to proceed...</Text>
      </DialogBody>
      <DialogFooter>
        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
        <Button variant="solid" colorScheme="danger">Delete Workspace</Button>
      </DialogFooter>
    </DialogContent>
  </DialogPortal>
</Dialog>`}
          language="tsx"
        />
      </section>

      <section id="modal-alias" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Modal Compatibility Alias</span>
          <a href="#modal-alias" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          For teams migrating from Material UI or Chakra UI, all Dialog primitives are also exported under their <code>Modal</code> alias.
        </p>
        <CodeBlock
          code={`import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody } from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="sizes" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Sizing Scale</span>
          <a href="#sizes" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          Configure maximum horizontal width constraints using the <code>size</code> prop (<code>sm: 400px</code>, <code>md: 520px</code>, <code>lg: 720px</code>, <code>xl: 960px</code>, <code>full: 100vw</code>).
        </p>
        <CodeBlock
          code={`<Dialog size="lg">...</Dialog>
<Dialog size="full">...</Dialog>`}
          language="tsx"
        />
      </section>

      <section id="focus-management" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>Focus Management</span>
          <a href="#focus-management" className="docs-heading-anchor">#</a>
        </h2>
        <p className="docs-paragraph" style={{ marginBottom: "16px" }}>
          By default, focus enters the first interactive element. Use <code>initialFocusRef</code> to focus a specific input, and <code>finalFocusRef</code> to restore focus upon dismissal.
        </p>
        <CodeBlock
          code={`const inputRef = React.useRef<HTMLInputElement>(null);
const triggerRef = React.useRef<HTMLButtonElement>(null);

<Dialog initialFocusRef={inputRef} finalFocusRef={triggerRef}>
  <DialogTrigger ref={triggerRef}>Edit Profile</DialogTrigger>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <Input ref={inputRef} placeholder="Display name" />
    </DialogContent>
  </DialogPortal>
</Dialog>`}
          language="tsx"
        />
      </section>

      <AccessibilitySection
        componentName="Dialog"
        roles={dialogA11yRoles}
        keyboardKeys={dialogKeyboardKeys}
      />

      <section id="api-reference" style={{ marginTop: "32px" }}>
        <h2 className="docs-heading-2">
          <span>API Reference</span>
          <a href="#api-reference" className="docs-heading-anchor">#</a>
        </h2>
        <ApiTable componentName="Dialog (DialogRoot)" props={dialogRootPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
