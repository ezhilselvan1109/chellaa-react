function generateGridCss(): string {
  let css = `
/* ==========================================================================
   Ant Design 24-Column Grid System Styles for Chella UI
   ========================================================================== */

.ch-row {
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
  box-sizing: border-box;
}

.ch-row--no-wrap {
  flex-wrap: nowrap;
}

/* Row Alignments */
.ch-row--align-top {
  align-items: flex-start;
}
.ch-row--align-middle {
  align-items: center;
}
.ch-row--align-bottom {
  align-items: flex-end;
}
.ch-row--align-stretch {
  align-items: stretch;
}

/* Row Justifies */
.ch-row--justify-start {
  justify-content: flex-start;
}
.ch-row--justify-end {
  justify-content: flex-end;
}
.ch-row--justify-center {
  justify-content: center;
}
.ch-row--justify-space-around {
  justify-content: space-around;
}
.ch-row--justify-space-between {
  justify-content: space-between;
}
.ch-row--justify-space-evenly {
  justify-content: space-evenly;
}

/* Base Col */
.ch-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
  box-sizing: border-box;
}

.ch-col-0 {
  display: none;
}
`;

  // Generate base 24-column raster
  for (let i = 1; i <= 24; i++) {
    const pct = `${((i / 24) * 100).toFixed(6).replace(/\.?0+$/, "")}%`;
    css += `
.ch-col-${i} {
  display: block;
  flex: 0 0 ${pct};
  max-width: ${pct};
}
.ch-col-offset-${i} {
  margin-inline-start: ${pct};
}
.ch-col-push-${i} {
  inset-inline-start: ${pct};
}
.ch-col-pull-${i} {
  inset-inline-end: ${pct};
}
.ch-col-order-${i} {
  order: ${i};
}
`;
  }

  // Responsive Breakpoints
  const breakpoints = [
    { name: "xs", query: "max-width: 575.98px" },
    { name: "sm", query: "min-width: 576px" },
    { name: "md", query: "min-width: 768px" },
    { name: "lg", query: "min-width: 992px" },
    { name: "xl", query: "min-width: 1200px" },
    { name: "xxl", query: "min-width: 1600px" },
    { name: "xxxl", query: "min-width: 1920px" },
  ];

  for (const bp of breakpoints) {
    css += `\n@media (${bp.query}) {\n`;
    css += `  .ch-col-${bp.name}-0 { display: none; }\n`;
    for (let i = 1; i <= 24; i++) {
      const pct = `${((i / 24) * 100).toFixed(6).replace(/\.?0+$/, "")}%`;
      css += `  .ch-col-${bp.name}-${i} { display: block; flex: 0 0 ${pct}; max-width: ${pct}; }\n`;
      css += `  .ch-col-${bp.name}-offset-${i} { margin-inline-start: ${pct}; }\n`;
      css += `  .ch-col-${bp.name}-push-${i} { inset-inline-start: ${pct}; }\n`;
      css += `  .ch-col-${bp.name}-pull-${i} { inset-inline-end: ${pct}; }\n`;
      css += `  .ch-col-${bp.name}-order-${i} { order: ${i}; }\n`;
    }
    css += `}\n`;
  }

  return css;
}

export const gridCssText = generateGridCss();
