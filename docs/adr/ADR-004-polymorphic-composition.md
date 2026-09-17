# ADR-004: Polymorphic Composition via the Slot (`asChild`) Pattern

## Status
Accepted

## Context
Components often need to render alternative DOM elements or custom framework components (e.g. a `Button` rendering as an `<a>` or a Next.js `<Link>`). Historically, libraries used a dynamic generic `as` prop (`<Button as={Link} />`). However, the `as` prop causes massive TypeScript union explosion, slow IDE autocomplete, difficult ref forwarding, and unexpected prop clashes.

## Decision
Chella UI adopts the **Slot Pattern** via the `asChild` prop (inspired by Radix UI):
```tsx
<Button asChild variant="primary">
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```
When `asChild` is true, the component does not render its default DOM element (`<button>`). Instead, the `Slot` primitive clones the immediate child element and safely merges:
1. Classnames (combining Chella UI button styles with child classes).
2. Inline styles.
3. Event handlers (chaining internal handlers like ripples/focus with child `onClick`).
4. ARIA and data attributes (`data-variant`, `data-disabled`).
5. Forwarded refs (using a composite ref merger).

## Consequences
- Clean, 100% predictable TypeScript inference with zero dynamic generic complexity.
- Works reliably with any framework router (Next.js, React Router, Remix, TanStack Router).
- Ref forwarding is preserved accurately without type casting.
