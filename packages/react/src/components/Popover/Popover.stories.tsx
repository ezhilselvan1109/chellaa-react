import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverClose,
  PopoverBody,
  PopoverFooter,
} from "./Popover";
import type { PopoverProps, PopoverPlacement } from "./Popover.types";
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

const meta: StoryMeta<PopoverProps> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    trapFocus: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    offset: { control: "number" },
  },
};

export default meta;

export const Default: StoryObject<PopoverProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="solid" colorScheme="primary">
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverClose />
          </PopoverHeader>
          <PopoverBody>
            <p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
              Configure the dimensions for this element.
            </p>
            <div style={{ display: "grid", gap: "8px" }}>
              <label style={{ fontSize: "12px" }}>
                Width:
                <input
                  type="text"
                  defaultValue="100%"
                  style={{ width: "100%", padding: "4px 8px", marginTop: "4px" }}
                />
              </label>
              <label style={{ fontSize: "12px" }}>
                Height:
                <input
                  type="text"
                  defaultValue="auto"
                  style={{ width: "100%", padding: "4px 8px", marginTop: "4px" }}
                />
              </label>
            </div>
          </PopoverBody>
          <PopoverFooter>
            <Button size="sm" variant="outline">Reset</Button>
            <Button size="sm" variant="solid" colorScheme="primary">Save</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const FormInPopover: StoryObject<PopoverProps> = {
  render: () => {
    function EditForm() {
      const [email, setEmail] = React.useState("alex@example.com");
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Edit Email Profile</Button>
          </PopoverTrigger>
          <PopoverContent style={{ width: "320px" }}>
            <PopoverHeader>
              <PopoverTitle>Update Notification Email</PopoverTitle>
              <PopoverClose />
            </PopoverHeader>
            <PopoverBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Email updated to ${email}`);
                }}
              >
                <label style={{ display: "block", marginBottom: "8px", fontSize: "12px" }}>
                  Primary Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      marginTop: "4px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </label>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
                  <PopoverClose asChild>
                    <Button size="sm" variant="ghost">Cancel</Button>
                  </PopoverClose>
                  <Button size="sm" variant="solid" colorScheme="success" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );
    }
    return (
      <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
        <EditForm />
      </div>
    );
  },
};

const PLACEMENTS: PopoverPlacement[] = [
  "top-start",
  "top",
  "top-end",
  "right-start",
  "right",
  "right-end",
  "bottom-end",
  "bottom",
  "bottom-start",
  "left-end",
  "left",
  "left-start",
];

export const Placements: StoryObject<PopoverProps> = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "32px",
        padding: "80px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {PLACEMENTS.map((placement) => (
        <Popover key={placement} placement={placement}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {placement}
            </Button>
          </PopoverTrigger>
          <PopoverContent style={{ padding: "12px", fontSize: "13px" }}>
            <p style={{ margin: 0 }}>Anchored: {placement}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const NonModal: StoryObject<PopoverProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", gap: "24px", justifyContent: "center" }}>
      <Popover trapFocus={false}>
        <PopoverTrigger asChild>
          <Button variant="subtle">Non-Modal Popover</Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: "260px" }}>
          <PopoverHeader>
            <PopoverTitle>Info Note</PopoverTitle>
            <PopoverClose />
          </PopoverHeader>
          <PopoverBody>
            <p style={{ margin: 0, fontSize: "13px" }}>
              Focus is not trapped inside. You can tab freely to underlying page elements.
            </p>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button variant="outline">Sibling Button</Button>
    </div>
  ),
};
