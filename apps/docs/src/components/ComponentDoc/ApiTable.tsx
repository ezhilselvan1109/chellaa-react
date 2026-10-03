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
    <div style={{ margin: "24px 0 40px 0" }}>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "12px" }}>
        <code>{componentName}</code> Props
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table
          className="docs-table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  "2px solid var(--cl-color-border-subtle, #e5e7eb)",
                backgroundColor: "var(--cl-color-surface-subtle, #f9fafb)",
              }}
            >
              <th style={{ padding: "12px 16px" }}>Prop</th>
              <th style={{ padding: "12px 16px" }}>Type</th>
              <th style={{ padding: "12px 16px" }}>Default</th>
              <th style={{ padding: "12px 16px" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p) => (
              <tr
                key={p.name}
                style={{
                  borderBottom:
                    "1px solid var(--cl-color-border-subtle, #e5e7eb)",
                }}
              >
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                  <code>{p.name}</code>
                  {p.required && (
                    <span
                      style={{
                        color: "var(--cl-color-danger-base, #ef4444)",
                        marginLeft: "4px",
                      }}
                      title="Required"
                    >
                      *
                    </span>
                  )}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <code style={{ fontSize: "0.82rem", color: "#8b5cf6" }}>
                    {p.type}
                  </code>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {p.default ? <code>{p.default}</code> : <span>—</span>}
                </td>
                <td style={{ padding: "12px 16px", lineHeight: 1.5 }}>
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
