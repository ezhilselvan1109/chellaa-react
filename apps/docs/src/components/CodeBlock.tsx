import React, { useState } from "react";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback or ignore
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span>{filename ?? language}</span>
        <button type="button" className="code-copy-btn" onClick={handleCopy}>
          {copied ? "✓ Copied!" : "Copy code"}
        </button>
      </div>
      <pre className="code-pre">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};
