import { useMemo } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { DocsProvider } from './contexts/DocsContext';
import { DocPage, HomePage } from './components/pages';
import { SearchDialog, type SearchResult } from './components/layout';
import { extractTocFromMarkdown } from './components/docs/TableOfContents';
import { type DocsConfig, type DocPage as DocPageType } from './config/docs.config';
import './styles/index.css';

interface DocRouteProps {
  docs: DocPageType[];
}

function DynamicDocPage({ docs }: DocRouteProps) {
  const { '*': path } = useParams();
  const slug = path ? `/${path}` : '/';
  const doc = docs.find(d => d.slug === slug);

  if (!doc) {
    return (
      <DocPage
        content="# Not Found\n\nThis page does not exist."
        title="Not Found"
      />
    );
  }

  const currentIndex = docs.findIndex(d => d.slug === slug);
  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;

  return (
    <DocPage
      content={doc.content}
      title={doc.meta.title || doc.path}
      description={doc.meta.description}
      prevPage={prevDoc ? { title: prevDoc.meta.title || prevDoc.path, href: prevDoc.slug } : undefined}
      nextPage={nextDoc ? { title: nextDoc.meta.title || nextDoc.path, href: nextDoc.slug } : undefined}
      docs={docs}
    />
  );
}

function HomeRoute({ docs, config, homePage }: DocRouteProps & { config: DocsConfig } & Pick<DocsProps, 'homePage'>) {
  const homeDoc = docs.find(d => d.slug === '/');
  
  if (!homeDoc) {
    return null;
  }

  return (
    <HomePage
      title={config.name}
      description={config.description}
      primaryAction={docs[1] ? { label: 'Get Started', href: docs[1].slug } : undefined}
      secondaryAction={docs[2] ? { label: 'View Docs', href: docs[2].slug } : undefined}
      features={homePage?.features || []}
    />
  );
}

export interface DocsProps {
  config: DocsConfig;
  docs: DocPageType[];
  homePage?: {
    features?: Array<{
      title: string;
      description: string;
      href?: string;
      icon?: React.ReactNode;
    }>;
  };
  basePath?: string;
}

export function Docs({ config, docs, homePage, basePath = '' }: DocsProps) {
  const navigation = useMemo(() => {
    if (config.navigation && config.navigation.length > 0) {
      return config.navigation;
    }

    const nav: DocsConfig['navigation'] = [];
    
    docs.forEach(doc => {
      const parts = doc.path.split('/');
      if (parts.length === 1) return;
      
      const section = parts[0];
      const existingSection = nav.find(n => n.title === section);
      
      if (existingSection) {
        if (existingSection.children) {
          existingSection.children.push({
            title: doc.meta.title || doc.path,
            href: `${basePath}${doc.slug}`,
          });
        }
      } else {
        nav.push({
          title: section,
          children: [
            {
              title: doc.meta.title || doc.path,
              href: `${basePath}${doc.slug}`,
            },
          ],
        });
      }
    });
    
    return nav;
  }, [docs, basePath]);

  const searchResults = useMemo<SearchResult[]>(() => 
    docs.map(doc => {
      const section = doc.path.split('/')[0];
      const parentTitle = doc.meta.title || doc.path;
      const headings = extractTocFromMarkdown(doc.content).map(heading => ({
        title: heading.text,
        href: `${basePath}${doc.slug}#${heading.id}`,
        section,
        parentTitle,
        headingLevel: heading.level,
        type: 'heading' as const,
      }));

      return {
        title: parentTitle,
        href: `${basePath}${doc.slug}`,
        excerpt: doc.content.substring(0, 160).replace(/^#+\s+/gm, '').substring(0, 160),
        section,
        headings,
      };
    }),
    [docs, basePath]
  );

  return (
    <DocsProvider config={{ ...config, navigation }}>
        <SearchDialog results={searchResults} />
        <Routes>
          <Route
            path="/"
            element={
              <HomeRoute docs={docs} config={config} homePage={homePage} />
            }
          />
          <Route path="/*" element={<DynamicDocPage docs={docs} />} />
        </Routes>
      </DocsProvider>
  );
}
