import * as React from "react";
import type { CardSize } from "./Card.types";

/**
 * Internal context propagating Card root's `size` prop to all sub-components
 * (CardHeader, CardBody, CardFooter, CardActions) so they produce consistent
 * padding without consumers having to pass `size` to every child.
 */
export interface CardContextValue {
  size: CardSize;
}

export const CardContext = React.createContext<CardContextValue>({
  size: "md",
});

export function useCardContext(): CardContextValue {
  return React.useContext(CardContext);
}
