---
name: ui-ux-responsive-design
description: Authoritative standards for modern UI/UX design, React SVG icon systems, responsive fluid layouts, and interactive component playgrounds in Chellaa React.
---

# UI/UX & Responsive Design Skill

This skill governs the visual quality, responsive engineering, icon standards, and interactive documentation architecture across Chellaa React (`@chellaa/react`) and its applications.

---

## 1. Icon Standards: React SVG Icons Only (Zero Emojis)

Chellaa React is a production-grade enterprise design system. Visual elements must look clean, cohesive, and professional:

1. **Strictly Prohibit Raw Emojis in UI Controls:**
   - ❌ Never use raw emojis (e.g., `📋 Copy`, `👁️ Preview`, `💻 Code`, `⚡`, `♿`, `🎨`, `🌙`) in buttons, tabs, callouts, or component playgrounds. Emojis render inconsistently across operating systems (Windows, macOS, Linux, iOS, Android) and feel unpolished.
   - ✅ Always use crisp, scalable React SVG icons (e.g., from `react-icons/fi`, `react-icons/lu`, or internal Chellaa SVG primitives).

2. **Standard React Icons Mapping:**
   - **Copy to Clipboard:** `<FiCopy />` (default) and `<FiCheck />` (copied state)
   - **View / Preview:** `<FiEye />`
   - **Code / TSX:** `<FiCode />`
   - **Search:** `<FiSearch />`
   - **Theme Toggle:** `<FiSun />` (switch to light) and `<FiMoon />` (switch to dark)
   - **Navigation / Menu:** `<FiMenu />` and `<FiX />`
   - **Playground / Settings:** `<FiSliders />`, `<FiPlay />`, `<FiRefreshCw />`
   - **Feature Pillars:** `<FiZap />` (performance), `<FiShield />` (accessibility/WCAG), `<FiLayers />` (slots/composition), `<FiPalette />` (tokens/theming), `<FiPackage />` (bundle size)

3. **Icon Sizing & Alignment:**
   - Always wrap icons in flex containers with `display: inline-flex; align-items: center; justify-content: center; gap: 6px;`.
   - Maintain uniform icon sizing: `14px - 16px` for small/medium buttons and tabs; `18px - 22px` for standalone icon badges.

---

## 2. Interactive Component Playground Architecture

The documentation playground is the consumer's first hands-on experience with a component. It must feel like an intentional, precision workbench:

1. **Symmetrical Control Grid:**
   - Controls must form a balanced grid (e.g., 3-column rows). Avoid trailing dangling controls that leave empty space in a row.
   - Separate visual properties (Variant, Size, Color Scheme) from content and configuration (Icons, Spinners, Text Label).

2. **Modern State Toggles (No Raw HTML Checkboxes):**
   - ❌ Do not use unstyled browser checkboxes (`<input type="checkbox"> <code>isLoading</code>`).
   - ✅ Use interactive toggle chips or switch pills with active glow indicators:
     ```tsx
     <button
       type="button"
       onClick={() => setIsLoading(!isLoading)}
       className={`sandbox-toggle-chip ${isLoading ? "active" : ""}`}
     >
       <span className="sandbox-indicator-dot" />
       <span>isLoading</span>
     </button>
     ```

3. **Workbench Canvas:**
   - Live components must be centered with ample breathing room.
   - Provide visual cues for interactive states (loading spinners, hover effects, active scale).
   - Support `isFullWidth` mode with smooth transitions.
   - Include a "Reset" button (`<FiRefreshCw />`) to restore default configuration instantly.

4. **Code Generation:**
   - Generated code must be clean, readable, and properly indented (2 spaces).
   - Format multi-line props when 3 or more props are customized.
   - Embed the generated `<CodeBlock flush />` seamlessly into the playground card without awkward margins or double borders.

---

## 3. Responsive Fluid Layout Principles

Every page must render flawlessly across mobile (360px - 480px), tablet (768px - 1024px), laptop (1200px - 1440px), and ultrawide (1920px+):

1. **Zero Horizontal Overflow:**
   - Never allow elements with fixed widths (e.g., `width: 1000px`) to cause horizontal scrolling. Always append `max-width: 100vw` or `max-width: 100%`.
   - Set `overflow-x: hidden` on root containers while ensuring inner flex children wrap cleanly with `flex-wrap: wrap`.

2. **Fluid Typography:**
   - Use CSS `clamp()` for major headings to prevent overflow on mobile:
     ```css
     font-size: clamp(2rem, 7.5vw, 4rem);
     word-break: break-word;
     overflow-wrap: break-word;
     ```

3. **Responsive Header Navigation Breakpoints:**
   - **Desktop (> 1080px):** Show Brand Logo, Top Navigation Links (`Home`, `Docs`, `Components`, `Tokens`), Search Bar (`⌘K`), and Utility Links (`Storybook`, `Playground`, `Theme`).
   - **Tablet (768px - 1080px):** Top navigation links collapse into the Mobile Drawer (`<FiMenu />`). Search input and utility buttons remain accessible.
   - **Mobile (< 768px):** Header padding adjusts to `0 12px`. Version tags hide to preserve space. Search bar collapses into a compact trigger. Full navigation is accessed via the slide-out drawer.

4. **Touch-Friendly Controls:**
   - Ensure all clickable elements (buttons, tabs, inputs, links) have minimum touch target sizes of `36px` to `44px` on mobile screens.

---

## 4. High-Contrast Code Block Presentation

1. **Contrast Guarantee:**
   - Terminal background: `#0b101b` / `#0f172a`.
   - Base code foreground text: `#f8fafc` (never inherit light body text).
   - Contrast ratio must exceed `12:1` for AAA compliance.

2. **Built-in Syntax Highlighting Tokens:**
   - **Keywords** (`import`, `export`, `function`, `return`, `from`): `#c084fc` (vibrant purple)
   - **Components & Types** (`Button`, `ButtonGroup`, `ThemeProvider`): `#38bdf8` (sky blue)
   - **Strings** (`"@chellaa/react"`): `#34d399` (emerald green)
   - **Props & Command Verbs** (`variant`, `colorScheme`, `add`, `install`): `#fbbf24` (warm amber)
   - **Comments** (`// ...`): `#64748b` (slate italic)
   - **Shell Prompt** (`$`): `#818cf8` (indigo)

3. **Tactile Copy Feedback:**
   - Copy button must show `<FiCopy /> Copy` in idle state and transition to `<FiCheck /> Copied` in emerald green for 2 seconds upon click.
