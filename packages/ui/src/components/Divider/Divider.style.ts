export const dividerCssText = `
/* ==========================================================================
   Ant Design Specification Divider Styles for Chella UI
   ========================================================================== */

.ch-divider {
  --ch-divider-color: var(--ch-color-border-subtle, rgba(0, 0, 0, 0.08));
  --ch-divider-text: var(--ch-color-fg-muted, #475569);
  --ch-divider-heading: var(--ch-color-fg-default, #0f172a);
  --ch-divider-margin: 16px;
  --ch-divider-border-style: solid;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: var(--ch-divider-heading);
  font-family: var(--ch-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  font-size: 14px;
  line-height: 1.5714;
  list-style: none;
}

[data-theme="dark"] .ch-divider {
  --ch-divider-color: var(--ch-color-border-subtle, rgba(255, 255, 255, 0.12));
  --ch-divider-text: var(--ch-color-fg-muted, #94a3b8);
  --ch-divider-heading: var(--ch-color-fg-default, #f8fafc);
}

/* ==========================================================================
   Horizontal Divider (Without Title)
   ========================================================================== */
.ch-divider--horizontal {
  display: block;
  clear: both;
  width: 100%;
  min-width: 100%;
  margin: var(--ch-divider-margin) 0;
  border-top: 1px var(--ch-divider-border-style) var(--ch-divider-color);
}

/* ==========================================================================
   Horizontal Divider (With Title)
   ========================================================================== */
.ch-divider--with-text {
  display: flex;
  align-items: center;
  margin: var(--ch-divider-margin) 0;
  color: var(--ch-divider-heading);
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-align: center;
  border-top: 0;
}

.ch-divider-rail {
  position: relative;
  border-top: 1px var(--ch-divider-border-style) var(--ch-divider-color);
  transform: translateY(50%);
}

.ch-divider-content {
  display: inline-block;
  padding: 0 1em;
  font-size: 16px;
  font-weight: 500;
  color: var(--ch-divider-heading);
}

/* Plain typography style */
.ch-divider--plain.ch-divider--with-text,
.ch-divider--plain .ch-divider-content {
  font-weight: 400;
  font-size: 14px;
  color: var(--ch-divider-text);
}

/* Title Placements */
.ch-divider--title-center .ch-divider-rail--start,
.ch-divider--title-center .ch-divider-rail--end {
  flex: 1;
}

.ch-divider--title-start .ch-divider-rail--start {
  width: var(--ch-divider-margin-start, 5%);
  flex: none;
}

.ch-divider--title-start .ch-divider-rail--end {
  flex: 1;
}

.ch-divider--title-end .ch-divider-rail--start {
  flex: 1;
}

.ch-divider--title-end .ch-divider-rail--end {
  width: var(--ch-divider-margin-end, 5%);
  flex: none;
}

/* ==========================================================================
   Vertical Divider
   ========================================================================== */
.ch-divider--vertical {
  position: relative;
  top: -0.06em;
  display: inline-block;
  height: 0.9em;
  margin: 0 8px;
  vertical-align: middle;
  border-top: 0;
  border-left: 1px var(--ch-divider-border-style) var(--ch-divider-color);
}

/* ==========================================================================
   Line Variants (Solid, Dashed, Dotted)
   ========================================================================== */
.ch-divider--solid {
  --ch-divider-border-style: solid;
}

.ch-divider--dashed {
  --ch-divider-border-style: dashed;
}

.ch-divider--dotted {
  --ch-divider-border-style: dotted;
}

/* ==========================================================================
   Spacing Sizes (Small 8px, Medium 16px, Large 24px)
   ========================================================================== */
.ch-divider--size-small {
  --ch-divider-margin: 8px;
}

.ch-divider--size-medium {
  --ch-divider-margin: 16px;
}

.ch-divider--size-large {
  --ch-divider-margin: 24px;
}
`;
