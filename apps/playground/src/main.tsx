import React from "react";
import ReactDOM from "react-dom/client";
import { ChellaProvider } from "@chella-ui/react";
import "./styles/playground.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChellaProvider defaultTheme="light">
      <App />
    </ChellaProvider>
  </React.StrictMode>
);
