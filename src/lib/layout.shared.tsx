import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(locale: string = 'en'): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {/* Use an external logo in /public so it's easy to replace */}
          <img src="/logo.svg" width={24} height={24} alt="UofG MSc CS logo" />
          UofG MSc CS
        </>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        text: 'Notes',
        url: `/${locale}/notes`,
        active: 'nested-url',
      },
      {
        text: 'Quizzes',
        url: `/${locale}/quizzes`,
        active: 'nested-url',
      },
    ],
  };
}
