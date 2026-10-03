import * as React from "react";
import { Button } from "@chellaa/react";
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
  const [showCode, setShowCode] = React.useState(false);

  return (
    <div
      style={{
        margin: "24px 0 36px 0",
        border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {(title || description) && (
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
            backgroundColor: "var(--cl-color-surface-subtle, #fafafa)",
          }}
        >
          {title && (
            <h3
              style={{
                margin: "0 0 4px 0",
                fontSize: "1.05rem",
                fontWeight: 700,
              }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              style={{
                margin: 0,
                fontSize: "0.88rem",
                color: "var(--cl-color-text-secondary, #6b7280)",
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      <div
        style={{
          padding: "36px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
          backgroundColor: "var(--cl-color-surface-base, #ffffff)",
          minHeight: "120px",
        }}
      >
        {children}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px 16px",
          backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
          borderTop: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
        }}
      >
        <Button
          size="xs"
          variant="outline"
          onClick={() => setShowCode(!showCode)}
          aria-expanded={showCode}
        >
          {showCode ? "Hide Code ▲" : "View Code ▼"}
        </Button>
      </div>

      {showCode && (
        <div style={{ margin: 0 }}>
          <CodeBlock code={code} language="tsx" />
        </div>
      )}
    </div>
  );
}
