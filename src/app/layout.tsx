import '@/app/global.css';
import { AISearchTrigger } from '@/components/search';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Analytics } from "@vercel/analytics/next"
import 'katex/dist/katex.css';

type LayoutProps = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ['latin'],
});

// Next.js App Router metadata to set site icons (favicon)
export const metadata = {
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        {children}
        <AISearchTrigger />
        <Analytics />
      </body>
    </html>
  );
}
