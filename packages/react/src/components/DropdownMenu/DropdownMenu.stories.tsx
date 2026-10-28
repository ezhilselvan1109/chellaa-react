import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./DropdownMenu";
import type { DropdownMenuRootProps } from "./DropdownMenu.types";
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

const meta: StoryMeta<DropdownMenuRootProps> = {
  title: "Components/Overlays/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObject<DropdownMenuRootProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="solid" colorScheme="primary">
            Actions ▾
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage Account</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => alert("Profile selected")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => alert("Billing selected")}>
            Billing & Invoices
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => alert("Settings selected")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => alert("Logout selected")}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const ItemVariants: StoryObject<DropdownMenuRootProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Options ▾</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{ minWidth: "220px" }}>
          <DropdownMenuLabel>File Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <span>📄</span> New Document
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>📁</span> Open Folder
          </DropdownMenuItem>
          <DropdownMenuItem inset>
            Duplicate (Inset)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <span>🔒</span> Restricted Admin Access
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const CheckboxItems: StoryObject<DropdownMenuRootProps> = {
  render: () => {
    const CheckboxDemo = () => {
      const [showStatus, setShowStatus] = React.useState(true);
      const [showToolbar, setShowToolbar] = React.useState(false);
      const [enableSync, setEnableSync] = React.useState(true);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">View Preferences ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ minWidth: "220px" }}>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatus}
              onCheckedChange={setShowStatus}
            >
              Show Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showToolbar}
              onCheckedChange={setShowToolbar}
            >
              Show Tool Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={enableSync}
              onCheckedChange={setEnableSync}
            >
              Realtime Cloud Sync
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    return (
      <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
        <CheckboxDemo />
      </div>
    );
  },
};

export const RadioGroups: StoryObject<DropdownMenuRootProps> = {
  render: () => {
    const RadioDemo = () => {
      const [view, setView] = React.useState("grid");
      const [sort, setSort] = React.useState("date");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter & Layout ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ minWidth: "200px" }}>
            <DropdownMenuLabel>Layout View</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={view} onValueChange={setView}>
              <DropdownMenuRadioItem value="list">List View</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="grid">Grid View</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="table">Table View</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="date">Creation Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Alphabetical</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="size">File Size</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    return (
      <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
        <RadioDemo />
      </div>
    );
  },
};

export const DisabledItems: StoryObject<DropdownMenuRootProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="solid" colorScheme="secondary">
            Settings ▾
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Available Action</DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled Option 1</DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled Option 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Another Available</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const Controlled: StoryObject<DropdownMenuRootProps> = {
  render: () => {
    const ControlledDemo = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <div>Status: <strong>{open ? "Open" : "Closed"}</strong></div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button size="sm" onClick={() => setOpen(!open)}>
              External Toggle
            </Button>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="solid">Menu Trigger ▾</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  Controlled Action 1
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  Controlled Action 2
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      );
    };

    return (
      <div style={{ padding: "64px", display: "flex", justifyContent: "center" }}>
        <ControlledDemo />
      </div>
    );
  },
};

export const ViewportCollision: StoryObject<DropdownMenuRootProps> = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "300px",
        padding: "16px",
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Left Boundary ▾</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuItem>Auto Flipped</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Right Boundary ▾</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuItem>Auto Flipped</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const KeyboardInteraction: StoryObject<DropdownMenuRootProps> = {
  render: () => (
    <div style={{ padding: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
        Focus button and press <strong>Enter</strong> or <strong>ArrowDown</strong>. Navigate with <strong>Arrow keys</strong>, <strong>Home</strong>, <strong>End</strong>, or type letters.
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="solid" colorScheme="primary">
            Keyboard Navigable Menu ▾
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Apple</DropdownMenuItem>
          <DropdownMenuItem>Banana</DropdownMenuItem>
          <DropdownMenuItem>Cherry</DropdownMenuItem>
          <DropdownMenuItem disabled>Date (Disabled)</DropdownMenuItem>
          <DropdownMenuItem>Elderberry</DropdownMenuItem>
          <DropdownMenuItem>Fig</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
