import * as React from "react";
import { Alert } from "./Alert";
import type { AlertProps } from "./Alert.types";
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

const meta: StoryMeta<AlertProps> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["info", "success", "warning", "danger", "neutral"],
    },
    variant: {
      control: "select",
      options: ["subtle", "solid", "outline", "left-accent"],
    },
    isClosable: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObject<AlertProps> = {
  args: {
    status: "info",
    variant: "subtle",
    isClosable: false,
  },
  render: (args) => (
    <div style={{ maxWidth: "600px", padding: "24px" }}>
      <Alert {...args}>
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>System Notice</Alert.Title>
          <Alert.Description>
            Scheduled maintenance will occur tonight from 02:00 to 04:00 UTC.
          </Alert.Description>
        </Alert.Body>
      </Alert>
    </div>
  ),
};

export const AllStatuses: StoryObject<AlertProps> = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
        padding: "24px",
      }}
    >
      <Alert status="info">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Information</Alert.Title>
          <Alert.Description>
            A new version of the dashboard is available for your workspace.
          </Alert.Description>
        </Alert.Body>
      </Alert>

      <Alert status="success">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>
            Your deployment was successfully deployed to production.
          </Alert.Description>
        </Alert.Body>
      </Alert>

      <Alert status="warning">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>
            Your monthly usage has reached 85% of your plan limit.
          </Alert.Description>
        </Alert.Body>
      </Alert>

      <Alert status="danger">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Critical Failure</Alert.Title>
          <Alert.Description>
            Database connection failed. Reconnecting in 30 seconds.
          </Alert.Description>
        </Alert.Body>
      </Alert>

      <Alert status="neutral">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Neutral Notice</Alert.Title>
          <Alert.Description>
            Cookies are enabled to deliver personalized content.
          </Alert.Description>
        </Alert.Body>
      </Alert>
    </div>
  ),
};

export const AllVariants: StoryObject<AlertProps> = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
        padding: "24px",
      }}
    >
      <Alert variant="subtle" status="info">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Subtle Variant (Default)</Alert.Title>
          <Alert.Description>
            Soft tinted background with high contrast text.
          </Alert.Description>
        </Alert.Body>
      </Alert>

      <Alert variant="solid" status="success">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Solid Variant</Alert.Title>
          <Alert.Description>
            Saturated accent background with white text.
          </Alert.Description>
        </Alert.Body>
      </Alert>

      <Alert variant="outline" status="warning">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Outline Variant</Alert.Title>
          <Alert.Description>
            Transparent background with 1px semantic colored border.
          </Alert.Description>
        </Alert.Body>
      </Alert>

      <Alert variant="left-accent" status="danger">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Left Accent Variant</Alert.Title>
          <Alert.Description>
            Subtle background with prominent 4px left border accent bar.
          </Alert.Description>
        </Alert.Body>
      </Alert>
    </div>
  ),
};

export const WithCloseButton: StoryObject<AlertProps> = {
  render: () => (
    <div style={{ maxWidth: "600px", padding: "24px" }}>
      <Alert status="warning" isClosable>
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Dismissible Notice</Alert.Title>
          <Alert.Description>
            Click the close button to dismiss this announcement.
          </Alert.Description>
        </Alert.Body>
      </Alert>
    </div>
  ),
};

export const WithAction: StoryObject<AlertProps> = {
  render: () => (
    <div style={{ maxWidth: "600px", padding: "24px" }}>
      <Alert status="danger">
        <Alert.Icon />
        <Alert.Body>
          <Alert.Title>Payment Failed</Alert.Title>
          <Alert.Description>
            Unable to charge your credit card ending in 4242.
          </Alert.Description>
        </Alert.Body>
        <Alert.Action>
          <Button size="sm" variant="outline" colorScheme="danger">
            Update Card
          </Button>
        </Alert.Action>
        <Alert.CloseButton />
      </Alert>
    </div>
  ),
};
