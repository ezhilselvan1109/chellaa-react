import * as fs from "node:fs";
import * as path from "node:path";

console.log("[Benchmark CSS] Inspecting compiled distribution stylesheets for all 12 migrated components...");

const stylesCssPath = path.resolve("../../packages/react/dist/styles.css");
const indexCssPath = path.resolve("../../packages/react/dist/index.css");

if (!fs.existsSync(stylesCssPath)) {
  throw new Error("dist/styles.css does not exist");
}
if (!fs.existsSync(indexCssPath)) {
  throw new Error("dist/index.css does not exist");
}

const stylesCss = fs.readFileSync(stylesCssPath, "utf-8");
const indexCss = fs.readFileSync(indexCssPath, "utf-8");

const combined = stylesCss + "\n" + indexCss;

const mandatoryRules = [
  // 1. Cascade Layers
  { name: "Layer: cl-reset", check: combined.includes("cl-reset") },
  { name: "Layer: cl-tokens", check: combined.includes("cl-tokens") },
  { name: "Layer: cl-theme", check: combined.includes("cl-theme") },
  { name: "Layer: cl-components", check: combined.includes("cl-components") },

  // 2. Core Tokens
  { name: "Token: --cl-color-primary-base", check: combined.includes("--cl-color-primary-base") },
  { name: "Token: --cl-color-bg-canvas", check: combined.includes("--cl-color-bg-canvas") },
  { name: "Token: --cl-color-border-subtle", check: combined.includes("--cl-color-border-subtle") },

  // 3. Accessibility
  { name: "A11y: prefers-reduced-motion", check: combined.includes("prefers-reduced-motion") },

  // 4. Baseline (Button & ButtonGroup)
  { name: "Class: cl-button", check: combined.includes("cl-button") },
  { name: "Class: cl-button-group", check: combined.includes("cl-button-group") },

  // 5. Form Controls (Workflow F1)
  { name: "Class: cl-input", check: combined.includes("cl-input") },
  { name: "Class: cl-textarea", check: combined.includes("cl-textarea") },
  { name: "Class: cl-form-field", check: combined.includes("cl-form-field") },
  { name: "Class: cl-checkbox", check: combined.includes("cl-checkbox") },
  { name: "Class: cl-radio", check: combined.includes("cl-radio") },
  { name: "Class: cl-switch", check: combined.includes("cl-switch") },

  // 6. Surfaces & Data Display (Workflow F2)
  { name: "Class: cl-paper", check: combined.includes("cl-paper") },
  { name: "Class: cl-card", check: combined.includes("cl-card") },
  { name: "Class: cl-card__header", check: combined.includes("cl-card__header") },
  { name: "Class: cl-card__body", check: combined.includes("cl-card__body") },
  { name: "Class: cl-card__footer", check: combined.includes("cl-card__footer") },
  { name: "Class: cl-card__actions", check: combined.includes("cl-card__actions") },
  { name: "Class: cl-typography", check: combined.includes("cl-typography") },
  { name: "Class: cl-code", check: combined.includes("cl-code") },
  { name: "Class: cl-kbd", check: combined.includes("cl-kbd") },

  // 7. Layout Primitives (Workflow F3)
  { name: "Class: cl-box", check: combined.includes("cl-box") },
  { name: "Class: cl-container", check: combined.includes("cl-container") },
  { name: "Class: cl-divider", check: combined.includes("cl-divider") },
  { name: "Class: cl-stack", check: combined.includes("cl-stack") },
  { name: "Class: cl-flex", check: combined.includes("cl-flex") },
  { name: "Class: cl-grid", check: combined.includes("cl-grid") },
  // 8. Feedback & Alert (Wave 2B)
  { name: "Class: cl-alert", check: combined.includes("cl-alert") },
  { name: "Class: cl-alert__icon", check: combined.includes("cl-alert__icon") },
  { name: "Class: cl-alert__title", check: combined.includes("cl-alert__title") },
  { name: "Class: cl-alert__close", check: combined.includes("cl-alert__close") },
  // 9. Toast / Snackbar (Wave 2B)
  { name: "Class: cl-toast-container", check: combined.includes("cl-toast-container") },
  { name: "Class: cl-toast", check: combined.includes("cl-toast") },
  { name: "Class: cl-toast__close", check: combined.includes("cl-toast__close") },
  { name: "Class: cl-toast__action", check: combined.includes("cl-toast__action") },
  // 10. Visual Data Display & Identity (Wave 3)
  { name: "Class: cl-avatar", check: combined.includes("cl-avatar") },
  { name: "Class: cl-avatar-group", check: combined.includes("cl-avatar-group") },
  { name: "Class: cl-avatar__badge", check: combined.includes("cl-avatar__badge") },
  { name: "Class: cl-avatar__fallback", check: combined.includes("cl-avatar__fallback") },
  // 11. Disclosure & Accordion (Wave 3)
  { name: "Class: cl-accordion", check: combined.includes("cl-accordion") },
  { name: "Class: cl-accordion__item", check: combined.includes("cl-accordion__item") },
  { name: "Class: cl-accordion__header", check: combined.includes("cl-accordion__header") },
  { name: "Class: cl-accordion__trigger", check: combined.includes("cl-accordion__trigger") },
  { name: "Class: cl-accordion__content", check: combined.includes("cl-accordion__content") },
  { name: "Class: cl-accordion__inner", check: combined.includes("cl-accordion__inner") },
  { name: "Class: cl-accordion__icon", check: combined.includes("cl-accordion__icon") },
  // 12. Navigation & Tabs (Wave 3)
  { name: "Class: cl-tabs", check: combined.includes("cl-tabs") },
  { name: "Class: cl-tabs__list", check: combined.includes("cl-tabs__list") },
  { name: "Class: cl-tabs__trigger", check: combined.includes("cl-tabs__trigger") },
  { name: "Class: cl-tabs__content", check: combined.includes("cl-tabs__content") },
  { name: "Class: cl-tabs__indicator", check: combined.includes("cl-tabs__indicator") },
  // 13. Navigation & Pagination (Wave 3)
  { name: "Class: cl-pagination", check: combined.includes("cl-pagination") },
  { name: "Class: cl-pagination__list", check: combined.includes("cl-pagination__list") },
  { name: "Class: cl-pagination__item", check: combined.includes("cl-pagination__item") },
  { name: "Class: cl-pagination__prev", check: combined.includes("cl-pagination__prev") },
  { name: "Class: cl-pagination__next", check: combined.includes("cl-pagination__next") },
  { name: "Class: cl-pagination__ellipsis", check: combined.includes("cl-pagination__ellipsis") },
  { name: "Class: cl-pagination__size-select", check: combined.includes("cl-pagination__size-select") },
  { name: "Class: cl-pagination__jumper", check: combined.includes("cl-pagination__jumper") },
  // 14. Organisms & Combobox (Wave 3)
  { name: "Class: cl-combobox", check: combined.includes("cl-combobox") },
  { name: "Class: cl-combobox__control", check: combined.includes("cl-combobox__control") },
  { name: "Class: cl-combobox__input", check: combined.includes("cl-combobox__input") },
  { name: "Class: cl-combobox__trigger", check: combined.includes("cl-combobox__trigger") },
  { name: "Class: cl-combobox__content", check: combined.includes("cl-combobox__content") },
  { name: "Class: cl-combobox__item", check: combined.includes("cl-combobox__item") },
  { name: "Class: cl-combobox__empty", check: combined.includes("cl-combobox__empty") },
  { name: "Class: cl-combobox__tag", check: combined.includes("cl-combobox__tag") },
  { name: "Class: cl-combobox__clear", check: combined.includes("cl-combobox__clear") },
  // 15. Wave 3: DropdownMenu, ContextMenu, Drawer
  { name: "Class: cl-dropdown-menu__content", check: combined.includes("cl-dropdown-menu__content") },
  { name: "Class: cl-dropdown-menu__item", check: combined.includes("cl-dropdown-menu__item") },
  { name: "Class: cl-context-menu__trigger", check: combined.includes("cl-context-menu__trigger") },
  { name: "Class: cl-context-menu__content", check: combined.includes("cl-context-menu__content") },
  { name: "Class: cl-drawer__overlay", check: combined.includes("cl-drawer__overlay") },
  { name: "Class: cl-drawer__content", check: combined.includes("cl-drawer__content") },
  { name: "Class: cl-drawer__header", check: combined.includes("cl-drawer__header") },
  { name: "Class: cl-drawer__body", check: combined.includes("cl-drawer__body") },
  { name: "Class: cl-drawer__footer", check: combined.includes("cl-drawer__footer") },
  // 16. Wave 4: Navigation, Form Validation & Date Extensions
  { name: "Class: cl-breadcrumb", check: combined.includes("cl-breadcrumb") },
  { name: "Class: cl-breadcrumb__list", check: combined.includes("cl-breadcrumb__list") },
  { name: "Class: cl-breadcrumb__item", check: combined.includes("cl-breadcrumb__item") },
  { name: "Class: cl-breadcrumb__link", check: combined.includes("cl-breadcrumb__link") },
  { name: "Class: cl-breadcrumb__page", check: combined.includes("cl-breadcrumb__page") },
  { name: "Class: cl-breadcrumb__separator", check: combined.includes("cl-breadcrumb__separator") },
  { name: "Class: cl-link", check: combined.includes("cl-link") },
  { name: "Class: cl-daterangepicker", check: combined.includes("cl-daterangepicker") },
  { name: "Class: cl-daterangepicker__control", check: combined.includes("cl-daterangepicker__control") },
  { name: "Class: cl-daterangepicker__input", check: combined.includes("cl-daterangepicker__input") },
  { name: "Class: cl-timepicker", check: combined.includes("cl-timepicker") },
  { name: "Class: cl-timepicker__control", check: combined.includes("cl-timepicker__control") },
  { name: "Class: cl-timepicker__input", check: combined.includes("cl-timepicker__input") },
  { name: "Class: cl-timepicker__column", check: combined.includes("cl-timepicker__column") },
  // 17. Wave 5: Data Components & Advanced Form Controls
  { name: "Class: cl-multiselect", check: combined.includes("cl-multiselect") },
  { name: "Class: cl-multiselect__control", check: combined.includes("cl-multiselect__control") },
  { name: "Class: cl-multiselect__tag", check: combined.includes("cl-multiselect__tag") },
  { name: "Class: cl-datagrid", check: combined.includes("cl-datagrid") },
  { name: "Class: cl-datagrid__table", check: combined.includes("cl-datagrid__table") },
  { name: "Class: cl-fileupload", check: combined.includes("cl-fileupload") },
  { name: "Class: cl-fileupload__dropzone", check: combined.includes("cl-fileupload__dropzone") },
  { name: "Class: cl-slider", check: combined.includes("cl-slider") },
  { name: "Class: cl-slider__thumb", check: combined.includes("cl-slider__thumb") },
  { name: "Class: cl-range-slider", check: combined.includes("cl-range-slider") },
  // 18. Wave 6: TreeView, Stepper & Carousel
  { name: "Class: cl-treeview", check: combined.includes("cl-treeview") },
  { name: "Class: cl-treeview__node", check: combined.includes("cl-treeview__node") },
  { name: "Class: cl-stepper", check: combined.includes("cl-stepper") },
  { name: "Class: cl-stepper__indicator", check: combined.includes("cl-stepper__indicator") },
  { name: "Class: cl-carousel", check: combined.includes("cl-carousel") },
  { name: "Class: cl-carousel__track", check: combined.includes("cl-carousel__track") },
  { name: "Class: cl-carousel__slide", check: combined.includes("cl-carousel__slide") },
];

for (const rule of mandatoryRules) {
  if (!rule.check) {
    throw new Error(`CSS Stylesheet verification failed for: ${rule.name}`);
  }
}

console.log(
  `[Benchmark CSS] PASSED: Stylesheets contain all ${mandatoryRules.length} verified cascade layers, semantic tokens, a11y rules, and static component classes.`,
);
