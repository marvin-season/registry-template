import Link from "next/link";
import { cn } from "@/lib/utils";

const linearGradient =
  "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#06b6d4] text-transparent bg-clip-text";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">
        <Link
          target="_blank"
          href="https://fumadocs.dev"
          className={cn(linearGradient)}
        >
          Fumadocs
        </Link>{" "}
        <span className="text-gray-500"> & </span>
        <Link
          target="_blank"
          href="https://ui.shadcn.com"
          className={cn(linearGradient)}
        >
          Shadcn
        </Link>
      </h1>
    </main>
  );
}
