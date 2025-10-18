import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n';

export default function RootPage() {
  // Redirect to default language
  redirect(`/${i18n.defaultLanguage}`);
}
