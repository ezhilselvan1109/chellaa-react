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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

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
            Code
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="code-copy-btn"
          aria-label="Copy code to clipboard"
        >
          {copied ? "✓ Copied!" : "Copy code"}
        </button>
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
