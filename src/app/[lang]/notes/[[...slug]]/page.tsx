import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';

type Params = {
  lang: string;
  slug?: string[];
};

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug = [], lang } = await params;
  
  // Prepend language to slug to match directory structure (e.g., ['en', 'handbook', 'index'])
  const langSlug = [lang, ...slug];
  const page = source.getPage(langSlug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug = [], lang } = await params;
  
  // Prepend language to slug to match directory structure
  const langSlug = [lang, ...slug];
  const page = source.getPage(langSlug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
