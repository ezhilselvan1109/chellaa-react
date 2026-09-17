import React from "react";
import ReactDOM from "react-dom/client";
import { ChellaProvider } from "@chella-ui/react";
import "./styles/docs.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChellaProvider defaultTheme="dark">
      <App />
    </ChellaProvider>
  </React.StrictMode>
);
