import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { PropsWithChildren } from 'react';
import type { PageTree } from 'fumadocs-core/server';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

// Recursively filter the tree to only show pages for this language
// and transform URLs from /notes/{lang}/... to /{lang}/notes/...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterTreeByLang(node: any, lang: string): any {
  if (!node) return null;

  // Handle different node types
  const nodeUrl = node.url as string | undefined;
  const nodeType = node.type as string | undefined;
  
  // For folder nodes, check the index URL instead
  const indexUrl = node.index?.url as string | undefined;
  const effectiveUrl = nodeUrl || indexUrl;

  // Transform URL from /notes/{lang}/... to /{lang}/notes/...
  const transformUrl = (url: string | undefined): string | undefined => {
    if (!url) return url;
    const match = url.match(/^\/notes\/(en|zh)(\/.*)?$/);
    if (match) {
      const [, urlLang, rest] = match;
      return `/${urlLang}/notes${rest || ''}`;
    }
    return url;
  };

  // Root node special case: look for the language-specific children
  if (effectiveUrl === '/notes') {
    if (node.children && Array.isArray(node.children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const langChild = node.children.find((child: any) => {
        const childUrl = child.url || child.index?.url;
        return childUrl === `/notes/${lang}`;
      });
      return langChild ? langChild : null;
    }
    return null;
  }

  // Check if this node or its index matches the language
  const isLangMatch = effectiveUrl && (
    effectiveUrl.startsWith(`/notes/${lang}/`) ||
    effectiveUrl === `/notes/${lang}` ||
    effectiveUrl.startsWith(`/notes/handbook/`)
  );

  // Process children if present
  if (node.children && Array.isArray(node.children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredChildren: any[] = node.children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((child: any) => filterTreeByLang(child, lang))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((child: any): child is any => child !== null);

    // For folder nodes, keep them if they have matching children
    if (nodeType === 'folder' && filteredChildren.length > 0) {
      return {
        ...node,
        // Add $id for folder nodes if missing (use index $id or generate one)
        $id: node.$id || node.index?.$id || `folder-${effectiveUrl}`,
        // Transform index URL if present
        index: node.index ? {
          ...node.index,
          url: transformUrl(node.index.url),
        } : undefined,
        children: filteredChildren,
      };
    }

    // For other nodes with children, keep if URL matches or has children
    if (filteredChildren.length > 0 || isLangMatch) {
      return {
        ...node,
        url: transformUrl(nodeUrl),
        children: filteredChildren,
      };
    }

    return null;
  }

  // Leaf node: include if URL matches and transform URL
  return isLangMatch ? {
    ...node,
    url: transformUrl(nodeUrl),
  } : null;
}

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;

  // Filter the page tree to only show pages for this language
  const filteredNode = filterTreeByLang(source.pageTree, lang);

  // Extract children from the filtered node (skip the root wrapper)
  const tree: PageTree.Root = filteredNode && filteredNode.children
    ? { name: 'Notes', children: filteredNode.children } 
    : { name: 'Notes', children: [] };

  return (
    <DocsLayout tree={tree} {...baseOptions(lang)} i18n>
      {children}
    </DocsLayout>
  );
}
