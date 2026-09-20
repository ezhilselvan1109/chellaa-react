import React, { forwardRef } from "react";
import { useMenuContext } from "./MenuContext";
import type { MenuItemProps } from "./Menu.types";

export interface InternalMenuItemProps extends MenuItemProps {
  itemKey: string;
  keyPath: string[];
  level?: number;
  label?: React.ReactNode;
  itemData?: any;
}

export const MenuItem = forwardRef<HTMLLIElement, InternalMenuItemProps>(
  (
    {
      itemKey,
      keyPath,
      level = 0,
      label,
      icon,
      disabled = false,
      danger = false,
      extra,
      title,
      className,
      style,
      children,
      onClick,
      itemData,
      ...restProps
    },
    ref
  ) => {
    const {
      mode,
      inlineCollapsed,
      inlineIndent,
      selectedKeys,
      onItemClick,
      classNames,
      styles,
    } = useMenuContext();

    const isSelected = selectedKeys.includes(itemKey);

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) return;
      onClick?.({ key: itemKey, keyPath, domEvent: e, itemData });
      onItemClick(itemKey, keyPath, e, itemData);
    };

    const isInline = mode === "inline" && !inlineCollapsed;
    const content = label ?? children;

    return (
      <li
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        aria-selected={isSelected}
        title={title || (typeof content === "string" ? content : undefined)}
        tabIndex={disabled ? -1 : 0}
        className={[
          "ch-menu-item",
          isSelected ? "ch-menu-item-selected" : "",
          disabled ? "ch-menu-item-disabled" : "",
          danger ? "ch-menu-item-danger" : "",
          className,
          classNames["item"] || "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...(isInline && level > 0
            ? ({
                paddingLeft: `calc(16px + ${level} * ${inlineIndent}px)`,
              } as React.CSSProperties)
            : {}),
          ...style,
          ...styles["item"],
        }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
        {...restProps}
      >
        {icon && (
          <span
            className={["ch-menu-item-icon", classNames["itemIcon"] || ""]
              .filter(Boolean)
              .join(" ")}
            style={styles["itemIcon"]}
          >
            {icon}
          </span>
        )}
        <span
          className={["ch-menu-item-content", classNames["itemContent"] || ""]
            .filter(Boolean)
            .join(" ")}
          style={styles["itemContent"]}
        >
          {content}
        </span>
        {extra && <span className="ch-menu-item-extra">{extra}</span>}
      </li>
    );
  }
);

MenuItem.displayName = "MenuItem";
