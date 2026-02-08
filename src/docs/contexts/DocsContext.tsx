import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type DocsConfig, defaultDocsConfig } from '../config/docs.config';

interface DocsContextValue {
  config: DocsConfig;
  setConfig: (config: DocsConfig) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const DocsContext = createContext<DocsContextValue | undefined>(undefined);

export function DocsProvider({
  children,
  config: initialConfig = defaultDocsConfig,
}: {
  children: ReactNode;
  config?: DocsConfig;
}) {
  const [config, setConfig] = useState<DocsConfig>(initialConfig);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DocsContext.Provider value={{
      config,
      setConfig,
      sidebarOpen,
      setSidebarOpen,
      searchOpen,
      setSearchOpen,
    }}>
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return context;
}
