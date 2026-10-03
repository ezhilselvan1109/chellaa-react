export interface PropRow {
  name: string;
  type: string;
  default?: string | undefined;
  required?: boolean | undefined;
  description: string;
}

interface ApiTableProps {
  componentName: string;
  props: PropRow[];
}

export function ApiTable({ componentName, props }: ApiTableProps) {
  return (
    <div style={{ margin: "40px 0" }}>
      <h3
        id="api-reference"
        className="docs-heading-2"
        style={{ borderBottom: "none", margin: "0 0 16px 0", padding: 0 }}
      >
        <span>
          <code>{componentName}</code> API Reference
        </span>
      </h3>

      <div
        style={{
          border: "1px solid var(--docs-border)",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "var(--docs-card)",
          boxShadow: "var(--docs-shadow-sm)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.88rem",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--docs-border)",
                  backgroundColor: "var(--docs-surface)",
                }}
              >
                <th style={{ padding: "14px 18px", fontWeight: 700 }}>
                  Property
                </th>
                <th style={{ padding: "14px 18px", fontWeight: 700 }}>Type</th>
                <th style={{ padding: "14px 18px", fontWeight: 700 }}>
                  Default
                </th>
                <th style={{ padding: "14px 18px", fontWeight: 700 }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {props.map((p, idx) => (
                <tr
                  key={p.name}
                  style={{
                    borderBottom:
                      idx < props.length - 1
                        ? "1px solid var(--docs-border)"
                        : "none",
                    transition: "background-color 0.15s ease",
                  }}
                  className="docs-api-row"
                >
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontWeight: 600,
                        color: "var(--docs-primary)",
                      }}
                    >
                      {p.name}
                    </span>
                    {p.required && (
                      <span
                        style={{
                          color: "#ef4444",
                          marginLeft: "4px",
                          fontWeight: "bold",
                        }}
                        title="Required prop"
                      >
                        *
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <code
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        backgroundColor: "var(--docs-surface)",
                        border: "1px solid var(--docs-border)",
                        fontSize: "0.82rem",
                        color: "#8b5cf6",
                        wordBreak: "break-word",
                      }}
                    >
                      {p.type}
                    </code>
                  </td>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                    {p.default ? (
                      <code
                        style={{
                          padding: "2px 6px",
                          borderRadius: "4px",
                          backgroundColor: "var(--docs-surface)",
                          border: "1px solid var(--docs-border)",
                          fontSize: "0.8rem",
                          color: "var(--docs-text-muted)",
                        }}
                      >
                        {p.default}
                      </code>
                    ) : (
                      <span style={{ color: "var(--docs-text-dim)" }}>—</span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      color: "var(--docs-text-muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
