import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { useMergeRefs } from "../../hooks/useMergeRefs";
import { classNames } from "../../utils/classNames";
import { Slot } from "../../primitives/Slot";
import type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsIndicatorProps,
  TabsContextValue,
  TabsOrientation,
  TabsVariant,
  TabsSize,
  TabsActivationMode,
} from "./Tabs.types";

export const TabsContext = React.createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs compound components must be rendered inside <Tabs /> or <Tabs.Root />",
    );
  }
  return context;
}

function findFirstTriggerValue(children: React.ReactNode): string | undefined {
  let found: string | undefined;
  React.Children.forEach(children, (child) => {
    if (found || !React.isValidElement(child)) return;
    const props = child.props as Record<string, unknown> | undefined;
    if (
      props &&
      typeof props.value === "string" &&
      !props.isDisabled &&
      !props.disabled
    ) {
      found = props.value;
      return;
    }
    if (props && props.children) {
      found = findFirstTriggerValue(props.children as React.ReactNode);
    }
  });
  return found;
}

/**
 * Tabs.Root (Tabs) provides context, state synchronization, and orientation management.
 */
export const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  function TabsRoot(
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      variant = "line",
      size = "md",
      activationMode = "automatic",
      isLazy = false,
      className,
      children,
      ...domProps
    },
    ref,
  ) {
    const initialDefault = React.useMemo(() => {
      if (defaultValue !== undefined) return defaultValue;
      return findFirstTriggerValue(children) ?? "";
    }, [defaultValue, children]);

    const [selectedValue, setSelectedValue] = useControllableState<string>({
      value: valueProp,
      defaultValue: initialDefault,
      onChange: onValueChange,
    });

    const generatedId = React.useId();
    const baseId = React.useMemo(
      () => generatedId.replace(/:/g, ""),
      [generatedId],
    );

    const listRef = React.useRef<HTMLDivElement | null>(null);

    const contextValue = React.useMemo<TabsContextValue>(
      () => ({
        selectedValue,
        setSelectedValue,
        orientation: orientation as TabsOrientation,
        variant: variant as TabsVariant,
        size: size as TabsSize,
        activationMode: activationMode as TabsActivationMode,
        isLazy,
        baseId,
        listRef,
      }),
      [
        selectedValue,
        setSelectedValue,
        orientation,
        variant,
        size,
        activationMode,
        isLazy,
        baseId,
      ],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={classNames(
            "cl-tabs",
            `cl-tabs--${orientation}`,
            `cl-tabs--${variant}`,
            `cl-tabs--${size}`,
            className,
          )}
          data-orientation={orientation}
          {...domProps}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

TabsRoot.displayName = "Tabs";

/**
 * Tabs.List renders the semantic role="tablist" container with roving keyboard navigation.
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    { "aria-label": ariaLabel, className, children, ...restProps },
    ref,
  ) {
    const { orientation, listRef } = useTabsContext();
    const mergedRef = useMergeRefs(ref, listRef);

    return (
      <div
        ref={mergedRef}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
        data-orientation={orientation}
        className={classNames("cl-tabs__list", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

TabsList.displayName = "Tabs.List";

/**
 * Tabs.Trigger renders the interactive tab button adhering to WAI-ARIA APG roving tabindex.
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    {
      value,
      isDisabled = false,
      asChild = false,
      className,
      children,
      onClick,
      onKeyDown,
      ...restProps
    },
    ref,
  ) {
    const {
      selectedValue,
      setSelectedValue,
      orientation,
      activationMode,
      baseId,
    } = useTabsContext();

    const isSelected = selectedValue === value;
    const triggerId = `cl-tab-${baseId}-${value}`;
    const panelId = `cl-tabpanel-${baseId}-${value}`;

    // Auto-select first tab trigger if no value or defaultValue was passed
    React.useEffect(() => {
      if (!selectedValue && !isDisabled) {
        setSelectedValue(value);
      }
    }, [selectedValue, value, isDisabled, setSelectedValue]);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
        if (!e.defaultPrevented) {
          setSelectedValue(value);
        }
      },
      [isDisabled, onClick, setSelectedValue, value],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;

        const list = e.currentTarget.closest('[role="tablist"]');
        if (!list) return;

        const triggers = Array.from(
          list.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not([disabled]):not([data-disabled])',
          ),
        );

        if (triggers.length === 0) return;

        const currentIndex = triggers.indexOf(e.currentTarget);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;
        let shouldMove = false;

        const isHorizontal = orientation === "horizontal";
        const isVertical = orientation === "vertical";

        switch (e.key) {
          case "ArrowRight":
            if (isHorizontal) {
              nextIndex = (currentIndex + 1) % triggers.length;
              shouldMove = true;
            }
            break;
          case "ArrowLeft":
            if (isHorizontal) {
              nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
              shouldMove = true;
            }
            break;
          case "ArrowDown":
            if (isVertical || isHorizontal) {
              nextIndex = (currentIndex + 1) % triggers.length;
              shouldMove = true;
            }
            break;
          case "ArrowUp":
            if (isVertical || isHorizontal) {
              nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
              shouldMove = true;
            }
            break;
          case "Home":
            nextIndex = 0;
            shouldMove = true;
            break;
          case "End":
            nextIndex = triggers.length - 1;
            shouldMove = true;
            break;
          case "Enter":
          case " ":
            if (!isDisabled) {
              e.preventDefault();
              setSelectedValue(value);
            }
            return;
          default:
            return;
        }

        if (shouldMove) {
          e.preventDefault();
          const targetTrigger = triggers[nextIndex];
          if (targetTrigger) {
            targetTrigger.focus();
            if (activationMode === "automatic") {
              const targetValue = targetTrigger.getAttribute("data-value");
              if (targetValue) {
                setSelectedValue(targetValue);
              }
            }
          }
        }
      },
      [
        onKeyDown,
        orientation,
        activationMode,
        isDisabled,
        setSelectedValue,
        value,
      ],
    );

    const triggerClasses = classNames("cl-tabs__trigger", className);

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          id={triggerId}
          role="tab"
          aria-selected={isSelected}
          aria-controls={panelId}
          tabIndex={isSelected ? 0 : -1}
          data-state={isSelected ? "active" : "inactive"}
          data-disabled={isDisabled ? "" : undefined}
          data-value={value}
          data-orientation={orientation}
          className={triggerClasses}
          onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
          onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLElement>}
          {...(restProps as Record<string, unknown>)}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={panelId}
        tabIndex={isSelected ? 0 : -1}
        disabled={isDisabled}
        data-state={isSelected ? "active" : "inactive"}
        data-disabled={isDisabled ? "" : undefined}
        data-value={value}
        data-orientation={orientation}
        className={triggerClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {children}
      </button>
    );
  },
);

TabsTrigger.displayName = "Tabs.Trigger";

/**
 * Tabs.Content renders the role="tabpanel" for a corresponding tab trigger.
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ value, className, children, ...restProps }, ref) {
    const { selectedValue, orientation, isLazy, baseId } = useTabsContext();

    const isSelected = selectedValue === value;
    const triggerId = `cl-tab-${baseId}-${value}`;
    const panelId = `cl-tabpanel-${baseId}-${value}`;

    if (isLazy && !isSelected) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={triggerId}
        tabIndex={0}
        hidden={!isSelected}
        data-state={isSelected ? "active" : "inactive"}
        data-orientation={orientation}
        className={classNames("cl-tabs__content", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

TabsContent.displayName = "Tabs.Content";

/**
 * Tabs.Indicator renders an optional visual indicator track.
 */
export const TabsIndicator = React.forwardRef<
  HTMLDivElement,
  TabsIndicatorProps
>(function TabsIndicator({ className, ...restProps }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={classNames("cl-tabs__indicator", className)}
      {...restProps}
    />
  );
});

TabsIndicator.displayName = "Tabs.Indicator";

/**
 * Compound export namespace adhering to Chellaa React standards.
 */
export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
});
