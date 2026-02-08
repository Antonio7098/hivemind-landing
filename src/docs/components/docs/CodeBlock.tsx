import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlock({
  code,
  language = 'text',
  filename,
  showLineNumbers = false,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={cn(
    'group relative my-6 rounded-lg overflow-hidden',
    'border border-border',
    className
  )}>
      {filename && (
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2 text-sm">
          <Icon icon={Terminal} size="sm" className="text-muted-foreground" />
          <span className="font-mono text-muted-foreground">{filename}</span>
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          <Icon icon={copied ? Check : Copy} size="sm" />
        </Button>
        <pre className={cn(
          'overflow-x-auto bg-code p-4 text-sm',
          showLineNumbers && 'pl-0'
        )}>
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    highlightLines.includes(i + 1) && 'bg-primary/10 -mx-4 px-4'
                  )}
                >
                  <span className="w-12 shrink-0 select-none text-right pr-4 text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="flex-1">{line || ' '}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
