"use client";

import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  type Placement,
} from "@floating-ui/react";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { Portal } from "../../primitives/Portal";
import { Slot } from "../../primitives/Slot";
import type {
  DropdownMenuRootProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuLabelProps,
  DropdownMenuSide,
  DropdownMenuAlign,
} from "./DropdownMenu.types";

export interface MenuItemRecord {
  id: string;
  ref: React.RefObject<HTMLElement | null>;
  disabled: boolean;
  textValue: string;
}

export interface DropdownMenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  registerItem: (item: MenuItemRecord) => () => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  focusItem: (index: number) => void;
  items: MenuItemRecord[];
  onOpenViaKeyboard: () => void;
}

export const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenuContext(componentName: string): DropdownMenuContextValue {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      `<DropdownMenu.${componentName}> must be used within a <DropdownMenu> or <DropdownMenuRoot>.`,
    );
  }
  return context;
}

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (val: string) => void;
}

export const DropdownMenuRadioContext =
  React.createContext<RadioGroupContextValue | null>(null);

function toPlacement(
  side: DropdownMenuSide = "bottom",
  align: DropdownMenuAlign = "start",
): Placement {
  if (align === "center") {
    return side;
  }
  return `${side}-${align}` as Placement;
}

/**
 * DropdownMenuRoot component managing open state, keyboard navigation, and item registration.
 */
export const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = ({
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
    // Find first enabled item
    const firstEnabled = items.findIndex((i) => !i.disabled);
    if (firstEnabled !== -1) {
      setActiveIndex(firstEnabled);
    }
  }, [items, setIsOpen]);

  // When menu closes, reset active index
  React.useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const contextValue = React.useMemo<DropdownMenuContextValue>(
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

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      {children}
    </DropdownMenuContext.Provider>
  );
};
DropdownMenuRoot.displayName = "DropdownMenu.Root";

/**
 * DropdownMenuTrigger - button that toggles the dropdown menu.
 */
export const DropdownMenuTrigger = React.forwardRef<
  HTMLElement,
  DropdownMenuTriggerProps
>(({ asChild = false, onClick, onKeyDown, children, className, ...props }, forwardedRef) => {
  const { isOpen, setIsOpen, triggerRef, onOpenViaKeyboard } =
    useDropdownMenuContext("Trigger");
  const mergedRef = useMergeRefs(triggerRef, forwardedRef);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenViaKeyboard();
    }
  };

  const triggerClasses = [
    "cl-dropdown-menu__trigger",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    return (
      <Slot
        ref={mergedRef}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={triggerClasses}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={mergedRef as React.Ref<HTMLButtonElement>}
      type="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={triggerClasses}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";

/**
 * DropdownMenuContent - floating panel containing menu items.
 */
export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    {
      side = "bottom",
      align = "start",
      sideOffset = 4,
      alignOffset = 0,
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
    } = useDropdownMenuContext("Content");

    const placement = toPlacement(side, align);

    const {
      refs,
      floatingStyles,
      isPositioned,
    } = useFloating({
      placement,
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset({ mainAxis: sideOffset, crossAxis: alignOffset }),
        flip({ fallbackAxisSideDirection: "start" }),
        shift({ padding: collisionPadding }),
      ],
    });

    const [contentElement, setContentElement] =
      React.useState<HTMLDivElement | null>(null);

    // Sync floating reference with trigger element
    React.useEffect(() => {
      if (triggerRef.current) {
        refs.setReference(triggerRef.current);
      }
    }, [refs, triggerRef]);

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

    // Initial focus when opened and portal content element is mounted
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

      // Typeahead character matching
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
          data-side={side}
          data-align={align}
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
DropdownMenuContent.displayName = "DropdownMenu.Content";

let itemIdCounter = 0;

/**
 * DropdownMenuItem - selectable action inside menu.
 */
export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(
  (
    {
      disabled = false,
      inset = false,
      onSelect,
      closeOnSelect = true,
      asChild = false,
      className,
      children,
      onClick,
      onKeyDown,
      onMouseEnter,
      ...props
    },
    forwardedRef,
  ) => {
    const {
      setIsOpen,
      triggerRef,
      registerItem,
    } = useDropdownMenuContext("Item");

    const idRef = React.useRef<string>("");
    if (!idRef.current) {
      idRef.current = `cl-dropdown-item-${++itemIdCounter}`;
    }

    const internalRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(internalRef, forwardedRef);

    // Extract text content for typeahead
    const [textValue, setTextValue] = React.useState("");

    React.useEffect(() => {
      if (internalRef.current) {
        setTextValue(internalRef.current.textContent?.trim() || "");
      }
    }, [children]);

    React.useEffect(() => {
      return registerItem({
        id: idRef.current,
        ref: internalRef,
        disabled,
        textValue,
      });
    }, [registerItem, disabled, textValue]);

    const handleSelect = () => {
      if (disabled) return;
      onSelect?.();
      if (closeOnSelect) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || disabled) return;
      handleSelect();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || disabled) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect();
      }
    };

    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      props.onFocus?.(e);
      if (!disabled) {
        setIsFocused(true);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      props.onBlur?.(e);
      setIsFocused(false);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      if (!disabled && internalRef.current) {
        internalRef.current.focus();
      }
    };

    const itemClasses = [
      "cl-dropdown-menu__item",
      disabled && "cl-dropdown-menu__item--disabled",
      inset && "cl-dropdown-menu__item--inset",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={mergedRef}
        role="menuitem"
        id={idRef.current}
        tabIndex={disabled ? -1 : (isFocused ? 0 : -1)}
        aria-disabled={disabled ? "true" : undefined}
        data-highlighted={isFocused ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        className={itemClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DropdownMenuItem.displayName = "DropdownMenu.Item";

/**
 * DropdownMenuCheckboxItem - togglable checkbox item.
 */
export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      closeOnSelect = false,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const [isChecked, setIsChecked] = useControllableState<boolean>({
      value: controlledChecked,
      defaultValue: defaultChecked,
      onChange: onCheckedChange,
    });

    const handleSelect = () => {
      setIsChecked(!isChecked);
    };

    return (
      <DropdownMenuItem
        ref={forwardedRef}
        role="menuitemcheckbox"
        aria-checked={!!isChecked}
        closeOnSelect={closeOnSelect}
        onSelect={handleSelect}
        {...props}
      >
        <span
          className="cl-dropdown-menu__item-indicator"
          aria-hidden="true"
        >
          {isChecked ? "✓" : ""}
        </span>
        {children}
      </DropdownMenuItem>
    );
  },
);
DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";

/**
 * DropdownMenuRadioGroup - container for mutually exclusive radio items.
 */
export const DropdownMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioGroupProps
>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      className,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const [value, setValue] = useControllableState<string>({
      value: controlledValue,
      defaultValue: defaultValue ?? "",
      onChange: onValueChange,
    });

    const groupClasses = [
      "cl-dropdown-menu__radio-group",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <DropdownMenuRadioContext.Provider value={{ value, onValueChange: setValue }}>
        <div
          ref={forwardedRef}
          role="group"
          className={groupClasses}
          {...props}
        >
          {children}
        </div>
      </DropdownMenuRadioContext.Provider>
    );
  },
);
DropdownMenuRadioGroup.displayName = "DropdownMenu.RadioGroup";

/**
 * DropdownMenuRadioItem - single radio option inside a DropdownMenuRadioGroup.
 */
export const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemProps
>(
  (
    {
      value,
      closeOnSelect = false,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const group = React.useContext(DropdownMenuRadioContext);
    const isChecked = group?.value === value;

    const handleSelect = () => {
      group?.onValueChange?.(value);
    };

    return (
      <DropdownMenuItem
        ref={forwardedRef}
        role="menuitemradio"
        aria-checked={isChecked}
        closeOnSelect={closeOnSelect}
        onSelect={handleSelect}
        {...props}
      >
        <span
          className="cl-dropdown-menu__item-indicator"
          aria-hidden="true"
        >
          {isChecked ? "●" : ""}
        </span>
        {children}
      </DropdownMenuItem>
    );
  },
);
DropdownMenuRadioItem.displayName = "DropdownMenu.RadioItem";

/**
 * DropdownMenuSeparator - visual and semantic separator between items.
 */
export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, forwardedRef) => {
  const separatorClasses = [
    "cl-dropdown-menu__separator",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={forwardedRef}
      role="separator"
      className={separatorClasses}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenu.Separator";

/**
 * DropdownMenuLabel - non-interactive section header inside a menu.
 */
export const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(({ inset = false, className, children, ...props }, forwardedRef) => {
  const labelClasses = [
    "cl-dropdown-menu__label",
    inset && "cl-dropdown-menu__label--inset",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={forwardedRef}
      role="presentation"
      className={labelClasses}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuLabel.displayName = "DropdownMenu.Label";

/**
 * DropdownMenu Compound Component
 */
export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Label: DropdownMenuLabel,
});
