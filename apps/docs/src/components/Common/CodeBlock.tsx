import * as React from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import "./CodeBlock.css";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  flush?: boolean;
}

// Tokenize code for clean, lightweight syntax highlighting
function highlightCode(code: string, language: string): React.ReactNode {
  const isShell = language === "bash" || language === "sh" || language === "shell";

  if (isShell) {
    const lines = code.trim().split("\n");
    return lines.map((line, lineIdx) => {
      const parts = line.split(" ");
      return (
        <div key={lineIdx} style={{ display: "flex", alignItems: "center" }}>
          <span className="token-shell-prompt">$</span>
          <span>
            {parts.map((part, pIdx) => {
              let cls = "";
              if (
                pIdx === 0 &&
                (part === "pnpm" ||
                  part === "npm" ||
                  part === "yarn" ||
                  part === "bun" ||
                  part === "npx")
              ) {
                cls = "token-component";
              } else if (
                part === "add" ||
                part === "install" ||
                part === "i" ||
                part === "run" ||
                part === "create"
              ) {
                cls = "token-prop";
              } else if (part.startsWith("@") || part.includes("/")) {
                cls = "token-string";
              }
              return (
                <span key={pIdx} className={cls}>
                  {part}
                  {pIdx < parts.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  }

  // Tokenize TSX / JavaScript
  const lines = code.split("\n");
  const keywordRegex =
    /^(import|export|function|return|const|let|var|from|as|default|type|interface|class|extends|new|if|else|switch|case|break|true|false|null|undefined|async|await)$/;

  return lines.map((line, lineIdx) => {
    // Comments
    if (line.trim().startsWith("//")) {
      return (
        <div key={lineIdx} className="token-comment">
          {line}
        </div>
      );
    }

    // Match strings, tag delimiters, words, punctuation, whitespace
    const tokenPattern =
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/|<\/?>|[<>={}[\]();,.:!&|?+\-*/%^~]|(?:\b[a-zA-Z_$][a-zA-Z0-9_$-]*\b)|\s+|[^\s\w]+)/g;
    const tokens = line.match(tokenPattern) || [line];

    return (
      <div key={lineIdx}>
        {tokens.map((token, tIdx) => {
          // Strings
          if (
            token.startsWith('"') ||
            token.startsWith("'") ||
            token.startsWith("`")
          ) {
            return (
              <span key={tIdx} className="token-string">
                {token}
              </span>
            );
          }

          // Keywords
          if (keywordRegex.test(token)) {
            return (
              <span key={tIdx} className="token-keyword">
                {token}
              </span>
            );
          }

          // Component or HTML Tag after < or </
          const prevNonWs = tokens
            .slice(0, tIdx)
            .reverse()
            .find((t) => t.trim().length > 0);
          const isAfterTagOpen = prevNonWs === "<" || prevNonWs === "</";

          if (isAfterTagOpen) {
            return (
              <span key={tIdx} className="token-component">
                {token}
              </span>
            );
          }

          // PascalCase identifier (Component/Icon)
          if (/^[A-Z][a-zA-Z0-9]*$/.test(token)) {
            return (
              <span key={tIdx} className="token-component">
                {token}
              </span>
            );
          }

          // Prop name before =
          const nextNonWs = tokens
            .slice(tIdx + 1)
            .find((t) => t.trim().length > 0);
          if (nextNonWs === "=" && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(token)) {
            return (
              <span key={tIdx} className="token-prop">
                {token}
              </span>
            );
          }

          // Standalone JSX boolean props
          if (
            /^(asChild|isLoading|isDisabled|isFullWidth|isAttached|disabled|required|autoFocus|readOnly|checked)$/.test(
              token,
            )
          ) {
            return (
              <span key={tIdx} className="token-prop">
                {token}
              </span>
            );
          }

          // Punctuation
          if (/^[<>={}[\]();,.:!&|?+\-*/%^~]|<\/$|<\/?>$/.test(token)) {
            return (
              <span key={tIdx} className="token-punct">
                {token}
              </span>
            );
          }

          return <span key={tIdx}>{token}</span>;
        })}
      </div>
    );
  });
}


export function CodeBlock({
  code,
  language = "tsx",
  title,
  flush = false,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Robust fallback for non-secure contexts
      try {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code to clipboard", err);
      }
    }
  };

  const displayTitle = title || (language ? language.toUpperCase() : "CODE");

  return (
    <div className={`code-block-container ${flush ? "flush" : ""}`}>
      <div className="code-block-header">
        <div className="code-block-header-left">
          <div className="code-block-dots" aria-hidden="true">
            <span className="code-block-dot code-block-dot-red" />
            <span className="code-block-dot code-block-dot-yellow" />
            <span className="code-block-dot code-block-dot-green" />
          </div>
          <span className="code-block-title">{displayTitle}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`code-block-copy-btn ${copied ? "copied" : ""}`}
          aria-label={copied ? "Code copied to clipboard" : "Copy code"}
        >
          {copied ? (
            <>
              <FiCheck size={14} style={{ color: "#34d399" }} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <FiCopy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="code-block-pre">
        <code className="code-block-code">
          {highlightCode(code, language)}
        </code>
      </pre>
    </div>
  );
}
