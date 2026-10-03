import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { DocsApp } from "./DocsApp";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DocsApp />
    </React.StrictMode>,
  );
}
