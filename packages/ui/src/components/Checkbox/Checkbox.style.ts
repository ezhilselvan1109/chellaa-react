export const checkboxCssText = `
/* ==========================================================================
   Ant Design 5 & 6 Specification Checkbox Styles for Chella UI
   Design Tokens:
   - controlInteractiveSize: 16px
   - borderRadiusSM: 4px
   - colorPrimary: #1677ff
   - colorPrimaryHover: #4096ff
   - colorBorder: #d9d9d9
   - colorBgContainer: #ffffff
   - colorBgContainerDisabled: rgba(0, 0, 0, 0.04)
   - colorTextDisabled: rgba(0, 0, 0, 0.25)
   - motionDurationFast: 0.1s
   - motionEaseOutBack: cubic-bezier(0.12, 0.4, 0.29, 1.46)
   ========================================================================== */

.ch-checkbox-wrapper {
  --ch-cb-primary: var(--ch-color-primary, #1677ff);
  --ch-cb-primary-hover: #4096ff;
  --ch-cb-border: var(--ch-color-border, #d9d9d9);
  --ch-cb-bg: var(--ch-color-bg-container, #ffffff);
  --ch-cb-bg-disabled: rgba(0, 0, 0, 0.04);
  --ch-cb-text-disabled: rgba(0, 0, 0, 0.25);
  --ch-cb-outline: rgba(5, 145, 255, 0.1);

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  font-size: 14px;
  line-height: 1.5714;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: inline-flex;
  align-items: baseline;
  cursor: pointer;
  vertical-align: middle;
  user-select: none;
}

.ch-checkbox-wrapper + .ch-checkbox-wrapper {
  margin-inline-start: 8px;
}

.ch-checkbox-wrapper--disabled {
  cursor: not-allowed;
  color: var(--ch-cb-text-disabled);
}

/* ------------------- Box Container ------------------- */
.ch-checkbox {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: inherit;
  font-size: 14px;
  position: relative;
  top: 0.2em;
  line-height: 1;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  align-self: center;
}

.ch-checkbox--disabled {
  cursor: not-allowed;
}

/* ------------------- Native Input ------------------- */
.ch-checkbox-input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  margin: 0;
}

.ch-checkbox-input:disabled {
  cursor: not-allowed;
}

/* ------------------- Checkbox Inner ------------------- */
.ch-checkbox-inner {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  direction: ltr;
  background-color: var(--ch-cb-bg);
  border: 1px solid var(--ch-cb-border);
  border-radius: 4px;
  border-collapse: separate;
  transition: all 0.1s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

/* Checkmark line via ::after */
.ch-checkbox-inner::after {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 21.5%;
  display: table;
  width: 5.71428571px;
  height: 9.14285714px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) scale(0) translate(-50%, -50%);
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  opacity: 0;
  content: "";
}

/* Hover state */
.ch-checkbox-wrapper:hover:not(.ch-checkbox-wrapper--disabled) .ch-checkbox-inner,
.ch-checkbox:hover:not(.ch-checkbox--disabled) .ch-checkbox-inner {
  border-color: var(--ch-cb-primary);
}

/* Focus state */
.ch-checkbox-input:focus-visible + .ch-checkbox-inner {
  border-color: var(--ch-cb-primary);
  box-shadow: 0 0 0 3px var(--ch-cb-outline);
}

/* Checked state */
.ch-checkbox--checked .ch-checkbox-inner {
  background-color: var(--ch-cb-primary);
  border-color: var(--ch-cb-primary);
}

.ch-checkbox--checked .ch-checkbox-inner::after {
  transform: rotate(45deg) scale(1) translate(-50%, -50%);
  opacity: 1;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.05s;
}

/* Indeterminate state */
.ch-checkbox--indeterminate .ch-checkbox-inner {
  background-color: var(--ch-cb-bg);
  border-color: var(--ch-cb-primary);
}

.ch-checkbox--indeterminate .ch-checkbox-inner::after {
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: var(--ch-cb-primary);
  border: 0;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

/* Disabled state */
.ch-checkbox--disabled .ch-checkbox-inner {
  background-color: var(--ch-cb-bg-disabled) !important;
  border-color: var(--ch-cb-border) !important;
  cursor: not-allowed;
}

.ch-checkbox--disabled.ch-checkbox--checked .ch-checkbox-inner::after {
  border-color: var(--ch-cb-text-disabled);
}

.ch-checkbox--disabled.ch-checkbox--indeterminate .ch-checkbox-inner::after {
  background-color: var(--ch-cb-text-disabled);
}

/* ------------------- Label Text ------------------- */
.ch-checkbox-label {
  padding-inline-start: 8px;
  padding-inline-end: 8px;
  line-height: 1.5714;
}

/* ------------------- Checkbox Group ------------------- */
.ch-checkbox-group {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  display: inline-flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
}
`;
