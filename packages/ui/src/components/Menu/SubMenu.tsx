import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { useMenuContext } from "./MenuContext";
import type { SubMenuProps, ItemType, MenuItemType, MenuTheme } from "./Menu.types";
import { MenuItem } from "./MenuItem";
import { MenuItemGroup } from "./MenuItemGroup";
import { MenuDivider } from "./MenuDivider";

export interface InternalSubMenuProps extends SubMenuProps {
  itemKey: string;
  keyPath: string[];
  level?: number;
  items?: ItemType[];
  itemData?: any;
}

const ChevronIcon: React.FC = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="down"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
  </svg>
);

export const SubMenu = forwardRef<HTMLLIElement, InternalSubMenuProps>(
  (
    {
      itemKey,
      keyPath,
      level = 0,
      title,
      label,
      icon,
      disabled = false,
      popupClassName,
      popupOffset,
      theme: subMenuTheme,
      onTitleClick,
      popupRender,
      className,
      style,
      children,
      items: rawChildItems,
      itemData,
      ...restProps
    },
    ref
  ) => {
    const {
      mode,
      theme: rootTheme,
      inlineCollapsed,
      inlineIndent,
      selectedKeys,
      openKeys,
      triggerSubMenuAction,
      subMenuOpenDelay,
      subMenuCloseDelay,
      expandIcon,
      classNames,
      styles,
      onSubMenuToggle,
      onSubMenuOpen,
      onSubMenuClose,
    } = useMenuContext();

    const titleRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLUListElement>(null);

    const [popupCoords, setPopupCoords] = useState<{ top: number; left: number }>({
      top: 0,
      left: 0,
    });
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isInline = mode === "inline" && !inlineCollapsed;
    const isInlineOpen = isInline && openKeys.includes(itemKey);
    const isOpen = isInline ? isInlineOpen : isFlyoutOpen;

    const subMenuTitle = label ?? title;
    const effectiveTheme: MenuTheme = subMenuTheme || rootTheme;

    // Normalize child items from props or JSX children
    const childList = useMemo(() => {
      if (rawChildItems && rawChildItems.length > 0) {
        return rawChildItems;
      }
      return null;
    }, [rawChildItems]);

    // Check if any descendant key is selected
    const hasSelectedChild = useMemo(() => {
      const checkSelection = (itemsToScan: ItemType[] | null): boolean => {
        if (!itemsToScan) return false;
        for (const itm of itemsToScan) {
          if ("key" in itm && itm.key && selectedKeys.includes(itm.key)) {
            return true;
          }
          if ("children" in itm && itm.children) {
            if (checkSelection(itm.children)) return true;
          }
        }
        return false;
      };
      return checkSelection(childList);
    }, [childList, selectedKeys]);

    // Position calculator for flyout popups
    const updatePopupPosition = useCallback(() => {
      if (!titleRef.current) return;
      const rect = titleRef.current.getBoundingClientRect();
      const offsetX = popupOffset ? popupOffset[0] : 0;
      const offsetY = popupOffset ? popupOffset[1] : 0;

      let top = 0;
      let left = 0;

      if (mode === "horizontal" && level === 0) {
        // Horizontal top-level submenu drops downwards
        top = rect.bottom + window.scrollY + offsetY;
        left = rect.left + window.scrollX + offsetX;
      } else {
        // Nested submenus or vertical/collapsed mode flyouts open to the right
        top = rect.top + window.scrollY + offsetY - 4;
        left = rect.right + window.scrollX + offsetX + 4;

        // Viewport overflow protection: flip left if overflowing viewport right
        if (left + 180 > window.innerWidth) {
          left = rect.left + window.scrollX - 164;
        }
      }

      setPopupCoords({ top: Math.max(0, top), left: Math.max(0, left) });
    }, [mode, level, popupOffset]);

    // Clean up timers on unmount
    useEffect(() => {
      return () => {
        if (openTimerRef.current) clearTimeout(openTimerRef.current);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      };
    }, []);

    // Handlers for Flyout hover/click
    const handleMouseEnter = () => {
      if (disabled || isInline || triggerSubMenuAction !== "hover") return;
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      openTimerRef.current = setTimeout(() => {
        updatePopupPosition();
        setIsFlyoutOpen(true);
        onSubMenuOpen(itemKey, keyPath);
      }, subMenuOpenDelay * 1000);
    };

    const handleMouseLeave = () => {
      if (disabled || isInline || triggerSubMenuAction !== "hover") return;
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      closeTimerRef.current = setTimeout(() => {
        setIsFlyoutOpen(false);
        onSubMenuClose(itemKey, keyPath);
      }, subMenuCloseDelay * 1000);
    };

    const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onTitleClick?.({ key: itemKey, domEvent: e });

      if (isInline) {
        onSubMenuToggle(itemKey, keyPath);
      } else if (triggerSubMenuAction === "click") {
        if (isFlyoutOpen) {
          setIsFlyoutOpen(false);
          onSubMenuClose(itemKey, keyPath);
        } else {
          updatePopupPosition();
          setIsFlyoutOpen(true);
          onSubMenuOpen(itemKey, keyPath);
        }
      }
    };

    // Close flyout on window scroll or outside click
    useEffect(() => {
      if (!isFlyoutOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          titleRef.current?.contains(target) ||
          popupRef.current?.contains(target)
        ) {
          return;
        }
        setIsFlyoutOpen(false);
        onSubMenuClose(itemKey, keyPath);
      };

      window.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", updatePopupPosition);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", updatePopupPosition);
      };
    }, [isFlyoutOpen, itemKey, keyPath, onSubMenuClose, updatePopupPosition]);

    // Recursive renderer for child items
    const renderChildrenContent = (nextLevel: number) => {
      if (childList && childList.length > 0) {
        return childList.map((child, index) => {
          const childKey = "key" in child && child.key ? child.key : `${itemKey}-${index}`;
          const nextKeyPath = [childKey, ...keyPath];

          if (child.type === "divider") {
            return (
              <MenuDivider
                key={childKey}
                dashed={child.dashed}
                className={child.className}
                style={child.style}
              />
            );
          }

          if (child.type === "group") {
            return (
              <MenuItemGroup
                key={childKey}
                label={child.label}
                className={child.className}
                style={child.style}
              >
                {child.children?.map((groupChild, gIdx) => {
                  const gLeaf = groupChild as MenuItemType;
                  const gKey = gLeaf.key || `${childKey}-${gIdx}`;
                  return (
                    <MenuItem
                      key={gKey}
                      itemKey={gKey}
                      keyPath={[gKey, ...nextKeyPath]}
                      level={nextLevel}
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

          if ("children" in child && child.children && child.children.length > 0) {
            // Nested SubMenu!
            return (
              <SubMenu
                key={childKey}
                itemKey={childKey}
                keyPath={nextKeyPath}
                level={nextLevel}
                title={child.label}
                icon={child.icon}
                disabled={child.disabled}
                popupClassName={child.popupClassName}
                popupOffset={child.popupOffset}
                theme={child.theme}
                onTitleClick={child.onTitleClick}
                popupRender={child.popupRender}
                className={child.className}
                style={child.style}
                items={child.children}
              />
            );
          }

          // Standard leaf menu item
          const leaf = child as MenuItemType;
          return (
            <MenuItem
              key={childKey}
              itemKey={childKey}
              keyPath={nextKeyPath}
              level={nextLevel}
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
      }

      // Render JSX compound children
      if (children) {
        return React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          const childKey = child.key ? String(child.key) : `${itemKey}-${index}`;
          const nextKeyPath = [childKey, ...keyPath];

          return React.cloneElement(child as React.ReactElement<any>, {
            itemKey: childKey,
            keyPath: nextKeyPath,
            level: nextLevel,
          });
        });
      }

      return null;
    };

    // Custom arrow icon or default
    const arrowNode = expandIcon ? (
      typeof expandIcon === "function" ? (
        expandIcon({ ...restProps, title: subMenuTitle, isSubMenu: true })
      ) : (
        expandIcon
      )
    ) : (
      <ChevronIcon />
    );

    // Popup Portal content
    const popupContent = isFlyoutOpen && !isInline && typeof document !== "undefined" && (
      createPortal(
        <ul
          ref={popupRef}
          role="menu"
          className={[
            "ch-menu-popup",
            effectiveTheme === "dark" ? "ch-menu-dark" : "",
            popupClassName,
            classNames["popup"] || "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            top: `${popupCoords.top}px`,
            left: `${popupCoords.left}px`,
            ...styles["popup"],
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {popupRender
            ? popupRender(
                <>{renderChildrenContent(1)}</>,
                { item: { ...restProps, title: subMenuTitle }, keys: keyPath }
              )
            : renderChildrenContent(1)}
        </ul>,
        document.body
      )
    );

    return (
      <li
        ref={ref}
        role="none"
        className={[
          "ch-menu-submenu",
          `ch-menu-submenu-${mode}`,
          isOpen ? "ch-menu-submenu-open" : "",
          disabled ? "ch-menu-submenu-disabled" : "",
          hasSelectedChild ? "ch-menu-submenu-selected" : "",
          className,
          classNames["subMenu.item"] || "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ ...style, ...styles["subMenu.item"] }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      >
        {/* Submenu Title Trigger */}
        <div
          ref={titleRef}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={isOpen}
          tabIndex={disabled ? -1 : 0}
          className={[
            "ch-menu-submenu-title",
            classNames["subMenu.itemTitle"] || "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            ...(isInline && level > 0
              ? ({
                  paddingLeft: `calc(16px + ${level} * ${inlineIndent}px)`,
                } as React.CSSProperties)
              : {}),
            ...styles["subMenu.itemTitle"],
          }}
          onClick={handleTitleClick}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              handleTitleClick(e as any);
            }
          }}
        >
          {icon && (
            <span
              className={[
                "ch-menu-item-icon",
                classNames["subMenu.itemIcon"] || "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={styles["subMenu.itemIcon"]}
            >
              {icon}
            </span>
          )}
          <span
            className={[
              "ch-menu-item-content",
              classNames["subMenu.itemContent"] || "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={styles["subMenu.itemContent"]}
          >
            {subMenuTitle}
          </span>
          <span className="ch-menu-submenu-arrow">{arrowNode}</span>
        </div>

        {/* Inline Submenu Child List */}
        {isInline && isOpen && (
          <ul
            role="menu"
            className={["ch-menu-sub", classNames["subMenu.list"] || ""]
              .filter(Boolean)
              .join(" ")}
            style={styles["subMenu.list"]}
          >
            {renderChildrenContent(level + 1)}
          </ul>
        )}

        {/* Flyout Popup Portal */}
        {popupContent}
      </li>
    );
  }
);

SubMenu.displayName = "SubMenu";
