import { docsNavigation } from "../../navigation/docsNavigation";
import { NavSection, NavItem } from "../../navigation/types";
import { StatusBadge } from "../Common/StatusBadge";

interface SidebarProps {
  currentPath: string;
  onNavigate?: (path: string) => void;
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  return (
    <aside className="docs-sidebar" aria-label="Documentation navigation">
      <nav className="docs-sidebar-nav">
        {docsNavigation.map((section: NavSection) => (
          <div key={section.title} className="docs-nav-group">
            <h3 className="docs-nav-title">{section.title}</h3>
            <ul className="docs-nav-list">
              {section.items.map((item: NavItem) => {
                const isActive = currentPath === item.path;
                return (
                  <li key={item.id} className="docs-nav-item">
                    <a
                      href={item.path}
                      className={`docs-nav-link ${isActive ? "active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.(item.path);
                      }}
                    >
                      <span className="docs-nav-link-text">{item.title}</span>
                      {item.status && <StatusBadge status={item.status} />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
