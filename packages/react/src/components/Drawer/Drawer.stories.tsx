import * as React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "./Drawer";
import type { DrawerRootProps, DrawerPlacement, DrawerSize } from "./Drawer.types";
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

const meta: StoryMeta<DrawerRootProps> = {
  title: "Components/Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "full"],
    },
    open: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObject<DrawerRootProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="solid" colorScheme="primary">
            Open Right Drawer
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>User Profile</DrawerTitle>
              <DrawerDescription>View and manage account details</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p>Main content area inside the drawer.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500 }}>
                  Display Name
                  <input
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      marginTop: "4px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                    }}
                    defaultValue="Ezhil Selvan"
                  />
                </label>
                <label style={{ fontSize: "14px", fontWeight: 500 }}>
                  Email Address
                  <input
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      marginTop: "4px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      boxSizing: "border-box",
                    }}
                    defaultValue="admin@chellaa.dev"
                  />
                </label>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button variant="solid" colorScheme="primary">Save Changes</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  ),
};

export const AllPlacements: StoryObject<DrawerRootProps> = {
  render: () => {
    const PlacementsDemo = () => {
      const placements: DrawerPlacement[] = ["left", "right", "top", "bottom"];

      return (
        <div style={{ padding: "64px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {placements.map((placement) => (
            <Drawer key={placement} placement={placement}>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  {placement.toUpperCase()} Drawer
                </Button>
              </DrawerTrigger>
              <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{placement.toUpperCase()} Drawer Panel</DrawerTitle>
                    <DrawerClose />
                  </DrawerHeader>
                  <DrawerBody>
                    <p>This drawer slides in from the <strong>{placement}</strong> edge.</p>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="solid">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerPortal>
            </Drawer>
          ))}
        </div>
      );
    };

    return <PlacementsDemo />;
  },
};

export const AllSizes: StoryObject<DrawerRootProps> = {
  render: () => {
    const SizesDemo = () => {
      const sizes: DrawerSize[] = ["xs", "sm", "md", "lg", "xl", "full"];

      return (
        <div style={{ padding: "64px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {sizes.map((size) => (
            <Drawer key={size} size={size}>
              <DrawerTrigger asChild>
                <Button variant="outline">Size: {size}</Button>
              </DrawerTrigger>
              <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer Size: {size.toUpperCase()}</DrawerTitle>
                    <DrawerClose />
                  </DrawerHeader>
                  <DrawerBody>
                    <p>Standard scale styling for size <code>{size}</code>.</p>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="solid">Done</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerPortal>
            </Drawer>
          ))}
        </div>
      );
    };

    return <SizesDemo />;
  },
};

export const ControlledState: StoryObject<DrawerRootProps> = {
  render: () => {
    const ControlledDemo = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <div style={{ padding: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div>Drawer open status: <strong>{open ? "Open" : "Closed"}</strong></div>
          <Button onClick={() => setOpen(true)}>Open Programmatically</Button>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerPortal>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Controlled Drawer</DrawerTitle>
                  <DrawerClose />
                </DrawerHeader>
                <DrawerBody>
                  <p>Open state is synchronized with host state variable.</p>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Close Drawer
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        </div>
      );
    };

    return <ControlledDemo />;
  },
};

export const LongScrollableContent: StoryObject<DrawerRootProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
      <Drawer size="lg">
        <DrawerTrigger asChild>
          <Button variant="solid" colorScheme="secondary">
            View Terms & Conditions (Long Content)
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Terms of Service</DrawerTitle>
              <DrawerDescription>Scrollable long document example</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <h4 style={{ margin: "0 0 4px" }}>Section {i + 1}: Provision of Services</h4>
                  <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </p>
                </div>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="solid" colorScheme="primary">Accept & Continue</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  ),
};
