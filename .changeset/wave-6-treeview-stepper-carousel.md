---
"@chellaa/react": minor
---

Wave 6 Implementation: TreeView, Stepper & Carousel
- **TreeView**: Hierarchical tree data visualization component implementing the WAI-ARIA Tree View pattern with roving tabIndex keyboard navigation, arbitrary nesting depth, controlled and uncontrolled expand/collapse state, single/multi-selection modes, disabled node states, pure data immutability, descendant focus recovery upon collapsing ancestors, and custom node renderers.
- **Stepper**: Multi-step progress and workflow navigation component with horizontal and vertical orientations, semantic `<nav>` and ordered list `<ol>` markup, `aria-current="step"` active tracking, completed/current/upcoming/disabled/error visual distinction that does not rely on color alone, optional step indicators, decorative connectors (`aria-hidden="true"`), and interactive clickable steps.
- **Carousel**: Accessible content rotator adhering strictly to the WAI-ARIA Carousel Pattern (`role="region"`, `aria-roledescription="carousel"`, `role="group"`, `aria-roledescription="slide"`), featuring previous and next navigation controls, pagination dot buttons, infinite looping mode, touch and pointer swiping, autoplay with configurable intervals and automatic pause on hover, focus, and reduced-motion preferences, with off-screen inactive slide accessibility isolation.
