export const radioCssText = `
:root {
  --ch-radio-size: 16px;
  --ch-dot-size: 8px;
  --ch-dot-color-disabled: rgba(0, 0, 0, 0.25);
  --ch-wrapper-margin-inline-end: 8px;
  --ch-button-bg: #ffffff;
  --ch-button-checked-bg: #ffffff;
  --ch-button-checked-bg-disabled: rgba(0, 0, 0, 0.15);
  --ch-button-checked-color-disabled: rgba(0, 0, 0, 0.25);
  --ch-button-color: rgba(0, 0, 0, 0.88);
  --ch-button-padding-inline: 15px;
  --ch-button-solid-checked-bg: #1677ff;
  --ch-button-solid-checked-hover-bg: #4096ff;
  --ch-button-solid-checked-active-bg: #0958d9;
  --ch-button-solid-checked-color: #ffffff;
}

/* ========================================================
   Standard Circular Radio
   ======================================================== */
.ch-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  margin-inline-end: var(--ch-wrapper-margin-inline-end, 8px);
  font-size: var(--ch-font-size, 14px);
  line-height: var(--ch-line-height, 1.5714285714285714);
  color: var(--ch-color-text, rgba(0, 0, 0, 0.88));
  position: relative;
  user-select: none;
  vertical-align: middle;
}

.ch-radio--disabled {
  cursor: not-allowed;
  color: var(--ch-color-text-disabled, rgba(0, 0, 0, 0.25));
}

.ch-radio-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--ch-radio-size, 16px);
  height: var(--ch-radio-size, 16px);
}

.ch-radio-inner {
  position: relative;
  top: 0;
  inset-inline-start: 0;
  display: block;
  width: var(--ch-radio-size, 16px);
  height: var(--ch-radio-size, 16px);
  background-color: var(--ch-color-bg-container, #ffffff);
  border: var(--ch-line-width, 1px) solid var(--ch-color-border, #d9d9d9);
  border-radius: 50%;
  transition: all var(--ch-motion-duration-mid, 0.2s) var(--ch-motion-ease-in-out-circ, cubic-bezier(0.78, 0.14, 0.15, 0.86));
  box-sizing: border-box;
}

.ch-radio:hover:not(.ch-radio--disabled) .ch-radio-inner {
  border-color: var(--ch-color-primary, #1677ff);
}

.ch-radio--checked .ch-radio-inner {
  border-color: var(--ch-color-primary, #1677ff);
  background-color: var(--ch-color-bg-container, #ffffff);
}

/* Inner dot */
.ch-radio-inner::after {
  box-sizing: border-box;
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  width: var(--ch-dot-size, 8px);
  height: var(--ch-dot-size, 8px);
  background-color: var(--ch-color-primary, #1677ff);
  border-radius: 50%;
  content: "";
  transition: all var(--ch-motion-duration-mid, 0.2s) var(--ch-motion-ease-in-out-circ, cubic-bezier(0.78, 0.14, 0.15, 0.86));
}

.ch-radio--checked .ch-radio-inner::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

/* Disabled styling */
.ch-radio--disabled .ch-radio-inner {
  background-color: var(--ch-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
  border-color: var(--ch-color-border, #d9d9d9);
  cursor: not-allowed;
}

.ch-radio--disabled .ch-radio-inner::after {
  background-color: var(--ch-dot-color-disabled, rgba(0, 0, 0, 0.25));
}

/* Focus outline */
.ch-radio-input:focus-visible + .ch-radio-inner {
  outline: var(--ch-line-width-focus, 3px) solid var(--ch-control-outline, rgba(5, 145, 255, 0.1));
  outline-offset: 1px;
}

/* Native input hidden */
.ch-radio-input {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  cursor: inherit;
  margin: 0;
  width: 100%;
  height: 100%;
}

.ch-radio-label {
  padding-inline-start: 8px;
  padding-inline-end: 8px;
  line-height: var(--ch-line-height, 1.5714285714285714);
}

/* Wave animation */
.ch-radio-wave {
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  pointer-events: none;
  border: 0 solid var(--ch-color-primary, #1677ff);
  opacity: 0.6;
  animation: chRadioWave 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
}

@keyframes chRadioWave {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
    border-width: 6px;
  }
}

/* ========================================================
   Radio.Button Component Styles
   ======================================================== */
.ch-radio-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--ch-control-height, 32px);
  padding: 0 var(--ch-button-padding-inline, 15px);
  color: var(--ch-button-color, rgba(0, 0, 0, 0.88));
  font-size: var(--ch-font-size, 14px);
  line-height: calc(var(--ch-control-height, 32px) - 2px);
  background: var(--ch-button-bg, #ffffff);
  border: 1px solid var(--ch-color-border, #d9d9d9);
  border-block-start-width: 1.02px;
  border-inline-start-width: 0;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
  user-select: none;
  box-sizing: border-box;
  margin: 0;
  vertical-align: middle;
}

.ch-radio-button:first-child {
  border-inline-start-width: 1px;
  border-start-start-radius: var(--ch-border-radius, 6px);
  border-end-start-radius: var(--ch-border-radius, 6px);
}

.ch-radio-button:last-child {
  border-start-end-radius: var(--ch-border-radius, 6px);
  border-end-end-radius: var(--ch-border-radius, 6px);
}

.ch-radio-button:hover:not(.ch-radio-button--disabled) {
  color: var(--ch-color-primary, #1677ff);
}

/* Checked button - outline style */
.ch-radio-button--checked:not(.ch-radio-button--disabled) {
  z-index: 1;
  color: var(--ch-color-primary, #1677ff);
  background: var(--ch-button-checked-bg, #ffffff);
  border-color: var(--ch-color-primary, #1677ff);
}

.ch-radio-button--checked:not(.ch-radio-button--disabled):not(:first-child)::before {
  position: absolute;
  inset-block-start: -1px;
  inset-inline-start: -1px;
  display: block;
  box-sizing: content-box;
  width: 1px;
  height: 100%;
  padding: 1px 0;
  background-color: var(--ch-color-primary, #1677ff);
  transition: background-color 0.2s;
  content: "";
}

/* Checked button - solid style */
.ch-radio-button--solid.ch-radio-button--checked:not(.ch-radio-button--disabled) {
  color: var(--ch-button-solid-checked-color, #ffffff);
  background: var(--ch-button-solid-checked-bg, #1677ff);
  border-color: var(--ch-button-solid-checked-bg, #1677ff);
}

.ch-radio-button--solid.ch-radio-button--checked:not(.ch-radio-button--disabled):hover {
  background: var(--ch-button-solid-checked-hover-bg, #4096ff);
  border-color: var(--ch-button-solid-checked-hover-bg, #4096ff);
}

.ch-radio-button--solid.ch-radio-button--checked:not(.ch-radio-button--disabled):active {
  background: var(--ch-button-solid-checked-active-bg, #0958d9);
  border-color: var(--ch-button-solid-checked-active-bg, #0958d9);
}

/* Button Sizes */
.ch-radio-button--sm {
  height: var(--ch-control-height-sm, 24px);
  padding: 0 7px;
  font-size: 14px;
  line-height: calc(var(--ch-control-height-sm, 24px) - 2px);
}

.ch-radio-button--lg {
  height: var(--ch-control-height-lg, 40px);
  padding: 0 15px;
  font-size: var(--ch-font-size-lg, 16px);
  line-height: calc(var(--ch-control-height-lg, 40px) - 2px);
}

/* Button Disabled */
.ch-radio-button--disabled {
  color: var(--ch-color-text-disabled, rgba(0, 0, 0, 0.25));
  background-color: var(--ch-color-bg-container-disabled, rgba(0, 0, 0, 0.04));
  border-color: var(--ch-color-border, #d9d9d9);
  cursor: not-allowed;
}

.ch-radio-button--disabled.ch-radio-button--checked {
  color: var(--ch-button-checked-color-disabled, rgba(0, 0, 0, 0.25));
  background-color: var(--ch-button-checked-bg-disabled, rgba(0, 0, 0, 0.15));
  border-color: var(--ch-color-border, #d9d9d9);
}

.ch-radio-button .ch-radio-input {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  cursor: inherit;
  margin: 0;
  width: 100%;
  height: 100%;
}

/* ========================================================
   Radio.Group Container Styles
   ======================================================== */
.ch-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: var(--ch-font-size, 14px);
  box-sizing: border-box;
}

.ch-radio-group--vertical {
  flex-direction: column;
  align-items: flex-start;
  row-gap: 8px;
}

.ch-radio-group--vertical .ch-radio-button {
  border-inline-start-width: 1px;
  border-block-start-width: 0;
  width: 100%;
}

.ch-radio-group--vertical .ch-radio-button:first-child {
  border-block-start-width: 1px;
  border-start-start-radius: var(--ch-border-radius, 6px);
  border-start-end-radius: var(--ch-border-radius, 6px);
  border-end-start-radius: 0;
}

.ch-radio-group--vertical .ch-radio-button:last-child {
  border-end-start-radius: var(--ch-border-radius, 6px);
  border-end-end-radius: var(--ch-border-radius, 6px);
  border-start-end-radius: 0;
}

.ch-radio-group--block {
  display: flex;
  width: 100%;
}

.ch-radio-group--block .ch-radio-button {
  flex: 1;
  text-align: center;
}
`;
