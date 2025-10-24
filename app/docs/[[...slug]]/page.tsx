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

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;

  const lastModified = page.data.lastModified
    ? new Date(page.data.lastModified).toLocaleDateString()
    : "";
  console.log("lastModified", page);
  const author = page.data.author;

  const githubUrl = `https://github.com/marvin-season/registry-template/blob/main/${page.absolutePath}`;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <Link
        href={githubUrl}
        target="_blank"
        className=" hover:translate-y-[-1px] transition-all duration-300"
        title="View on GitHub"
      >
        <DocsTitle>{page.data.title}</DocsTitle>
      </Link>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div
        className={`text-sm text-gray-500 ${
          lastModified && author ? "block" : "hidden"
        }`}
      >
        Last modified: {lastModified} by {author}
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
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
