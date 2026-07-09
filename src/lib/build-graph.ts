import { docs as docsCollection, quizzes as quizzesCollection } from '@/.source';
import { deriveGraph, type GraphPage } from './graph';

export function buildGraph() {
  const allDocsPages = docsCollection.docs ?? [];
  const allQuizzesPages = quizzesCollection.docs ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allPages = [...allDocsPages, ...allQuizzesPages] as any as GraphPage[];

  return deriveGraph(allPages);
}
