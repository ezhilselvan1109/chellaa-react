export const selectCssText = `
:root {
  --select-active-border: #1677ff;
  --select-active-outline: rgba(5, 145, 255, 0.1);
  --select-hover-border: #4096ff;
  --select-clear-bg: #ffffff;
  --select-bg: #ffffff;
  --select-multi-item-bg: rgba(0, 0, 0, 0.06);
  --select-multi-item-border: transparent;
  --select-multi-item-height: 24px;
  --select-multi-item-height-lg: 32px;
  --select-multi-item-height-sm: 16px;
  --select-option-active-bg: rgba(0, 0, 0, 0.04);
  --select-option-selected-bg: #e6f4ff;
  --select-option-selected-color: rgba(0, 0, 0, 0.88);
  --select-option-padding: 5px 12px;
  --select-popup-zindex: 1050;
}

[data-theme="dark"] {
  --select-active-border: #1677ff;
  --select-active-outline: rgba(22, 119, 255, 0.2);
  --select-hover-border: #4096ff;
  --select-clear-bg: #1f1f1f;
  --select-bg: #141414;
  --select-multi-item-bg: rgba(255, 255, 255, 0.08);
  --select-multi-item-border: transparent;
  --select-option-active-bg: rgba(255, 255, 255, 0.08);
  --select-option-selected-bg: rgba(22, 119, 255, 0.2);
  --select-option-selected-color: #e6f4ff;
}

/* Base Select Root Container */
.ch-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  color: var(--color-text, rgba(0, 0, 0, 0.88));
  font-size: var(--font-size, 14px);
  line-height: 1.5714285714285714;
  vertical-align: middle;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  user-select: none;
  width: 100%;
}

.ch-select * {
  box-sizing: border-box;
}

/* Sizes */
.ch-select-lg {
  min-height: 40px;
  font-size: 16px;
  padding: 0 11px;
  border-radius: 8px;
}
.ch-select-lg .ch-select-tag {
  height: 32px;
  line-height: 30px;
  font-size: 14px;
}

.ch-select-md {
  min-height: 32px;
  font-size: 14px;
  padding: 0 11px;
  border-radius: 6px;
}
.ch-select-md .ch-select-tag {
  height: 24px;
  line-height: 22px;
  font-size: 12px;
}

.ch-select-sm {
  min-height: 24px;
  font-size: 12px;
  padding: 0 7px;
  border-radius: 4px;
}
.ch-select-sm .ch-select-tag {
  height: 16px;
  line-height: 14px;
  font-size: 10px;
  padding: 0 4px;
}

/* Variants */
.ch-select-outlined {
  background: var(--select-bg, #ffffff);
  border: 1px solid var(--color-border, #d9d9d9);
}
.ch-select-outlined:not(.ch-select-disabled):hover {
  border-color: var(--select-hover-border, #4096ff);
}
.ch-select-outlined.ch-select-open,
.ch-select-outlined.ch-select-focused {
  border-color: var(--select-active-border, #1677ff);
  box-shadow: 0 0 0 2px var(--select-active-outline, rgba(5, 145, 255, 0.1));
}

.ch-select-filled {
  background: var(--color-fill-tertiary, rgba(0, 0, 0, 0.04));
  border: 1px solid transparent;
}
.ch-select-filled:not(.ch-select-disabled):hover {
  background: var(--color-fill-secondary, rgba(0, 0, 0, 0.06));
}
.ch-select-filled.ch-select-open,
.ch-select-filled.ch-select-focused {
  background: var(--select-bg, #ffffff);
  border-color: var(--select-active-border, #1677ff);
  box-shadow: 0 0 0 2px var(--select-active-outline, rgba(5, 145, 255, 0.1));
}

.ch-select-borderless {
  background: transparent;
  border: 1px solid transparent;
}
.ch-select-borderless.ch-select-open,
.ch-select-borderless.ch-select-focused {
  border-color: transparent;
  box-shadow: none;
}

.ch-select-underlined {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border, #d9d9d9);
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
}
.ch-select-underlined:not(.ch-select-disabled):hover {
  border-bottom-color: var(--select-hover-border, #4096ff);
}
.ch-select-underlined.ch-select-open,
.ch-select-underlined.ch-select-focused {
  border-bottom-color: var(--select-active-border, #1677ff);
  box-shadow: 0 1px 0 0 var(--select-active-border, #1677ff);
}

/* Statuses */
.ch-select-status-error {
  border-color: var(--color-error, #ff4d4f) !important;
}
.ch-select-status-error.ch-select-open,
.ch-select-status-error.ch-select-focused {
  box-shadow: 0 0 0 2px var(--color-error-outline, rgba(255, 38, 5, 0.06)) !important;
}
.ch-select-status-warning {
  border-color: var(--color-warning, #faad14) !important;
}
.ch-select-status-warning.ch-select-open,
.ch-select-status-warning.ch-select-focused {
  box-shadow: 0 0 0 2px var(--color-warning-outline, rgba(255, 215, 5, 0.1)) !important;
}

/* Disabled */
.ch-select-disabled {
  cursor: not-allowed;
  background: var(--color-bg-container-disabled, rgba(0, 0, 0, 0.04)) !important;
  color: var(--color-text-disabled, rgba(0, 0, 0, 0.25)) !important;
  border-color: var(--color-border-disabled, #d9d9d9) !important;
  box-shadow: none !important;
}
.ch-select-disabled .ch-select-tag {
  background: var(--color-fill-tertiary, rgba(0, 0, 0, 0.04));
  color: var(--color-text-disabled, rgba(0, 0, 0, 0.25));
}
.ch-select-disabled .ch-select-tag-remove {
  cursor: not-allowed;
  display: none;
}

/* Prefix */
.ch-select-prefix {
  margin-inline-end: 8px;
  display: inline-flex;
  align-items: center;
  color: var(--color-text-description, rgba(0, 0, 0, 0.45));
  flex-shrink: 0;
}

/* Suffix & Arrow & Clear */
.ch-select-suffix {
  margin-inline-start: 8px;
  display: inline-flex;
  align-items: center;
  position: relative;
  flex-shrink: 0;
}

.ch-select-arrow {
  display: inline-flex;
  align-items: center;
  color: var(--color-icon, rgba(0, 0, 0, 0.45));
  font-size: 12px;
  transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s;
  pointer-events: none;
}

.ch-select-arrow-open {
  transform: rotate(180deg);
}

.ch-select-clear {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--select-clear-bg, #ffffff);
  color: var(--color-icon, rgba(0, 0, 0, 0.45));
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, color 0.2s;
  z-index: 2;
}

.ch-select-clear:hover {
  color: var(--color-icon-hover, rgba(0, 0, 0, 0.88));
}

.ch-select:hover.ch-select-has-value.ch-select-allow-clear:not(.ch-select-disabled) .ch-select-clear {
  opacity: 1;
  pointer-events: auto;
}

.ch-select:hover.ch-select-has-value.ch-select-allow-clear:not(.ch-select-disabled) .ch-select-arrow {
  opacity: 0;
}

/* Main Selector Body */
.ch-select-selector {
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
  position: relative;
  width: 100%;
  height: 100%;
}

.ch-select-selection-search {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  flex: 1;
  min-width: 4px;
}

.ch-select-selection-search-input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: inherit;
}

.ch-select-selection-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  color: var(--color-text-placeholder, rgba(0, 0, 0, 0.25));
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ch-select-selection-item {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  flex: 1;
}

/* Multiple & Tags Mode */
.ch-select-multiple {
  padding-top: 3px;
  padding-bottom: 3px;
}

.ch-select-multiple .ch-select-selector {
  flex-wrap: wrap;
  gap: 4px;
}

.ch-select-tag {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  background: var(--select-multi-item-bg, rgba(0, 0, 0, 0.06));
  border: 1px solid var(--select-multi-item-border, transparent);
  border-radius: 4px;
  padding: 0 6px;
  margin: 1px 0;
  transition: all 0.2s;
}

.ch-select-tag-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ch-select-tag-remove {
  margin-inline-start: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-icon, rgba(0, 0, 0, 0.45));
  font-size: 10px;
  transition: color 0.2s;
}

.ch-select-tag-remove:hover {
  color: var(--color-icon-hover, rgba(0, 0, 0, 0.88));
}

/* Dropdown Popup */
.ch-select-dropdown {
  position: absolute;
  z-index: var(--select-popup-zindex, 1050);
  background: var(--color-bg-elevated, #ffffff);
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 4px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  font-size: 14px;
  color: var(--color-text, rgba(0, 0, 0, 0.88));
}

.ch-select-dropdown-list {
  max-height: 256px;
  overflow-y: auto;
  overflow-x: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ch-select-item-group {
  padding: 4px 12px;
  font-size: 12px;
  color: var(--color-text-description, rgba(0, 0, 0, 0.45));
  user-select: none;
}

.ch-select-item-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  padding: var(--select-option-padding, 5px 12px);
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text, rgba(0, 0, 0, 0.88));
  transition: background 0.15s;
  user-select: none;
  font-size: 14px;
}

.ch-select-item-option-active {
  background: var(--select-option-active-bg, rgba(0, 0, 0, 0.04));
}

.ch-select-item-option-selected {
  background: var(--select-option-selected-bg, #e6f4ff);
  color: var(--select-option-selected-color, rgba(0, 0, 0, 0.88));
  font-weight: 600;
}

.ch-select-item-option-disabled {
  cursor: not-allowed;
  color: var(--color-text-disabled, rgba(0, 0, 0, 0.25));
  background: transparent !important;
}

.ch-select-item-option-content {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ch-select-item-option-state {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary, #1677ff);
  font-size: 12px;
  margin-inline-start: 8px;
}

.ch-select-empty {
  padding: 16px 12px;
  text-align: center;
  color: var(--color-text-description, rgba(0, 0, 0, 0.45));
  font-size: 13px;
}
`;
