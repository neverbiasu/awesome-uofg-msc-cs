import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { PropsWithChildren } from 'react';
import type { PageTree } from 'fumadocs-core/server';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

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

// Recursively transform all URLs in a node and its children
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformTreeUrls(node: any): any {
  if (!node) return null;

  const nodeType = node.type as string | undefined;

  // Handle different node types
  if (nodeType === 'folder') {
    return {
      $id: node.$id,
      $ref: node.$ref,
      type: 'folder',
      name: node.name,
      description: node.description,
      root: node.root,
      defaultOpen: node.defaultOpen,
      icon: node.icon,
      index: node.index ? {
        $id: node.index.$id,
        $ref: node.index.$ref,
        type: 'page',
        name: node.index.name,
        url: transformUrl(node.index.url),
        external: node.index.external,
        description: node.index.description,
        icon: node.index.icon,
      } : undefined,
      children: node.children?.map(transformTreeUrls).filter(Boolean) || [],
    };
  } else if (nodeType === 'page') {
    return {
      $id: node.$id,
      $ref: node.$ref,
      type: 'page',
      name: node.name,
      url: transformUrl(node.url),
      external: node.external,
      description: node.description,
      icon: node.icon,
    };
  } else if (nodeType === 'separator') {
    return node;
  }

  // Root or unknown type - process children
  return {
    ...node,
    children: node.children?.map(transformTreeUrls).filter(Boolean) || [],
  };
}

// Filter tree to only show pages for the specified language
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterTreeByLang(node: any, lang: string): any {
  if (!node) return null;

  const nodeUrl = node.url as string | undefined;
  const nodeType = node.type as string | undefined;
  const indexUrl = node.index?.url as string | undefined;
  const effectiveUrl = nodeUrl || indexUrl;

  // Root node special case: look for the language-specific children
  if (effectiveUrl === '/notes') {
    if (node.children && Array.isArray(node.children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const langChild = node.children.find((child: any) => {
        const childUrl = child.url || child.index?.url;
        return childUrl === `/notes/${lang}`;
      });
      return langChild ? filterTreeByLang(langChild, lang) : null;
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

    if (nodeType === 'folder' && filteredChildren.length > 0) {
      return { ...node, children: filteredChildren };
    }

    if (filteredChildren.length > 0 || isLangMatch) {
      return { ...node, children: filteredChildren };
    }

    return null;
  }

  // Leaf node: include if URL matches
  return isLangMatch ? node : null;
}

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;

  // Filter the page tree to only show pages for this language
  const filteredNode = filterTreeByLang(source.pageTree, lang);

  // Transform all URLs in the filtered tree
  const transformedNode = transformTreeUrls(filteredNode);

  // Extract children from the transformed node (skip the root wrapper)
  const tree: PageTree.Root = transformedNode && transformedNode.children
    ? { name: 'Notes', children: transformedNode.children }
    : { name: 'Notes', children: [] };

  return (
    <DocsLayout tree={tree} {...baseOptions(lang)} i18n>
      {children}
    </DocsLayout>
  );
}
