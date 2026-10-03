import * as React from "react";
import { CodeBlock } from "../Common/CodeBlock";

interface ComponentPreviewProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code: string;
}

export function ComponentPreview({
  title,
  description,
  children,
  code,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview",
  );

  return (
    <div className="docs-preview-container">
      <div className="docs-preview-header">
        <div className="docs-preview-header-info">
          {title && <h3 className="docs-preview-title">{title}</h3>}
          {description && <p className="docs-preview-desc">{description}</p>}
        </div>

        <div className="docs-preview-tabs">
          <button
            type="button"
            className={`docs-preview-tab-btn ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
            aria-label="Show Preview"
          >
            👁️ Preview
          </button>
          <button
            type="button"
            className={`docs-preview-tab-btn ${activeTab === "code" ? "active" : ""}`}
            onClick={() => setActiveTab("code")}
            aria-label="Show Code"
          >
            💻 Code
          </button>
        </div>
      </div>

      {activeTab === "preview" ? (
        <div className="docs-preview-stage">{children}</div>
      ) : (
        <div className="docs-preview-code-panel">
          <CodeBlock code={code} language="tsx" />
        </div>
      )}
    </div>
  );
}
