import { FiX } from "react-icons/fi";
import { Sidebar } from "./Sidebar";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate?: (path: string) => void;
}

export function MobileNav({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div
      className="docs-mobile-nav-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="docs-mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="docs-mobile-nav-header">
          <span style={{ fontWeight: 800 }}>Chellaa React Docs</span>
          <button
            type="button"
            className="docs-mobile-nav-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <FiX size={18} />
          </button>
        </div>
        <div className="docs-mobile-nav-body">
          <Sidebar
            currentPath={currentPath}
            onNavigate={(path) => {
              onNavigate?.(path);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
