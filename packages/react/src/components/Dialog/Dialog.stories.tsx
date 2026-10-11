import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  Modal,
  DialogRoot,
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
} from "./Dialog";
import { Button } from "../Button";
import { Input } from "../Input";
import { FormField } from "../FormField";

const meta: Meta<typeof DialogRoot> = {
  title: "Components/Dialog",
  component: DialogRoot,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DialogRoot>;

export const Default: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Account Deletion</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to permanently delete your account?
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p style={{ margin: 0 }}>
                All of your saved data, including workspaces, configurations, and transaction records will be wiped immediately.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="danger">Delete Account</Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  ),
};

export const FormDialog: Story = {
  render: () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    return (
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="secondary">Invite Team Member</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation link to collaborate on this organization.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <FormField label="Full Name" isRequired>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                    />
                  </FormField>
                  <FormField label="Email Address" isRequired>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                    />
                  </FormField>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button variant="primary">Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </DialogRoot>
    );
  },
};

export const InitialFocus: Story = {
  render: () => {
    const targetInputRef = React.useRef<HTMLInputElement | null>(null);

    return (
      <DialogRoot initialFocusRef={targetInputRef}>
        <DialogTrigger asChild>
          <Button variant="primary">Edit Profile</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Quick Profile</DialogTitle>
                <DialogDescription>Auto-focus jumps directly to the username field.</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <FormField label="First Name">
                    <Input defaultValue="Alex" />
                  </FormField>
                  <FormField label="Target Username">
                    <Input ref={targetInputRef} placeholder="Target focus" defaultValue="@alexander" />
                  </FormField>
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Done</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DialogOverlay>
        </DialogPortal>
      </DialogRoot>
    );
  },
};

export const ScrollingContent: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline">Terms & Conditions</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay>
          <DialogContent size="lg">
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>Please review our terms of service carefully.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} style={{ marginBottom: "16px" }}>
                  Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              ))}
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="primary">I Agree</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<"sm" | "md" | "lg" | "xl" | "full">("md");
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {(["sm", "md", "lg", "xl", "full"] as const).map((s) => (
          <Button
            key={s}
            variant="outline"
            onClick={() => {
              setSize(s);
              setIsOpen(true);
            }}
          >
            Open {s.toUpperCase()}
          </Button>
        ))}

        <DialogRoot isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
          <DialogPortal>
            <DialogOverlay>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Size: {size.toUpperCase()}</DialogTitle>
                  <DialogDescription>
                    Currently displaying size variant: <code>{size}</code>
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <p>Dialog dimensions scale according to the active size token.</p>
                </DialogBody>
                <DialogFooter>
                  <Button variant="primary" onClick={() => setIsOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogOverlay>
          </DialogPortal>
        </DialogRoot>
      </div>
    );
  },
};

export const ModalAlias: Story = {
  render: () => (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button variant="primary">Open via Modal Alias</Button>
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Modal Compatibility Alias</Modal.Title>
              <Modal.Description>
                Demonstrates that <code>Modal</code> works seamlessly as an alias for <code>Dialog</code>.
              </Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <p>Everything functions identically under the Modal namespace.</p>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close asChild>
                <Button variant="primary">Understood</Button>
              </Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Overlay>
      </Modal.Portal>
    </Modal.Root>
  ),
};
