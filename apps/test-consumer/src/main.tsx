import React from "react";
import ReactDOM from "react-dom/client";
import { ChellaProvider } from "@chella-ui/react";
import "@chella-ui/react/styles.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChellaProvider defaultTheme="system">
      <App />
    </ChellaProvider>
  </React.StrictMode>
);
