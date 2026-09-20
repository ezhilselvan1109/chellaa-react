import React, { forwardRef } from "react";
import type { MenuItemGroupProps } from "./Menu.types";

export interface InternalMenuItemGroupProps extends MenuItemGroupProps {
  label?: React.ReactNode;
  itemKey?: string;
  keyPath?: string[];
  level?: number;
}

export const MenuItemGroup = forwardRef<HTMLLIElement, InternalMenuItemGroupProps>(
  (
    {
      title,
      label,
      className,
      style,
      children,
      itemKey,
      keyPath,
      level,
      ...restProps
    },
    ref
  ) => {
    const groupTitle = label ?? title;

    return (
      <li
        ref={ref}
        role="group"
        className={["ch-menu-item-group", className].filter(Boolean).join(" ")}
        style={style}
        {...restProps}
      >
        {groupTitle && (
          <div className="ch-menu-item-group-title">{groupTitle}</div>
        )}
        <ul className="ch-menu-item-group-list">{children}</ul>
      </li>
    );
  }
);

MenuItemGroup.displayName = "MenuItemGroup";
