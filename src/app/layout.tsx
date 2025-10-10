import '@/app/global.css';
import { AISearchTrigger } from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>
          {children}
          <AISearchTrigger />
        </RootProvider>
      </body>
    </html>
  );
}
