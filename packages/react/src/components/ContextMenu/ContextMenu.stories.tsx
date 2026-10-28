import * as React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "./ContextMenu";
import type { ContextMenuRootProps } from "./ContextMenu.types";

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

const meta: StoryMeta<ContextMenuRootProps> = {
  title: "Components/Overlays/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
};

export default meta;

export const BasicContextRegion: StoryObject<ContextMenuRootProps> = {
  render: () => (
    <div style={{ padding: "32px", display: "flex", justifyContent: "center" }}>
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            width: "360px",
            height: "220px",
            border: "2px dashed #cbd5e1",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "#f8fafc",
            cursor: "context-menu",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="14" height="20" x="5" y="2" rx="7" />
            <path d="M12 6v4" />
          </svg>
          <strong style={{ color: "#334155" }}>Right-Click Anywhere Inside</strong>
          <span style={{ fontSize: "12px", color: "#64748b" }}>
            Native menu is preserved outside this region
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent style={{ minWidth: "200px" }}>
          <ContextMenuLabel>Context Options</ContextMenuLabel>
          <ContextMenuItem onSelect={() => alert("Inspect")}>
            Inspect Element
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => alert("View Source")}>
            View Source Code
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => alert("Reload")}>
            Reload Page
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const PointerPositioning: StoryObject<ContextMenuRootProps> = {
  render: () => (
    <div style={{ padding: "32px" }}>
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            height: "260px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
            color: "#1e293b",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: "0 0 8px" }}>Virtual Pointer Coordinate Anchor</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Right click at various spots to test exact floating positioning
            </p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem disabled>Paste (Clipboard Empty)</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem defaultChecked>Show Ruler</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Snap to Grid</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const KeyboardInvocation: StoryObject<ContextMenuRootProps> = {
  render: () => (
    <div style={{ padding: "32px", display: "flex", justifyContent: "center" }}>
      <ContextMenu>
        <ContextMenuTrigger
          tabIndex={0}
          style={{
            padding: "32px",
            border: "2px solid #3b82f6",
            borderRadius: "8px",
            background: "#eff6ff",
            textAlign: "center",
            outline: "none",
          }}
        >
          <h4 style={{ margin: "0 0 8px", color: "#1d4ed8" }}>Keyboard Accessible Context Trigger</h4>
          <p style={{ margin: 0, fontSize: "13px", color: "#2563eb" }}>
            Focus this container and press <strong>Shift+F10</strong> or the <strong>ContextMenu key</strong>
          </p>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Keyboard Actions</ContextMenuLabel>
          <ContextMenuItem>Select All</ContextMenuItem>
          <ContextMenuItem>Clear Selection</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Properties</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};

export const ViewportBoundaries: StoryObject<ContextMenuRootProps> = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        height: "320px",
      }}
    >
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            display: "flex",
            alignItems: "flex-start",
            padding: "16px",
            background: "#f8fafc",
          }}
        >
          <span>Top-Left Corner Zone</span>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action A</ContextMenuItem>
          <ContextMenuItem>Action B</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <ContextMenu>
        <ContextMenuTrigger
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "16px",
            background: "#f8fafc",
          }}
        >
          <span>Bottom-Right Corner Zone (Auto Flip/Shift)</span>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Safe From Overflow</ContextMenuItem>
          <ContextMenuItem>Clamped to Viewport</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
};
