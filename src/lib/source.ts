import { docs, quizzes } from '@/.source';
import { loader } from 'fumadocs-core/source';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info

// Notes source
export const source = loader({
  baseUrl: '/notes',
  source: docs.toFumadocsSource(),
});

// Quizzes source
export const quizzesSource = loader({
  baseUrl: '/quizzes',
  source: quizzes.toFumadocsSource(),
});
