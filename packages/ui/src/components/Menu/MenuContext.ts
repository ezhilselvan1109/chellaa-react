import React, { createContext, useContext } from "react";
import type {
  MenuMode,
  MenuTheme,
  MenuTriggerAction,
  MenuProps,
  SubMenuProps,
  MenuSemanticDOM,
} from "./Menu.types";

export interface MenuContextValue {
  mode: MenuMode;
  theme: MenuTheme;
  inlineIndent: number;
  inlineCollapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  selectable: boolean;
  multiple: boolean;
  triggerSubMenuAction: MenuTriggerAction;
  subMenuOpenDelay: number;
  subMenuCloseDelay: number;
  expandIcon?: React.ReactNode | ((props: SubMenuProps & { isSubMenu: boolean }) => React.ReactNode);
  classNames: Partial<Record<MenuSemanticDOM, string>>;
  styles: Partial<Record<MenuSemanticDOM, React.CSSProperties>>;
  onItemClick: (
    key: string,
    keyPath: string[],
    e: React.MouseEvent<HTMLElement>,
    itemData?: any
  ) => void;
  onSubMenuToggle: (key: string, keyPath: string[]) => void;
  onSubMenuOpen: (key: string, keyPath: string[]) => void;
  onSubMenuClose: (key: string, keyPath: string[]) => void;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export const useMenuContext = (): MenuContextValue => {
  const context = useContext(MenuContext);
  if (!context) {
    return {
      mode: "vertical",
      theme: "light",
      inlineIndent: 24,
      inlineCollapsed: false,
      selectedKeys: [],
      openKeys: [],
      selectable: true,
      multiple: false,
      triggerSubMenuAction: "hover",
      subMenuOpenDelay: 0,
      subMenuCloseDelay: 0.1,
      classNames: {},
      styles: {},
      onItemClick: () => {},
      onSubMenuToggle: () => {},
      onSubMenuOpen: () => {},
      onSubMenuClose: () => {},
    };
  }
  return context;
};
