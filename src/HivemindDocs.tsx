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
      title: 'Overview',
      children: [
        { title: 'Product Requirements', href: '/docs/overview/prd' },
        { title: 'Core Principles', href: '/docs/overview/principles' },
        { title: 'Quickstart Guide', href: '/docs/overview/quickstart' },
        { title: 'Vision', href: '/docs/overview/vision' },
      ],
    },
    {
      title: 'Architecture',
      children: [
        { title: 'Architecture Overview', href: '/docs/architecture/architecture' },
        { title: 'CLI Capabilities', href: '/docs/architecture/cli-capabilities' },
        { title: 'Commit & Branch Model', href: '/docs/architecture/commit-branch-model' },
        { title: 'Event Model', href: '/docs/architecture/event-model' },
        { title: 'PRD v0', href: '/docs/architecture/prd-v0' },
        { title: 'Runtime Adapters', href: '/docs/architecture/runtime-adapters' },
        { title: 'Scope Model', href: '/docs/architecture/scope-model' },
        { title: 'State Model', href: '/docs/architecture/state-model' },
        { title: 'TaskFlow', href: '/docs/architecture/taskflow' },
      ],
    },
    {
      title: 'Design',
      children: [
        { title: 'CLI Semantics', href: '/docs/design/cli-semantics' },
        { title: 'Error Model', href: '/docs/design/error-model' },
        { title: 'Event Replay', href: '/docs/design/event-replay' },
        { title: 'Multi-Repo Integration', href: '/docs/design/multi-repo' },
        { title: 'Retry Context', href: '/docs/design/retry-context' },
        { title: 'Runtime Wrapper', href: '/docs/design/runtime-wrapper' },
        { title: 'Scope Enforcement', href: '/docs/design/scope-enforcement' },
        { title: 'Verification Authority', href: '/docs/design/verification-authority' },
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
              title: 'Architecture',
              description: 'System architecture and core concepts',
              href: '/docs/architecture/architecture',
            },
            {
              title: 'TaskFlows',
              description: 'Deterministic execution plans for agent orchestration',
              href: '/docs/architecture/taskflow',
            },
            {
              title: 'CLI Capabilities',
              description: 'Command-line interface and capabilities',
              href: '/docs/architecture/cli-capabilities',
            },
          ],
        }}
      />
    </div>
  );
}
