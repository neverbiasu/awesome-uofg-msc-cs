import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeMermaid from 'rehype-mermaid';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs

// Notes configuration
export const docs = defineDocs({
  dir: 'notes',
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

// Quizzes configuration
export const quizzes = defineDocs({
  dir: 'quizzes',
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    remarkPlugins: [remarkMath],
    // Place it at first, it should be executed before the syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, rehypeMermaid, ...v],
  },
});
