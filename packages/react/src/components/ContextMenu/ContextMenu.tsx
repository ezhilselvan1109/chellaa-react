"use client";

import * as React from "react";
import {
  useFloating,
  autoUpdate,
  flip,
  shift,
  type VirtualElement,
} from "@floating-ui/react";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { Portal } from "../../primitives/Portal";
import { Slot } from "../../primitives/Slot";
import {
  DropdownMenuContext,
  type DropdownMenuContextValue,
  type MenuItemRecord,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../DropdownMenu/DropdownMenu";
import type {
  ContextMenuRootProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
} from "./ContextMenu.types";

interface ContextMenuInternalValue {
  virtualRef: React.MutableRefObject<VirtualElement | null>;
}

const ContextMenuPrivateContext =
  React.createContext<ContextMenuInternalValue | null>(null);

function useContextMenuPrivate(): ContextMenuInternalValue {
  const context = React.useContext(ContextMenuPrivateContext);
  if (!context) {
    throw new Error(
      "ContextMenu subcomponents must be used within a <ContextMenu> or <ContextMenuRoot>.",
    );
  }
  return context;
}

/**
 * ContextMenuRoot - manages open state, virtual pointer anchor, and roving focus.
 */
export const ContextMenuRoot: React.FC<ContextMenuRootProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const virtualRef = React.useRef<VirtualElement | null>(null);
  const [items, setItems] = React.useState<MenuItemRecord[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);

  const registerItem = React.useCallback((item: MenuItemRecord) => {
    setItems((prev) => {
      const exists = prev.findIndex((i) => i.id === item.id);
      if (exists !== -1) {
        const copy = [...prev];
        copy[exists] = item;
        return copy;
      }
      return [...prev, item];
    });

    return () => {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    };
  }, []);

  const focusItem = React.useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndex(index);
        items[index]?.ref.current?.focus();
      }
    },
    [items],
  );

  const onOpenViaKeyboard = React.useCallback(() => {
    setIsOpen(true);
    const firstEnabled = items.findIndex((i) => !i.disabled);
    if (firstEnabled !== -1) {
      setActiveIndex(firstEnabled);
    }
  }, [items, setIsOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const menuContextValue = React.useMemo<DropdownMenuContextValue>(
    () => ({
      isOpen: !!isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
      registerItem,
      activeIndex,
      setActiveIndex,
      focusItem,
      items,
      onOpenViaKeyboard,
    }),
    [
      isOpen,
      setIsOpen,
      registerItem,
      activeIndex,
      setActiveIndex,
      focusItem,
      items,
      onOpenViaKeyboard,
    ],
  );

  const privateValue = React.useMemo(
    () => ({
      virtualRef,
    }),
    [],
  );

  return (
    <ContextMenuPrivateContext.Provider value={privateValue}>
      <DropdownMenuContext.Provider value={menuContextValue}>
        {children}
      </DropdownMenuContext.Provider>
    </ContextMenuPrivateContext.Provider>
  );
};
ContextMenuRoot.displayName = "ContextMenu.Root";

/**
 * ContextMenuTrigger - region that opens menu upon right-click or Shift+F10 / ContextMenu key.
 */
export const ContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenuTriggerProps
>(
  (
    {
      disabled = false,
      asChild = false,
      className,
      onContextMenu,
      onKeyDown,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const { setIsOpen, triggerRef, onOpenViaKeyboard } =
      React.useContext(DropdownMenuContext) as DropdownMenuContextValue;
    const { virtualRef } = useContextMenuPrivate();
    const mergedRef = useMergeRefs(triggerRef, forwardedRef);

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      onContextMenu?.(e);
      if (e.defaultPrevented || disabled) return;

      e.preventDefault();

      virtualRef.current = {
        getBoundingClientRect() {
          return {
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            bottom: e.clientY,
            left: e.clientX,
            right: e.clientX,
            width: 0,
            height: 0,
          };
        },
      };

      setIsOpen(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || disabled) return;

      if (
        e.key === "ContextMenu" ||
        (e.shiftKey && (e.key === "F10" || e.keyCode === 121))
      ) {
        e.preventDefault();

        const rect =
          triggerRef.current?.getBoundingClientRect() ?? {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
          };

        const x = rect.left + 8;
        const y = rect.top + 8;

        virtualRef.current = {
          getBoundingClientRect() {
            return {
              x,
              y,
              top: y,
              bottom: y,
              left: x,
              right: x,
              width: 0,
              height: 0,
            };
          },
        };

        onOpenViaKeyboard();
      }
    };

    const triggerClasses = [
      "cl-context-menu__trigger",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (asChild) {
      return (
        <Slot
          ref={mergedRef}
          onContextMenu={handleContextMenu}
          onKeyDown={handleKeyDown}
          className={triggerClasses}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <div
        ref={mergedRef}
        tabIndex={0}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        className={triggerClasses}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ContextMenuTrigger.displayName = "ContextMenu.Trigger";

/**
 * ContextMenuContent - floating panel positioned at the virtual coordinates.
 */
export const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(
  (
    {
      collisionPadding = 8,
      asChild = false,
      className,
      children,
      onKeyDown,
      ...props
    },
    forwardedRef,
  ) => {
    const {
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
    } = React.useContext(DropdownMenuContext) as DropdownMenuContextValue;

    const { virtualRef } = useContextMenuPrivate();

    const {
      refs,
      floatingStyles,
      isPositioned,
    } = useFloating({
      placement: "bottom-start",
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        flip({ fallbackAxisSideDirection: "start" }),
        shift({ padding: collisionPadding }),
      ],
    });

    const [contentElement, setContentElement] =
      React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (virtualRef.current) {
        refs.setReference(virtualRef.current);
      }
    }, [refs, virtualRef, isOpen]);

    const setRefCallback = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        refs.setFloating(node);
        setContentElement(node);
      },
      [contentRef, refs],
    );

    const mergedRef = useMergeRefs(setRefCallback, forwardedRef);

    // Typeahead buffer & timer
    const typeaheadBufferRef = React.useRef("");
    const typeaheadTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Focus first item when opened and portal content element is mounted
    React.useEffect(() => {
      if (isOpen && contentElement) {
        const focusFirst = () => {
          if (!contentElement) return;
          const enabledItems = Array.from(
            contentElement.querySelectorAll<HTMLElement>(
              '[role^="menuitem"]:not([aria-disabled="true"]):not([data-disabled="true"])',
            ),
          );
          if (enabledItems.length > 0) {
            enabledItems[0]?.focus();
          } else {
            contentElement.focus();
          }
        };

        focusFirst();
        const frame = requestAnimationFrame(focusFirst);
        return () => cancelAnimationFrame(frame);
      }
      return undefined;
    }, [isOpen, contentElement]);

    // Outside click dismissal
    React.useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Node | null;
        if (
          target &&
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
      };
    }, [isOpen, contentRef, triggerRef, setIsOpen]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || !contentRef.current) return;

      const enabledItems = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>(
          '[role^="menuitem"]:not([aria-disabled="true"]):not([data-disabled="true"])',
        ),
      );

      if (enabledItems.length === 0 && e.key !== "Escape") return;

      const currentFocused = document.activeElement as HTMLElement | null;
      const currentIndex = currentFocused ? enabledItems.indexOf(currentFocused) : -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex =
          currentIndex === -1 ? 0 : (currentIndex + 1) % enabledItems.length;
        enabledItems[nextIndex]?.focus();
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex =
          currentIndex === -1
            ? enabledItems.length - 1
            : (currentIndex - 1 + enabledItems.length) % enabledItems.length;
        enabledItems[prevIndex]?.focus();
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        enabledItems[0]?.focus();
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        enabledItems[enabledItems.length - 1]?.focus();
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        setIsOpen(false);
        return;
      }

      // Typeahead
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (typeaheadTimerRef.current) {
          clearTimeout(typeaheadTimerRef.current);
        }

        typeaheadBufferRef.current += e.key.toLowerCase();
        const buffer = typeaheadBufferRef.current;

        typeaheadTimerRef.current = setTimeout(() => {
          typeaheadBufferRef.current = "";
        }, 500);

        const startIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
        const reordered = [
          ...enabledItems.slice(startIndex),
          ...enabledItems.slice(0, startIndex),
        ];

        const match = reordered.find((it) =>
          it.textContent?.trim().toLowerCase().startsWith(buffer),
        );

        if (match) {
          match.focus();
        }
      }
    };

    if (!isOpen) return null;

    const contentClasses = [
      "cl-context-menu__content",
      "cl-dropdown-menu__content",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Portal>
        <div
          ref={mergedRef}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
          data-positioned={isPositioned ? "true" : "false"}
          style={{
            ...floatingStyles,
            ...props.style,
          }}
          className={contentClasses}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </Portal>
    );
  },
);
ContextMenuContent.displayName = "ContextMenu.Content";

export const ContextMenuItem = DropdownMenuItem;
export const ContextMenuCheckboxItem = DropdownMenuCheckboxItem;
export const ContextMenuRadioGroup = DropdownMenuRadioGroup;
export const ContextMenuRadioItem = DropdownMenuRadioItem;
export const ContextMenuSeparator = DropdownMenuSeparator;
export const ContextMenuLabel = DropdownMenuLabel;

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Separator: ContextMenuSeparator,
  Label: ContextMenuLabel,
});
