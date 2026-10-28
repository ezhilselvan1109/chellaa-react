import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  Box,
} from "@chellaa/react";

export const contextMenuToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "keyboard-invocation", title: "Keyboard Invocation" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const contextMenuTriggerPropsData: PropRow[] = [
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, disables opening the custom context menu.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description: "Merges trigger event listeners onto the immediate child element.",
  },
];

const contextMenuContentPropsData: PropRow[] = [
  {
    name: "collisionPadding",
    type: "number",
    default: "8",
    description: "Boundary distance to clamp menu from overflowing the viewport.",
  },
];

export function ContextMenuDocPage() {
  return (
    <ComponentDocLayout
      title="ContextMenu"
      description="Contextual menu anchored to pointer viewport coordinates upon right-click or Shift+F10 / ContextMenu key invocation."
      status="stable"
      version="0.2.3"
    >
      <section id="import">
        <h2>Import</h2>
        <CodeBlock
          code={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "@chellaa/react";`}
          language="tsx"
        />
      </section>

      <section id="basic-usage">
        <h2>Basic Usage</h2>
        <p>
          Wrap any component or container in a <code>ContextMenu</code> and configure the interactive area via <code>ContextMenuTrigger</code>.
        </p>
        <Box
          style={{
            padding: "32px",
            background: "var(--cl-color-bg-subtle, #f8fafc)",
            borderRadius: "8px",
            border: "1px solid var(--cl-color-border, #e2e8f0)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ContextMenu>
            <ContextMenuTrigger
              style={{
                width: "320px",
                height: "160px",
                border: "2px dashed #94a3b8",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
                cursor: "context-menu",
              }}
            >
              <strong>Right-Click or Press Shift+F10 Here</strong>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Native context menu remains untouched outside
              </span>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuItem onSelect={() => alert("Cut")}>Cut</ContextMenuItem>
              <ContextMenuItem onSelect={() => alert("Copy")}>Copy</ContextMenuItem>
              <ContextMenuItem disabled>Paste</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem defaultChecked>Word Wrap</ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
        </Box>
        <CodeBlock
          code={`<ContextMenu>
  <ContextMenuTrigger className="editor-canvas">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Actions</ContextMenuLabel>
    <ContextMenuItem onSelect={() => handleCut()}>Cut</ContextMenuItem>
    <ContextMenuItem onSelect={() => handleCopy()}>Copy</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem defaultChecked>Word Wrap</ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`}
          language="tsx"
        />
      </section>

      <section id="keyboard-invocation">
        <h2>Keyboard Invocation</h2>
        <p>
          Unlike naive right-click menus, Chellaa ContextMenu is 100% accessible to non-mouse users: focus the trigger region and press <kbd>Shift + F10</kbd> or the dedicated <kbd>ContextMenu</kbd> key.
        </p>
      </section>

      <AccessibilitySection
        componentName="ContextMenu"
        roles={[
          { attributeOrKey: 'role="menu"', description: "Applied to the floating context menu container." },
          { attributeOrKey: 'role="menuitem"', description: "Applied to individual menu action items." },
        ]}
        keyboardKeys={[
          { attributeOrKey: "Shift + F10 / ContextMenu", description: "Opens context menu relative to focused trigger region." },
          { attributeOrKey: "ArrowDown / ArrowUp", description: "Traverses menu items with roving focus." },
          { attributeOrKey: "Escape", description: "Closes context menu and returns focus to trigger element." },
        ]}
      />

      <section id="api-reference">
        <h2>API Reference</h2>
        <ApiTable componentName="ContextMenuTrigger" props={contextMenuTriggerPropsData} />
        <ApiTable componentName="ContextMenuContent" props={contextMenuContentPropsData} />
      </section>
    </ComponentDocLayout>
  );
}
