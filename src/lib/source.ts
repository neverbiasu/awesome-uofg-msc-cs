import { docs, quizzes } from '@/.source';
import { loader } from 'fumadocs-core/source';
import type { InferPageType } from 'fumadocs-core/source';

// Notes source - single loader for all content
const docsLoader = loader({
  baseUrl: '/notes',
  source: docs.toFumadocsSource(),
});

export const source = docsLoader;
export type Page = InferPageType<typeof source>;

// Quizzes source (no i18n as quizzes are only in one language)
export const quizzesSource = loader({
  baseUrl: '/quizzes',
  source: quizzes.toFumadocsSource(),
});
