import 'fumadocs-ui/style.css';
import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import type { ReactNode } from 'react';

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    zh: {
      displayName: '简体中文',
      toc: '目录',
      search: '搜索文档',
      lastUpdate: '最后更新于',
      searchNoResult: '没有结果',
      previousPage: '上一页',
      nextPage: '下一页',
      chooseLanguage: '选择语言',
    },
  },
});

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
};

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = (await params) as { lang: string };

  return (
    <RootProvider i18n={provider(lang)}>
      {children}
    </RootProvider>
  );
}
