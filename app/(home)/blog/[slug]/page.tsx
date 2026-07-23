import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { blog } from '@/lib/source';
import { ShareButton } from '@/app/(home)/blog/[slug]/page.client';
import path from 'node:path';
import { createMetadata } from '@/utils/metadata';
import { getMDXComponents } from '@/mdx-components';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  const components = getMDXComponents();

  if (!page) notFound();
  const { body: Mdx, toc } = await page.data.load();

  const formattedDate = new Date(
    (page.data.date as string) ?? path.basename(page.path, path.extname(page.path))
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const authorName = typeof page.data.author === "string" ? page.data.author : null;

  return (
    <article className="flex flex-col mx-auto w-full max-w-4xl px-4 md:px-6 py-10">
      {/* Back Button & Share */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#FF5A26]" />
          <span>Back to Articles</span>
        </Link>
        <ShareButton url={page.url} />
      </div>

      {/* Article Header */}
      <header className="mb-10 pb-8 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
          {authorName && (
            <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{authorName}</span>
            </span>
          )}
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{formattedDate}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4">
          {page.data.title}
        </h1>

        {page.data.description && (
          <p className="text-base text-muted-foreground leading-relaxed">
            {page.data.description}
          </p>
        )}
      </header>

      {/* MDX Body Container */}
      <div className="prose dark:prose-invert max-w-none min-w-0 flex-1">
        <InlineTOC items={toc} />
        <Mdx components={components} />
      </div>
    </article>
  );
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return createMetadata({
    title: page.data.title,
    description: page.data.description ?? 'System Architecture & Engineering Article - Dev Axioms',
  });
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}