import * as React from "react";

export interface TreeNode<TData = unknown> {
  /**
   * Unique stable identifier for the tree node.
   */
  id: string;

  /**
   * Node label text or React element.
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
   * Accessible label for the tree landmark.
   * @default "Tree View"
   */
  ariaLabel?: string;
}
