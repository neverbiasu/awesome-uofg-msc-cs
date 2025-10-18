import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { PropsWithChildren } from 'react';
import { baseOptions } from '@/lib/layout.shared';

interface LayoutProps extends PropsWithChildren {
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;
  return <HomeLayout {...baseOptions(lang)} i18n>{children}</HomeLayout>;
}
