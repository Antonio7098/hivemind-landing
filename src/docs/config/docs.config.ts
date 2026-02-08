export interface NavItem {
  title: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
  order?: number;
}

export interface DocPageMeta {
  title?: string;
  description?: string;
  order?: number;
  [key: string]: unknown;
}

export interface DocPage {
  slug: string;
  path: string;
  content: string;
  meta: DocPageMeta;
}

export interface DocsConfig {
  name: string;
  description: string;
  logo?: {
    light?: string;
    dark?: string;
    text?: string;
  };
  navigation: NavItem[];
  footer?: {
    links?: { title: string; href: string }[];
    copyright?: string;
  };
  github?: string;
  search?: {
    enabled: boolean;
    placeholder?: string;
  };
}

export const defaultDocsConfig: DocsConfig = {
  name: 'Hivemind',
  description: 'Agentic development you can actually trust',
  logo: {
    text: 'Hivemind Docs',
  },
  navigation: [],
  github: 'https://github.com/Antonio7098/Hivemind',
  search: {
    enabled: true,
    placeholder: 'Search Hivemind docs...',
  },
};
