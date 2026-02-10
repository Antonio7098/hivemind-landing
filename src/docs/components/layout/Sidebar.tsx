import { useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Copy, Check } from 'lucide-react';
import { useDocs } from '../../contexts/DocsContext';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { type NavItem } from '../../config/docs.config';
import type { DocPage } from '../../config/docs.config';

export interface SidebarProps {
  className?: string;
  docs?: DocPage[];
}

type CopyStatus = 'idle' | 'copied' | 'cooldown' | 'suppressed';

function NavItemComponent({ item, depth = 0, docs }: { item: NavItem; depth?: number; docs?: DocPage[] }) {
  const location = useLocation();
  const [status, setStatus] = useState<CopyStatus>('idle');
  const hoverRef = useRef(false);
  const [isOpen, setIsOpen] = useState(() => {
    if (!item.children) return false;
    return item.children.some(child => 
      child.href === location.pathname || 
      child.children?.some(c => c.href === location.pathname)
    );
  });

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === location.pathname;

  const handleMouseEnter = () => {
    hoverRef.current = true;
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;
    if (status === 'suppressed') {
      setStatus('idle');
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!docs) return;
    
    const collectContent = (navItem: NavItem): string => {
      let content = '';
      
      if (navItem.href) {
        const doc = docs.find(d => d.slug === navItem.href);
        if (doc) {
          content += `# ${doc.meta.title || navItem.title}\n\n`;
          content += doc.content;
        }
      }
      
      if (navItem.children) {
        for (const child of navItem.children) {
          content += '\n\n' + collectContent(child);
        }
      }
      
      return content;
    };
    
    const content = collectContent(item);
    await navigator.clipboard.writeText(content.trim());
    
    setStatus('copied');
    
    setTimeout(() => {
      setStatus('cooldown');
      setTimeout(() => {
        if (hoverRef.current) {
          setStatus('suppressed');
        } else {
          setStatus('idle');
        }
      }, 150);
    }, 2000);
  };

  const renderCopyIcon = () => {
    if (status === 'copied' || status === 'cooldown') {
      return <Check className="h-3 w-3 text-green-500" />;
    }
    return <Copy className="h-3 w-3" />;
  };

  if (hasChildren) {
    return (
      <div>
        <div
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors cursor-pointer group',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            depth > 0 && 'pl-6'
          )}
        >
          <span className="font-medium">{item.title}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className={cn(
                'transition-opacity duration-150 p-1 rounded hover:bg-sidebar-accent/50',
                status === 'idle' ? 'opacity-0 group-hover:opacity-100' : '',
                status === 'copied' ? 'opacity-100' : '',
                status === 'cooldown' ? 'opacity-0' : '',
                status === 'suppressed' ? 'opacity-0' : '',
                status === 'idle' ? 'pointer-events-none group-hover:pointer-events-auto' : 'pointer-events-none'
              )}
              title="Copy section content"
            >
              {renderCopyIcon()}
            </button>
            <ChevronRight
              className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-200',
                isOpen && 'rotate-90'
              )}
            />
          </div>
        </div>
        {isOpen && item.children && (
          <div className="mt-1 space-y-1">
            {item.children.map((child, i) => (
              <NavItemComponent key={i} item={child} depth={depth + 1} docs={docs} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href || '#'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors group',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
          : 'text-sidebar-foreground/70',
        depth > 0 && 'pl-6',
        depth > 1 && 'pl-9'
      )}
    >
      <span>{item.title}</span>
      <span
        role="button"
        onClick={handleCopy}
        className={cn(
          'transition-opacity duration-150 ml-auto p-1 rounded hover:bg-sidebar-accent/50 cursor-pointer',
          status === 'idle' ? 'opacity-0 group-hover:opacity-100' : '',
          status === 'copied' ? 'opacity-100' : '',
          status === 'cooldown' ? 'opacity-0' : '',
          status === 'suppressed' ? 'opacity-0' : '',
          status === 'idle' ? 'pointer-events-none group-hover:pointer-events-auto' : 'pointer-events-none'
        )}
        title="Copy page content"
      >
        {renderCopyIcon()}
      </span>
      {item.badge && (
        <Badge variant="secondary" className="ml-auto">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}

export function Sidebar({ className, docs }: SidebarProps) {
  const { config, sidebarOpen, setSidebarOpen } = useDocs();

  const SectionHeader = ({ title, items }: { title: string; items: NavItem[] }) => {
    const [status, setStatus] = useState<CopyStatus>('idle');
    const hoverRef = useRef(false);

    const handleCopy = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!docs) return;
      
      const collectContent = (navItems: NavItem[]): string => {
        let content = '';
        
        for (const navItem of navItems) {
          if (navItem.href) {
            const doc = docs.find(d => d.slug === navItem.href);
            if (doc) {
              content += `# ${doc.meta.title || navItem.title}\n\n`;
              content += doc.content;
            }
          }
          
          if (navItem.children) {
            content += '\n\n' + collectContent(navItem.children);
          }
        }
        
        return content;
      };
      
      const content = collectContent(items);
      await navigator.clipboard.writeText(content.trim());
      
      setStatus('copied');
      
      setTimeout(() => {
        setStatus('cooldown');
        setTimeout(() => {
          if (hoverRef.current) {
            setStatus('suppressed');
          } else {
            setStatus('idle');
          }
        }, 150);
      }, 2000);
    };

    const handleMouseEnter = () => {
      hoverRef.current = true;
    };

    const handleMouseLeave = () => {
      hoverRef.current = false;
      if (status === 'suppressed') {
        setStatus('idle');
      }
    };

    const renderCopyIcon = () => {
      if (status === 'copied' || status === 'cooldown') {
        return <Check className="h-3 w-3 text-green-500" />;
      }
      return <Copy className="h-3 w-3" />;
    };

    return (
      <div 
        className="flex items-center justify-between mb-2 px-3 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
        <button
          onClick={handleCopy}
          className={cn(
            'transition-opacity duration-150 p-1 rounded hover:bg-sidebar-accent/50',
            status === 'idle' ? 'opacity-0 group-hover:opacity-100' : '',
            status === 'copied' ? 'opacity-100' : '',
            status === 'cooldown' ? 'opacity-0' : '',
            status === 'suppressed' ? 'opacity-0' : '',
            status === 'idle' ? 'pointer-events-none group-hover:pointer-events-auto' : 'pointer-events-none'
          )}
          title="Copy section content"
        >
          {renderCopyIcon()}
        </button>
      </div>
    );
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-14 z-40 h-[calc(100vh-3.5rem)] w-72 sm:w-80 max-w-[85vw] border-r border-sidebar-border bg-sidebar',
          'transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:block',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <nav className="h-full overflow-y-auto scrollbar-thin p-4">
          <div className="space-y-6">
            {config.navigation.map((section, i) => (
              <div key={i}>
                {section.children ? (
                  <>
                    <SectionHeader title={section.title} items={section.children} />
                    <div className="space-y-1">
                      {section.children.map((item, j) => (
                        <NavItemComponent key={j} item={item} docs={docs} />
                      ))}
                    </div>
                  </>
                ) : (
                  <NavItemComponent item={section} docs={docs} />
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
