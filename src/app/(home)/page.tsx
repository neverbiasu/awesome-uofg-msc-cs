import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">UofG MSc Computing Science</h1>
      <p className="text-fd-muted-foreground mb-4">
        Course materials and documentation system
      </p>
      <div className="flex flex-col gap-4 items-center">
        <Link
          href="/notes"
          className="text-fd-foreground font-semibold underline"
        >
          📝 Course Notes & Handbook
        </Link>
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          📚 Documentation
        </Link>
      </div>
    </main>
  );
}
