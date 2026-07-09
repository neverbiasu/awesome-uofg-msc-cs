import '@/app/global.css';
import 'katex/dist/katex.css';

export const metadata = {
  icons: {
    icon: '/favicon.svg',
  },
};

// Root layout is a pass-through: the `<html>`/`<body>` tags live in
// `app/[lang]/layout.tsx` so the `lang` attribute can match the route.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
