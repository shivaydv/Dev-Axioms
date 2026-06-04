import { webdev as source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
} from "fumadocs-ui/page";
import {
  MarkdownCopyButton,
  ViewOptionsPopover,
  PageLastUpdate
} from 'fumadocs-ui/layouts/docs/page';
import { notFound, redirect } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import {githubContentConfig} from "@/utils/metadata"; 

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  const slug = params.slug || [];

  if (slug.length === 0) return redirect("/");
  if (!page) notFound();

  const { body: MDXContent, toc,lastModified } = await page.data.load();
  const markdownUrl = `/llms.mdx/docs/web-dev/${slug.join('/')}`;

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
      className="mx-auto"
    >
      <h1 className="text-[1.75em] font-semibold">{page.data.title}</h1>
      <p className="text-lg text-fd-muted-foreground mb-2">{page.data.description}</p>
      <div className="flex flex-row flex-wrap gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${githubContentConfig.owner}/${githubContentConfig.repo}/blob/main/content/web-dev/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source as any, page),
          })}
        />
           {lastModified && <PageLastUpdate date={lastModified} />}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams().filter((params) => params.slug && params.slug.length > 0);
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) return {};

  const slug = params.slug || [];
  const image = ["/og/web-dev", ...slug, "image.png"].join("/");

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [image],
    },
  };
}
