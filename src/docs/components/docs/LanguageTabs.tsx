import { useState } from 'react';
import { cn } from '../../lib/utils';

export interface LanguageRequirement {
  name: string;
  value: string;
}

export interface LanguageTabDefinition {
  label: string;
  description?: string;
  requirements: LanguageRequirement[];
}

export interface LanguageTabsProps {
  languages: LanguageTabDefinition[];
  defaultLanguage?: number;
  className?: string;
}

export function LanguageTabs({ languages, defaultLanguage = 0, className }: LanguageTabsProps) {
  if (!languages || languages.length === 0) {
    return null;
  }

  const initialIndex = Math.min(Math.max(defaultLanguage, 0), languages.length - 1);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeLanguage = languages[activeIndex] ?? languages[0];

  return (
    <div className={cn('not-prose my-6 rounded-xl border border-border bg-card', className)}>
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-muted/50">
        {languages.map((language, index) => (
          <button
            key={language.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              'px-4 py-3 text-sm font-medium tracking-tight whitespace-nowrap transition-colors',
              'border-b-2 -mb-px rounded-t-lg',
              activeIndex === index
                ? 'border-primary bg-background text-foreground'
                : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {language.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 px-4 py-5 sm:px-6">
        {activeLanguage.description && (
          <p className="text-sm text-muted-foreground">{activeLanguage.description}</p>
        )}

        <div className="space-y-3">
          {activeLanguage.requirements.map((requirement, index) => (
            <div
              key={`${requirement.name}-${index}`}
              className="flex flex-col gap-1 rounded-lg border border-border/70 bg-background/80 px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm font-medium text-muted-foreground">{requirement.name}</span>
              <span className="text-base font-semibold text-foreground">{requirement.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
