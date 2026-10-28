import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "./TreeView";
import type { TreeNode } from "./TreeView.types";

const meta: Meta<typeof TreeView> = {
  title: "Components/Data Display/TreeView",
  component: TreeView,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Hierarchical TreeView component supporting arbitrary nesting, expand/collapse, roving tabIndex keyboard navigation, single/multi-selection, disabled nodes, and custom node renderers.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const sampleNodes: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "Button.tsx", label: "Button.tsx" },
          { id: "TreeView.tsx", label: "TreeView.tsx" },
          { id: "TreeView.test.tsx", label: "TreeView.test.tsx" },
        ],
      },
      {
        id: "hooks",
        label: "hooks",
        children: [
          { id: "useControllableState.ts", label: "useControllableState.ts" },
          { id: "useMergeRefs.ts", label: "useMergeRefs.ts" },
        ],
      },
      { id: "index.ts", label: "index.ts" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "favicon.ico", label: "favicon.ico" },
      { id: "robots.txt", label: "robots.txt" },
    ],
  },
  {
    id: "package.json",
    label: "package.json",
  },
  {
    id: "tsconfig.json",
    label: "tsconfig.json",
    disabled: true,
  },
];

export const Default: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 360, border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
        <TreeView nodes={sampleNodes} defaultExpandedIds={["src", "components"]} />
      </div>
    );
  },
};

export const DeepNesting: Story = {
  render: () => {
    const deepNodes: TreeNode[] = [
      {
        id: "level-1",
        label: "Level 1",
        children: [
          {
            id: "level-2",
            label: "Level 2",
            children: [
              {
                id: "level-3",
                label: "Level 3",
                children: [
                  {
                    id: "level-4",
                    label: "Level 4",
                    children: [
                      { id: "level-5", label: "Level 5 Leaf Node" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return (
      <div style={{ maxWidth: 400, border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
        <TreeView nodes={deepNodes} defaultExpandAll />
      </div>
    );
  },
};

export const MultiSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(["Button.tsx"]);

    return (
      <div style={{ maxWidth: 360 }}>
        <p style={{ marginBottom: 8, fontSize: "0.875rem" }}>
          Selected items: {selected.join(", ") || "None"}
        </p>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
          <TreeView
            nodes={sampleNodes}
            selectionMode="multi"
            selectedIds={selected}
            onSelectionChange={setSelected}
            defaultExpandedIds={["src", "components"]}
          />
        </div>
      </div>
    );
  },
};

export const CustomRendering: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 360, border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
        <TreeView
          nodes={sampleNodes}
          defaultExpandedIds={["src"]}
          renderNode={(node, state) => (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <span>{node.label}</span>
              {state.hasChildren && (
                <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  ({node.children?.length} items)
                </span>
              )}
            </div>
          )}
        />
      </div>
    );
  },
};

export const DisabledNodes: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: 360, border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
        <TreeView nodes={sampleNodes} defaultExpandedIds={["src"]} />
      </div>
    );
  },
};
