import React, {
  forwardRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { menuCssText } from "./Menu.style";
import { MenuContext } from "./MenuContext";
import type {
  MenuProps,
  ItemType,
  MenuItemType,
} from "./Menu.types";
import { MenuItem } from "./MenuItem";
import { SubMenu } from "./SubMenu";
import { MenuItemGroup } from "./MenuItemGroup";
import { MenuDivider } from "./MenuDivider";

const InternalMenu = forwardRef<HTMLUListElement, MenuProps>(
  (props, ref) => {
    const {
      mode = "vertical",
      theme = "light",
      items,
      selectedKeys: propSelectedKeys,
      defaultSelectedKeys = [],
      openKeys: propOpenKeys,
      defaultOpenKeys = [],
      selectable = true,
      multiple = false,
      inlineCollapsed = false,
      inlineIndent = 24,
      subMenuOpenDelay = 0,
      subMenuCloseDelay = 0.1,
      triggerSubMenuAction = "hover",
      expandIcon,
      onClick,
      onSelect,
      onDeselect,
      onOpenChange,
      classNames,
      styles,
      className,
      style,
      children,
      ...restProps
    } = props;

    // Inject styles
    useEffect(() => {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-menu", menuCssText);
    }, []);

    // Selection State (Controlled vs Uncontrolled)
    const [innerSelectedKeys, setInnerSelectedKeys] = useState<string[]>(
      defaultSelectedKeys
    );
    const selectedKeys = useMemo(
      () => (propSelectedKeys !== undefined ? propSelectedKeys : innerSelectedKeys),
      [propSelectedKeys, innerSelectedKeys]
    );

    // Open Keys State (Controlled vs Uncontrolled)
    const [innerOpenKeys, setInnerOpenKeys] = useState<string[]>(
      defaultOpenKeys
    );
    const openKeys = useMemo(
      () => (propOpenKeys !== undefined ? propOpenKeys : innerOpenKeys),
      [propOpenKeys, innerOpenKeys]
    );

    // Handle menu item clicks
    const handleItemClick = useCallback(
      (
        key: string,
        keyPath: string[],
        domEvent: React.MouseEvent<HTMLElement>,
        itemData?: any
      ) => {
        onClick?.({ key, keyPath, domEvent, itemData });

        if (!selectable) return;

        if (multiple) {
          const isSelected = selectedKeys.includes(key);
          const nextSelectedKeys = isSelected
            ? selectedKeys.filter((k) => k !== key)
            : [...selectedKeys, key];

          if (propSelectedKeys === undefined) {
            setInnerSelectedKeys(nextSelectedKeys);
          }

          if (isSelected) {
            onDeselect?.({
              key,
              keyPath,
              selectedKeys: nextSelectedKeys,
              domEvent,
              itemData,
            });
          } else {
            onSelect?.({
              key,
              keyPath,
              selectedKeys: nextSelectedKeys,
              domEvent,
              itemData,
            });
          }
        } else {
          const nextSelectedKeys = [key];
          if (propSelectedKeys === undefined) {
            setInnerSelectedKeys(nextSelectedKeys);
          }
          onSelect?.({
            key,
            keyPath,
            selectedKeys: nextSelectedKeys,
            domEvent,
            itemData,
          });
        }
      },
      [selectable, multiple, selectedKeys, propSelectedKeys, onClick, onSelect, onDeselect]
    );

    // Handle submenu open toggling (for inline accordion mode)
    const handleSubMenuToggle = useCallback(
      (key: string) => {
        const isOpen = openKeys.includes(key);
        const nextOpenKeys = isOpen
          ? openKeys.filter((k) => k !== key)
          : [...openKeys, key];

        if (propOpenKeys === undefined) {
          setInnerOpenKeys(nextOpenKeys);
        }
        onOpenChange?.(nextOpenKeys);
      },
      [openKeys, propOpenKeys, onOpenChange]
    );

    const handleSubMenuOpen = useCallback(
      (key: string) => {
        if (!openKeys.includes(key)) {
          const nextOpenKeys = [...openKeys, key];
          if (propOpenKeys === undefined) {
            setInnerOpenKeys(nextOpenKeys);
          }
          onOpenChange?.(nextOpenKeys);
        }
      },
      [openKeys, propOpenKeys, onOpenChange]
    );

    const handleSubMenuClose = useCallback(
      (key: string) => {
        if (openKeys.includes(key)) {
          const nextOpenKeys = openKeys.filter((k) => k !== key);
          if (propOpenKeys === undefined) {
            setInnerOpenKeys(nextOpenKeys);
          }
          onOpenChange?.(nextOpenKeys);
        }
      },
      [openKeys, propOpenKeys, onOpenChange]
    );

    // Resolve semantic classNames and styles
    const resolvedClassNames = useMemo(() => {
      if (!classNames) return {};
      if (typeof classNames === "function") {
        return classNames({ props });
      }
      return classNames;
    }, [classNames, props]);

    const resolvedStyles = useMemo(() => {
      if (!styles) return {};
      if (typeof styles === "function") {
        return styles({ props });
      }
      return styles;
    }, [styles, props]);

    // Context Value for sub-tree items
    const contextValue = useMemo(
      () => ({
        mode,
        theme,
        inlineIndent,
        inlineCollapsed,
        selectedKeys,
        openKeys,
        selectable,
        multiple,
        triggerSubMenuAction,
        subMenuOpenDelay,
        subMenuCloseDelay,
        expandIcon,
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        onItemClick: handleItemClick,
        onSubMenuToggle: handleSubMenuToggle,
        onSubMenuOpen: handleSubMenuOpen,
        onSubMenuClose: handleSubMenuClose,
      }),
      [
        mode,
        theme,
        inlineIndent,
        inlineCollapsed,
        selectedKeys,
        openKeys,
        selectable,
        multiple,
        triggerSubMenuAction,
        subMenuOpenDelay,
        subMenuCloseDelay,
        expandIcon,
        resolvedClassNames,
        resolvedStyles,
        handleItemClick,
        handleSubMenuToggle,
        handleSubMenuOpen,
        handleSubMenuClose,
      ]
    );

    // Render items from declarative items array
    const renderItemsFromProp = (itemList: ItemType[]) => {
      return itemList.map((item, index) => {
        const itemKey = "key" in item && item.key ? item.key : `menu-item-${index}`;
        const keyPath = [itemKey];

        if (item.type === "divider") {
          return (
            <MenuDivider
              key={itemKey}
              dashed={item.dashed}
              className={item.className}
              style={item.style}
            />
          );
        }

        if (item.type === "group") {
          return (
            <MenuItemGroup
              key={itemKey}
              label={item.label}
              className={item.className}
              style={item.style}
            >
              {item.children?.map((groupChild, gIdx) => {
                const gLeaf = groupChild as MenuItemType;
                const gKey = gLeaf.key || `${itemKey}-${gIdx}`;
                return (
                  <MenuItem
                    key={gKey}
                    itemKey={gKey}
                    keyPath={[gKey, itemKey]}
                    level={1}
                    label={gLeaf.label}
                    icon={gLeaf.icon}
                    disabled={gLeaf.disabled}
                    danger={gLeaf.danger}
                    extra={gLeaf.extra}
                    title={gLeaf.title}
                    className={gLeaf.className}
                    style={gLeaf.style}
                    onClick={gLeaf.onClick}
                  />
                );
              })}
            </MenuItemGroup>
          );
        }

        if ("children" in item && item.children && item.children.length > 0) {
          // SubMenu item
          return (
            <SubMenu
              key={itemKey}
              itemKey={itemKey}
              keyPath={keyPath}
              level={0}
              title={item.label}
              icon={item.icon}
              disabled={item.disabled}
              popupClassName={item.popupClassName}
              popupOffset={item.popupOffset}
              theme={item.theme}
              onTitleClick={item.onTitleClick}
              popupRender={item.popupRender}
              className={item.className}
              style={item.style}
              items={item.children}
            />
          );
        }

        // Standard MenuItem
        const leaf = item as MenuItemType;
        return (
          <MenuItem
            key={itemKey}
            itemKey={itemKey}
            keyPath={keyPath}
            level={0}
            label={leaf.label}
            icon={leaf.icon}
            disabled={leaf.disabled}
            danger={leaf.danger}
            extra={leaf.extra}
            title={leaf.title}
            className={leaf.className}
            style={leaf.style}
            onClick={leaf.onClick}
          />
        );
      });
    };

    // Render compound JSX children
    const renderCompoundChildren = () => {
      return React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const itemKey = child.key ? String(child.key) : `menu-child-${index}`;
        return React.cloneElement(child as React.ReactElement<any>, {
          itemKey,
          keyPath: [itemKey],
          level: 0,
        });
      });
    };

    const isHorizontal = mode === "horizontal";
    const isInline = mode === "inline";
    const modeClass = isHorizontal
      ? "ch-menu-horizontal"
      : isInline
      ? "ch-menu-inline"
      : "ch-menu-vertical";

    const collapsedClass = inlineCollapsed ? "ch-menu-inline-collapsed" : "";
    const themeClass = theme === "dark" ? "ch-menu-dark" : "ch-menu-light";

    return (
      <MenuContext.Provider value={contextValue}>
        <ul
          ref={ref}
          role="menu"
          className={[
            "ch-menu",
            modeClass,
            themeClass,
            collapsedClass,
            className,
            resolvedClassNames["root"] || "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ ...style, ...resolvedStyles["root"] }}
          {...restProps}
        >
          {items && items.length > 0
            ? renderItemsFromProp(items)
            : renderCompoundChildren()}
        </ul>
      </MenuContext.Provider>
    );
  }
);

InternalMenu.displayName = "Menu";

export interface CompoundedMenu
  extends React.ForwardRefExoticComponent<
    MenuProps & React.RefAttributes<HTMLUListElement>
  > {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  ItemGroup: typeof MenuItemGroup;
  Divider: typeof MenuDivider;
}

export const Menu = InternalMenu as CompoundedMenu;
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = MenuItemGroup;
Menu.Divider = MenuDivider;
