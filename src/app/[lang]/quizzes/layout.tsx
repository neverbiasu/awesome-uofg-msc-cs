import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { PropsWithChildren } from 'react';
import type { PageTree } from 'fumadocs-core/server';
import { baseOptions } from '@/lib/layout.shared';
import { redirect } from 'next/navigation';
import { quizzesSource } from '@/lib/source';
import { filterTreeByLang, transformTreeUrls } from '@/lib/tree-utils';

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  // Filter the quizzes page tree to only show pages for this language
  const filteredNode = filterTreeByLang(quizzesSource.pageTree, lang, {
    basePath: 'quizzes',
    ensureFolderId: true,
    unwrap: true,
  });

  // If there is no content for this language, redirect non-en users to /en/quizzes
  if (!filteredNode || !filteredNode.children) {
    if (lang !== 'en') {
      redirect('/en/quizzes');
    }
  }

  // Transform URLs from /quizzes/{lang}/... to /{lang}/quizzes/...
  const transformedNode = transformTreeUrls(filteredNode, 'quizzes');

  const tree: PageTree.Root = transformedNode && transformedNode.children
    ? { name: 'Quizzes', children: transformedNode.children }
    : { name: 'Quizzes', children: [] };

  return (
    <DocsLayout tree={tree} {...baseOptions(lang)} i18n>
      {children}
    </DocsLayout>
  );
}
