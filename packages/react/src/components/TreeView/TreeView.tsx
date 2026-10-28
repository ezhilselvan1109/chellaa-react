import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { classNames } from "../../utils/classNames";
import type {
  TreeViewProps,
  TreeNode,
  TreeNodeState,
} from "./TreeView.types";

interface FlattenedNode<TData> {
  node: TreeNode<TData>;
  level: number;
  parentId: string | null;
}

function getAllNodeIds<T>(nodes: TreeNode<T>[]): string[] {
  const ids: string[] = [];
  function traverse(list: TreeNode<T>[]) {
    for (const item of list) {
      ids.push(item.id);
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      }
    }
  }
  traverse(nodes);
  return ids;
}

function getDescendantIds<T>(node: TreeNode<T>): string[] {
  const ids: string[] = [];
  function traverse(children: TreeNode<T>[]) {
    for (const child of children) {
      ids.push(child.id);
      if (child.children && child.children.length > 0) {
        traverse(child.children);
      }
    }
  }
  if (node.children) {
    traverse(node.children);
  }
  return ids;
}

export const TreeView = React.forwardRef(function TreeView<TData = unknown>(
  props: TreeViewProps<TData>,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    nodes = [],
    expandedIds: expandedIdsProp,
    defaultExpandedIds,
    onExpandedChange,
    selectedIds: selectedIdsProp,
    defaultSelectedIds,
    onSelectionChange,
    selectionMode = "single",
    indentSize = 20,
    defaultExpandAll = false,
    renderNode,
    emptyMessage = "No items available",
    ariaLabel = "Tree View",
    className,
    ...rest
  } = props;

  const initialExpanded = React.useMemo(() => {
    if (defaultExpandAll) {
      return getAllNodeIds(nodes);
    }
    return defaultExpandedIds ?? [];
  }, [defaultExpandAll, defaultExpandedIds, nodes]);

  const [expandedIds, setExpandedIds] = useControllableState<string[]>({
    value: expandedIdsProp,
    defaultValue: initialExpanded,
    onChange: onExpandedChange,
  });

  const [selectedIds, setSelectedIds] = useControllableState<string[]>({
    value: selectedIdsProp,
    defaultValue: defaultSelectedIds ?? [],
    onChange: onSelectionChange,
  });

  const nodeRefs = React.useRef<Map<string, HTMLElement>>(new Map());

  // Flatten currently visible nodes for keyboard navigation
  const visibleNodes = React.useMemo(() => {
    const flattened: FlattenedNode<TData>[] = [];
    const expandedSet = new Set(expandedIds);

    function walk(list: TreeNode<TData>[], level: number, parentId: string | null) {
      for (const item of list) {
        flattened.push({ node: item, level, parentId });
        if (
          item.children &&
          item.children.length > 0 &&
          expandedSet.has(item.id)
        ) {
          walk(item.children, level + 1, item.id);
        }
      }
    }

    walk(nodes, 1, null);
    return flattened;
  }, [nodes, expandedIds]);

  // Track focused node ID for roving tabIndex
  const [focusedId, setFocusedId] = React.useState<string | null>(() => {
    return visibleNodes.length > 0 ? (visibleNodes[0]?.node.id ?? null) : null;
  });

  // Keep focused ID valid within visible nodes and recover focus to visible ancestor if collapsed
  React.useEffect(() => {
    if (visibleNodes.length === 0) {
      setFocusedId(null);
      return;
    }
    if (!focusedId) return;

    const isCurrentFocusedVisible = visibleNodes.some((vn) => vn.node.id === focusedId);
    if (!isCurrentFocusedVisible) {
      // Find which visible node was the ancestor of the now-hidden focused node
      let targetId: string | null = null;
      for (const item of visibleNodes) {
        const descendants = getDescendantIds(item.node);
        if (descendants.includes(focusedId)) {
          targetId = item.node.id;
          break;
        }
      }
      const finalId = targetId ?? visibleNodes[0]?.node.id ?? null;
      if (finalId) {
        setFocusedId(finalId);
        nodeRefs.current.get(finalId)?.focus();
      }
    }
  }, [visibleNodes, focusedId]);

  const toggleExpand = React.useCallback(
    (node: TreeNode<TData>) => {
      if (!node.children || node.children.length === 0 || node.disabled) return;
      const isExpanded = expandedIds.includes(node.id);
      let newExpanded: string[];

      if (isExpanded) {
        // If currently focused node is inside the collapsing branch, move focus to this parent
        const descendants = getDescendantIds(node);
        if (focusedId && descendants.includes(focusedId)) {
          setFocusedId(node.id);
          nodeRefs.current.get(node.id)?.focus();
        }
        newExpanded = expandedIds.filter((id) => id !== node.id);
      } else {
        newExpanded = [...expandedIds, node.id];
      }

      setExpandedIds(newExpanded);
    },
    [expandedIds, focusedId, setExpandedIds]
  );

  const handleSelect = React.useCallback(
    (node: TreeNode<TData>) => {
      if (node.disabled || selectionMode === "none") return;

      if (selectionMode === "single") {
        setSelectedIds([node.id]);
      } else if (selectionMode === "multi") {
        if (selectedIds.includes(node.id)) {
          setSelectedIds(selectedIds.filter((id) => id !== node.id));
        } else {
          setSelectedIds([...selectedIds, node.id]);
        }
      }
    },
    [selectionMode, selectedIds, setSelectedIds]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent, item: FlattenedNode<TData>) => {
      const { node, parentId } = item;
      const currentIndex = visibleNodes.findIndex((vn) => vn.node.id === node.id);
      const isExpanded = expandedIds.includes(node.id);
      const hasChildren = Boolean(node.children && node.children.length > 0);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (currentIndex < visibleNodes.length - 1) {
            const nextNode = visibleNodes[currentIndex + 1];
            if (nextNode) {
              setFocusedId(nextNode.node.id);
              nodeRefs.current.get(nextNode.node.id)?.focus();
            }
          }
          break;
        }

        case "ArrowUp": {
          e.preventDefault();
          if (currentIndex > 0) {
            const prevNode = visibleNodes[currentIndex - 1];
            if (prevNode) {
              setFocusedId(prevNode.node.id);
              nodeRefs.current.get(prevNode.node.id)?.focus();
            }
          }
          break;
        }

        case "ArrowRight": {
          e.preventDefault();
          if (hasChildren) {
            if (!isExpanded) {
              toggleExpand(node);
            } else if (currentIndex < visibleNodes.length - 1) {
              const firstChild = visibleNodes[currentIndex + 1];
              if (firstChild) {
                setFocusedId(firstChild.node.id);
                nodeRefs.current.get(firstChild.node.id)?.focus();
              }
            }
          }
          break;
        }

        case "ArrowLeft": {
          e.preventDefault();
          if (hasChildren && isExpanded) {
            toggleExpand(node);
          } else if (parentId) {
            setFocusedId(parentId);
            nodeRefs.current.get(parentId)?.focus();
          }
          break;
        }

        case "Home": {
          e.preventDefault();
          const first = visibleNodes[0];
          if (first) {
            setFocusedId(first.node.id);
            nodeRefs.current.get(first.node.id)?.focus();
          }
          break;
        }

        case "End": {
          e.preventDefault();
          const last = visibleNodes[visibleNodes.length - 1];
          if (last) {
            setFocusedId(last.node.id);
            nodeRefs.current.get(last.node.id)?.focus();
          }
          break;
        }

        case "Enter":
        case " ": {
          e.preventDefault();
          handleSelect(node);
          break;
        }

        default:
          break;
      }
    },
    [visibleNodes, expandedIds, toggleExpand, handleSelect]
  );

  const renderTreeGroup = (items: TreeNode<TData>[], level: number): React.ReactNode => {
    return (
      <ul
        role={level === 1 ? "tree" : "group"}
        aria-label={level === 1 ? ariaLabel : undefined}
        className={classNames(
          "cl-treeview__group",
          level === 1 && "cl-treeview__root-group"
        )}
      >
        {items.map((node) => {
          const hasChildren = Boolean(node.children && node.children.length > 0);
          const isExpanded = expandedIds.includes(node.id);
          const isSelected = selectedIds.includes(node.id);
          const isFocused = focusedId === node.id || (!focusedId && visibleNodes[0]?.node.id === node.id);
          const isDisabled = Boolean(node.disabled);

          const state: TreeNodeState = {
            isExpanded,
            isSelected,
            isFocused,
            isDisabled,
            hasChildren,
            level,
          };

          const flattenedItem: FlattenedNode<TData> = {
            node,
            level,
            parentId: null,
          };

          return (
            <li
              key={node.id}
              role="treeitem"
              id={`cl-treeview-node-${node.id}`}
              ref={(el) => {
                if (el) {
                  nodeRefs.current.set(node.id, el);
                } else {
                  nodeRefs.current.delete(node.id);
                }
              }}
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={selectionMode !== "none" ? isSelected : undefined}
              aria-disabled={isDisabled ? true : undefined}
              aria-level={level}
              tabIndex={isFocused ? 0 : -1}
              className={classNames(
                "cl-treeview__node",
                isSelected && "cl-treeview__node--selected",
                isDisabled && "cl-treeview__node--disabled",
                isFocused && "cl-treeview__node--focused"
              )}
              onFocus={() => setFocusedId(node.id)}
              onKeyDown={(e) => {
                const currentFlat = visibleNodes.find((vn) => vn.node.id === node.id) ?? flattenedItem;
                handleKeyDown(e, currentFlat);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedId(node.id);
                if (!isDisabled) {
                  handleSelect(node);
                }
              }}
            >
              <div
                className="cl-treeview__node-content"
                style={{ paddingLeft: `${(level - 1) * indentSize}px` }}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={isExpanded ? `Collapse ${typeof node.label === "string" ? node.label : "node"}` : `Expand ${typeof node.label === "string" ? node.label : "node"}`}
                    className={classNames(
                      "cl-treeview__toggle-btn",
                      isExpanded && "cl-treeview__toggle-btn--expanded"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleExpand(node);
                    }}
                  >
                    <svg
                      className="cl-treeview__chevron-icon"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <span className="cl-treeview__toggle-placeholder" aria-hidden="true" />
                )}

                {node.icon && (
                  <span className="cl-treeview__node-icon" aria-hidden="true">
                    {node.icon}
                  </span>
                )}

                {renderNode ? (
                  renderNode(node, state)
                ) : (
                  <span className="cl-treeview__node-label">{node.label}</span>
                )}
              </div>

              {hasChildren && isExpanded && node.children && (
                renderTreeGroup(node.children, level + 1)
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      ref={ref}
      className={classNames("cl-treeview", className)}
      {...rest}
    >
      {nodes.length === 0 ? (
        <div className="cl-treeview__empty" role="status">{emptyMessage}</div>
      ) : (
        renderTreeGroup(nodes, 1)
      )}
    </div>
  );
}) as <TData = unknown>(
  props: TreeViewProps<TData> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
