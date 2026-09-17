import React from "react";

export interface RowContextType {
  gutter?: [number | string, number | string];
  wrap?: boolean;
}

export const RowContext = React.createContext<RowContextType>({});
