import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export interface DocsLayoutProps {
  children: ReactNode;
  className?: string;
  showSidebar?: boolean;
  showToc?: boolean;
  tocContent?: ReactNode;
  docs?: import('../../config/docs.config').DocPage[];
}

export function DocsLayout({
  children,
  className,
  showSidebar = true,
  showToc = true,
  tocContent,
  docs,
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {showSidebar && <Sidebar docs={docs} />}
        
        <main
          className={cn(
            'flex-1 min-w-0',
            showSidebar
          )}
        >
          <div className={cn(
            'px-12 py-8',
            showToc
              ? 'w-full xl:grid xl:grid-cols-[1fr_200px] xl:gap-8'
              : 'max-w-5xl mx-auto',
            className
          )}>
            <div className="min-w-0">
              {children}
            </div>
            
            {showToc && tocContent && (
              <aside className="hidden xl:block">
                <div className="sticky top-20">
                  {tocContent}
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
