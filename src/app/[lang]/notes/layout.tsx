import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { PropsWithChildren } from 'react';
import type { PageTree } from 'fumadocs-core/server';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { filterTreeByLang, transformTreeUrls } from '@/lib/tree-utils';

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;

  // Filter the page tree to only show pages for this language
  const filteredNode = filterTreeByLang(source.pageTree, lang, {
    basePath: 'notes',
    includeHandbook: true,
  });

  // Transform all URLs from /notes/{lang}/... to /{lang}/notes/...
  const transformedNode = transformTreeUrls(filteredNode, 'notes');

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
