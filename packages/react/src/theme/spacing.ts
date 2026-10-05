/**
 * Google Material Design 8px Spacing Grid Function
 *
 * Supports single and multi-argument invocations:
 * - spacing(1)      => '8px'
 * - spacing(2)      => '16px'
 * - spacing(1, 2)   => '8px 16px'
 * - spacing(1, 2, 3, 4) => '8px 16px 24px 32px'
 * - spacing('auto') => 'auto'
 */
export function createSpacing(base = 8) {
  return (...factors: (number | string)[]): string => {
    if (factors.length === 0) return `${base}px`;

    return factors
      .map((factor) => {
        if (typeof factor === "string") return factor;
        return `${factor * base}px`;
      })
      .join(" ");
  };
}

export const defaultSpacing = createSpacing(8);
