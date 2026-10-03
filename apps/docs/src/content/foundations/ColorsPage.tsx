export function ColorsPage() {
  const ramps = [
    {
      name: "Primary (Brand)",
      token: "--cl-color-primary-base",
      hex: "#2563eb",
      role: "Primary interactive CTAs and active states",
    },
    {
      name: "Secondary (Accent)",
      token: "--cl-color-secondary-base",
      hex: "#7c3aed",
      role: "Secondary highlights and badges",
    },
    {
      name: "Neutral (Surface/Text)",
      token: "--cl-color-surface-base",
      hex: "#ffffff",
      role: "Main background and surface card tones",
    },
    {
      name: "Success",
      token: "--cl-color-success-base",
      hex: "#10b981",
      role: "Completed operations and affirmative confirmations",
    },
    {
      name: "Warning",
      token: "--cl-color-warning-base",
      hex: "#f59e0b",
      role: "Non-blocking alerts and caution indicators",
    },
    {
      name: "Danger",
      token: "--cl-color-danger-base",
      hex: "#ef4444",
      role: "Destructive actions and critical errors",
    },
    {
      name: "Info",
      token: "--cl-color-info-base",
      hex: "#06b6d4",
      role: "Informational callouts and guidance notes",
    },
  ];

  return (
    <article className="docs-page">
      <h1>Colors & Semantic Ramps</h1>
      <p
        style={{
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--cl-color-text-secondary, #4b5563)",
        }}
      >
        All colors in Chellaa React are structured as semantic ramps that
        automatically adapt between light and dark modes.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {ramps.map((ramp) => (
          <div
            key={ramp.token}
            style={{
              border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "64px", backgroundColor: ramp.hex }} />
            <div style={{ padding: "12px 16px" }}>
              <div style={{ fontWeight: 700, marginBottom: "4px" }}>
                {ramp.name}
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "var(--cl-color-text-secondary, #6b7280)",
                  marginBottom: "4px",
                }}
              >
                <code>{ramp.token}</code>
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--cl-color-text-secondary, #6b7280)",
                  lineHeight: 1.4,
                }}
              >
                {ramp.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
