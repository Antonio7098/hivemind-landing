import { useState, useEffect, useRef } from 'react';
import { Search, FileText, X, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocs } from '../../contexts/DocsContext';
import { cn } from '../../lib/utils';
import { Icon } from '../ui/Icon';

interface BaseSearchItem {
  title: string;
  href: string;
  section?: string;
  excerpt?: string;
}

export interface SearchHeadingResult extends BaseSearchItem {
  type: 'heading';
  parentTitle: string;
  headingLevel: number;
}

export interface SearchResult extends BaseSearchItem {
  type?: 'doc';
  headings?: SearchHeadingResult[];
}

export interface SearchDialogProps {
  results?: SearchResult[];
  onSearch?: (query: string) => SearchResult[];
}

export function SearchDialog({ results: externalResults, onSearch }: SearchDialogProps) {
  const { searchOpen, setSearchOpen, config } = useDocs();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<SearchResult | SearchHeadingResult>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [searchOpen]);

  useEffect(() => {
    const flattenResults = (
      items: SearchResult[] | undefined,
      searchQuery: string
    ): Array<SearchResult | SearchHeadingResult> => {
      if (!items) return [];
      const normalizedQuery = searchQuery.toLowerCase().trim();

      if (!normalizedQuery) {
        return items.map(item => ({ ...item, type: 'doc' as const }));
      }

      const filtered: Array<SearchResult | SearchHeadingResult> = [];

      items.forEach(item => {
        const docMatches =
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.excerpt?.toLowerCase().includes(normalizedQuery);

        const headingMatches = (item.headings || []).filter(heading =>
          heading.title.toLowerCase().includes(normalizedQuery)
        );

        if (docMatches || headingMatches.length > 0) {
          filtered.push({ ...item, type: 'doc' as const });
          headingMatches.forEach(match => filtered.push(match));
        }
      });

      return filtered;
    };

    if (query && onSearch) {
      const searchResults = flattenResults(onSearch(query), query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else if (externalResults) {
      const flattened = flattenResults(externalResults, query);
      setResults(flattened);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, onSearch, externalResults]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].href);
          setSearchOpen(false);
        }
        break;
    }
  };

  if (!searchOpen) return null;

  console.log('SearchDialog - rendering, results length:', results.length);

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />
      <div className="fixed left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2 px-4">
        <div className="overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-4 py-1">
            <Icon icon={Search} className="shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={config.search?.placeholder || 'Search documentation...'}
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="shrink-0 flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon icon={X} size="sm" />
            </button>
          </div>

          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto p-2">
              {results.map((result, i) => {
                const isHeading = result.type === 'heading';
                return (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(result.href);
                      setSearchOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                      isHeading && 'ml-6 border-l border-border/60 pl-4',
                      selectedIndex === i
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                    )}
                  >
                    <Icon icon={isHeading ? Hash : FileText} className="mt-0.5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm truncate', isHeading ? 'font-medium' : 'font-semibold')}>
                        {result.title}
                      </p>
                      {!isHeading && result.section && (
                        <p className="text-xs text-muted-foreground">{result.section}</p>
                      )}
                      {isHeading && 'parentTitle' in result && (
                        <p className="text-xs text-muted-foreground">
                          {(result as SearchHeadingResult).parentTitle}
                        </p>
                      )}
                      {!isHeading && result.excerpt && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {result.excerpt}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↵</kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
