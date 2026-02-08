import { type ReactNode, useState } from 'react';
import { cn } from '../../lib/utils';

export interface Tab {
  label: string;
  content: ReactNode;
}

export interface TabbedContentProps {
  tabs: Tab[];
  defaultTab?: number;
  className?: string;
}

export function TabbedContent({ tabs, defaultTab = 0, className }: TabbedContentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={cn('my-6 rounded-lg border border-border overflow-hidden', className)}>
      <div className="flex items-center border-b border-border bg-muted/50 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
              'border-b-2 -mb-px',
              activeTab === index
                ? 'border-primary text-foreground bg-background'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="px-3 py-2 sm:px-4 sm:py-3 bg-background [&_pre]:my-3 [&_pre:first-child]:mt-1 [&_pre:last-child]:mb-1 [&_pre]:rounded-lg"
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
