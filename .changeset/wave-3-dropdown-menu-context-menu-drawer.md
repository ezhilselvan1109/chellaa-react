---
"@chellaa/react": minor
---

Wave 3 Implementation: DropdownMenu, ContextMenu, Drawer / Sheet
- **DropdownMenu**: Production-grade action/navigation popup menu adhering strictly to WAI-ARIA APG Menu specifications. Features circular roving focus, Home/End jumping, alphanumeric character typeahead searching, disabled item skipping, checkbox items (`role="menuitemcheckbox"`), radio groups (`role="menuitemradio"`), separators, and labels. Positioned with collision-aware `@floating-ui/react` flipping and shifting with static CSS in `@layer cl-components`.
- **ContextMenu**: Viewport-aware context menu reusing DropdownMenu item semantics and keyboard engine. Anchored via `@floating-ui/react` virtual reference tracking pointer coordinates, with full keyboard activation support via `Shift+F10` and the dedicated `ContextMenu` key.
- **Drawer / Sheet**: Sliding panel overlay extending the Dialog architecture. Supports 4 directional placements (`left`, `right`, `top`, `bottom`) and 6 sizes (`xs`–`full`), reusing the shared reference-counted body scroll lock (`acquireBodyScrollLock` / `releaseBodyScrollLock`), focus trap, Escape dismissal, and backdrop transitions without competing overlay systems.
