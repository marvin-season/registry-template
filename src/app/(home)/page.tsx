import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
        Component Registry
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-3">
        Docs that feel like paper
      </h1>
      <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed text-[0.9375rem]">
        Browse components, hooks, and utilities. Light layout, warm tones, easy to read.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/docs"
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Docs
        </Link>
        <Link
          href="/blog"
          className="inline-flex h-9 items-center rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Blog
        </Link>
      </div>
    </main>
  );
}
