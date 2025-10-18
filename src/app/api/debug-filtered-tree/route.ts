import { NextResponse } from 'next/server';
import { source } from '@/lib/source';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterTreeByLang(node: any, lang: string): any {
  if (!node) return null;

  const nodeUrl = node.url as string | undefined;
  const nodeType = node.type as string | undefined;
  
  const indexUrl = node.index?.url as string | undefined;
  const effectiveUrl = nodeUrl || indexUrl;

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

  const isLangMatch = effectiveUrl && (
    effectiveUrl.startsWith(`/notes/${lang}/`) ||
    effectiveUrl === `/notes/${lang}` ||
    effectiveUrl.startsWith(`/notes/handbook/`)
  );

  if (node.children && Array.isArray(node.children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredChildren: any[] = node.children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((child: any) => filterTreeByLang(child, lang))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((child: any): child is any => child !== null);

    if (nodeType === 'folder' && filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      };
    }

    if (filteredChildren.length > 0 || isLangMatch) {
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  }

  return isLangMatch ? node : null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') || 'en';
  
  const filteredNode = filterTreeByLang(source.pageTree, lang);
  
  // Extract children from the filtered node (skip the root wrapper)
  const tree = filteredNode && filteredNode.children
    ? { name: 'Notes', children: filteredNode.children } 
    : { name: 'Notes', children: [] };

  return NextResponse.json({
    lang,
    filteredNode,
    tree,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
