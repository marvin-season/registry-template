import Link from "next/link";
import { cn } from "@/lib/utils";

const linearGradient = "bg-gradient-to-r text-transparent bg-clip-text";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <Link href={"/docs"} className="text-2xl font-bold mb-4">
        Start
      </Link>
      <h1 className="mb-4 text-4xl font-bold">
        <Link
          target="_blank"
          href="https://fumadocs.dev"
          className={cn(
            linearGradient,
            "from-[#6366f1] via-[#a855f7] to-[#06b6d4]",
          )}
        >
          Fumadocs
        </Link>{" "}
        <span className="text-gray-500"> & </span>
        <Link
          target="_blank"
          href="https://ui.shadcn.com"
          className={cn(
            linearGradient,
            "from-[#c3540a] via-[#b1f741] to-[#06b6d4]",
          )}
        >
          Shadcn
        </Link>
      </h1>
    </main>
  );
}
