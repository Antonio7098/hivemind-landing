import { useMemo } from 'react';
import { Docs } from './docs/Docs';
import { loadDocs } from './docs/lib/loadDocs';
import type { DocsConfig } from './docs/config/docs.config';
import './docs/styles/index.css';

const modules = import.meta.glob('./docs/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const config: DocsConfig = {
  name: 'Hivemind',
  description: 'Agentic development you can actually trust',
  logo: { text: 'Hivemind Docs' },
  navigation: [
    {
      title: 'Getting Started',
      children: [
        { title: 'Installation', href: '/docs/getting-started/installation' },
        { title: 'Quick Start', href: '/docs/getting-started/quickstart' },
      ],
    },
    {
      title: 'Architecture',
      children: [
        { title: 'Overview', href: '/docs/architecture/overview' },
        { title: 'TaskFlows', href: '/docs/architecture/taskflows' },
      ],
    },
    {
      title: 'Guides',
      children: [
        { title: 'Working with Agents', href: '/docs/guides/agents' },
        { title: 'Safety & Observability', href: '/docs/guides/safety' },
      ],
    },
  ],
  github: 'https://github.com/Antonio7098/Hivemind',
  search: { enabled: true, placeholder: 'Search Hivemind docs...' },
};

export default function HivemindDocs() {
  const docs = useMemo(() => {
    const loaded = loadDocs({ modules, contentPath: './docs/content/' });
    return loaded.sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999));
  }, []);

  return (
    <div className="docs-root">
      <Docs
        config={config}
        docs={docs}
        basePath="/docs"
        homePage={{
          features: [
            {
              title: 'TaskFlows',
              description: 'Deterministic execution plans for agent orchestration',
              href: '/docs/architecture/taskflows',
            },
            {
              title: 'Agent Isolation',
              description: 'Scoped environments with file locks and read boundaries',
              href: '/docs/guides/agents',
            },
            {
              title: 'Safety First',
              description: 'Event streams, approval gates, bounded retries, and rollback',
              href: '/docs/guides/safety',
            },
          ],
        }}
      />
    </div>
  );
}
