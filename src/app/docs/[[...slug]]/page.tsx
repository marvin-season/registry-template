import { getPageImage, source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/app/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import Link from "next/link";
import { GitTimeline } from "@/components/GitTimeline";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;

  const lastModified = page.data.lastModified
    ? new Date(page.data.lastModified).toLocaleString()
    : undefined;
  const author = page.data.author;

  const githubUrl = `https://github.com/marvin-season/registry-template/blob/main/${page.absolutePath}`;
  const gitCommitLogs = page.data.gitCommitLogs;
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div className="flex flex-col lg:flex-row justify-between items-center sticky top-0 z-10 backdrop-blur-xs">
        <Link
          href={githubUrl}
          target="_blank"
          className=" hover:-translate-y-px transition-all duration-300"
          title="View on GitHub"
        >
          <DocsTitle>{page.data.title}</DocsTitle>
        </Link>
        <span
          className={`text-xs text-gray-500 ${
            lastModified && author ? "block" : "hidden"
          }`}
        >
          {lastModified} modified by {author}
        </span>
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <GitTimeline gitCommitLog={gitCommitLogs} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
