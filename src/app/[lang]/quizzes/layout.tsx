import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { PropsWithChildren } from 'react';
import type { PageTree } from 'fumadocs-core/server';
import { baseOptions } from '@/lib/layout.shared';
import { redirect } from 'next/navigation';
import { quizzesSource } from '@/lib/source';

// Recursively filter the quizzes tree to only show pages for this language
// and transform URLs from /quizzes/{lang}/... to /{lang}/quizzes/...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterQuizzesByLang(node: any, lang: string): any {
  if (!node) return null;

  const nodeUrl = node.url as string | undefined;
  const nodeType = node.type as string | undefined;

  // For folder nodes, check the index URL instead
  const indexUrl = node.index?.url as string | undefined;
  const effectiveUrl = nodeUrl || indexUrl;

  // Transform URL from /quizzes/{lang}/... to /{lang}/quizzes/...
  const transformUrl = (url: string | undefined): string | undefined => {
    if (!url) return url;
    const match = url.match(/^\/quizzes\/(en|zh)(\/.*)?$/);
    if (match) {
      const [, urlLang, rest] = match;
      return `/${urlLang}/quizzes${rest || ''}`;
    }
    return url;
  };

  // Root node special case: look for the language-specific children
  if (effectiveUrl === '/quizzes') {
    if (node.children && Array.isArray(node.children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const langChild = node.children.find((child: any) => {
        const childUrl = child.url || child.index?.url;
        return childUrl === `/quizzes/${lang}`;
      });
      return langChild ? langChild : null;
    }
    return null;
  }

  // Check if this node or its index matches the language
  const isLangMatch = effectiveUrl && (
    effectiveUrl.startsWith(`/quizzes/${lang}/`) ||
    effectiveUrl === `/quizzes/${lang}`
  );

  // Process children if present
  if (node.children && Array.isArray(node.children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredChildren: any[] = node.children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((child: any) => filterQuizzesByLang(child, lang))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((child: any): child is any => child !== null);

    // For folder nodes, keep them if they have matching children
    if (nodeType === 'folder' && filteredChildren.length > 0) {
      return {
        ...node,
        $id: node.$id || node.index?.$id || `folder-${effectiveUrl}`,
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
  // Filter the quizzes page tree to only show pages for this language
  const filteredNode = filterQuizzesByLang(quizzesSource.pageTree, lang);

  // If there is no content for this language, redirect non-en users to /en/quizzes
  if (!filteredNode || !filteredNode.children) {
    if (lang !== 'en') {
      redirect('/en/quizzes');
    }
  }

  const tree: PageTree.Root = filteredNode && filteredNode.children
    ? { name: 'Quizzes', children: filteredNode.children }
    : { name: 'Quizzes', children: [] };

  return (
    <DocsLayout tree={tree} {...baseOptions(lang)} i18n>
      {children}
    </DocsLayout>
  );
}
