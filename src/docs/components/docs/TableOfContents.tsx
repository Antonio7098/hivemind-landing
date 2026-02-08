import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className={cn('space-y-1', className)}>
      <p className="text-sm font-semibold text-foreground mb-3">On this page</p>
      <ul className="space-y-1 text-sm">
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'block py-1 transition-colors hover:text-foreground',
                item.level === 2 && 'pl-0',
                item.level === 3 && 'pl-4',
                item.level === 4 && 'pl-8',
                activeId === item.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    items.push({ id, text, level });
  }

  return items;
}
