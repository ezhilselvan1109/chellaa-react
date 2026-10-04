/**
 * Chellaa Docs Environment Configuration
 *
 * Configurable via Vite environment variables:
 * - VITE_STORYBOOK_URL: External URL for the deployed Storybook lab (defaults to localhost:6006)
 * - VITE_PLAYGROUND_URL: External URL for the deployed Interactive Playground (defaults to localhost:5173)
 */

export const STORYBOOK_URL =
  (import.meta.env.VITE_STORYBOOK_URL as string | undefined) ||
  "http://localhost:6006";

export const PLAYGROUND_URL =
  (import.meta.env.VITE_PLAYGROUND_URL as string | undefined) ||
  "http://localhost:5173";
