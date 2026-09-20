export const menuCssText = `
:root {
  --menu-bg: #ffffff;
  --menu-item-color: rgba(0, 0, 0, 0.88);
  --menu-item-hover-bg: rgba(0, 0, 0, 0.06);
  --menu-item-hover-color: rgba(0, 0, 0, 0.88);
  --menu-item-selected-bg: #e6f4ff;
  --menu-item-selected-color: #1677ff;
  --menu-item-active-bg: #e6f4ff;
  --menu-item-disabled-color: rgba(0, 0, 0, 0.25);
  --menu-danger-color: #ff4d4f;
  --menu-danger-hover-color: #ff4d4f;
  --menu-danger-selected-bg: #fff2f0;
  --menu-danger-selected-color: #ff4d4f;
  --menu-group-title-color: rgba(0, 0, 0, 0.45);
  --menu-popup-bg: #ffffff;
  --menu-sub-item-bg: rgba(0, 0, 0, 0.02);
  --menu-border-color: rgba(5, 5, 5, 0.06);
  --menu-horizontal-selected-border: #1677ff;
  --menu-submenu-arrow-color: rgba(0, 0, 0, 0.45);
  --menu-popup-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.ch-menu-dark,
[data-theme="dark"] .ch-menu,
.ch-menu-popup.ch-menu-dark {
  --menu-bg: #001529;
  --menu-item-color: rgba(255, 255, 255, 0.65);
  --menu-item-hover-bg: rgba(255, 255, 255, 0.08);
  --menu-item-hover-color: #ffffff;
  --menu-item-selected-bg: #1677ff;
  --menu-item-selected-color: #ffffff;
  --menu-item-active-bg: #1677ff;
  --menu-item-disabled-color: rgba(255, 255, 255, 0.25);
  --menu-danger-color: #ff4d4f;
  --menu-danger-hover-color: #ff7875;
  --menu-danger-selected-bg: #ff4d4f;
  --menu-danger-selected-color: #ffffff;
  --menu-group-title-color: rgba(255, 255, 255, 0.45);
  --menu-popup-bg: #001529;
  --menu-sub-item-bg: #000c17;
  --menu-border-color: rgba(255, 255, 255, 0.12);
  --menu-horizontal-selected-border: #1677ff;
  --menu-submenu-arrow-color: rgba(255, 255, 255, 0.45);
  --menu-popup-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.45), 0 3px 6px -4px rgba(0, 0, 0, 0.35);
}

/* Base Menu Container */
.ch-menu {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  list-style: none;
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  font-size: 14px;
  line-height: 1.5714285714285714;
  color: var(--menu-item-color);
  background: var(--menu-bg);
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  user-select: none;
}

.ch-menu * {
  box-sizing: border-box;
}

/* Horizontal Mode */
.ch-menu-horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid var(--menu-border-color);
  line-height: 46px;
  white-space: nowrap;
  width: 100%;
}

.ch-menu-horizontal > .ch-menu-item,
.ch-menu-horizontal > .ch-menu-submenu > .ch-menu-submenu-title {
  display: inline-flex;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding: 0 16px;
  margin: 0;
  border-radius: 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s, color 0.3s, background-color 0.3s;
}

.ch-menu-horizontal > .ch-menu-item:hover,
.ch-menu-horizontal > .ch-menu-submenu:hover > .ch-menu-submenu-title {
  color: var(--menu-item-selected-color);
}

.ch-menu-horizontal > .ch-menu-item.ch-menu-item-selected,
.ch-menu-horizontal > .ch-menu-submenu.ch-menu-submenu-selected > .ch-menu-submenu-title {
  color: var(--menu-item-selected-color);
  border-bottom-color: var(--menu-horizontal-selected-border);
  background-color: transparent;
  font-weight: 500;
}

/* Vertical & Inline Modes */
.ch-menu-vertical,
.ch-menu-inline {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  border-right: 1px solid var(--menu-border-color);
}

.ch-menu-vertical .ch-menu-item,
.ch-menu-vertical .ch-menu-submenu-title,
.ch-menu-inline .ch-menu-item,
.ch-menu-inline .ch-menu-submenu-title {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  margin: 4px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  overflow: hidden;
}

/* Item States */
.ch-menu-item:hover,
.ch-menu-submenu-title:hover {
  background-color: var(--menu-item-hover-bg);
  color: var(--menu-item-hover-color);
}

.ch-menu-item:active,
.ch-menu-submenu-title:active {
  background-color: var(--menu-item-active-bg);
}

.ch-menu-item.ch-menu-item-selected {
  background-color: var(--menu-item-selected-bg);
  color: var(--menu-item-selected-color);
  font-weight: 500;
}

/* Submenu Title Active / Selected */
.ch-menu-submenu.ch-menu-submenu-selected > .ch-menu-submenu-title {
  color: var(--menu-item-selected-color);
}

/* Danger Item */
.ch-menu-item.ch-menu-item-danger {
  color: var(--menu-danger-color);
}

.ch-menu-item.ch-menu-item-danger:hover {
  color: var(--menu-danger-hover-color);
  background-color: var(--menu-danger-selected-bg);
}

.ch-menu-item.ch-menu-item-danger.ch-menu-item-selected {
  color: var(--menu-danger-selected-color);
  background-color: var(--menu-danger-selected-bg);
}

/* Disabled Item */
.ch-menu-item.ch-menu-item-disabled,
.ch-menu-submenu.ch-menu-submenu-disabled > .ch-menu-submenu-title {
  cursor: not-allowed !important;
  color: var(--menu-item-disabled-color) !important;
  background-color: transparent !important;
}

/* Icon & Content Slots */
.ch-menu-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 10px;
  flex-shrink: 0;
  transition: font-size 0.2s;
}

.ch-menu-item-content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ch-menu-item-extra {
  margin-left: 8px;
  font-size: 12px;
  color: var(--menu-group-title-color);
}

/* SubMenu Arrow */
.ch-menu-submenu-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  margin-left: 8px;
  color: var(--menu-submenu-arrow-color);
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  flex-shrink: 0;
}

/* Inline open arrow rotation */
.ch-menu-inline .ch-menu-submenu.ch-menu-submenu-open > .ch-menu-submenu-title .ch-menu-submenu-arrow {
  transform: rotate(180deg);
}

/* Horizontal top-level arrow */
.ch-menu-horizontal > .ch-menu-submenu > .ch-menu-submenu-title .ch-menu-submenu-arrow {
  transform: rotate(0deg);
}
.ch-menu-horizontal > .ch-menu-submenu.ch-menu-submenu-open > .ch-menu-submenu-title .ch-menu-submenu-arrow {
  transform: rotate(180deg);
}

/* Vertical / Popup flyout arrow points right */
.ch-menu-vertical .ch-menu-submenu-arrow,
.ch-menu-popup .ch-menu-submenu-arrow {
  transform: rotate(-90deg) !important;
}

/* Inline SubMenu Child List Accordion */
.ch-menu-inline .ch-menu-sub {
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--menu-sub-item-bg);
  overflow: hidden;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* Multi-level Nested Submenu Indentation */
.ch-menu-inline .ch-menu-sub .ch-menu-item,
.ch-menu-inline .ch-menu-sub .ch-menu-submenu-title {
  padding-left: calc(16px + var(--menu-indent-level, 1) * var(--menu-inline-indent, 24px)) !important;
}

/* Collapsed Inline Mode */
.ch-menu-inline-collapsed {
  width: 80px !important;
}

.ch-menu-inline-collapsed .ch-menu-item,
.ch-menu-inline-collapsed .ch-menu-submenu-title {
  padding: 0 !important;
  justify-content: center !important;
  text-align: center;
}

.ch-menu-inline-collapsed .ch-menu-item-icon {
  margin-right: 0 !important;
  font-size: 16px;
}

.ch-menu-inline-collapsed .ch-menu-item-content,
.ch-menu-inline-collapsed .ch-menu-item-extra,
.ch-menu-inline-collapsed .ch-menu-submenu-arrow {
  display: none !important;
}

.ch-menu-inline-collapsed .ch-menu-sub {
  display: none !important;
}

/* Popups / Flyouts (Cascading Multi-Level Submenus) */
.ch-menu-popup {
  position: absolute;
  z-index: 1050;
  background: var(--menu-popup-bg);
  border-radius: 8px;
  box-shadow: var(--menu-popup-shadow);
  padding: 4px;
  min-width: 160px;
  list-style: none;
  margin: 0;
  animation: chMenuPopupFadeIn 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  outline: none;
}

@keyframes chMenuPopupFadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.ch-menu-popup .ch-menu-item,
.ch-menu-popup .ch-menu-submenu-title {
  display: flex;
  align-items: center;
  height: 38px;
  line-height: 38px;
  padding: 0 12px;
  margin: 2px 0;
  border-radius: 6px;
  cursor: pointer;
  color: var(--menu-item-color);
  transition: all 0.2s;
  position: relative;
}

.ch-menu-popup .ch-menu-item:hover,
.ch-menu-popup .ch-menu-submenu-title:hover {
  background-color: var(--menu-item-hover-bg);
  color: var(--menu-item-hover-color);
}

.ch-menu-popup .ch-menu-item.ch-menu-item-selected {
  background-color: var(--menu-item-selected-bg);
  color: var(--menu-item-selected-color);
  font-weight: 500;
}

/* Menu Item Group */
.ch-menu-item-group {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ch-menu-item-group-title {
  padding: 8px 16px 4px 16px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--menu-group-title-color);
  transition: all 0.2s;
}

.ch-menu-inline-collapsed .ch-menu-item-group-title {
  display: none;
}

.ch-menu-item-group-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Menu Divider */
.ch-menu-divider {
  height: 1px;
  margin: 4px 0;
  padding: 0;
  background-color: var(--menu-border-color);
  border: none;
  list-style: none;
}

.ch-menu-divider.ch-menu-divider-dashed {
  background-color: transparent;
  border-top: 1px dashed var(--menu-border-color);
}
`;
