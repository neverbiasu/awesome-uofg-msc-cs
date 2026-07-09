import { describe, expect, it } from 'vitest';
import { deriveGraph, type GraphPage } from './graph';

function page(path: string, title = path): GraphPage {
  return { _file: { path }, title };
}

describe('deriveGraph', () => {
  it('builds a node per page with a cleaned url', () => {
    const { nodes } = deriveGraph([
      page('en/notes/index.mdx', 'Home'),
      page('en/notes/week1/topic.mdx', 'Topic'),
    ]);
    expect(nodes).toHaveLength(2);
    expect(nodes[0].url).toBe('/en/notes');
    expect(nodes[1].url).toBe('/en/notes/week1/topic');
  });

  it('links a regular page to its directory index', () => {
    const { links } = deriveGraph([
      page('en/notes/week1/index.mdx', 'Week 1'),
      page('en/notes/week1/topic.mdx', 'Topic'),
    ]);
    expect(links).toEqual([{ source: 'en/notes/week1/index.mdx', target: 'en/notes/week1/topic.mdx' }]);
  });

  it('links a nested index to its parent index', () => {
    const { links } = deriveGraph([
      page('en/notes/index.mdx', 'Home'),
      page('en/notes/week1/index.mdx', 'Week 1'),
    ]);
    expect(links).toEqual([{ source: 'en/notes/index.mdx', target: 'en/notes/week1/index.mdx' }]);
  });

  it('does not link when the parent index is missing', () => {
    const { links } = deriveGraph([page('en/notes/week1/topic.mdx', 'Topic')]);
    expect(links).toHaveLength(0);
  });

  it('does not self-link an index to itself', () => {
    const { links } = deriveGraph([page('en/notes/index.mdx', 'Home')]);
    expect(links).toHaveLength(0);
  });
});
