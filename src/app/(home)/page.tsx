import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
      <p className="animate-fade-up text-xs tracking-widest uppercase text-muted-foreground mb-3">
        Component Registry
      </p>
      <h1 className="animate-fade-up motion-delay-75 text-3xl font-semibold tracking-tight text-foreground mb-3">
        Docs that feel like paper
      </h1>
      <p className="animate-fade-up motion-delay-150 text-muted-foreground max-w-sm mb-8 leading-relaxed text-[0.9375rem]">
        Browse components, hooks, and utilities. Light layout, warm tones, easy to read.
      </p>
      <div className="animate-fade-up motion-delay-225 flex items-center gap-3">
        <Link
          href="/docs"
          className="transition-paper inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
        >
          Docs
        </Link>
        <Link
          href="/blog"
          className="transition-paper inline-flex h-9 items-center rounded-md border border-border px-4 text-sm font-medium text-foreground hover:bg-accent active:scale-[0.98]"
        >
          Blog
        </Link>
      </div>
    </main>
  );
}
