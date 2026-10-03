"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";

export interface PortalProps {
  children?: React.ReactNode;
  container?: HTMLElement | null;
}

/**
 * Renders child elements into a DOM container outside the parent component tree (default: document.body).
 * Preserves React Context across the portal boundary and is completely SSR/hydration safe.
 */
export function Portal({
  children,
  container,
}: PortalProps): React.ReactPortal | null {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const portalContainer =
    container ?? (typeof document !== "undefined" ? document.body : null);

  if (!portalContainer) {
    return null;
  }

  return ReactDOM.createPortal(children, portalContainer);
}
