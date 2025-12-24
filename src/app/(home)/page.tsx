import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center">
      <Link href={'/docs'} className="text-2xl font-bold mb-4">
        Docs
      </Link>
    </main>
  );
}
