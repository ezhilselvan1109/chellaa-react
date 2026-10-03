/**
 * Composes an optional consumer event handler with an internal library event handler.
 * If the consumer handler calls event.preventDefault(), the internal handler is skipped,
 * preserving consumer control over event delegation.
 *
 * @param originalHandler Optional consumer-provided event handler
 * @param ourHandler Internal component event handler
 * @param options Configuration options
 */
export function composeEventHandlers<E extends { defaultPrevented: boolean }>(
  originalHandler?: ((event: E) => void) | undefined,
  ourHandler?: ((event: E) => void) | undefined,
  {
    checkForDefaultPrevented = true,
  }: { checkForDefaultPrevented?: boolean } = {},
): (event: E) => void {
  return function handleEvent(event: E) {
    originalHandler?.(event);

    if (!checkForDefaultPrevented || !event.defaultPrevented) {
      ourHandler?.(event);
    }
  };
}
