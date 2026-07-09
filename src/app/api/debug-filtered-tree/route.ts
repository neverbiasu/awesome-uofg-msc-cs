import { NextResponse } from 'next/server';
import { source } from '@/lib/source';
import { filterTreeByLang } from '@/lib/tree-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'en';

  const filteredNode = filterTreeByLang(source.pageTree, lang, {
    basePath: 'notes',
    includeHandbook: true,
    unwrap: true,
  });

  // Extract children from the filtered node (skip the root wrapper)
  const tree = filteredNode && filteredNode.children
    ? { name: 'Notes', children: filteredNode.children }
    : { name: 'Notes', children: [] };

  return NextResponse.json(
    { lang, filteredNode, tree },
    { headers: { 'Content-Type': 'application/json' } },
  );
}
