import * as React from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Button } from "@chellaa/react";

interface ColorItem {
  name: string;
  token: string;
  lightHex: string;
  darkHex: string;
  role: string;
}

export function ColorsPage() {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToken(text);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      setCopiedToken(text);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  const palettes: { title: string; desc: string; colors: ColorItem[] }[] = [
    {
      title: "Brand & Primary Ramps",
      desc: "Used for primary interactive actions, focus rings, and brand identity.",
      colors: [
        {
          name: "Primary Base",
          token: "--cl-color-primary-base",
          lightHex: "#2563eb",
          darkHex: "#3b82f6",
          role: "Primary CTAs & active buttons",
        },
        {
          name: "Primary Hover",
          token: "--cl-color-primary-hover",
          lightHex: "#1d4ed8",
          darkHex: "#60a5fa",
          role: "Button hover states",
        },
        {
          name: "Primary Active",
          token: "--cl-color-primary-active",
          lightHex: "#1e40af",
          darkHex: "#93c5fd",
          role: "Button pressed states",
        },
        {
          name: "Primary Subtle",
          token: "--cl-color-primary-subtle",
          lightHex: "#dbeafe",
          darkHex: "rgba(59, 130, 246, 0.15)",
          role: "Light background tint",
        },
      ],
    },
    {
      title: "Accent & Secondary Ramps",
      desc: "Used for secondary highlights, badge tags, and accent visual elements.",
      colors: [
        {
          name: "Secondary Base",
          token: "--cl-color-secondary-base",
          lightHex: "#7c3aed",
          darkHex: "#8b5cf6",
          role: "Secondary actions & accents",
        },
        {
          name: "Secondary Hover",
          token: "--cl-color-secondary-hover",
          lightHex: "#6d28d9",
          darkHex: "#a78bfa",
          role: "Secondary button hover",
        },
        {
          name: "Secondary Subtle",
          token: "--cl-color-secondary-subtle",
          lightHex: "#ede9fe",
          darkHex: "rgba(139, 92, 246, 0.15)",
          role: "Secondary background tint",
        },
      ],
    },
    {
      title: "Semantic Status Ramps",
      desc: "Used for feedback, validation states, toasts, and status indicators.",
      colors: [
        {
          name: "Success Base",
          token: "--cl-color-success-base",
          lightHex: "#10b981",
          darkHex: "#34d399",
          role: "Confirmations & success toasts",
        },
        {
          name: "Warning Base",
          token: "--cl-color-warning-base",
          lightHex: "#f59e0b",
          darkHex: "#fbbf24",
          role: "Caution alerts & warnings",
        },
        {
          name: "Danger Base",
          token: "--cl-color-danger-base",
          lightHex: "#ef4444",
          darkHex: "#f87171",
          role: "Destructive actions & errors",
        },
        {
          name: "Info Base",
          token: "--cl-color-info-base",
          lightHex: "#06b6d4",
          darkHex: "#22d3ee",
          role: "Informational callouts",
        },
      ],
    },
    {
      title: "Surface & Neutral Ramps",
      desc: "Used for backgrounds, borders, card surfaces, and text contrast hierarchy.",
      colors: [
        {
          name: "Surface Base",
          token: "--cl-color-surface-base",
          lightHex: "#ffffff",
          darkHex: "#090d16",
          role: "Main application background",
        },
        {
          name: "Surface Card",
          token: "--cl-color-surface-subtle",
          lightHex: "#f8fafc",
          darkHex: "#111726",
          role: "Card & modal surfaces",
        },
        {
          name: "Border Subtle",
          token: "--cl-color-border-subtle",
          lightHex: "#e2e8f0",
          darkHex: "rgba(255, 255, 255, 0.08)",
          role: "Dividers & card outlines",
        },
        {
          name: "Text Primary",
          token: "--cl-color-text-primary",
          lightHex: "#0f172a",
          darkHex: "#f8fafc",
          role: "High-contrast headings & body",
        },
      ],
    },
  ];

  return (
    <article className="docs-page">
      <h1 className="docs-page-title">Colors &amp; Semantic Palettes</h1>
      <p className="docs-page-desc">
        Chellaa React uses a curated, accessible color system with dedicated
        light and dark mode variants. Click any swatch or token to copy the CSS
        variable.
      </p>

      {palettes.map((section) => (
        <section key={section.title} style={{ marginBottom: "48px" }}>
          <h2 className="docs-heading-2">
            <span>{section.title}</span>
          </h2>
          <p
            style={{
              color: "var(--docs-text-muted)",
              margin: "0 0 20px 0",
              fontSize: "0.95rem",
            }}
          >
            {section.desc}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            {section.colors.map((c) => {
              const isCopied = copiedToken === c.token;
              return (
                <div
                  key={c.token}
                  onClick={() => handleCopy(c.token)}
                  style={{
                    border: "1px solid var(--docs-border)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    backgroundColor: "var(--docs-card)",
                    boxShadow: "var(--docs-shadow-sm)",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="docs-color-card"
                  title="Click to copy CSS custom property"
                >
                  {/* Swatch Header */}
                  <div
                    style={{
                      height: "76px",
                      backgroundColor: c.lightHex,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      padding: "8px 12px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        color: "#ffffff",
                        fontSize: "0.72rem",
                        fontFamily: "JetBrains Mono, monospace",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {c.lightHex}
                    </span>
                  </div>

                  {/* Swatch Info */}
                  <div style={{ padding: "14px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: isCopied
                            ? "var(--docs-primary)"
                            : "var(--docs-text-dim)",
                        }}
                      >
                        {isCopied ? (
                          <>
                            <FiCheck size={12} color="#10b981" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <FiCopy size={12} />
                            <span>Copy</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.78rem",
                        color: "var(--docs-primary)",
                        marginBottom: "6px",
                        wordBreak: "break-all",
                      }}
                    >
                      {c.token}
                    </div>

                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--docs-text-muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {c.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Interactive Color Tester */}
      <section
        style={{
          marginTop: "40px",
          padding: "28px 32px",
          border: "1px solid var(--docs-border)",
          borderRadius: "16px",
          backgroundColor: "var(--docs-surface)",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>
          Interactive Semantic Button Preview
        </h3>
        <p
          style={{
            margin: "0 0 20px 0",
            color: "var(--docs-text-muted)",
            fontSize: "0.9rem",
          }}
        >
          Inspect how these color ramps map directly to live Chellaa Button
          components:
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button colorScheme="primary" variant="solid">
            Primary
          </Button>
          <Button colorScheme="secondary" variant="solid">
            Secondary
          </Button>
          <Button colorScheme="neutral" variant="outline">
            Neutral
          </Button>
          <Button colorScheme="success" variant="solid">
            Success
          </Button>
          <Button colorScheme="warning" variant="solid">
            Warning
          </Button>
          <Button colorScheme="danger" variant="solid">
            Danger
          </Button>
          <Button colorScheme="info" variant="solid">
            Info
          </Button>
        </div>
      </section>
    </article>
  );
}
