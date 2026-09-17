import React from "react";

export interface PropItem {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
}

export interface PropsTableProps {
  props: PropItem[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
    <div className="props-table-wrapper">
      <table className="props-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((item) => (
            <tr key={item.name}>
              <td>
                <span className="prop-name">{item.name}</span>
                {item.required && (
                  <span
                    style={{
                      color: "var(--ch-color-danger)",
                      marginLeft: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                )}
              </td>
              <td>
                <code className="prop-type">{item.type}</code>
              </td>
              <td>
                <code className="prop-default">{item.defaultValue ?? "-"}</code>
              </td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
