export const inputCssText = `
/* ==========================================================================
   Ant Design 5 & 6 Specification Input Styles for Chella UI
   Design Tokens:
   - controlHeight: 32px (SM: 24px, LG: 40px)
   - fontSize: 14px (SM: 14px, LG: 16px)
   - borderRadius: 6px (SM: 4px, LG: 8px)
   - colorPrimary: #1677ff
   - colorPrimaryHover: #4096ff
   - colorBorder: #d9d9d9
   - colorError: #ff4d4f
   - colorWarning: #faad14
   - colorBgContainer: #ffffff
   - colorBgContainerDisabled: rgba(0, 0, 0, 0.04)
   - colorTextDisabled: rgba(0, 0, 0, 0.25)
   ========================================================================== */

:root {
  --ch-input-font-size: 14px;
  --ch-input-line-height: 1.5714285714285714;
  --ch-input-height: 32px;
  --ch-input-padding-inline: 11px;
  --ch-input-padding-block: 4px;
  --ch-input-radius: 6px;

  --ch-input-bg: var(--ch-color-bg-container, #ffffff);
  --ch-input-color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  --ch-input-border: var(--ch-color-border, #d9d9d9);
  --ch-input-hover-border: #4096ff;
  --ch-input-active-border: #1677ff;
  --ch-input-active-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);

  --ch-input-error-border: #ff4d4f;
  --ch-input-error-hover-border: #ff7875;
  --ch-input-error-shadow: 0 0 0 2px rgba(255, 38, 5, 0.06);

  --ch-input-warning-border: #faad14;
  --ch-input-warning-hover-border: #ffc53d;
  --ch-input-warning-shadow: 0 0 0 2px rgba(255, 215, 5, 0.1);

  --ch-input-disabled-bg: rgba(0, 0, 0, 0.04);
  --ch-input-disabled-color: rgba(0, 0, 0, 0.25);
  --ch-input-disabled-border: #d9d9d9;
}

/* ------------------- Base Input & Affix Wrapper ------------------- */
.ch-input,
.ch-input-affix-wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: var(--ch-input-padding-block) var(--ch-input-padding-inline);
  color: var(--ch-input-color);
  font-size: var(--ch-input-font-size);
  line-height: var(--ch-input-line-height);
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  background-color: var(--ch-input-bg);
  background-image: none;
  border-width: 1px;
  border-style: solid;
  border-color: var(--ch-input-border);
  border-radius: var(--ch-input-radius);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ch-input {
  height: var(--ch-input-height);
}

.ch-input-affix-wrapper {
  height: var(--ch-input-height);
}

.ch-input:focus,
.ch-input-affix-wrapper:focus-within {
  border-color: var(--ch-input-active-border);
  box-shadow: var(--ch-input-active-shadow);
  outline: 0;
}

.ch-input:hover:not(:disabled):not(.ch-input--disabled),
.ch-input-affix-wrapper:hover:not(.ch-input-affix-wrapper--disabled) {
  border-color: var(--ch-input-hover-border);
}

/* Inner input when wrapped with affixes */
.ch-input-affix-wrapper > input.ch-input-inner {
  padding: 0;
  font-size: inherit;
  border: none;
  border-radius: 0;
  outline: none;
  background: transparent;
  color: inherit;
  width: 100%;
  height: 100%;
  line-height: inherit;
}

.ch-input-affix-wrapper > input.ch-input-inner:focus {
  box-shadow: none;
}

/* ------------------- Sizes ------------------- */
.ch-input--lg,
.ch-input-affix-wrapper--lg {
  height: 40px;
  padding: 7px 11px;
  font-size: 16px;
  border-radius: 8px;
}

.ch-input--md,
.ch-input-affix-wrapper--md {
  height: 32px;
  padding: 4px 11px;
  font-size: 14px;
  border-radius: 6px;
}

.ch-input--sm,
.ch-input-affix-wrapper--sm {
  height: 24px;
  padding: 0px 7px;
  font-size: 14px;
  border-radius: 4px;
}

/* ------------------- Variants ------------------- */
/* Outlined (Default) */
.ch-input--variant-outlined,
.ch-input-affix-wrapper--variant-outlined {
  background-color: var(--ch-input-bg);
  border-color: var(--ch-input-border);
}

/* Filled */
.ch-input--variant-filled,
.ch-input-affix-wrapper--variant-filled {
  background-color: rgba(0, 0, 0, 0.04);
  border-color: transparent;
}
.ch-input--variant-filled:hover:not(:disabled):not(.ch-input--disabled),
.ch-input-affix-wrapper--variant-filled:hover:not(.ch-input-affix-wrapper--disabled) {
  background-color: rgba(0, 0, 0, 0.06);
  border-color: transparent;
}
.ch-input--variant-filled:focus,
.ch-input-affix-wrapper--variant-filled:focus-within {
  background-color: var(--ch-input-bg);
  border-color: var(--ch-input-active-border);
  box-shadow: var(--ch-input-active-shadow);
}

/* Borderless */
.ch-input--variant-borderless,
.ch-input-affix-wrapper--variant-borderless {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none !important;
}

/* Underlined */
.ch-input--variant-underlined,
.ch-input-affix-wrapper--variant-underlined {
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--ch-input-border);
  border-radius: 0;
  padding-inline: 0;
}
.ch-input--variant-underlined:focus,
.ch-input-affix-wrapper--variant-underlined:focus-within {
  border-bottom-color: var(--ch-input-active-border);
  box-shadow: 0 1px 0 0 var(--ch-input-active-border);
}

/* ------------------- Validation Statuses ------------------- */
.ch-input--status-error,
.ch-input-affix-wrapper--status-error {
  border-color: var(--ch-input-error-border) !important;
}
.ch-input--status-error:hover,
.ch-input-affix-wrapper--status-error:hover {
  border-color: var(--ch-input-error-hover-border) !important;
}
.ch-input--status-error:focus,
.ch-input-affix-wrapper--status-error:focus-within {
  border-color: var(--ch-input-error-border) !important;
  box-shadow: var(--ch-input-error-shadow) !important;
}

.ch-input--status-warning,
.ch-input-affix-wrapper--status-warning {
  border-color: var(--ch-input-warning-border) !important;
}
.ch-input--status-warning:hover,
.ch-input-affix-wrapper--status-warning:hover {
  border-color: var(--ch-input-warning-hover-border) !important;
}
.ch-input--status-warning:focus,
.ch-input-affix-wrapper--status-warning:focus-within {
  border-color: var(--ch-input-warning-border) !important;
  box-shadow: var(--ch-input-warning-shadow) !important;
}

/* ------------------- Disabled State ------------------- */
.ch-input:disabled,
.ch-input--disabled,
.ch-input-affix-wrapper--disabled {
  color: var(--ch-input-disabled-color) !important;
  background-color: var(--ch-input-disabled-bg) !important;
  border-color: var(--ch-input-disabled-border) !important;
  box-shadow: none !important;
  cursor: not-allowed !important;
}
.ch-input-affix-wrapper--disabled input {
  cursor: not-allowed !important;
  color: var(--ch-input-disabled-color) !important;
}

/* ------------------- Prefix & Suffix ------------------- */
.ch-input-prefix {
  display: inline-flex;
  align-items: center;
  margin-inline-end: 6px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 1;
  flex-shrink: 0;
}

.ch-input-suffix {
  display: inline-flex;
  align-items: center;
  margin-inline-start: 6px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 1;
  flex-shrink: 0;
}

/* Clear icon */
.ch-input-clear-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  cursor: pointer;
  transition: color 0.2s;
  user-select: none;
  padding: 0 2px;
}
.ch-input-clear-icon:hover {
  color: rgba(0, 0, 0, 0.45);
}

/* Character count */
.ch-input-count {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
  white-space: nowrap;
}
.ch-input-count--exceeded {
  color: var(--ch-input-error-border);
}

/* ------------------- Addon (addonBefore / addonAfter) ------------------- */
.ch-input-group-wrapper {
  display: inline-table;
  width: 100%;
  vertical-align: middle;
}
.ch-input-wrapper {
  display: table-cell;
  width: 100%;
}
.ch-input-group-addon {
  display: table-cell;
  padding: 0 11px;
  color: var(--ch-input-color);
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid var(--ch-input-border);
  vertical-align: middle;
  white-space: nowrap;
  transition: all 0.3s;
}
.ch-input-group-addon:first-child {
  border-inline-end: 0;
  border-start-start-radius: var(--ch-input-radius);
  border-end-start-radius: var(--ch-input-radius);
}
.ch-input-group-addon:last-child {
  border-inline-start: 0;
  border-start-end-radius: var(--ch-input-radius);
  border-end-end-radius: var(--ch-input-radius);
}
.ch-input-group-wrapper .ch-input:first-child:not(:last-child),
.ch-input-group-wrapper .ch-input-affix-wrapper:first-child:not(:last-child) {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}
.ch-input-group-wrapper .ch-input:last-child:not(:first-child),
.ch-input-group-wrapper .ch-input-affix-wrapper:last-child:not(:first-child) {
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}
.ch-input-group-wrapper .ch-input:not(:first-child):not(:last-child),
.ch-input-group-wrapper .ch-input-affix-wrapper:not(:first-child):not(:last-child) {
  border-radius: 0;
}

/* ------------------- TextArea ------------------- */
.ch-input-textarea-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: bottom;
}

.ch-input-textarea {
  box-sizing: border-box;
  margin: 0;
  padding: 5px 11px;
  color: var(--ch-input-color);
  font-size: 14px;
  line-height: 1.5714285714285714;
  vertical-align: bottom;
  background-color: var(--ch-input-bg);
  background-image: none;
  border: 1px solid var(--ch-input-border);
  border-radius: var(--ch-input-radius);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  min-height: 32px;
  resize: vertical;
  font-family: inherit;
  outline: none;
}

.ch-input-textarea:hover:not(:disabled) {
  border-color: var(--ch-input-hover-border);
}

.ch-input-textarea:focus {
  border-color: var(--ch-input-active-border);
  box-shadow: var(--ch-input-active-shadow);
}

.ch-input-textarea--disabled {
  color: var(--ch-input-disabled-color) !important;
  background-color: var(--ch-input-disabled-bg) !important;
  border-color: var(--ch-input-disabled-border) !important;
  cursor: not-allowed;
  resize: none;
}

.ch-input-textarea-count-bottom {
  text-align: right;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 4px;
}

/* ------------------- Search ------------------- */
.ch-input-search {
  position: relative;
}
.ch-input-search-button {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ch-input-border);
  background: rgba(0, 0, 0, 0.02);
  color: var(--ch-input-color);
  padding: 0 12px;
  height: 100%;
  border-start-end-radius: var(--ch-input-radius);
  border-end-end-radius: var(--ch-input-radius);
  transition: all 0.2s;
  border-inline-start: none;
}
.ch-input-search-button--primary {
  background: var(--ch-color-primary, #1677ff);
  border-color: var(--ch-color-primary, #1677ff);
  color: #fff;
}
.ch-input-search-button--primary:hover {
  background: var(--ch-input-hover-border);
  border-color: var(--ch-input-hover-border);
}

/* ------------------- Password ------------------- */
.ch-input-password-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  transition: color 0.2s;
  user-select: none;
}
.ch-input-password-toggle:hover {
  color: rgba(0, 0, 0, 0.88);
}

/* ------------------- OTP ------------------- */
.ch-input-otp {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  column-gap: 8px;
}

.ch-input-otp-input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 14px;
  font-family: inherit;
  color: var(--ch-input-color);
  background-color: var(--ch-input-bg);
  border: 1px solid var(--ch-input-border);
  border-radius: 6px;
  transition: all 0.2s;
  outline: none;
}

.ch-input-otp-input--lg {
  width: 40px;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
}

.ch-input-otp-input--md {
  width: 32px;
  height: 32px;
  font-size: 14px;
  border-radius: 6px;
}

.ch-input-otp-input--sm {
  width: 24px;
  height: 24px;
  font-size: 12px;
  border-radius: 4px;
}

.ch-input-otp-input:hover:not(:disabled) {
  border-color: var(--ch-input-hover-border);
}

.ch-input-otp-input:focus {
  border-color: var(--ch-input-active-border);
  box-shadow: var(--ch-input-active-shadow);
}

.ch-input-otp-input:disabled {
  background-color: var(--ch-input-disabled-bg);
  color: var(--ch-input-disabled-color);
  border-color: var(--ch-input-disabled-border);
  cursor: not-allowed;
}

.ch-input-otp-separator {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  user-select: none;
}
`;
