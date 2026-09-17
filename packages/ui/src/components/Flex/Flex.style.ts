export const flexCssText = `
/* ==========================================================================
   Ant Design Specification Flex Styles for Chella UI
   Design Tokens:
   - paddingXS (gap small): 8px
   - padding (gap medium): 16px
   - paddingLG (gap large): 24px
   ========================================================================== */

.ch-flex {
  --ch-flex-gap-small: 8px;
  --ch-flex-gap-medium: 16px;
  --ch-flex-gap-large: 24px;

  display: flex;
  box-sizing: border-box;
}

/* Directions */
.ch-flex--horizontal {
  flex-direction: row;
}

.ch-flex--vertical {
  flex-direction: column;
}

/* Gap Presets */
.ch-flex--gap-small {
  gap: var(--ch-flex-gap-small);
}

.ch-flex--gap-medium {
  gap: var(--ch-flex-gap-medium);
}

.ch-flex--gap-large {
  gap: var(--ch-flex-gap-large);
}
`;
