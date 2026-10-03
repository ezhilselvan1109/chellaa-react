interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="docs-toc" aria-label="On this page">
      <div className="docs-toc-title">On This Page</div>
      <ul className="docs-toc-list">
        {items.map((item) => (
          <li key={item.id} className="docs-toc-item">
            <a href={`#${item.id}`} className="docs-toc-link">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
