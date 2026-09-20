export const datePickerCssText = `
/* ==========================================================================
   Ant Design 5 & 6 Specification DatePicker Styles for Chella UI
   Tokens:
   - controlHeight: 32px (SM: 24px, LG: 40px)
   - fontSize: 14px (SM: 12px, LG: 16px)
   - borderRadius: 6px (SM: 4px, LG: 8px)
   - colorPrimary: #1677ff
   - colorPrimaryHover: #4096ff
   - colorBorder: #d9d9d9
   - colorError: #ff4d4f
   - colorWarning: #faad14
   - colorBgContainer: #ffffff
   - colorBgElevated: #ffffff
   - cellActiveWithRangeBg: #e6f4ff
   - cellHoverWithRangeBg: #cbe0fd
   - zIndexPopup: 1050
   ========================================================================== */

:root {
  --ch-picker-height: 32px;
  --ch-picker-font-size: 14px;
  --ch-picker-radius: 6px;
  --ch-picker-padding-inline: 11px;
  --ch-picker-padding-block: 4px;

  --ch-picker-bg: var(--ch-color-bg-container, #ffffff);
  --ch-picker-color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  --ch-picker-border: var(--ch-color-border, #d9d9d9);
  --ch-picker-hover-border: #4096ff;
  --ch-picker-active-border: #1677ff;
  --ch-picker-active-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);

  --ch-picker-error-border: #ff4d4f;
  --ch-picker-error-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);
  --ch-picker-warning-border: #faad14;
  --ch-picker-warning-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);

  --ch-picker-disabled-bg: rgba(0, 0, 0, 0.04);
  --ch-picker-disabled-color: rgba(0, 0, 0, 0.25);

  --ch-picker-cell-width: 36px;
  --ch-picker-cell-height: 28px;
  --ch-picker-cell-active-range-bg: #e6f4ff;
  --ch-picker-cell-hover-range-bg: #cbe0fd;
}

/* ------------------- Input Box Container ------------------- */
.ch-picker,
.ch-picker-range {
  box-sizing: border-box;
  margin: 0;
  padding: var(--ch-picker-padding-block) var(--ch-picker-padding-inline);
  color: var(--ch-picker-color);
  font-size: var(--ch-picker-font-size);
  line-height: 1.5714;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  display: inline-flex;
  align-items: center;
  height: var(--ch-picker-height);
  background-color: var(--ch-picker-bg);
  border: 1px solid var(--ch-picker-border);
  border-radius: var(--ch-picker-radius);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  user-select: none;
}

.ch-picker:hover:not(.ch-picker--disabled),
.ch-picker-range:hover:not(.ch-picker-range--disabled) {
  border-color: var(--ch-picker-hover-border);
}

.ch-picker--focused,
.ch-picker-range--focused {
  border-color: var(--ch-picker-active-border);
  box-shadow: var(--ch-picker-active-shadow);
  outline: 0;
}

/* Inner input element */
.ch-picker-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.ch-picker-input > input {
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 0;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

.ch-picker-input > input::placeholder {
  color: rgba(0, 0, 0, 0.25);
}

/* Range Picker Dual Inputs */
.ch-picker-range {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.ch-picker-range-separator {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  color: rgba(0, 0, 0, 0.45);
}

/* ------------------- Sizes ------------------- */
.ch-picker--lg,
.ch-picker-range--lg {
  height: 40px;
  padding: 7px 11px;
  font-size: 16px;
  border-radius: 8px;
}

.ch-picker--md,
.ch-picker-range--md {
  height: 32px;
  padding: 4px 11px;
  font-size: 14px;
  border-radius: 6px;
}

.ch-picker--sm,
.ch-picker-range--sm {
  height: 24px;
  padding: 0px 7px;
  font-size: 12px;
  border-radius: 4px;
}

/* ------------------- Variants ------------------- */
.ch-picker--variant-outlined,
.ch-picker-range--variant-outlined {
  background-color: var(--ch-picker-bg);
  border-color: var(--ch-picker-border);
}

.ch-picker--variant-filled,
.ch-picker-range--variant-filled {
  background-color: rgba(0, 0, 0, 0.04);
  border-color: transparent;
}
.ch-picker--variant-filled:hover:not(.ch-picker--disabled),
.ch-picker-range--variant-filled:hover:not(.ch-picker-range--disabled) {
  background-color: rgba(0, 0, 0, 0.06);
  border-color: transparent;
}
.ch-picker--variant-filled.ch-picker--focused,
.ch-picker-range--variant-filled.ch-picker-range--focused {
  background-color: var(--ch-picker-bg);
  border-color: var(--ch-picker-active-border);
  box-shadow: var(--ch-picker-active-shadow);
}

.ch-picker--variant-borderless,
.ch-picker-range--variant-borderless {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none !important;
}

.ch-picker--variant-underlined,
.ch-picker-range--variant-underlined {
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--ch-picker-border);
  border-radius: 0;
  padding-inline: 0;
}
.ch-picker--variant-underlined.ch-picker--focused,
.ch-picker-range--variant-underlined.ch-picker-range--focused {
  border-bottom-color: var(--ch-picker-active-border);
  box-shadow: 0 1px 0 0 var(--ch-picker-active-border);
}

/* ------------------- Statuses ------------------- */
.ch-picker--status-error,
.ch-picker-range--status-error {
  border-color: var(--ch-picker-error-border) !important;
}
.ch-picker--status-error.ch-picker--focused,
.ch-picker-range--status-error.ch-picker-range--focused {
  border-color: var(--ch-picker-error-border) !important;
  box-shadow: var(--ch-picker-error-shadow) !important;
}

.ch-picker--status-warning,
.ch-picker-range--status-warning {
  border-color: var(--ch-picker-warning-border) !important;
}
.ch-picker--status-warning.ch-picker--focused,
.ch-picker-range--status-warning.ch-picker-range--focused {
  border-color: var(--ch-picker-warning-border) !important;
  box-shadow: var(--ch-picker-warning-shadow) !important;
}

/* ------------------- Disabled State ------------------- */
.ch-picker--disabled,
.ch-picker-range--disabled {
  background-color: var(--ch-picker-disabled-bg) !important;
  border-color: var(--ch-picker-border) !important;
  color: var(--ch-picker-disabled-color) !important;
  cursor: not-allowed !important;
}
.ch-picker--disabled input,
.ch-picker-range--disabled input {
  cursor: not-allowed !important;
  color: var(--ch-picker-disabled-color) !important;
}

/* ------------------- Prefix, Suffix, Clear ------------------- */
.ch-picker-prefix {
  margin-inline-end: 6px;
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
}

.ch-picker-suffix {
  margin-inline-start: 6px;
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

.ch-picker-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.25);
  background: var(--ch-picker-bg);
  cursor: pointer;
  transition: color 0.2s;
  padding: 0 2px;
}
.ch-picker-clear:hover {
  color: rgba(0, 0, 0, 0.45);
}

/* Multiple Selection Tags */
.ch-picker-multiple-tag {
  display: inline-flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 1px 6px;
  margin-inline-end: 4px;
  font-size: 12px;
}
.ch-picker-multiple-tag-remove {
  margin-inline-start: 4px;
  cursor: pointer;
  font-size: 10px;
}

/* ==========================================================================
   Popup Floating Dropdown & Calendar Panels
   ========================================================================== */
.ch-picker-dropdown {
  position: fixed;
  z-index: 1050;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5714;
  list-style: none;
  background-color: var(--ch-color-bg-container, #ffffff);
  border: 1px solid var(--ch-color-border, #d9d9d9);
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  overflow: hidden;
  user-select: none;
  animation: chPickerDropIn 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes chPickerDropIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.ch-picker-panels {
  display: inline-flex;
  flex-wrap: nowrap;
  vertical-align: top;
}

.ch-picker-panel {
  display: inline-flex;
  flex-direction: column;
  text-align: center;
  background: transparent;
  border-radius: 8px;
  outline: none;
  vertical-align: top;
  width: 288px;
}

/* Dual panels border in RangePicker */
.ch-picker-panel + .ch-picker-panel {
  border-inline-start: 1px solid var(--ch-color-border, #e2e8f0);
}

/* Header */
.ch-picker-header {
  display: flex;
  padding: 0 8px;
  color: var(--ch-picker-color);
  border-bottom: 1px solid var(--ch-color-border, #f0f0f0);
  height: 40px;
  line-height: 40px;
  align-items: center;
  justify-content: space-between;
}

.ch-picker-header-view {
  flex: auto;
  font-weight: 600;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.ch-picker-header-view button {
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
  padding: 0 4px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}
.ch-picker-header-view button:hover {
  color: var(--ch-picker-active-border);
  background: rgba(0, 0, 0, 0.04);
}

.ch-picker-header button.ch-picker-nav-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  padding: 0 6px;
  font-size: 12px;
  line-height: 24px;
  border-radius: 4px;
  transition: color 0.2s;
}
.ch-picker-header button.ch-picker-nav-btn:hover {
  color: var(--ch-picker-color);
}

/* Calendar Table Body */
.ch-picker-body {
  padding: 8px 12px;
}

.ch-picker-content {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.ch-picker-content th {
  height: 30px;
  color: rgba(0, 0, 0, 0.45);
  font-weight: normal;
  vertical-align: middle;
  font-size: 12px;
  text-align: center;
}

.ch-picker-cell {
  padding: 3px 0;
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  text-align: center;
  position: relative;
  transition: background 0.2s;
}

.ch-picker-cell-inner {
  position: relative;
  z-index: 2;
  display: inline-block;
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  transition: background 0.2s, border 0.2s;
  font-size: 13px;
}

.ch-picker-cell-in-view {
  color: var(--ch-picker-color);
}

.ch-picker-cell-in-view:hover:not(.ch-picker-cell-selected):not(.ch-picker-cell-disabled) .ch-picker-cell-inner {
  background: rgba(0, 0, 0, 0.06);
}

/* Today highlight */
.ch-picker-cell-today .ch-picker-cell-inner {
  border: 1px solid var(--ch-picker-active-border);
}

/* Selected Day */
.ch-picker-cell-selected .ch-picker-cell-inner {
  color: #ffffff !important;
  background: var(--ch-picker-active-border) !important;
  font-weight: 600;
}

/* In Range Background */
.ch-picker-cell-in-range::before {
  content: "";
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 0;
  right: 0;
  background: var(--ch-picker-cell-active-range-bg);
  z-index: 1;
}

.ch-picker-cell-range-start::before {
  left: 50%;
  border-start-start-radius: 4px;
  border-end-start-radius: 4px;
}
.ch-picker-cell-range-end::before {
  right: 50%;
  border-start-end-radius: 4px;
  border-end-end-radius: 4px;
}

/* Disabled Day */
.ch-picker-cell-disabled {
  color: var(--ch-picker-disabled-color) !important;
  cursor: not-allowed;
}
.ch-picker-cell-disabled::before {
  background: var(--ch-picker-disabled-bg);
}

/* ------------------- Month / Year / Quarter Grid ------------------- */
.ch-picker-grid-3col {
  width: 100%;
  border-collapse: collapse;
}

.ch-picker-grid-cell {
  padding: 12px 0;
  text-align: center;
  cursor: pointer;
}

.ch-picker-grid-cell-inner {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 13px;
  transition: all 0.2s;
  color: var(--ch-picker-color);
}

.ch-picker-grid-cell:hover:not(.ch-picker-grid-cell-selected):not(.ch-picker-grid-cell-disabled) .ch-picker-grid-cell-inner {
  background: rgba(0, 0, 0, 0.06);
}

.ch-picker-grid-cell-selected .ch-picker-grid-cell-inner {
  background: var(--ch-picker-active-border);
  color: #fff;
  font-weight: 600;
}

.ch-picker-grid-cell-disabled .ch-picker-grid-cell-inner {
  color: var(--ch-picker-disabled-color);
  cursor: not-allowed;
}

/* ------------------- Footer, Presets, and Time Bar ------------------- */
.ch-picker-footer {
  border-top: 1px solid var(--ch-color-border, #f0f0f0);
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}

.ch-picker-footer-extra {
  padding: 6px 12px;
  border-top: 1px solid var(--ch-color-border, #f0f0f0);
  text-align: left;
  font-size: 13px;
}

.ch-picker-presets {
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-inline-end: 1px solid var(--ch-color-border, #f0f0f0);
  background: rgba(0, 0, 0, 0.01);
  min-width: 110px;
}
.ch-picker-presets button {
  background: transparent;
  border: none;
  text-align: left;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  color: var(--ch-picker-color);
  transition: background 0.2s;
}
.ch-picker-presets button:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--ch-picker-active-border);
}

.ch-picker-today-btn {
  background: transparent;
  border: none;
  color: var(--ch-picker-active-border);
  cursor: pointer;
  font-size: 13px;
  padding: 2px 4px;
}

.ch-picker-ok-btn {
  background: var(--ch-picker-active-border);
  border: none;
  color: #fff;
  border-radius: 4px;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 12px;
}

/* ------------------- Time Columns ------------------- */
.ch-picker-time-panel {
  display: flex;
  height: 224px;
  border-inline-start: 1px solid var(--ch-color-border, #f0f0f0);
}

.ch-picker-time-column {
  flex: 1;
  width: 56px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  scrollbar-width: thin;
}

.ch-picker-time-cell {
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}
.ch-picker-time-cell:hover {
  background: rgba(0, 0, 0, 0.06);
}
.ch-picker-time-cell-selected {
  background: var(--ch-picker-cell-active-range-bg);
  font-weight: 600;
  color: var(--ch-picker-active-border);
}
`;
