import * as React from "react";
import {
  Snackbar,
  ToastProvider,
  useToast,
  type SnackbarProps,
  type ToastPosition,
} from "./index";
import { Button } from "../Button/Button";

export interface StoryMeta<T> {
  title: string;
  component?: React.ComponentType<T>;
  tags?: string[];
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}

export interface StoryObject<T> {
  args?: Partial<T>;
  render?: (args: T) => React.ReactNode;
}

const meta: StoryMeta<SnackbarProps> = {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["info", "success", "warning", "danger", "neutral"],
    },
    position: {
      control: "select",
      options: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
      ],
    },
    isClosable: { control: "boolean" },
    duration: { control: "number" },
  },
};

export default meta;

function ImperativeDemo() {
  const toast = useToast();

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", padding: "32px" }}>
      <Button
        variant="solid"
        colorScheme="primary"
        onClick={() =>
          toast({
            title: "Info Notification",
            description: "Here are some details about your action.",
            status: "info",
          })
        }
      >
        Trigger Info
      </Button>

      <Button
        variant="solid"
        colorScheme="neutral"
        onClick={() =>
          toast({
            title: "Success Notification",
            description: "The file was uploaded successfully.",
            status: "success",
          })
        }
      >
        Trigger Success
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Warning Notification",
            description: "Your session will expire in 5 minutes.",
            status: "warning",
          })
        }
      >
        Trigger Warning
      </Button>

      <Button
        variant="solid"
        colorScheme="danger"
        onClick={() =>
          toast({
            title: "Danger Notification",
            description: "Connection dropped. Attempting to reconnect.",
            status: "danger",
          })
        }
      >
        Trigger Danger
      </Button>
    </div>
  );
}

export const ImperativePlayground: StoryObject<SnackbarProps> = {
  render: () => (
    <ToastProvider>
      <ImperativeDemo />
    </ToastProvider>
  ),
};

function AllPositionsDemo() {
  const toast = useToast();
  const positions: ToastPosition[] = [
    "top-left",
    "top",
    "top-right",
    "bottom-left",
    "bottom",
    "bottom-right",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        padding: "32px",
      }}
    >
      {positions.map((pos) => (
        <Button
          key={pos}
          variant="outline"
          onClick={() =>
            toast({
              title: `Toast at ${pos}`,
              position: pos,
              status: "info",
            })
          }
        >
          {pos}
        </Button>
      ))}
    </div>
  );
}

export const AllPositions: StoryObject<SnackbarProps> = {
  render: () => (
    <ToastProvider>
      <AllPositionsDemo />
    </ToastProvider>
  ),
};

function WithActionDemo() {
  const toast = useToast();

  return (
    <div style={{ padding: "32px" }}>
      <Button
        variant="solid"
        colorScheme="danger"
        onClick={() =>
          toast({
            title: "Item moved to trash",
            status: "info",
            action: (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => alert("Undo clicked!")}
              >
                Undo
              </Button>
            ),
          })
        }
      >
        Delete Item (With Undo Action)
      </Button>
    </div>
  );
}

export const WithAction: StoryObject<SnackbarProps> = {
  render: () => (
    <ToastProvider>
      <WithActionDemo />
    </ToastProvider>
  ),
};

function PersistentToastDemo() {
  const toast = useToast();

  return (
    <div style={{ padding: "32px" }}>
      <Button
        variant="solid"
        colorScheme="primary"
        onClick={() =>
          toast({
            title: "Persistent Announcement",
            description: "This notification will stay open until manually dismissed.",
            duration: null,
            status: "warning",
          })
        }
      >
        Trigger Persistent Toast
      </Button>
    </div>
  );
}

export const PersistentToast: StoryObject<SnackbarProps> = {
  render: () => (
    <ToastProvider>
      <PersistentToastDemo />
    </ToastProvider>
  ),
};

export const DeclarativeSnackbarStory: StoryObject<SnackbarProps> = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ padding: "32px" }}>
        <Button onClick={() => setOpen(true)}>Open Declarative Snackbar</Button>
        <Snackbar
          isOpen={open}
          message="Declarative notice displayed"
          description="Click dismiss to close"
          status="success"
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
