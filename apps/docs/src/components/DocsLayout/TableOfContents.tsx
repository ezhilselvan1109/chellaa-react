import * as React from "react";

export interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (items.length === 0) return;
    setActiveId(items[0]?.id || "");

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (!item) continue;
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="docs-toc-container" aria-label="Table of contents">
      <div className="docs-toc-title">On This Page</div>
      <ul className="docs-toc-list">
        {items.map((item) => (
          <li key={item.id} className="docs-toc-item">
            <a
              href={`#${item.id}`}
              className={`docs-toc-link ${activeId === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.id);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                  setActiveId(item.id);
                }
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
