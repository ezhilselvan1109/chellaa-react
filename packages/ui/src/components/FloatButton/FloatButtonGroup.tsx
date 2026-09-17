import React, { useState, useRef, useEffect, forwardRef } from "react";
import type { FloatButtonGroupProps } from "./FloatButton.types";
import { FloatButtonGroupContext } from "./FloatButtonContext";
import { FloatButton } from "./FloatButton";

const DefaultMenuIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const DefaultCloseIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const FloatButtonGroup = forwardRef<HTMLDivElement, FloatButtonGroupProps>(
  (
    {
      shape = "circle",
      trigger,
      open: propOpen,
      defaultOpen = false,
      onOpenChange,
      closeIcon,
      placement = "top",
      icon,
      description,
      tooltip,
      type = "default",
      badge,
      classNames,
      styles,
      onClick,
      children,
      className,
      style,
      ...restProps
    },
    ref
  ) => {
    const isControlled = propOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? propOpen : internalOpen;

    const groupRef = useRef<HTMLDivElement>(null);

    const setOpen = (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    };

    const handleTriggerClick = (e: React.MouseEvent<HTMLElement>) => {
      if (trigger === "click") {
        setOpen(!isOpen);
      }
      onClick?.(e);
    };

    const handleMouseEnter = () => {
      if (trigger === "hover") {
        setOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === "hover") {
        setOpen(false);
      }
    };

    // Close menu when clicking outside if trigger is click
    useEffect(() => {
      if (trigger !== "click" || !isOpen) return;

      const handlePointerDownOutside = (e: MouseEvent | TouchEvent) => {
        if (
          groupRef.current &&
          !groupRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handlePointerDownOutside);
      document.addEventListener("touchstart", handlePointerDownOutside);

      return () => {
        document.removeEventListener("mousedown", handlePointerDownOutside);
        document.removeEventListener("touchstart", handlePointerDownOutside);
      };
    }, [trigger, isOpen]);

    const isMenuMode = !!trigger;

    const rootClasses = [
      "ch-float-btn-group",
      `ch-float-btn-group--placement-${placement}`,
      classNames?.root,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const rootStyle: React.CSSProperties = {
      ...styles?.root,
      ...style,
    };

    // Render static group when trigger is not provided
    if (!isMenuMode) {
      return (
        <FloatButtonGroupContext.Provider value={{ shape, inGroup: true }}>
          <div
            ref={ref}
            className={rootClasses}
            style={rootStyle}
            role="group"
            {...restProps}
          >
            {children}
          </div>
        </FloatButtonGroupContext.Provider>
      );
    }

    // Menu Mode with Trigger button and expandable list
    const activeCloseIcon = closeIcon ?? <DefaultCloseIcon />;
    const activeMenuIcon = icon ?? <DefaultMenuIcon />;

    return (
      <FloatButtonGroupContext.Provider value={{ shape, inGroup: true }}>
        <div
          ref={groupRef}
          className={rootClasses}
          style={rootStyle}
          data-open={isOpen ? "true" : "false"}
          role="group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          <div
            className={["ch-float-btn-group-list", classNames?.list].filter(Boolean).join(" ")}
            style={styles?.list}
            data-open={isOpen ? "true" : "false"}
            aria-hidden={!isOpen}
          >
            {children}
          </div>

          <FloatButton
            shape={shape}
            type={type}
            badge={badge}
            tooltip={tooltip}
            description={description}
            className={["ch-float-btn-trigger", classNames?.trigger].filter(Boolean).join(" ")}
            style={styles?.trigger}
            onClick={handleTriggerClick}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            icon={
              <span
                className={[
                  "ch-float-btn-trigger-icon",
                  classNames?.triggerIcon,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={styles?.triggerIcon}
              >
                {isOpen ? activeCloseIcon : activeMenuIcon}
              </span>
            }
          />
        </div>
      </FloatButtonGroupContext.Provider>
    );
  }
);

FloatButtonGroup.displayName = "FloatButton.Group";
