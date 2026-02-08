import { useMemo, useEffect, useState } from 'react';
import { DocsLayout } from '../layout/DocsLayout';
import { MarkdownRenderer } from '../docs/MarkdownRenderer';
import { TableOfContents, extractTocFromMarkdown } from '../docs/TableOfContents';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

export interface DocPageProps {
  content: string;
  title?: string;
  description?: string;
  prevPage?: { title: string; href: string };
  nextPage?: { title: string; href: string };
  lastUpdated?: string;
  className?: string;
  docs?: import('../../config/docs.config').DocPage[];
}

export function DocPage({
  content,
  title,
  description,
  prevPage,
  nextPage,
  lastUpdated,
  className,
  docs,
}: DocPageProps) {
  const tocItems = useMemo(() => extractTocFromMarkdown(content), [content]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [content, title]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DocsLayout
      showToc={tocItems.length > 0}
      tocContent={<TableOfContents items={tocItems} />}
      docs={docs}
    >
      <article className={cn('min-w-0', className)}>
        {(title || description) && (
          <header className="mb-8 relative pr-10">
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-2 text-lg text-muted-foreground">
                {description}
              </p>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="absolute right-0 top-0"
              aria-label="Copy content"
            >
              <Icon icon={copied ? Check : Copy} size="sm" />
            </Button>
          </header>
        )}

        <MarkdownRenderer content={content} />

        {(prevPage || nextPage || lastUpdated) && (
          <footer className="mt-12 border-t border-border pt-6">
            {lastUpdated && (
              <p className="text-sm text-muted-foreground mb-6">
                Last updated: {lastUpdated}
              </p>
            )}
            
            <nav className="flex items-center justify-between gap-4">
              {prevPage ? (
                <Link
                  to={prevPage.href}
                  className="group flex flex-col items-start gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon icon={ChevronLeft} size="xs" />
                    Previous
                  </span>
                  <span className="font-medium group-hover:text-primary">
                    {prevPage.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              
              {nextPage && (
                <Link
                  to={nextPage.href}
                  className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    Next
                    <Icon icon={ChevronRight} size="xs" />
                  </span>
                  <span className="font-medium group-hover:text-primary">
                    {nextPage.title}
                  </span>
                </Link>
              )}
            </nav>
          </footer>
        )}
      </article>
    </DocsLayout>
  );
}
