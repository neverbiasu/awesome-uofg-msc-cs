import type { PageTree } from 'fumadocs-core/server';

/** Rewrite `/{basePath}/{lang}/...` to `/{lang}/{basePath}/...`. */
export function rewriteTreeUrl(
  url: string | undefined,
  basePath: string,
): string | undefined {
  if (!url) return url;
  const match = url.match(new RegExp(`^/${basePath}/(en|zh)(/.*)?$`));
  if (!match) return url;
  const [, lang, rest] = match;
  return `/${lang}/${basePath}${rest ?? ''}`;
}

/**
 * Recursively rewrite every URL in a page tree (item url, folder index url)
 * from `/{basePath}/{lang}/...` to `/{lang}/{basePath}/...`.
 */
export function transformTreeUrls(
  root: PageTree.Root | null | undefined,
  basePath: string,
): PageTree.Root {
  if (!root) return { name: '', children: [] };
  return {
    ...root,
    children: root.children.map((child) => transformNode(child, basePath)),
  };
}

function transformNode(node: PageTree.Node, basePath: string): PageTree.Node {
  if (node.type === 'folder') {
    return {
      ...node,
      index: node.index
        ? { ...node.index, url: rewriteTreeUrl(node.index.url, basePath) ?? node.index.url }
        : undefined,
      children: node.children.map((c) => transformNode(c, basePath)),
    };
  }
  if (node.type === 'page') {
    return { ...node, url: rewriteTreeUrl(node.url, basePath) ?? node.url };
  }
  return node; // separator
}

function findLangChild(
  folder: PageTree.Folder,
  lang: string,
  basePath: string,
): PageTree.Node | undefined {
  return folder.children?.find((child) => {
    const childUrl =
      child.type === 'page'
        ? child.url
        : child.type === 'folder'
          ? child.index?.url
          : undefined;
    return childUrl === `/${basePath}/${lang}`;
  });
}

export interface FilterOptions {
  basePath: 'notes' | 'quizzes';
  /** Notes tree also exposes a language-neutral `handbook` section. */
  includeHandbook?: boolean;
  /** Quizzes tree needs a stable `$id` on folders. */
  ensureFolderId?: boolean;
  /**
   * Return the language folder's own children as the tree (quizzes/debug
   * behaviour) instead of wrapping them under a single root folder.
   */
  unwrap?: boolean;
}

function filterNode(
  node: PageTree.Node,
  lang: string,
  options: FilterOptions,
): PageTree.Node | null {
  const { basePath, includeHandbook = false, ensureFolderId = false } = options;
  const nodeUrl = node.type === 'page' ? node.url : undefined;
  const indexUrl = node.type === 'folder' ? node.index?.url : undefined;
  const effectiveUrl = nodeUrl || indexUrl;

  // Language container: descend into the matching `/{basePath}/{lang}` child.
  if (effectiveUrl === `/${basePath}`) {
    if (node.type === 'folder') {
      const langChild = findLangChild(node, lang, basePath);
      return langChild ? filterNode(langChild, lang, options) : null;
    }
    return null;
  }

  const isLangMatch =
    !!effectiveUrl &&
    (effectiveUrl.startsWith(`/${basePath}/${lang}/`) ||
      effectiveUrl === `/${basePath}/${lang}` ||
      (includeHandbook && effectiveUrl.startsWith(`/${basePath}/handbook/`)));

  if (node.type === 'folder') {
    const filtered = node.children
      .map((child) => filterNode(child, lang, options))
      .filter((child): child is PageTree.Node => child !== null);

    if (filtered.length > 0) {
      return {
        ...node,
        $id: ensureFolderId
          ? node.$id ?? node.index?.$id ?? `folder-${effectiveUrl}`
          : node.$id,
        index: node.index
          ? { ...node.index, url: rewriteTreeUrl(node.index.url, basePath) ?? node.index.url }
          : undefined,
        children: filtered,
      } satisfies PageTree.Folder;
    }

    if (isLangMatch) {
      return { ...node, children: [] } satisfies PageTree.Folder;
    }

    return null;
  }

  return isLangMatch ? node : null;
}

/**
 * Keep only the nodes belonging to `lang`. The root is expected to contain one
 * child folder per language (`/{basePath}/{lang}`); that language subtree is
 * descended into and returned.
 */
export function filterTreeByLang(
  root: PageTree.Root | null | undefined,
  lang: string,
  options: FilterOptions,
): PageTree.Root | null {
  if (!root) return null;

  const children = root.children
    .map((child) => filterNode(child, lang, options))
    .filter((child): child is PageTree.Node => child !== null);

  if (children.length === 0) return null;

  if (options.unwrap && children.length === 1 && children[0].type === 'folder') {
    const folder = children[0];
    return { ...root, name: folder.name, children: folder.children };
  }

  return { ...root, children };
}
