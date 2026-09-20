import React from "react";

export type MenuMode = "horizontal" | "vertical" | "inline";

export type MenuTheme = "light" | "dark";

export type MenuTriggerAction = "hover" | "click";

export type MenuSemanticDOM =
  | "root"
  | "item"
  | "itemIcon"
  | "itemContent"
  | "popup"
  | "subMenu.itemTitle"
  | "subMenu.list"
  | "subMenu.item"
  | "subMenu.itemIcon"
  | "subMenu.itemContent";

export interface MenuClickInfo {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement>;
  itemData?: any;
}

export interface MenuSelectInfo {
  key: string;
  keyPath: string[];
  selectedKeys: string[];
  domEvent: React.MouseEvent<HTMLElement>;
  itemData?: any;
}

export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  extra?: React.ReactNode;
  title?: string;
  onClick?: (info: MenuClickInfo) => void;
  className?: string;
  style?: React.CSSProperties;
  type?: never;
  children?: never;
}

export interface SubMenuType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children: ItemType[];
  disabled?: boolean;
  popupClassName?: string;
  popupOffset?: [number, number];
  theme?: MenuTheme;
  onTitleClick?: (info: { key: string; domEvent: React.MouseEvent<HTMLElement> }) => void;
  popupRender?: (
    node: React.ReactElement,
    props: { item: SubMenuProps; keys: string[] }
  ) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: "submenu";
}

export interface MenuItemGroupType {
  type: "group";
  label: React.ReactNode;
  children?: ItemType[];
  key?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface MenuDividerType {
  type: "divider";
  dashed?: boolean;
  key?: string;
  className?: string;
  style?: React.CSSProperties;
}

export type ItemType =
  | MenuItemType
  | SubMenuType
  | MenuItemGroupType
  | MenuDividerType;

export interface MenuItemProps {
  key?: string;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (info: MenuClickInfo) => void;
}

export interface SubMenuProps {
  key?: string;
  title?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  popupClassName?: string;
  popupOffset?: [number, number];
  theme?: MenuTheme;
  onTitleClick?: (info: { key: string; domEvent: React.MouseEvent<HTMLElement> }) => void;
  popupRender?: (
    node: React.ReactElement,
    props: { item: SubMenuProps; keys: string[] }
  ) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface MenuItemGroupProps {
  title?: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface MenuDividerProps {
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface MenuProps {
  /**
   * Type of menu.
   * @default 'vertical'
   */
  mode?: MenuMode;

  /**
   * Color theme of the menu.
   * @default 'light'
   */
  theme?: MenuTheme;

  /**
   * Menu item content as array of declarative items.
   */
  items?: ItemType[];

  /**
   * Array with the keys of currently selected menu items.
   */
  selectedKeys?: string[];

  /**
   * Array with the keys of default selected menu items.
   */
  defaultSelectedKeys?: string[];

  /**
   * Array with the keys of currently opened sub-menus.
   */
  openKeys?: string[];

  /**
   * Array with the keys of default opened sub-menus.
   */
  defaultOpenKeys?: string[];

  /**
   * Allows selecting menu items.
   * @default true
   */
  selectable?: boolean;

  /**
   * Allows selection of multiple items.
   * @default false
   */
  multiple?: boolean;

  /**
   * Specifies the collapsed status when menu is in inline mode.
   * @default false
   */
  inlineCollapsed?: boolean;

  /**
   * Indent (in pixels) of inline menu items on each level.
   * @default 24
   */
  inlineIndent?: number;

  /**
   * Delay time to show submenu when mouse enters (in seconds).
   * @default 0
   */
  subMenuOpenDelay?: number;

  /**
   * Delay time to hide submenu when mouse leaves (in seconds).
   * @default 0.1
   */
  subMenuCloseDelay?: number;

  /**
   * Which action can trigger submenu open/close in flyout mode.
   * @default 'hover'
   */
  triggerSubMenuAction?: MenuTriggerAction;

  /**
   * Custom expand icon of submenu.
   */
  expandIcon?: React.ReactNode | ((props: SubMenuProps & { isSubMenu: boolean }) => React.ReactNode);

  /**
   * Custom popup renderer for submenu.
   */
  popupRender?: (
    node: React.ReactElement,
    props: { item: SubMenuProps; keys: string[] }
  ) => React.ReactNode;

  /**
   * Called when a menu item is clicked.
   */
  onClick?: (info: MenuClickInfo) => void;

  /**
   * Called when a menu item is selected.
   */
  onSelect?: (info: MenuSelectInfo) => void;

  /**
   * Called when a menu item is deselected (multiple mode only).
   */
  onDeselect?: (info: MenuSelectInfo) => void;

  /**
   * Called when sub-menus are opened or closed.
   */
  onOpenChange?: (openKeys: string[]) => void;

  /**
   * Semantic DOM classes.
   */
  classNames?:
    | Partial<Record<MenuSemanticDOM, string>>
    | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticDOM, string>>);

  /**
   * Semantic DOM styles.
   */
  styles?:
    | Partial<Record<MenuSemanticDOM, React.CSSProperties>>
    | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticDOM, React.CSSProperties>>);

  /**
   * Custom CSS class name.
   */
  className?: string;

  /**
   * Custom root inline styles.
   */
  style?: React.CSSProperties;

  /**
   * Compound JSX children.
   */
  children?: React.ReactNode;
}
