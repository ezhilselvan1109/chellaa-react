import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { navigationConfig } from "../config/navigation";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = navigationConfig.flatMap((sec) => sec.items).filter((i) => i.href !== "#");
  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Type a command or search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className="search-results-list">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li
                key={item.href}
                className="search-result-item"
                onClick={() => handleSelect(item.href)}
              >
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                {item.description && (
                  <div style={{ fontSize: "0.8rem", color: "var(--ch-color-fg-muted)" }}>
                    {item.description}
                  </div>
                )}
              </li>
            ))
          ) : (
            <li style={{ padding: "1.5rem", textAlign: "center", color: "var(--ch-color-fg-subtle)" }}>
              No results found for "{query}"
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
