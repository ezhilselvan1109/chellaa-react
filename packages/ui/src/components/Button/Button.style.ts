export const buttonCssText = `
/* ==========================================================================
   Ant Design 5 & 6 Style Button Architecture for Chella UI
   ========================================================================== */

.ch-btn {
  --ch-btn-bg: var(--ch-color-bg-surface);
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: var(--ch-color-border-default);
  --ch-btn-border-style: solid;
  --ch-btn-hover-bg: var(--ch-color-bg-surface);
  --ch-btn-hover-fg: var(--ch-color-primary);
  --ch-btn-hover-border: var(--ch-color-primary);
  --ch-btn-active-bg: var(--ch-color-bg-surface);
  --ch-btn-active-fg: var(--ch-color-primary-active);
  --ch-btn-active-border: var(--ch-color-primary-active);
  --ch-btn-height: 32px;
  --ch-btn-padding-x: 15px;
  --ch-btn-font-size: 14px;
  --ch-btn-radius: 6px;
  --ch-wave-color: var(--ch-color-primary);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: var(--ch-btn-height);
  padding: 0 var(--ch-btn-padding-x);
  font-family: var(--ch-font-sans);
  font-size: var(--ch-btn-font-size);
  font-weight: 400;
  line-height: 1.5714;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border-radius: var(--ch-btn-radius);
  border-width: 1px;
  border-style: var(--ch-btn-border-style);
  border-color: var(--ch-btn-border);
  background-color: var(--ch-btn-bg);
  color: var(--ch-btn-fg);
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ch-btn:hover:not(:disabled):not([data-disabled="true"]) {
  background-color: var(--ch-btn-hover-bg);
  color: var(--ch-btn-hover-fg);
  border-color: var(--ch-btn-hover-border);
}

.ch-btn:active:not(:disabled):not([data-disabled="true"]):not([data-loading="true"]) {
  background-color: var(--ch-btn-active-bg);
  color: var(--ch-btn-active-fg);
  border-color: var(--ch-btn-active-border);
  transform: scale(0.99);
}

.ch-btn:focus:not(:focus-visible) {
  outline: none;
}

.ch-btn:focus-visible {
  outline: 2px solid var(--ch-wave-color);
  outline-offset: 1px;
}

.ch-btn:disabled,
.ch-btn[data-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.55;
  box-shadow: none;
}

/* ==========================================================================
   Semantic DOM structure (.ch-btn-icon, .ch-btn-content)
   ========================================================================== */
.ch-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  line-height: 0;
  color: inherit;
  transition: margin-left 0.2s, margin-right 0.2s;
}

.ch-btn-icon > svg,
.ch-btn-icon svg {
  display: inline-block;
  width: 1em;
  height: 1em;
}

.ch-btn-content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ==========================================================================
   Ant Design Color Scales & Preset Colors
   ========================================================================== */
.ch-btn--color-primary {
  --btn-color: var(--ch-color-primary, #1677ff);
  --btn-color-hover: var(--ch-color-primary-hover, #4096ff);
  --btn-color-active: var(--ch-color-primary-active, #0958d9);
  --btn-color-bg: rgba(22, 119, 255, 0.08);
  --btn-color-border: rgba(22, 119, 255, 0.4);
  --ch-wave-color: var(--btn-color);
}

.ch-btn--color-default {
  --btn-color: var(--ch-color-fg-default, #0f172a);
  --btn-color-hover: var(--ch-color-primary, #1677ff);
  --btn-color-active: var(--ch-color-primary-active, #0958d9);
  --btn-color-bg: var(--ch-color-bg-subtle, #f1f5f9);
  --btn-color-border: var(--ch-color-border-default, #d9d9d9);
  --ch-wave-color: var(--ch-color-primary, #1677ff);
}

.ch-btn--color-danger {
  --btn-color: var(--ch-color-danger, #ff4d4f);
  --btn-color-hover: #ff7875;
  --btn-color-active: #d9363e;
  --btn-color-bg: #fff2f0;
  --btn-color-border: #ffccc7;
  --ch-wave-color: #ff4d4f;
}

/* Preset Colors */
.ch-btn--color-blue { --btn-color: #1677ff; --btn-color-hover: #4096ff; --btn-color-active: #0958d9; --btn-color-bg: #e6f4ff; --btn-color-border: #91caff; --ch-wave-color: #1677ff; }
.ch-btn--color-purple { --btn-color: #722ed1; --btn-color-hover: #9254de; --btn-color-active: #531dab; --btn-color-bg: #f9f0ff; --btn-color-border: #d3adf7; --ch-wave-color: #722ed1; }
.ch-btn--color-cyan { --btn-color: #13c2c2; --btn-color-hover: #36cfc9; --btn-color-active: #08979c; --btn-color-bg: #e6fffb; --btn-color-border: #87e8de; --ch-wave-color: #13c2c2; }
.ch-btn--color-green { --btn-color: #52c41a; --btn-color-hover: #73d13d; --btn-color-active: #389e0d; --btn-color-bg: #f6ffed; --btn-color-border: #b7eb8f; --ch-wave-color: #52c41a; }
.ch-btn--color-magenta { --btn-color: #eb2f96; --btn-color-hover: #f759ab; --btn-color-active: #c41d7f; --btn-color-bg: #fff0f6; --btn-color-border: #ffadd2; --ch-wave-color: #eb2f96; }
.ch-btn--color-pink { --btn-color: #eb2f96; --btn-color-hover: #f759ab; --btn-color-active: #c41d7f; --btn-color-bg: #fff0f6; --btn-color-border: #ffadd2; --ch-wave-color: #eb2f96; }
.ch-btn--color-red { --btn-color: #f5222d; --btn-color-hover: #ff4d4f; --btn-color-active: #cf1322; --btn-color-bg: #fff1f0; --btn-color-border: #ffa39e; --ch-wave-color: #f5222d; }
.ch-btn--color-orange { --btn-color: #fa8c16; --btn-color-hover: #ffa940; --btn-color-active: #d46b08; --btn-color-bg: #fff7e6; --btn-color-border: #ffd591; --ch-wave-color: #fa8c16; }
.ch-btn--color-yellow { --btn-color: #fadb14; --btn-color-hover: #ffec3d; --btn-color-active: #d4b106; --btn-color-bg: #feffe6; --btn-color-border: #fffb8f; --ch-wave-color: #fadb14; }
.ch-btn--color-volcano { --btn-color: #fa541c; --btn-color-hover: #ff7a45; --btn-color-active: #d4380d; --btn-color-bg: #fff2e8; --btn-color-border: #ffbb96; --ch-wave-color: #fa541c; }
.ch-btn--color-geekblue { --btn-color: #2f54eb; --btn-color-hover: #597ef7; --btn-color-active: #1d39c4; --btn-color-bg: #f0f5ff; --btn-color-border: #adc6ff; --ch-wave-color: #2f54eb; }
.ch-btn--color-lime { --btn-color: #a0d911; --btn-color-hover: #bae637; --btn-color-active: #7cb305; --btn-color-bg: #fcffe6; --btn-color-border: #eaff8f; --ch-wave-color: #a0d911; }
.ch-btn--color-gold { --btn-color: #faad14; --btn-color-hover: #ffc53d; --btn-color-active: #d48806; --btn-color-bg: #fffbe6; --btn-color-border: #ffe58f; --ch-wave-color: #faad14; }

/* ==========================================================================
   Ant Design 6 Variants (solid, outlined, dashed, filled, text, link)
   ========================================================================== */

/* 1. Solid Variant (Primary) */
.ch-btn--variant-solid {
  --ch-btn-bg: var(--btn-color);
  --ch-btn-fg: #ffffff;
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--btn-color-hover);
  --ch-btn-hover-fg: #ffffff;
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: var(--btn-color-active);
  --ch-btn-active-fg: #ffffff;
  --ch-btn-active-border: transparent;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}

/* 2. Outlined Variant (Default) */
.ch-btn--variant-outlined {
  --ch-btn-bg: var(--ch-color-bg-surface);
  --ch-btn-fg: var(--btn-color);
  --ch-btn-border: var(--btn-color-border, var(--ch-color-border-default));
  --ch-btn-hover-bg: var(--ch-color-bg-surface);
  --ch-btn-hover-fg: var(--btn-color-hover);
  --ch-btn-hover-border: var(--btn-color-hover);
  --ch-btn-active-bg: var(--ch-color-bg-surface);
  --ch-btn-active-fg: var(--btn-color-active);
  --ch-btn-active-border: var(--btn-color-active);
}

.ch-btn--variant-outlined.ch-btn--color-default {
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: var(--ch-color-border-default);
}

/* 3. Dashed Variant */
.ch-btn--variant-dashed {
  --ch-btn-bg: var(--ch-color-bg-surface);
  --ch-btn-fg: var(--btn-color);
  --ch-btn-border: var(--btn-color-border, var(--ch-color-border-default));
  --ch-btn-border-style: dashed;
  --ch-btn-hover-bg: var(--ch-color-bg-surface);
  --ch-btn-hover-fg: var(--btn-color-hover);
  --ch-btn-hover-border: var(--btn-color-hover);
  --ch-btn-active-bg: var(--ch-color-bg-surface);
  --ch-btn-active-fg: var(--btn-color-active);
  --ch-btn-active-border: var(--btn-color-active);
}

.ch-btn--variant-dashed.ch-btn--color-default {
  --ch-btn-fg: var(--ch-color-fg-default);
  --ch-btn-border: var(--ch-color-border-default);
}

/* 4. Filled Variant */
.ch-btn--variant-filled {
  --ch-btn-bg: var(--btn-color-bg, var(--ch-color-bg-subtle));
  --ch-btn-fg: var(--btn-color);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--btn-color-border, var(--ch-color-bg-muted));
  --ch-btn-hover-fg: var(--btn-color-hover);
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: var(--btn-color-bg);
  --ch-btn-active-fg: var(--btn-color-active);
  --ch-btn-active-border: transparent;
  box-shadow: none;
}

/* 5. Text Variant */
.ch-btn--variant-text {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--btn-color);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: var(--btn-color-bg, var(--ch-color-bg-subtle));
  --ch-btn-hover-fg: var(--btn-color-hover);
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: var(--ch-color-bg-muted);
  --ch-btn-active-fg: var(--btn-color-active);
  --ch-btn-active-border: transparent;
  box-shadow: none;
}

.ch-btn--variant-text.ch-btn--color-default {
  --ch-btn-fg: var(--ch-color-fg-default);
}

/* 6. Link Variant */
.ch-btn--variant-link {
  --ch-btn-bg: transparent;
  --ch-btn-fg: var(--btn-color);
  --ch-btn-border: transparent;
  --ch-btn-hover-bg: transparent;
  --ch-btn-hover-fg: var(--btn-color-hover);
  --ch-btn-hover-border: transparent;
  --ch-btn-active-bg: transparent;
  --ch-btn-active-fg: var(--btn-color-active);
  --ch-btn-active-border: transparent;
  box-shadow: none;
}

.ch-btn--variant-link:hover:not(:disabled) {
  text-decoration: underline;
}

/* ==========================================================================
   Ghost Modifier
   ========================================================================== */
.ch-btn--ghost {
  background-color: transparent !important;
}

.ch-btn--ghost.ch-btn--color-default {
  --ch-btn-fg: #ffffff;
  --ch-btn-border: #ffffff;
  --ch-btn-hover-fg: var(--ch-color-primary);
  --ch-btn-hover-border: var(--ch-color-primary);
}

.ch-btn--ghost.ch-btn--color-primary {
  --ch-btn-fg: var(--ch-color-primary);
  --ch-btn-border: var(--ch-color-primary);
  --ch-btn-hover-fg: var(--ch-color-primary-hover);
  --ch-btn-hover-border: var(--ch-color-primary-hover);
}

.ch-btn--ghost.ch-btn--color-danger {
  --ch-btn-fg: #ff4d4f;
  --ch-btn-border: #ff4d4f;
  --ch-btn-hover-fg: #ff7875;
  --ch-btn-hover-border: #ff7875;
}

/* ==========================================================================
   Shapes & Icon-Only (Default, Round, Circle)
   ========================================================================== */
.ch-btn--shape-round {
  border-radius: 9999px;
  padding-left: 16px;
  padding-right: 16px;
}

.ch-btn--icon-only {
  width: var(--ch-btn-height);
  min-width: var(--ch-btn-height);
  padding: 0 !important;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.ch-btn--icon-only .ch-btn-icon {
  font-size: 16px;
  margin: 0;
}

.ch-btn--size-sm.ch-btn--icon-only .ch-btn-icon {
  font-size: 14px;
}

.ch-btn--size-lg.ch-btn--icon-only .ch-btn-icon {
  font-size: 18px;
}

.ch-btn--shape-circle {
  min-width: var(--ch-btn-height);
  width: var(--ch-btn-height);
  height: var(--ch-btn-height);
  padding: 0 !important;
  border-radius: 50% !important;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.ch-btn--shape-circle .ch-btn-icon {
  font-size: 16px;
  margin: 0;
}

.ch-btn--size-sm.ch-btn--shape-circle .ch-btn-icon {
  font-size: 14px;
}

.ch-btn--size-lg.ch-btn--shape-circle .ch-btn-icon {
  font-size: 18px;
}

/* ==========================================================================
   Sizes (Small 24px, Medium 32px, Large 40px)
   ========================================================================== */
.ch-btn--size-sm {
  --ch-btn-height: 24px;
  --ch-btn-padding-x: 7px;
  --ch-btn-font-size: 14px;
  --ch-btn-radius: 4px;
}

.ch-btn--size-md {
  --ch-btn-height: 32px;
  --ch-btn-padding-x: 15px;
  --ch-btn-font-size: 14px;
  --ch-btn-radius: 6px;
}

.ch-btn--size-lg {
  --ch-btn-height: 40px;
  --ch-btn-padding-x: 15px;
  --ch-btn-font-size: 16px;
  --ch-btn-radius: 8px;
}

/* ==========================================================================
   Block Width & Loading
   ========================================================================== */
.ch-btn--block {
  width: 100%;
  display: flex;
}

.ch-btn--loading {
  cursor: default;
}

/* ==========================================================================
   Ant Design Signature Click Wave Ripple Animation
   ========================================================================== */
.ch-btn-wave {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  display: block;
  z-index: 1;
  animation: ch-btn-wave-effect 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
}

@keyframes ch-btn-wave-effect {
  0% {
    box-shadow: 0 0 0 0 var(--ch-wave-color, #1677ff);
    opacity: 0.35;
  }
  100% {
    box-shadow: 0 0 0 5px var(--ch-wave-color, #1677ff);
    opacity: 0;
  }
}
`;
