import * as React from "react";
import { Button } from "@chellaa/react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "tsx", title }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
        backgroundColor: "var(--cl-color-surface-muted, #1e1e2e)",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderBottom: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
          fontSize: "0.8rem",
          color: "var(--cl-color-text-secondary, #9ca3af)",
        }}
      >
        <span>{title || language.toUpperCase()}</span>
        <Button
          size="xs"
          variant="ghost"
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
        >
          {copied ? "✓ Copied" : "📋 Copy"}
        </Button>
      </div>

      <pre
        style={{
          margin: 0,
          padding: "16px",
          overflowX: "auto",
          fontSize: "0.88rem",
          lineHeight: 1.5,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
