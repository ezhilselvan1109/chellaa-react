const defaultBlockedProps = new Set<string>([
  "sx",
  "theme",
  "as",
  "ownerState",
  "slotProps",
]);

/**
 * Creates a shouldForwardProp predicate function for Emotion styled components.
 * Automatically filters out transient props starting with '$' and default system props.
 *
 * @param customBlocked Array or Set of additional prop names to prevent forwarding to DOM
 */
export function createShouldForwardProp(
  customBlocked?: (string | PropertyKey)[] | Set<string | PropertyKey>
): (prop: PropertyKey) => boolean {
  const blockedSet = new Set(defaultBlockedProps);

  if (customBlocked) {
    customBlocked.forEach((prop) => blockedSet.add(prop as string));
  }

  return (prop: PropertyKey): boolean => {
    if (typeof prop === "string" && prop.startsWith("$")) {
      return false;
    }
    return !blockedSet.has(prop as string);
  };
}

/**
 * Default root shouldForwardProp filter.
 * Blocks 'sx', 'theme', 'as', 'ownerState', 'slotProps', and '$*'.
 */
export const rootShouldForwardProp = createShouldForwardProp();
