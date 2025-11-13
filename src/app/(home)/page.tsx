import Link from 'next/link';
import CircleShimmer from '@/components/CircleShimmer';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center">
      <Link href={'/docs'} className="text-2xl font-bold mb-4">
        <CircleShimmer />
      </Link>
    </main>
  );
}
