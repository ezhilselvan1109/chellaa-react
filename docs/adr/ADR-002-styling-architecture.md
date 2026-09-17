# ADR-002: Styling Architecture & CSS Ownership

## Status
Accepted

## Context
A major pain point in modern React UI component libraries is styling friction. Some libraries require heavy runtime CSS-in-JS (e.g. Emotion, styled-components) which causes runtime recalculation penalties, breaks streaming SSR in Next.js / Remix, and fails in React 19 Server Components. Other libraries mandate that consumers install and configure Tailwind CSS, creating version conflicts and purge failures.

## Decision
Chella UI will own its styling through **Scoped CSS Modules + CSS Custom Properties**:
1. Component styling is scoped using CSS Modules with custom BEM hashing: `ch-[component]__[element]--[modifier]`.
2. Component tokens and semantic themes are powered entirely by native CSS custom properties (`--ch-*`).
3. Build outputs extract a consolidated, minified stylesheet: `@chella-ui/react/styles.css`.
4. A lightweight, idempotent runtime fallback injector (`injectChellaStyles()`) ensures styles work seamlessly in client-only prototypes if the stylesheet import was omitted.
5. Tailwind CSS is NOT a consumer requirement.

## Alternatives Considered
1. **Runtime CSS-in-JS (Emotion / styled-components)**: Rejected due to 15KB+ runtime overhead, performance regressions on dynamic lists, and incompatibility with React Server Components.
2. **Mandatory Tailwind CSS**: Rejected because forcing consumers to adopt, configure, and scan Tailwind is a major DX barrier.
3. **Vanilla Extract / Pigment CSS**: Modern zero-runtime engines, but require complex bundler integration plugins for Vite, Next.js, and Webpack that complicate consumer builds.

## Consequences
- Zero runtime overhead for class generation and theme switching.
- 100% compatibility with React 18, React 19, Next.js (App & Pages), Remix, Vite, and Astro.
- Full CSS isolation with zero global style collisions.
- Theme overrides can be applied cleanly via standard CSS without touching component code.
