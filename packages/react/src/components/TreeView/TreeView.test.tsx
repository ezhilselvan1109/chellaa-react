import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { TreeView } from "./TreeView";
import type { TreeNode } from "./TreeView.types";

const testNodes: TreeNode[] = [
  {
    id: "parent-1",
    label: "Parent 1",
    children: [
      { id: "child-1-1", label: "Child 1.1" },
      { id: "child-1-2", label: "Child 1.2" },
    ],
  },
  {
    id: "parent-2",
    label: "Parent 2",
    children: [
      { id: "child-2-1", label: "Child 2.1" },
    ],
  },
  {
    id: "leaf-3",
    label: "Leaf 3",
  },
  {
    id: "disabled-4",
    label: "Disabled 4",
    disabled: true,
  },
];

describe("TreeView Component", () => {
  it("renders hierarchical nodes with correct ARIA roles and semantics", () => {
    const { container } = render(
      <TreeView nodes={testNodes} defaultExpandedIds={["parent-1"]} />
    );

    const tree = screen.getByRole("tree");
    expect(tree).toBeInTheDocument();

    const parent1 = screen.getByText("Parent 1").closest('[role="treeitem"]');
    expect(parent1).toHaveAttribute("aria-expanded", "true");
    expect(parent1).toHaveAttribute("aria-level", "1");

    const child11 = screen.getByText("Child 1.1").closest('[role="treeitem"]');
    expect(child11).toBeInTheDocument();
    expect(child11).toHaveAttribute("aria-level", "2");

    const parent2 = screen.getByText("Parent 2").closest('[role="treeitem"]');
    expect(parent2).toHaveAttribute("aria-expanded", "false");

    const leaf3 = screen.getByText("Leaf 3").closest('[role="treeitem"]');
    expect(leaf3).not.toHaveAttribute("aria-expanded");

    const disabled4 = screen.getByText("Disabled 4").closest('[role="treeitem"]');
    expect(disabled4).toHaveAttribute("aria-disabled", "true");
  });

  it("handles expand and collapse via clicking the toggle button", async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={testNodes} />);

    // Initially Parent 1 is collapsed, child 1.1 should not be rendered
    expect(screen.queryByText("Child 1.1")).not.toBeInTheDocument();

    const expandBtn = screen.getByRole("button", { name: /expand parent 1/i });
    await user.click(expandBtn);

    expect(screen.getByText("Child 1.1")).toBeInTheDocument();

    const collapseBtn = screen.getByRole("button", { name: /collapse parent 1/i });
    await user.click(collapseBtn);

    expect(screen.queryByText("Child 1.1")).not.toBeInTheDocument();
  });

  it("supports controlled expandedIds", async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();

    const { rerender } = render(
      <TreeView
        nodes={testNodes}
        expandedIds={[]}
        onExpandedChange={onExpandedChange}
      />
    );

    expect(screen.queryByText("Child 1.1")).not.toBeInTheDocument();

    const expandBtn = screen.getByRole("button", { name: /expand parent 1/i });
    await user.click(expandBtn);

    expect(onExpandedChange).toHaveBeenCalledWith(["parent-1"]);

    rerender(
      <TreeView
        nodes={testNodes}
        expandedIds={["parent-1"]}
        onExpandedChange={onExpandedChange}
      />
    );

    expect(screen.getByText("Child 1.1")).toBeInTheDocument();
  });

  it("handles single selection and uncontrolled state", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <TreeView
        nodes={testNodes}
        defaultExpandedIds={["parent-1"]}
        onSelectionChange={onSelectionChange}
      />
    );

    const child = screen.getByText("Child 1.1");
    await user.click(child);

    const childItem = child.closest('[role="treeitem"]');
    expect(childItem).toHaveAttribute("aria-selected", "true");
    expect(onSelectionChange).toHaveBeenCalledWith(["child-1-1"]);
  });

  it("handles multi-selection mode", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <TreeView
        nodes={testNodes}
        defaultExpandedIds={["parent-1"]}
        selectionMode="multi"
        onSelectionChange={onSelectionChange}
      />
    );

    await user.click(screen.getByText("Child 1.1"));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["child-1-1"]);

    await user.click(screen.getByText("Child 1.2"));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["child-1-1", "child-1-2"]);
  });

  it("does not select disabled nodes", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <TreeView
        nodes={testNodes}
        onSelectionChange={onSelectionChange}
      />
    );

    await user.click(screen.getByText("Disabled 4"));
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it("supports keyboard navigation with Arrow keys and Home/End", async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={testNodes} defaultExpandedIds={["parent-1"]} />);

    const parent1 = screen.getByText("Parent 1").closest('[role="treeitem"]') as HTMLElement;
    parent1.focus();
    expect(document.activeElement).toBe(parent1);

    // ArrowDown -> Child 1.1
    await user.keyboard("{ArrowDown}");
    const child11 = screen.getByText("Child 1.1").closest('[role="treeitem"]') as HTMLElement;
    expect(document.activeElement).toBe(child11);

    // ArrowLeft -> parent 1
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(parent1);

    // ArrowLeft on expanded parent -> collapses
    await user.keyboard("{ArrowLeft}");
    expect(screen.queryByText("Child 1.1")).not.toBeInTheDocument();

    // ArrowRight on collapsed parent -> expands
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("Child 1.1")).toBeInTheDocument();

    // End -> last visible node
    await user.keyboard("{End}");
    const disabled4 = screen.getByText("Disabled 4").closest('[role="treeitem"]') as HTMLElement;
    expect(document.activeElement).toBe(disabled4);

    // Home -> first visible node
    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(parent1);
  });

  it("renders custom empty message when nodes is empty", () => {
    render(<TreeView nodes={[]} emptyMessage="No folders found" />);
    expect(screen.getByText("No folders found")).toBeInTheDocument();
  });

  it("renders custom node content via renderNode prop", () => {
    render(
      <TreeView
        nodes={testNodes}
        renderNode={(node) => <span data-testid="custom-node">{node.label} [custom]</span>}
      />
    );
    expect(screen.getByText("Parent 1 [custom]")).toBeInTheDocument();
  });

  it("recovers focus to parent when collapsing an ancestor containing the focused node", async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={testNodes} defaultExpandedIds={["parent-1"]} />);

    // Focus child 1.1
    const child11 = screen.getByText("Child 1.1").closest('[role="treeitem"]') as HTMLElement;
    child11.focus();
    expect(document.activeElement).toBe(child11);

    // Press ArrowLeft to move focus to parent
    await user.keyboard("{ArrowLeft}");
    const parent1 = screen.getByText("Parent 1").closest('[role="treeitem"]') as HTMLElement;
    expect(document.activeElement).toBe(parent1);

    // Press ArrowLeft to collapse parent
    await user.keyboard("{ArrowLeft}");
    expect(parent1).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(parent1);
  });

  it("passes axe accessibility checks with 0 violations", async () => {
    const { container } = render(
      <TreeView nodes={testNodes} defaultExpandedIds={["parent-1"]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
