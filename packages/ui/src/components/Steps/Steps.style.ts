export const stepsCssText = `
:root {
  --steps-icon-size: 32px;
  --steps-icon-size-sm: 24px;
  --steps-icon-font-size: 14px;
  --steps-icon-font-size-sm: 12px;
  --steps-dot-size: 8px;
  --steps-dot-current-size: 10px;
  --steps-nav-arrow-color: rgba(0, 0, 0, 0.35);
  --steps-rail-color: rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] {
  --steps-nav-arrow-color: rgba(255, 255, 255, 0.45);
  --steps-rail-color: rgba(255, 255, 255, 0.22);
}

/* Base Steps Container */
.ch-steps {
  display: flex;
  width: 100%;
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  font-size: 14px;
  line-height: 1.5714285714285714;
  box-sizing: border-box;
  text-align: left;
  position: relative;
}

.ch-steps * {
  box-sizing: border-box;
}

/* Orientations */
.ch-steps-horizontal {
  flex-direction: row;
}

.ch-steps-vertical {
  flex-direction: column;
}

/* Step Item */
.ch-steps-item {
  position: relative;
  display: inline-flex;
  flex: 1;
  overflow: visible;
  vertical-align: top;
}

.ch-steps-horizontal:not(.ch-steps-title-vertical) .ch-steps-item:last-child {
  flex: none;
}

.ch-steps-item-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  position: relative;
  outline: none;
}

/* Connecting Rail - Horizontal default (lives inside header after title) */
.ch-steps-horizontal:not(.ch-steps-title-vertical) .ch-steps-item-header {
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
}

.ch-steps-horizontal:not(.ch-steps-title-vertical) .ch-steps-item-header .ch-steps-item-rail {
  flex: 1;
  height: 1px;
  margin-left: 12px;
  margin-right: 12px;
  background-color: var(--steps-rail-color);
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* Finished step connecting rail color */
.ch-steps-item-finish .ch-steps-item-rail {
  background-color: var(--color-primary, #1677ff) !important;
}

/* Connecting Rail - Vertical Orientation */
.ch-steps-vertical .ch-steps-item {
  min-height: 64px;
}

.ch-steps-vertical .ch-steps-item:last-child {
  min-height: auto;
}

.ch-steps-vertical .ch-steps-item-rail {
  position: absolute;
  left: 15px;
  top: calc(var(--steps-icon-size, 32px) + 6px);
  bottom: 6px;
  width: 1px;
  background-color: var(--steps-rail-color);
  z-index: 1;
  transition: background-color 0.3s;
}

.ch-steps-vertical.ch-steps-sm .ch-steps-item-rail {
  left: 11px;
  top: calc(var(--steps-icon-size-sm, 24px) + 4px);
  bottom: 4px;
}

/* Step Icon Base */
.ch-steps-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--steps-icon-size, 32px);
  height: var(--steps-icon-size, 32px);
  border-radius: 50%;
  font-size: var(--steps-icon-font-size, 14px);
  line-height: 1;
  margin-right: 8px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  z-index: 2;
  background-color: var(--color-bg-container, #ffffff);
  flex-shrink: 0;
  user-select: none;
}

.ch-steps-sm .ch-steps-item-icon {
  width: var(--steps-icon-size-sm, 24px);
  height: var(--steps-icon-size-sm, 24px);
  font-size: var(--steps-icon-font-size-sm, 12px);
  margin-right: 6px;
}

/* Status: Wait */
.ch-steps-item-wait .ch-steps-item-icon {
  background-color: var(--color-bg-container, #ffffff);
  border: 1px solid var(--color-text-disabled, rgba(0, 0, 0, 0.25));
  color: var(--color-text-disabled, rgba(0, 0, 0, 0.25));
}
.ch-steps-item-wait .ch-steps-item-title {
  color: var(--color-text-description, rgba(0, 0, 0, 0.45));
}

/* Status: Process (Active) */
.ch-steps-item-process .ch-steps-item-icon {
  background-color: var(--color-primary, #1677ff);
  border: 1px solid var(--color-primary, #1677ff);
  color: #ffffff;
  font-weight: 600;
}
.ch-steps-item-process .ch-steps-item-title {
  color: var(--color-text, rgba(0, 0, 0, 0.88));
  font-weight: 600;
}

/* Status: Finish */
.ch-steps-item-finish .ch-steps-item-icon {
  background-color: var(--color-bg-container, #ffffff);
  border: 1px solid var(--color-primary, #1677ff);
  color: var(--color-primary, #1677ff);
}
.ch-steps-item-finish .ch-steps-item-title {
  color: var(--color-text, rgba(0, 0, 0, 0.88));
}

/* Status: Error */
.ch-steps-item-error .ch-steps-item-icon {
  background-color: var(--color-bg-container, #ffffff);
  border: 1px solid var(--color-error, #ff4d4f);
  color: var(--color-error, #ff4d4f);
}
.ch-steps-item-error .ch-steps-item-title {
  color: var(--color-error, #ff4d4f);
}

/* Step Section & Content */
.ch-steps-item-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.ch-steps-item-header {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: nowrap;
}

.ch-steps-item-title {
  font-size: 15px;
  line-height: 32px;
  display: inline-block;
  white-space: nowrap;
  transition: color 0.3s;
  flex-shrink: 0;
}

.ch-steps-sm .ch-steps-item-title {
  font-size: 14px;
  line-height: 24px;
}

.ch-steps-item-subtitle {
  font-size: 12px;
  color: var(--color-text-description, rgba(0, 0, 0, 0.45));
  font-weight: normal;
  display: inline-block;
  white-space: nowrap;
  flex-shrink: 0;
}

.ch-steps-item-description {
  font-size: 13px;
  color: var(--color-text-description, rgba(0, 0, 0, 0.45));
  line-height: 1.5;
  margin-top: 2px;
  max-width: 280px;
}

/* Title Placement Vertical */
.ch-steps-title-vertical {
  text-align: center;
}

.ch-steps-title-vertical .ch-steps-item {
  flex: 1 !important;
}

.ch-steps-title-vertical .ch-steps-item:last-child {
  flex: 1 !important;
  flex-grow: 1 !important;
}

.ch-steps-title-vertical .ch-steps-item-wrapper {
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.ch-steps-title-vertical .ch-steps-item-icon {
  margin-right: 0;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
  background-color: var(--color-bg-container, #ffffff);
}

.ch-steps-title-vertical .ch-steps-item-section {
  align-items: center;
  width: 100%;
}

.ch-steps-title-vertical .ch-steps-item-header {
  justify-content: center;
  width: 100%;
}

.ch-steps-title-vertical .ch-steps-item-rail {
  position: absolute;
  top: 16px;
  left: 50%;
  width: 100%;
  height: 1px;
  background-color: var(--steps-rail-color);
  z-index: 1;
  transition: background-color 0.3s;
}

.ch-steps-title-vertical.ch-steps-sm .ch-steps-item-rail {
  top: 12px;
}

/* Type: Dot */
.ch-steps-dot .ch-steps-item {
  flex: 1 !important;
}

.ch-steps-dot .ch-steps-item:last-child {
  flex: 1 !important;
  flex-grow: 1 !important;
}

.ch-steps-dot .ch-steps-item-icon {
  width: var(--steps-dot-size, 8px);
  height: var(--steps-dot-size, 8px);
  min-width: var(--steps-dot-size, 8px);
  border-radius: 50%;
  margin: 12px 12px 12px 0;
  border: none;
  background-color: var(--color-text-disabled, rgba(0, 0, 0, 0.25));
  transition: all 0.3s;
  position: relative;
  z-index: 2;
}

.ch-steps-dot.ch-steps-title-vertical .ch-steps-item-icon {
  margin: 12px 0;
}

.ch-steps-dot.ch-steps-title-vertical .ch-steps-item-rail {
  top: 16px !important;
  left: 50%;
  width: 100%;
  height: 1px;
  background-color: var(--steps-rail-color);
  z-index: 1;
}

.ch-steps-dot .ch-steps-item-process .ch-steps-item-icon {
  width: var(--steps-dot-current-size, 10px);
  height: var(--steps-dot-current-size, 10px);
  background-color: var(--color-primary, #1677ff);
  box-shadow: 0 0 0 3px rgba(22, 119, 255, 0.2);
}

.ch-steps-dot .ch-steps-item-finish .ch-steps-item-icon {
  background-color: var(--color-primary, #1677ff);
}

.ch-steps-dot .ch-steps-item-error .ch-steps-item-icon {
  background-color: var(--color-error, #ff4d4f);
}

/* Type: Navigation */
.ch-steps-navigation {
  padding-top: 4px;
  border-bottom: 1px solid var(--steps-rail-color);
}

.ch-steps-navigation .ch-steps-item {
  flex: 1 !important;
  flex-grow: 1 !important;
  padding: 12px 32px 12px 16px;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: visible;
}

.ch-steps-navigation .ch-steps-item-process {
  border-bottom-color: var(--color-primary, #1677ff);
}

.ch-steps-navigation .ch-steps-item-rail {
  display: none !important;
}

.ch-steps-navigation .ch-steps-item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  border-top: 1.5px solid var(--steps-nav-arrow-color);
  border-right: 1.5px solid var(--steps-nav-arrow-color);
  transition: border-color 0.3s;
}

.ch-steps-navigation .ch-steps-item:not(.ch-steps-item-disabled):hover {
  opacity: 0.85;
}

/* Type: Inline */
.ch-steps-inline {
  background: var(--color-fill-tertiary, rgba(0, 0, 0, 0.04));
  padding: 8px 12px;
  border-radius: 6px;
}

.ch-steps-inline .ch-steps-item-icon {
  width: 20px;
  height: 20px;
  font-size: 11px;
}

.ch-steps-inline .ch-steps-item-title {
  font-size: 13px;
  line-height: 20px;
}

.ch-steps-inline .ch-steps-item-rail {
  top: 10px;
}

/* Type: Panel */
.ch-steps-panel {
  gap: 12px;
}

.ch-steps-panel .ch-steps-item {
  flex: 1 !important;
  border: 1px solid var(--color-border, #d9d9d9);
  border-radius: 8px;
  padding: 14px 18px;
  background: var(--color-bg-container, #ffffff);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ch-steps-panel .ch-steps-item-process {
  border-color: var(--color-primary, #1677ff);
  background: var(--color-primary-bg, #e6f4ff);
}

.ch-steps-panel .ch-steps-item-rail {
  display: none !important;
}

/* Clickable Steps */
.ch-steps-clickable .ch-steps-item:not(.ch-steps-item-disabled) .ch-steps-item-wrapper {
  cursor: pointer;
}

.ch-steps-clickable .ch-steps-item:not(.ch-steps-item-disabled):hover .ch-steps-item-title {
  color: var(--color-primary, #1677ff);
}

.ch-steps-clickable .ch-steps-item:not(.ch-steps-item-disabled):hover .ch-steps-item-icon {
  border-color: var(--color-primary, #1677ff);
}

/* Disabled */
.ch-steps-item-disabled,
.ch-steps-item-disabled .ch-steps-item-wrapper {
  cursor: not-allowed !important;
  opacity: 0.55;
}

/* Circular Progress Percent */
.ch-steps-progress-circle {
  position: absolute;
  top: -4px;
  left: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  pointer-events: none;
  transform: rotate(-90deg);
  z-index: 3;
}

/* Ellipsis Step (maxCount) */
.ch-steps-item-ellipsis .ch-steps-item-icon {
  letter-spacing: 1px;
  font-weight: bold;
}
`;
