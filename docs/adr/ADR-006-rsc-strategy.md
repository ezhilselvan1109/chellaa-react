# ADR-006: React Server Components (RSC) & Client Boundary Strategy

**Status:** Accepted  
**Date:** 2026-10-03  
**Deciders:** Principal Architect, React Core Team

---

## 1. Context and Problem Statement

In React Server Components (RSC) architecture (e.g. Next.js App Router), components default to executing on the server unless explicitly designated with the `"use client"` directive.

Many early React component libraries took a naive approach: adding a global `"use client"` banner to the top of their entire compiled bundle via their bundler config:

```javascript
// AVOID:
banner: {
  js: '"use client";';
}
```

This brute-force approach has devastating architectural consequences:

1. It forces the entire component library into the client bundle.
2. It prevents consumers from rendering presentational components (e.g., `Card`, `Table`, `Badge`) inside React Server Components.
3. It breaks streaming SSR and increases the initial JavaScript payload downloaded by the client browser.

---

## 2. Decision

1. **RSC-Compatible by Default:**
   - Chellaa React is architected as RSC-compatible by default.
   - Presentational or static container components (`Card`, `CardHeader`, `CardBody`, `CardFooter`, `Badge`, `Table`, `TableHead`, `TableRow`, `TableCell`) do NOT require client-side hooks or event listeners and must remain server-renderable.
2. **Strict Prohibition of Global Client Banners:**
   - Adding a global `"use client"` banner in `tsup.config.ts` or bundler output is **strictly prohibited**.
3. **Intentional Component-Level Client Boundaries:**
   - Only components that truly require browser-exclusive behavior (e.g., `useState`, `useEffect`, `useRef`, browser DOM event handlers, focus management) must include the `"use client"` directive at their module boundary:
     - `Button` (handles click events and interactive ripple/keyboard mechanics).
     - `Input` (handles controlled form input events and focus rings).
     - `Select` (handles dropdown open state and keyboard navigation).
     - `Dialog` (handles focus traps, keyboard escape listener, and portal mounting).
4. **Preservation of Directive in Build Artifacts:**
   - The build pipeline must preserve component-level `"use client"` directives during bundling so that consumer bundlers recognize client boundaries at the component level.

---

## 3. Consequences

### Positive

- **Optimal Client Bundle Size:** Pure presentational components (`Card`, `Badge`, `Table`) contribute 0 KB of JavaScript to the consumer's client bundle when rendered in Server Components.
- **Flawless Next.js App Router Support:** Eliminates client boundary errors and enables Next.js server streaming.

### Negative

- **Build Precision Required:** Requires careful module splitting or entry configuration during build to ensure client directives are preserved accurately.

---

## 4. Alternatives Considered

1. **Global "use client" Banner:** Formally rejected due to client bundle bloat and loss of RSC benefits.
2. **Splitting into Two Packages (`@chellaa/react-server` and `@chellaa/react-client`):** Rejected as overly complex and damaging to consumer developer ergonomics.
