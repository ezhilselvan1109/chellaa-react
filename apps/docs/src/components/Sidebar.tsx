import React from "react";
import { NavLink } from "react-router-dom";
import { navigationConfig } from "../config/navigation";

export const Sidebar: React.FC = () => {
  return (
    <aside className="docs-sidebar">
      {navigationConfig.map((section) => (
        <div key={section.title} className="docs-sidebar-section">
          <div className="docs-sidebar-section-title">{section.title}</div>
          {section.items.map((item) => (
            <NavLink
              key={item.title}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `docs-sidebar-link ${isActive && item.href !== "#" ? "active" : ""}`
              }
              onClick={(e) => {
                if (item.href === "#") {
                  e.preventDefault();
                }
              }}
            >
              <span>{item.title}</span>
              {item.badge && (
                <span
                  className={`docs-badge ${
                    item.badge.toLowerCase() === "stable" ? "stable" : ""
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  );
};
