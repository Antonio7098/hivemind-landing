import matter from 'gray-matter';
import { ensureBuffer } from './ensureBuffer';
import type { DocPage } from '../config/docs.config';

ensureBuffer();

export interface LoadDocsOptions {
  modules: Record<string, unknown>;
  contentPath?: string;
}

export function loadDocs(options: LoadDocsOptions): DocPage[] {
  const { modules, contentPath = '' } = options;
  const docs: DocPage[] = [];

  for (const path in modules) {
    const rawContent = String(modules[path] || '');
    const { data, content } = matter(rawContent);
    
    const relativePath = path.replace(contentPath, '').replace('.md', '');
    let slug = relativePath
      .split('/')
      .map(p => p.toLowerCase())
      .join('/');

    if (slug === 'index') {
      slug = '';
    }

    docs.push({
      slug: `/${slug}`,
      path: relativePath,
      content,
      meta: data,
    });
  }

  return docs;
}
