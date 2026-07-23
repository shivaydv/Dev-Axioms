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

  const isRootPage = slug.length <= 1;

  if (isRootPage) {
    return (
      <main className="w-full [grid-area:main] flex-1 flex flex-col py-6 px-6 max-w-[1200px] mx-auto min-h-screen">
        <div className="space-y-2 mb-6 px-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground/90">
            {page.data.title}
          </h1>
          {page.data.description && (
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              {page.data.description}
            </p>
          )}
        </div>
        <div className="w-full">
          <MDXContent
            components={getMDXComponents({
              a: createRelativeLink(source as any, page),
            })}
          />
        </div>
      </main>
    );
  }

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
      className="mx-auto"
    >
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground/90">
          {page.data.title}
        </h1>
        {page.data.description && (
          <p className="text-base text-muted-foreground leading-relaxed">
            {page.data.description}
          </p>
        )}
      </div>
      
      <div className="flex flex-row flex-wrap gap-3 items-center justify-between border-b border-border/40 pb-6 mb-8">
        <div className="flex items-center gap-2">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${githubContentConfig.owner}/${githubContentConfig.repo}/blob/main/content/web-dev/${page.path}`}
          />
        </div>
        {lastModified && (
          <div className="text-xs text-muted-foreground">
            <PageLastUpdate date={lastModified} />
          </div>
        )}
      </div>

      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source as any, page),
          })}
        />
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
