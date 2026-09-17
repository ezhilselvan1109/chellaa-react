export const dividerCssText = `
/* ==========================================================================
   Ant Design Specification Divider Styles for Chella UI
   Design Tokens:
   - colorSplit: rgba(5,5,5,0.06) (light) / rgba(253,253,253,0.12) (dark)
   - colorText: rgba(0,0,0,0.88)
   - colorTextHeading: rgba(0,0,0,0.88)
   - orientationMargin: 0.05 (5%)
   - textPaddingInline: 1em
   - verticalMarginInline: 8px
   - marginXS: 8px, margin: 16px, marginLG: 24px
   - fontSize: 14px, fontSizeLG: 16px, lineHeight: 1.5714285714285714
   ========================================================================== */

.ch-divider {
  --ch-divider-color-split: rgba(5, 5, 5, 0.06);
  --ch-divider-color-text: rgba(0, 0, 0, 0.88);
  --ch-divider-color-text-heading: rgba(0, 0, 0, 0.88);
  --ch-divider-color: var(--ch-divider-color-split);
  --ch-divider-text: var(--ch-divider-color-text);
  --ch-divider-heading: var(--ch-divider-color-text-heading);
  --ch-divider-margin: 16px;
  --ch-divider-border-style: solid;
  --ch-divider-line-width: 1px;
  --ch-divider-text-padding-inline: 1em;
  --ch-divider-vertical-margin-inline: 8px;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: var(--ch-divider-heading);
  font-family: var(--ch-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
}

[data-theme="dark"] .ch-divider {
  --ch-divider-color-split: rgba(253, 253, 253, 0.12);
  --ch-divider-color-text: rgba(255, 255, 255, 0.85);
  --ch-divider-color-text-heading: rgba(255, 255, 255, 0.88);
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
  border-top: var(--ch-divider-line-width) var(--ch-divider-border-style) var(--ch-divider-color);
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
  border-top: var(--ch-divider-line-width) var(--ch-divider-border-style) var(--ch-divider-color);
  transform: translateY(50%);
}

.ch-divider-content {
  display: inline-block;
  padding: 0 var(--ch-divider-text-padding-inline, 1em);
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
  margin: 0 var(--ch-divider-vertical-margin-inline, 8px);
  vertical-align: middle;
  border-top: 0;
  border-left: var(--ch-divider-line-width) var(--ch-divider-border-style) var(--ch-divider-color);
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
