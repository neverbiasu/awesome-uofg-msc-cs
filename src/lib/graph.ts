import type { Graph } from '@/components/GraphView';

/** Minimal shape of a Fumadocs page needed to build the graph. */
export interface GraphPage {
  // NOTE: `_file.path` is an internal Fumadocs field and may change across
  // versions. The GraphPage type documents its required shape explicitly so
  // breakage surfaces as a type error at the `buildGraph` call site.
  _file: { path: string };
  title: string;
  description?: string;
}

/**
 * Pure derivation of graph nodes and parent/child links from a list of pages.
 * Kept free of the generated `@/.source` import so it can be unit-tested in
 * isolation.
 */
export function deriveGraph(pages: GraphPage[]): Graph {
  const nodes = pages.map((page) => ({
    id: page._file.path,
    url: `/${page._file.path.replace(/\/index\.mdx$/, '').replace(/\.mdx$/, '')}`,
    text: page.title,
    description: page.description,
  }));

  const links: { source: string; target: string }[] = [];
  const nodeIds = new Set(nodes.map((n) => n.id));

  for (const node of nodes) {
    const path = node.id;
    const pathParts = path.split('/');

    if (pathParts.length < 2) continue; // Cannot have a parent

    let parentId: string | undefined;

    if (path.endsWith('/index.mdx')) {
      // An index page's parent is the index page of the directory above it
      if (pathParts.length > 2) {
        parentId = pathParts.slice(0, -2).join('/') + '/index.mdx';
      }
    } else {
      // A regular page's parent is the index page of its own directory
      parentId = pathParts.slice(0, -1).join('/') + '/index.mdx';
    }

    if (parentId && parentId !== node.id && nodeIds.has(parentId)) {
      links.push({
        source: parentId,
        target: node.id,
      });
    }
  }

  return { nodes, links };
}
