export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, boolean | number | undefined | null>
  | ClassValue[];

/**
 * Combines multiple conditional class names into a clean space-delimited string.
 * Zero external runtime dependencies.
 *
 * @example
 * classNames('cl-button', isActive && 'cl-button--active', { 'cl-button--disabled': isDisabled });
 */
export function classNames(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input && input !== 0) continue;

    if (typeof input === "string" || typeof input === "number") {
      const trimmed = String(input).trim();
      if (trimmed) classes.push(trimmed);
    } else if (Array.isArray(input)) {
      const nested = classNames(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value && key.trim()) {
          classes.push(key.trim());
        }
      }
    }
  }

  return classes.join(" ");
}
