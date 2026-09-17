export const floatButtonCssText = `
/* ==========================================================================
   Ant Design Specification FloatButton Styles for Chella UI
   ========================================================================== */

.ch-float-btn {
  --ch-float-btn-size: 40px;
  --ch-float-btn-bg: var(--ch-color-bg-surface, #ffffff);
  --ch-float-btn-fg: var(--ch-color-fg-default, #0f172a);
  --ch-float-btn-border: var(--ch-color-border-subtle, #e2e8f0);
  --ch-float-btn-hover-bg: var(--ch-color-bg-subtle, #f8fafc);
  --ch-float-btn-hover-fg: var(--ch-color-primary, #1677ff);
  --ch-float-btn-hover-border: var(--ch-color-border-default, #cbd5e1);
  --ch-float-btn-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  --ch-wave-color: var(--ch-color-primary, #1677ff);

  position: fixed;
  right: 24px;
  bottom: 48px;
  z-index: 1000;
  width: var(--ch-float-btn-size);
  height: var(--ch-float-btn-size);
  min-width: var(--ch-float-btn-size);
  min-height: var(--ch-float-btn-size);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--ch-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  font-size: 14px;
  line-height: 1;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  background-color: var(--ch-float-btn-bg);
  color: var(--ch-float-btn-fg);
  border: 1px solid var(--ch-float-btn-border);
  box-shadow: var(--ch-float-btn-shadow);
  transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
}

[data-theme="dark"] .ch-float-btn {
  --ch-float-btn-bg: var(--ch-color-bg-surface, #1e293b);
  --ch-float-btn-fg: var(--ch-color-fg-default, #f8fafc);
  --ch-float-btn-border: var(--ch-color-border-subtle, #334155);
  --ch-float-btn-hover-bg: var(--ch-color-bg-subtle, #334155);
  --ch-float-btn-hover-border: var(--ch-color-border-default, #475569);
  --ch-float-btn-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.45), 0 3px 6px -4px rgba(0, 0, 0, 0.55);
}

/* Shapes */
.ch-float-btn--circle {
  border-radius: 50% !important;
}

.ch-float-btn--square {
  border-radius: 8px !important;
}

/* Has text description / content */
.ch-float-btn--has-content {
  width: auto;
  height: auto;
  min-width: var(--ch-float-btn-size);
  min-height: var(--ch-float-btn-size);
  padding: 6px 8px;
  gap: 4px;
}

/* Primary Type */
.ch-float-btn--primary {
  --ch-float-btn-bg: var(--ch-color-primary, #1677ff);
  --ch-float-btn-fg: #ffffff;
  --ch-float-btn-border: transparent;
  --ch-float-btn-hover-bg: var(--ch-color-primary-hover, #4096ff);
  --ch-float-btn-hover-fg: #ffffff;
  --ch-float-btn-hover-border: transparent;
  --ch-float-btn-shadow: 0 6px 16px 0 rgba(22, 119, 255, 0.28), 0 3px 6px -4px rgba(22, 119, 255, 0.35);
}

/* Inside FloatButton.Group or when inline/inGroup */
.ch-float-btn--in-group {
  position: relative !important;
  right: auto !important;
  bottom: auto !important;
  top: auto !important;
  left: auto !important;
}

/* Hover & Active States */
.ch-float-btn:hover:not(:disabled):not([data-disabled="true"]) {
  background-color: var(--ch-float-btn-hover-bg);
  color: var(--ch-float-btn-hover-fg);
  border-color: var(--ch-float-btn-hover-border);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.12), 0 4px 8px -4px rgba(0, 0, 0, 0.16);
  transform: translateY(-2px);
}

.ch-float-btn:active:not(:disabled):not([data-disabled="true"]) {
  transform: scale(0.96);
  transition: transform 0.1s ease;
}

.ch-float-btn:focus-visible {
  outline: 2px solid var(--ch-wave-color);
  outline-offset: 2px;
}

.ch-float-btn:disabled,
.ch-float-btn[data-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
  box-shadow: none !important;
  transform: none !important;
}

/* Semantic DOM Structure */
.ch-float-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
  color: inherit;
}

.ch-float-btn-icon > svg,
.ch-float-btn-icon svg {
  display: inline-block;
  width: 1em;
  height: 1em;
}

.ch-float-btn-content {
  font-size: 12px;
  line-height: 1.25;
  text-align: center;
  color: inherit;
  word-break: break-word;
  max-width: 68px;
}

/* ==========================================================================
   Badge on FloatButton
   ========================================================================== */
.ch-float-btn-badge-wrapper {
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 10;
  pointer-events: none;
}

.ch-float-btn-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--ch-color-danger, #ff4d4f);
  box-shadow: 0 0 0 1.5px var(--ch-float-btn-bg);
}

.ch-float-btn-badge-count {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  color: #ffffff;
  background-color: var(--ch-color-danger, #ff4d4f);
  box-shadow: 0 0 0 1.5px var(--ch-float-btn-bg);
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

/* ==========================================================================
   FloatButton.Group Layout & Menu Mode
   ========================================================================== */
.ch-float-btn-group {
  position: fixed;
  right: 24px;
  bottom: 48px;
  z-index: 1000;
  display: flex;
  gap: 12px;
}

.ch-float-btn-group--placement-top {
  flex-direction: column-reverse;
  align-items: center;
}

.ch-float-btn-group--placement-bottom {
  flex-direction: column;
  align-items: center;
}

.ch-float-btn-group--placement-left {
  flex-direction: row-reverse;
  align-items: center;
}

.ch-float-btn-group--placement-right {
  flex-direction: row;
  align-items: center;
}

.ch-float-btn-group-list {
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
  transition: opacity 0.25s cubic-bezier(0.2, 0, 0, 1), transform 0.25s cubic-bezier(0.2, 0, 0, 1), visibility 0.25s;
}

.ch-float-btn-group--placement-top .ch-float-btn-group-list {
  flex-direction: column-reverse;
}

.ch-float-btn-group--placement-bottom .ch-float-btn-group-list {
  flex-direction: column;
}

.ch-float-btn-group--placement-left .ch-float-btn-group-list {
  flex-direction: row-reverse;
}

.ch-float-btn-group--placement-right .ch-float-btn-group-list {
  flex-direction: row;
}

/* Menu Mode Expand/Collapse Animations */
.ch-float-btn-group[data-open="false"] .ch-float-btn-group-list {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.ch-float-btn-group--placement-top[data-open="false"] .ch-float-btn-group-list {
  transform: translateY(16px) scale(0.9);
}

.ch-float-btn-group--placement-bottom[data-open="false"] .ch-float-btn-group-list {
  transform: translateY(-16px) scale(0.9);
}

.ch-float-btn-group--placement-left[data-open="false"] .ch-float-btn-group-list {
  transform: translateX(16px) scale(0.9);
}

.ch-float-btn-group--placement-right[data-open="false"] .ch-float-btn-group-list {
  transform: translateX(-16px) scale(0.9);
}

.ch-float-btn-group[data-open="true"] .ch-float-btn-group-list {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
  transform: translate(0) scale(1);
}

/* Trigger Button & Rotation */
.ch-float-btn-trigger-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
}

.ch-float-btn-group[data-open="true"] .ch-float-btn-trigger-icon--rotate {
  transform: rotate(90deg);
}

/* ==========================================================================
   BackTop Progress Ring (Ant Design 6.6.0)
   ========================================================================== */
.ch-float-btn-progress-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 44px;
  height: 44px;
  max-width: 44px;
  max-height: 44px;
  pointer-events: none;
  transform: rotate(-90deg);
  z-index: 1;
}

.ch-float-btn-progress-track {
  fill: none;
  stroke: var(--ch-color-border-subtle, rgba(0, 0, 0, 0.08));
  stroke-width: 2.5;
}

.ch-float-btn-progress-circle {
  fill: none;
  stroke: var(--ch-color-primary, #1677ff);
  stroke-width: 2.5;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.15s ease-out;
}

/* ==========================================================================
   Click Wave Ripple Animation
   ========================================================================== */
.ch-float-btn-wave {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  display: block;
  z-index: 1;
  animation: ch-float-btn-wave-effect 0.45s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
}

@keyframes ch-float-btn-wave-effect {
  0% {
    box-shadow: 0 0 0 0 var(--ch-wave-color, #1677ff);
    opacity: 0.8;
  }
  100% {
    box-shadow: 0 0 0 8px var(--ch-wave-color, #1677ff);
    opacity: 0;
  }
}
`;
