import { type ReactNode, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { cn } from '../../lib/utils';
import { TabbedContent, type Tab } from './TabbedContent';
import { LanguageTabs, type LanguageTabDefinition } from './LanguageTabs';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface ContentSegment {
  type: 'markdown' | 'tabs';
  content: string;
  tabs?: Tab[];
}

function parseContentWithTabs(content: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  const lines = content.split('\n');
  let currentMarkdown: string[] = [];
  let inTabBlock = false;
  let currentTabs: { label: string; lines: string[] }[] = [];
  let currentTabLabel = '';
  let currentTabLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tabMatch = line.match(/^===\s+"([^"]+)"\s*$/);

    if (tabMatch) {
      if (!inTabBlock) {
        if (currentMarkdown.length > 0) {
          segments.push({ type: 'markdown', content: currentMarkdown.join('\n') });
          currentMarkdown = [];
        }
        inTabBlock = true;
      }
      if (currentTabLabel && currentTabLines.length > 0) {
        currentTabs.push({ label: currentTabLabel, lines: currentTabLines });
      }
      currentTabLabel = tabMatch[1];
      currentTabLines = [];
    } else if (inTabBlock) {
      if (line.startsWith('    ') || line.trim() === '') {
        currentTabLines.push(line.startsWith('    ') ? line.slice(4) : line);
      } else if (line.trim() !== '') {
        if (currentTabLabel && currentTabLines.length > 0) {
          currentTabs.push({ label: currentTabLabel, lines: currentTabLines });
        }
        if (currentTabs.length > 0) {
          segments.push({
            type: 'tabs',
            content: '',
            tabs: currentTabs.map(t => ({
              label: t.label,
              content: t.lines.join('\n').trim(),
            })),
          });
        }
        currentTabs = [];
        currentTabLabel = '';
        currentTabLines = [];
        inTabBlock = false;
        currentMarkdown.push(line);
      }
    } else {
      currentMarkdown.push(line);
    }
  }

  if (inTabBlock && currentTabLabel && currentTabLines.length > 0) {
    currentTabs.push({ label: currentTabLabel, lines: currentTabLines });
  }
  if (currentTabs.length > 0) {
    segments.push({
      type: 'tabs',
      content: '',
      tabs: currentTabs.map(t => ({
        label: t.label,
        content: t.lines.join('\n').trim(),
      })),
    });
  }
  if (currentMarkdown.length > 0) {
    segments.push({ type: 'markdown', content: currentMarkdown.join('\n') });
  }

  return segments;
}

function MarkdownSegment({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeSlug]}
      components={{
        a({ href, children, ...props }) {
          const isExternal = href?.startsWith('http');
          return (
            <a
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          );
        },
        table({ children, ...props }) {
          return (
            <div className="overflow-x-auto my-6">
              <table {...props}>{children}</table>
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

const REQUIREMENT_LINE_REGEX = /^-\s+\*\*(.+?)\*\*:\s*(.+)$/;

function parseLanguageTabs(tabs: Tab[]): LanguageTabDefinition[] | null {
  const parsedTabs: LanguageTabDefinition[] = [];

  for (const tab of tabs) {
    const lines = (tab.content as string)
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return null;
    }

    const requirements = lines.map(line => {
      const match = line.match(REQUIREMENT_LINE_REGEX);
      if (!match) {
        return null;
      }
      return { name: match[1], value: match[2] };
    });

    if (requirements.some(req => req === null)) {
      return null;
    }

    parsedTabs.push({
      label: tab.label,
      requirements: requirements as { name: string; value: string }[],
    });
  }

  return parsedTabs;
}

function TabbedContentWithMarkdown({ tabs }: { tabs: Tab[] }) {
  const languageTabs = parseLanguageTabs(tabs);
  if (languageTabs) {
    return <LanguageTabs languages={languageTabs} />;
  }

  const renderedTabs = tabs.map(tab => ({
    label: tab.label,
    content: <MarkdownSegment content={tab.content as string} /> as ReactNode,
  }));

  return <TabbedContent tabs={renderedTabs} />;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const segments = useMemo(() => parseContentWithTabs(content), [content]);

  return (
    <div className={cn('prose max-w-none', className)}>
      {segments.map((segment, index) => {
        if (segment.type === 'tabs' && segment.tabs) {
          return <TabbedContentWithMarkdown key={index} tabs={segment.tabs} />;
        }
        return <MarkdownSegment key={index} content={segment.content} />;
      })}
    </div>
  );
}
