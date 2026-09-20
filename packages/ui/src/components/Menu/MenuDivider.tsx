import { forwardRef } from "react";
import type { MenuDividerProps } from "./Menu.types";

export interface InternalMenuDividerProps extends MenuDividerProps {
  itemKey?: string;
  keyPath?: string[];
  level?: number;
}

export const MenuDivider = forwardRef<HTMLLIElement, InternalMenuDividerProps>(
  ({ dashed, className, style, itemKey, keyPath, level, ...restProps }, ref) => {
    return (
      <li
        ref={ref}
        role="separator"
        className={[
          "ch-menu-divider",
          dashed ? "ch-menu-divider-dashed" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
        {...restProps}
      />
    );
  }
);

MenuDivider.displayName = "MenuDivider";
