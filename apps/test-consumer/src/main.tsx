import React from "react";
import ReactDOM from "react-dom/client";
import { ChellaProvider } from "@chellaa/react";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChellaProvider defaultTheme="system">
      <App />
    </ChellaProvider>
  </React.StrictMode>
);
