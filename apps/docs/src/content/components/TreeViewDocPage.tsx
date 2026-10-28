import { ComponentDocLayout } from "../../components/ComponentDoc/ComponentDocLayout";
import { ApiTable, PropRow } from "../../components/ComponentDoc/ApiTable";
import { AccessibilitySection } from "../../components/ComponentDoc/AccessibilitySection";
import { CodeBlock } from "../../components/Common/CodeBlock";
import { TreeView } from "@chellaa/react";
import type { TreeNode } from "@chellaa/react";

export const treeViewToc = [
  { id: "import", title: "Import" },
  { id: "basic-usage", title: "Basic Usage" },
  { id: "selection-modes", title: "Selection Modes" },
  { id: "deep-nesting", title: "Deep Nesting" },
  { id: "accessibility", title: "Accessibility" },
  { id: "api-reference", title: "API Reference" },
];

const treeViewPropsData: PropRow[] = [
  {
    name: "nodes",
    type: "TreeNode<TData>[]",
    default: "[]",
    description: "Hierarchical tree nodes array with id, label, children, and disabled.",
  },
  {
    name: "expandedIds",
    type: "string[]",
    default: "undefined",
    description: "Controlled array of expanded node IDs.",
  },
  {
    name: "defaultExpandedIds",
    type: "string[]",
    default: "[]",
    description: "Initial expanded node IDs in uncontrolled mode.",
  },
  {
    name: "onExpandedChange",
    type: "(ids: string[]) => void",
    default: "undefined",
    description: "Callback fired when expanded nodes change.",
  },
  {
    name: "selectedIds",
    type: "string[]",
    default: "undefined",
    description: "Controlled array of selected node IDs.",
  },
  {
    name: "defaultSelectedIds",
    type: "string[]",
    default: "[]",
    description: "Initial selected node IDs in uncontrolled mode.",
  },
  {
    name: "onSelectionChange",
    type: "(ids: string[]) => void",
    default: "undefined",
    description: "Callback fired when selected nodes change.",
  },
  {
    name: "selectionMode",
    type: "'single' | 'multi' | 'none'",
    default: "'single'",
    description: "Selection mode for nodes in the tree.",
  },
  {
    name: "indentSize",
    type: "number",
    default: "20",
    description: "Pixel indentation per nesting level.",
  },
  {
    name: "defaultExpandAll",
    type: "boolean",
    default: "false",
    description: "Whether all nodes are initially expanded.",
  },
  {
    name: "renderNode",
    type: "(node: TreeNode, state: TreeNodeState) => ReactNode",
    default: "undefined",
    description: "Custom content renderer for tree items.",
  },
  {
    name: "emptyMessage",
    type: "ReactNode",
    default: "'No items available'",
    description: "Message rendered when the tree has zero nodes.",
  },
  {
    name: "ariaLabel",
    type: "string",
    default: "'Tree View'",
    description: "Accessible name for the tree landmark region.",
  },
];

const sampleTree: TreeNode[] = [
  {
    id: "components",
    label: "components",
    children: [
      { id: "Button.tsx", label: "Button.tsx" },
      { id: "TreeView.tsx", label: "TreeView.tsx" },
      { id: "Carousel.tsx", label: "Carousel.tsx" },
    ],
  },
  {
    id: "utils",
    label: "utils",
    children: [
      { id: "date.ts", label: "date.ts" },
      { id: "classNames.ts", label: "classNames.ts" },
    ],
  },
  {
    id: "package.json",
    label: "package.json",
  },
];

export function TreeViewDocPage() {
  return (
    <ComponentDocLayout
      title="TreeView"
      description="Hierarchical tree representation component implementing the WAI-ARIA Tree View pattern with roving tabIndex, expand/collapse toggles, and single/multi-selection."
    >
      <div id="import" style={{ marginBottom: "2rem" }}>
        <h2>Import</h2>
        <CodeBlock
          code={`import { TreeView } from "@chellaa/react";\nimport type { TreeNode, TreeViewProps } from "@chellaa/react";`}
          language="tsx"
        />
      </div>

      <div id="basic-usage" style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <p>Render a nested folder tree with expand/collapse and roving keyboard focus:</p>
        <div style={{ maxWidth: 400, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <TreeView nodes={sampleTree} defaultExpandedIds={["components"]} />
        </div>
      </div>

      <div id="selection-modes" style={{ marginBottom: "2rem" }}>
        <h2>Selection Modes</h2>
        <p>Support for single or multi-selection with toggle behavior:</p>
        <div style={{ maxWidth: 400, padding: 16, border: "1px solid var(--cl-color-border-subtle)", borderRadius: 8, marginTop: 12 }}>
          <TreeView
            nodes={sampleTree}
            selectionMode="multi"
            defaultExpandedIds={["components", "utils"]}
            defaultSelectedIds={["Button.tsx", "date.ts"]}
          />
        </div>
      </div>

      <div id="deep-nesting" style={{ marginBottom: "2rem" }}>
        <h2>Deep Nesting</h2>
        <p>Tree with arbitrary depth and automatic indentation calculation:</p>
        <CodeBlock
          code={`<TreeView nodes={deepData} defaultExpandAll indentSize={24} />`}
          language="tsx"
        />
      </div>

      <div id="accessibility" style={{ marginBottom: "2rem" }}>
        <AccessibilitySection
          componentName="TreeView"
          roles={[
            { attributeOrKey: "role='tree'", description: "Applied to the root tree list element." },
            { attributeOrKey: "role='treeitem'", description: "Applied to each interactive node item." },
            { attributeOrKey: "role='group'", description: "Applied to nested child groups." },
            { attributeOrKey: "aria-expanded", description: "Set on nodes containing children to indicate expanded/collapsed state." },
            { attributeOrKey: "aria-selected", description: "Communicates selection state when selectionMode is not 'none'." },
          ]}
          keyboardKeys={[
            { attributeOrKey: "ArrowDown / ArrowUp", description: "Navigates between visible nodes." },
            { attributeOrKey: "ArrowRight", description: "Expands collapsed parent or moves to first child." },
            { attributeOrKey: "ArrowLeft", description: "Collapses expanded parent or moves to parent." },
            { attributeOrKey: "Home / End", description: "Moves focus to first / last visible node." },
            { attributeOrKey: "Enter / Space", description: "Selects or activates the focused node." },
          ]}
        />
      </div>

      <div id="api-reference" style={{ marginBottom: "2rem" }}>
        <h2>API Reference</h2>
        <ApiTable componentName="TreeView" props={treeViewPropsData} />
      </div>
    </ComponentDocLayout>
  );
}
