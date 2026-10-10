import * as React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { TableOfContents, TocItem } from "./TableOfContents";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "../../search/SearchModal";
import { docsNavigation } from "../../navigation/docsNavigation";
import "./DocsLayout.css";

interface DocsLayoutProps {
  currentPath: string;
  tocItems?: TocItem[];
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export function DocsLayout({
  currentPath,
  tocItems = [],
  onNavigate,
  children,
}: DocsLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Compute Breadcrumb and Prev/Next page navigation
  const flatNavItems = React.useMemo(() => {
    return docsNavigation.flatMap((sec) =>
      sec.items.map((item) => ({ ...item, category: sec.title })),
    );
  }, []);

  const currentIndex = flatNavItems.findIndex(
    (item) => item.path === currentPath,
  );
  const currentItem = flatNavItems[currentIndex];
  const prevItem = currentIndex > 0 ? flatNavItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex >= 0 && currentIndex < flatNavItems.length - 1
      ? flatNavItems[currentIndex + 1]
      : null;

  return (
    <div className="docs-shell">
      {/* Skip to Content Link */}
      <a href="#docs-main-content" className="docs-skip-link">
        Skip to main content
      </a>

      <Header
        currentPath={currentPath}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onNavigate={onNavigate}
      />

      <div className="docs-main-container">
        <Sidebar currentPath={currentPath} onNavigate={onNavigate} />

        <main
          id="docs-main-content"
          className="docs-content-area"
          tabIndex={-1}
        >
          {/* Breadcrumbs */}
          {currentItem && (
            <nav className="docs-breadcrumbs" aria-label="Breadcrumb">
              <a
                href="/overview"
                className="docs-breadcrumbs-link"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/overview");
                }}
              >
                Docs
              </a>
              <span className="docs-breadcrumbs-separator">/</span>
              <span className="docs-breadcrumbs-link">
                {currentItem.category}
              </span>
              <span className="docs-breadcrumbs-separator">/</span>
              <span className="docs-breadcrumbs-current">
                {currentItem.title}
              </span>
            </nav>
          )}

          {children}

          {/* Pagination Footer */}
          {(prevItem || nextItem) && (
            <footer className="docs-pagination">
              {prevItem ? (
                <a
                  href={prevItem.path}
                  className="docs-pagination-card"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(prevItem.path);
                  }}
                >
                  <span
                    className="docs-pagination-sub"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FiArrowLeft size={13} />
                    <span>Previous</span>
                  </span>
                  <span className="docs-pagination-title">
                    {prevItem.title}
                  </span>
                </a>
              ) : (
                <div />
              )}

              {nextItem ? (
                <a
                  href={nextItem.path}
                  className="docs-pagination-card"
                  style={{ textAlign: "right" }}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(nextItem.path);
                  }}
                >
                  <span
                    className="docs-pagination-sub"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span>Next</span>
                    <FiArrowRight size={13} />
                  </span>
                  <span className="docs-pagination-title">
                    {nextItem.title}
                  </span>
                </a>
              ) : (
                <div />
              )}
            </footer>
          )}
        </main>

        <TableOfContents items={tocItems} />
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(path: string) => {
          onNavigate(path);
        }}
      />

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={currentPath}
        onNavigate={onNavigate}
      />
    </div>
  );
}
