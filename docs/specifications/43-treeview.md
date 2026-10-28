# SPEC-043: TreeView Specification

## 1. Overview
The `TreeView` component is a hierarchical, accessible tree data representation control for visualizing and navigating nested data structures of arbitrary depth. It implements the WAI-ARIA Tree View pattern with roving tabIndex, expand/collapse toggles, single and multi-selection modes, disabled node states, custom node renderers, empty state handling, and keyboard navigation.

---

## 2. Public API & Type Definitions

```typescript
export interface TreeNode<TData = unknown> {
  /**
   * Unique stable identifier for the node.
   */
  id: string;

  /**
   * Node label text or element.
   */
  label: React.ReactNode;

  /**
   * Optional child tree nodes.
   */
  children?: TreeNode<TData>[];

  /**
   * Whether the node is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional custom icon rendered before the label.
   */
  icon?: React.ReactNode;

  /**
   * Arbitrary payload data associated with this node.
   */
  data?: TData;
}

export type TreeViewSelectionMode = "none" | "single" | "multi";

export interface TreeNodeState {
  isExpanded: boolean;
  isSelected: boolean;
  isFocused: boolean;
  isDisabled: boolean;
  hasChildren: boolean;
  level: number;
}

export interface TreeViewProps<TData = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Hierarchical tree data nodes.
   */
  nodes: TreeNode<TData>[];

  /**
   * Controlled array of expanded node IDs.
   */
  expandedIds?: string[];

  /**
   * Initial uncontrolled array of expanded node IDs.
   * @default []
   */
  defaultExpandedIds?: string[];

  /**
   * Callback fired when expanded node IDs change.
   */
  onExpandedChange?: (expandedIds: string[]) => void;

  /**
   * Controlled array of selected node IDs.
   */
  selectedIds?: string[];

  /**
   * Initial uncontrolled array of selected node IDs.
   * @default []
   */
  defaultSelectedIds?: string[];

  /**
   * Callback fired when selected node IDs change.
   */
  onSelectionChange?: (selectedIds: string[]) => void;

  /**
   * Selection mode for the tree.
   * @default "single"
   */
  selectionMode?: TreeViewSelectionMode;

  /**
   * Indentation in pixels per nesting level.
   * @default 20
   */
  indentSize?: number;

  /**
   * Whether all nodes are initially expanded.
   * @default false
   */
  defaultExpandAll?: boolean;

  /**
   * Custom node content renderer.
   */
  renderNode?: (node: TreeNode<TData>, state: TreeNodeState) => React.ReactNode;

  /**
   * Message or component to render when tree has no nodes.
   * @default "No items available"
   */
  emptyMessage?: React.ReactNode;

  /**
   * Accessible label for the tree.
   * @default "Tree View"
   */
  ariaLabel?: string;
}
```

---

## 3. WAI-ARIA & Keyboard Accessibility Contract

### ARIA Semantics
- **Container**: `role="tree"` with `aria-label={ariaLabel}`.
- **Node Item**: `role="treeitem"` on each interactive node element.
- **Node Expansion**:
  - If node has children: `aria-expanded={isExpanded}` (`true` or `false`).
  - If leaf node (no children): `aria-expanded` is omitted.
- **Node Selection**:
  - If `selectionMode !== "none"`: `aria-selected={isSelected}` (`true` or `false`).
  - If `selectionMode === "none"`: `aria-selected` is omitted.
- **Disabled State**: `aria-disabled={node.disabled ? "true" : undefined}`.
- **Child Collections**: Wrapped in `<div role="group">` or `<ul role="group">`.
- **Level & Position**: Nodes reflect `aria-level={level}` and hierarchical nesting within `role="group"`.

### Keyboard Navigation & Focus Management
Implements a strict **roving tabIndex** focus model:
- Only the currently focused node has `tabIndex={0}`; all other nodes have `tabIndex={-1}`.
- `ArrowDown`: Moves focus to the next visible node.
- `ArrowUp`: Moves focus to the previous visible node.
- `ArrowRight`:
  - On collapsed parent node: Expands the node.
  - On expanded parent node: Moves focus to its first child node.
  - On leaf node: No action.
- `ArrowLeft`:
  - On expanded parent node: Collapses the node.
  - On collapsed parent node or leaf node: Moves focus to its parent node.
- `Home`: Moves focus to the first visible node.
- `End`: Moves focus to the last visible node.
- `Enter` / `Space`: Toggles or updates selection for the focused node (if not disabled).
- **Descendant Focus Recovery**: If an expanded parent with a focused descendant is collapsed, focus immediately moves up to the parent node, preventing focus from getting lost inside hidden descendants.

---

## 4. Controlled & Uncontrolled Behavior
- Both `expandedIds` and `selectedIds` support controlled (`expandedIds`, `selectedIds`) and uncontrolled (`defaultExpandedIds`, `defaultSelectedIds`) usage via `useControllableState`.
- Immutability: Pure functional tree traversal algorithms; no mutation of the input `nodes` array or node objects.
- Multi-selection toggles items without mutating state; single-selection replaces previous selection.

---

## 5. CSS Architecture & Scoped Tokens
Component styles reside in `@layer cl-components` under `.cl-treeview`.
Tokens utilized:
- `--cl-color-primary`: Selected node highlight and active focus outline.
- `--cl-color-text`: Node label text color.
- `--cl-color-text-muted`: Collapsed chevron and icon colors.
- `--cl-color-surface-hover`: Hover background on tree item rows.
- `--cl-color-surface-selected`: Background for selected nodes.
- `--cl-radius-sm`: Corner radius for node focus and selection highlights.
- `--cl-transition-fast`: Smooth expansion and chevron rotation.
- `@media (prefers-reduced-motion: reduce)`: Disables chevron animation.
