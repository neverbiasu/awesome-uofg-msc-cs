import { docs as docsCollection, quizzes as quizzesCollection } from '@/.source';
import type { Graph } from '@/components/GraphView';

export function buildGraph(): Graph {
  const allDocsPages = docsCollection.docs ?? [];
  const allQuizzesPages = quizzesCollection.docs ?? [];
  const allPages = [...allDocsPages, ...allQuizzesPages];

  const nodes = allPages.map((page) => ({
    id: page._file.path,
    url: `/${page._file.path.replace(/\/index\.mdx$/, '').replace(/\.mdx$/, '')}`,
    text: page.title,
    description: page.description,
  }));

  const links: { source: string; target: string }[] = [];
  const nodeIds = new Set(nodes.map(n => n.id));

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
