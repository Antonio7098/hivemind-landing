import matter from 'gray-matter';
import { ensureBuffer } from './ensureBuffer';
import type { DocPage, NavItem } from '../config/docs.config';

ensureBuffer();

const modules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default', eager: true });

export const getAllDocs = (): DocPage[] => {
  const docs: DocPage[] = [];

  for (const path in modules) {
    const rawContent = modules[path];
    const { data, content } = matter(rawContent);
    
    const relativePath = path.replace('../content/', '').replace('.md', '');
    const slug = relativePath.split('/').map(p => p.toLowerCase()).join('/');

    docs.push({
      slug: `/${slug}`,
      path: relativePath,
      content,
      meta: data,
    });
  }

  return docs;
};

export const getDocBySlug = (slug: string): DocPage | undefined => {
  const docs = getAllDocs();
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  return docs.find((doc) => doc.slug === normalizedSlug);
};

export const generateNavigation = (): NavItem[] => {
  const docs = getAllDocs();
  const root: NavItem[] = [];

  docs.forEach((doc) => {
    const parts = doc.path.split('/');
    let currentLevel = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      const existingItem = currentLevel.find((item) => item.title === part);

      if (existingItem) {
        if (existingItem.children) {
          currentLevel = existingItem.children;
        }
      } else {
        const newItem: NavItem = {
          title: isFile ? (doc.meta.title || part) : part,
          href: isFile ? doc.slug : undefined,
          children: isFile ? undefined : [],
          order: doc.meta.order,
        };
        
        if (part === 'index') {
             newItem.title = doc.meta.title || 'Overview';
        }

        currentLevel.push(newItem);
        if (!isFile && newItem.children) {
          currentLevel = newItem.children;
        }
      }
    });
  });

  const sortNav = (items: NavItem[]) => {
    items.sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
    items.forEach(item => {
      if (item.children) sortNav(item.children);
    });
  };

  sortNav(root);
  return root;
};
