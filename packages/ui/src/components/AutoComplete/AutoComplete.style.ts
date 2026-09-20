export const autoCompleteCssText = `
/* ==========================================================================
   Ant Design 5 & 6 Specification AutoComplete Styles for Chella UI
   Design Tokens:
   - activeBorderColor: #1677ff
   - activeOutlineColor: rgba(5, 145, 255, 0.1)
   - hoverBorderColor: #4096ff
   - optionActiveBg: rgba(0, 0, 0, 0.04)
   - optionSelectedBg: #e6f4ff
   - optionSelectedColor: rgba(0, 0, 0, 0.88)
   - optionSelectedFontWeight: 600
   - zIndexPopup: 1050
   - controlHeight: 32px (MD), 40px (LG), 24px (SM)
   ========================================================================== */

.ch-autocomplete {
  --ch-ac-primary: var(--ch-color-primary, #1677ff);
  --ch-ac-hover-border: #4096ff;
  --ch-ac-outline: rgba(5, 145, 255, 0.1);
  --ch-ac-border: var(--ch-color-border, #d9d9d9);
  --ch-ac-bg: var(--ch-color-bg-container, #ffffff);
  --ch-ac-color: var(--ch-color-text, rgba(0, 0, 0, 0.88));

  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--ch-ac-color);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* ------------------- Variants ------------------- */
.ch-autocomplete--outlined {
  background: var(--ch-ac-bg);
  border: 1px solid var(--ch-ac-border);
  border-radius: 6px;
}
.ch-autocomplete--outlined:hover:not(.ch-autocomplete--disabled) {
  border-color: var(--ch-ac-hover-border);
}
.ch-autocomplete--outlined.ch-autocomplete--focused {
  border-color: var(--ch-ac-primary);
  box-shadow: 0 0 0 2px var(--ch-ac-outline);
}

.ch-autocomplete--filled {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid transparent;
  border-radius: 6px;
}
.ch-autocomplete--filled:hover:not(.ch-autocomplete--disabled) {
  background: rgba(0, 0, 0, 0.06);
}
.ch-autocomplete--filled.ch-autocomplete--focused {
  background: var(--ch-ac-bg);
  border-color: var(--ch-ac-primary);
  box-shadow: 0 0 0 2px var(--ch-ac-outline);
}

.ch-autocomplete--borderless {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
}
.ch-autocomplete--borderless.ch-autocomplete--focused {
  box-shadow: none;
}

.ch-autocomplete--underlined {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--ch-ac-border);
  border-radius: 0;
}
.ch-autocomplete--underlined:hover:not(.ch-autocomplete--disabled) {
  border-bottom-color: var(--ch-ac-hover-border);
}
.ch-autocomplete--underlined.ch-autocomplete--focused {
  border-bottom-color: var(--ch-ac-primary);
  box-shadow: 0 1px 0 0 var(--ch-ac-primary);
}

/* ------------------- Sizes ------------------- */
.ch-autocomplete--small {
  height: 24px;
  font-size: 12px;
  padding: 0 7px;
  border-radius: 4px;
}
.ch-autocomplete--medium {
  height: 32px;
  font-size: 14px;
  padding: 0 11px;
  border-radius: 6px;
}
.ch-autocomplete--large {
  height: 40px;
  font-size: 16px;
  padding: 0 15px;
  border-radius: 8px;
}

/* ------------------- Statuses ------------------- */
.ch-autocomplete--status-error.ch-autocomplete--outlined,
.ch-autocomplete--status-error.ch-autocomplete--filled {
  border-color: #ff4d4f !important;
}
.ch-autocomplete--status-error.ch-autocomplete--underlined {
  border-bottom-color: #ff4d4f !important;
}
.ch-autocomplete--status-error.ch-autocomplete--focused {
  box-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06) !important;
}

.ch-autocomplete--status-warning.ch-autocomplete--outlined,
.ch-autocomplete--status-warning.ch-autocomplete--filled {
  border-color: #faad14 !important;
}
.ch-autocomplete--status-warning.ch-autocomplete--underlined {
  border-bottom-color: #faad14 !important;
}
.ch-autocomplete--status-warning.ch-autocomplete--focused {
  box-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1) !important;
}

/* ------------------- Disabled ------------------- */
.ch-autocomplete--disabled {
  background: rgba(0, 0, 0, 0.04) !important;
  border-color: #d9d9d9 !important;
  color: rgba(0, 0, 0, 0.25) !important;
  cursor: not-allowed;
  opacity: 0.7;
}
.ch-autocomplete--disabled input {
  cursor: not-allowed;
}

/* ------------------- Inner Elements ------------------- */
.ch-autocomplete-prefix {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.45);
  flex-shrink: 0;
}

.ch-autocomplete-input {
  flex: 1 1 0%;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  line-height: 1.5714;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.ch-autocomplete-input::placeholder {
  color: rgba(0, 0, 0, 0.25);
  user-select: none;
}

.ch-autocomplete-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  margin-left: 6px;
  font-size: 12px;
  transition: color 0.2s;
  user-select: none;
  flex-shrink: 0;
}
.ch-autocomplete-clear:hover {
  color: rgba(0, 0, 0, 0.65);
}

/* ------------------- Dropdown Popup ------------------- */
.ch-autocomplete-dropdown {
  position: absolute;
  z-index: 1050;
  background-color: var(--ch-color-bg-elevated, var(--ch-color-bg-container, #ffffff));
  background: var(--ch-color-bg-elevated, var(--ch-color-bg-container, #ffffff));
  border: 1px solid var(--ch-color-border-subtle, rgba(5, 5, 5, 0.06));
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
              0 3px 6px -4px rgba(0, 0, 0, 0.12),
              0 9px 28px 8px rgba(0, 0, 0, 0.05);
  padding: 4px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  animation: ch-ac-fadeIn 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}

@keyframes ch-ac-fadeIn {
  from {
    opacity: 0;
    transform: scaleY(0.95);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

.ch-autocomplete-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 256px;
  overflow-y: auto;
  overflow-x: hidden;
}

.ch-autocomplete-menu::-webkit-scrollbar {
  width: 6px;
}
.ch-autocomplete-menu::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.ch-autocomplete-option-group {
  margin: 0;
  padding: 0;
}

.ch-autocomplete-option-group-title {
  padding: 6px 12px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  font-weight: 600;
  user-select: none;
}

.ch-autocomplete-option {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 1.5714;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  box-sizing: border-box;
  user-select: none;
}

.ch-autocomplete-option:hover,
.ch-autocomplete-option--active {
  background: rgba(0, 0, 0, 0.04);
}

.ch-autocomplete-option--selected {
  background: #e6f4ff !important;
  color: #1677ff !important;
  font-weight: 600;
}

.ch-autocomplete-option--disabled {
  color: rgba(0, 0, 0, 0.25) !important;
  cursor: not-allowed;
  background: transparent !important;
}

.ch-autocomplete-empty {
  padding: 12px 16px;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;
}

/* ------------------- Dark Theme Support ------------------- */
[data-theme="dark"] .ch-autocomplete-dropdown {
  background-color: #1f1f1f !important;
  background: #1f1f1f !important;
  border-color: rgba(253, 253, 253, 0.12);
  color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.32),
              0 3px 6px -4px rgba(0, 0, 0, 0.48),
              0 9px 28px 8px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .ch-autocomplete-option {
  color: rgba(255, 255, 255, 0.85);
}

[data-theme="dark"] .ch-autocomplete-option:hover,
[data-theme="dark"] .ch-autocomplete-option--active {
  background: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .ch-autocomplete-option--selected {
  background: #111b26 !important;
  color: #1677ff !important;
}

[data-theme="dark"] .ch-autocomplete-option-group-title {
  color: rgba(255, 255, 255, 0.45);
}

[data-theme="dark"] .ch-autocomplete-empty {
  color: rgba(255, 255, 255, 0.3);
}
`;
