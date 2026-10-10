---
name: documentation-api-examples
description: Standards for authoring Storybook stories with autodocs, interactive documentation pages in apps/docs, and verified copy-pasteable consumer code examples.
---

# Documentation & API Examples Skill

## 1. Purpose
Governs authoring standards for Storybook stories (`.stories.tsx`), documentation portal articles (`apps/docs`), and TypeScript code snippets.

## 2. Standards
1. **Storybook Component Stories**:
   - Meta configuration with `component`, `tags: ["autodocs"]`, and detailed `argTypes`.
   - Dedicated stories for: `Default`, `AllVariants`, `AllSizes`, `ValidationStates`, `WithCustomIcons`, `DarkTheme`.
   - Must rely on the global `.storybook/preview.tsx` decorator for theme context.
2. **Docs Portal (`apps/docs`)**:
   - Interactive live preview playgrounds demonstrating token customization and real-world UI patterns.
3. **Verified Code Snippets**:
   - All documented examples must reflect actual, verified public exports.

## 3. Validation Commands
- `pnpm run build:storybook`
- `pnpm run build:docs`
