import * as React from "react";
import { searchIndex, SearchRecord } from "./searchIndex";
import "./SearchModal.css";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
}

export function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredResults = React.useMemo(() => {
    if (!query.trim()) {
      return searchIndex;
    }
    const q = query.toLowerCase().trim();
    return searchIndex.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const categoryMatch = item.category.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some((k) =>
        k.toLowerCase().includes(q),
      );
      return titleMatch || categoryMatch || descMatch || keywordMatch;
    });
  }, [query]);

  React.useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredResults.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredResults[selectedIndex];
        if (selected) {
          onSelect(selected.path);
          onClose();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose, onSelect]);

  if (!isOpen) return null;

  return (
    <div className="docs-search-backdrop" onClick={onClose} role="presentation">
      <div
        className="docs-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="docs-search-header">
          <span className="docs-search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            ref={inputRef}
            className="docs-search-input"
            type="search"
            placeholder="Search documentation, components, tokens (Cmd+K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="docs-search-results" role="listbox">
          {filteredResults.length === 0 ? (
            <div className="docs-search-empty">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredResults.map((item: SearchRecord, index: number) => (
              <div
                key={item.id}
                role="option"
                aria-selected={index === selectedIndex}
                className={`docs-search-item ${index === selectedIndex ? "selected" : ""}`}
                onClick={() => {
                  onSelect(item.path);
                  onClose();
                }}
              >
                <div className="docs-search-item-top">
                  <span className="docs-search-item-title">{item.title}</span>
                  <span className="docs-search-item-cat">{item.category}</span>
                </div>
                <div className="docs-search-item-desc">{item.description}</div>
              </div>
            ))
          )}
        </div>

        <div className="docs-search-footer">
          <span>Navigate with ↑ and ↓</span>
          <span>Select with ↵</span>
          <span>Close with Esc</span>
        </div>
      </div>
    </div>
  );
}
