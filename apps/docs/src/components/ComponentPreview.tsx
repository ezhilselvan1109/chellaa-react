import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";

export interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
  controls?: React.ReactNode;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  code,
  controls,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="preview-canvas-wrapper">
      <div className="preview-toolbar">
        <div className="preview-toolbar-tabs">
          <button
            type="button"
            className={`preview-tab-btn ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            type="button"
            className={`preview-tab-btn ${activeTab === "code" ? "active" : ""}`}
            onClick={() => setActiveTab("code")}
          >
            Source Code
          </button>
        </div>
      </div>

      {activeTab === "preview" ? (
        <>
          <div className="preview-canvas">{children}</div>
          {controls && <div className="preview-controls">{controls}</div>}
        </>
      ) : (
        <div style={{ padding: "1rem" }}>
          <CodeBlock code={code} language="tsx" />
        </div>
      )}
    </div>
  );
};
