import { getLLMText } from '@/lib/get-llm-text';
import { web3,webdev,blog } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  const { slug } = await params;
  if (!slug || slug.length === 0) notFound();

  const [prefix, ...rest] = slug;
  let page;

  if (prefix === 'web-dev') {
    page = webdev.getPage(rest);
  } else if (prefix === 'web3') {
    page = web3.getPage(rest);
  } else if (prefix === 'blog') {
    page = blog.getPage(rest);
  }
  
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  const webdevParams = webdev.getPages().map((p) => ({
    slug: ['web-dev', ...p.slugs],
  }));

  const web3Params = web3.getPages().map((p) => ({
    slug: ['web3', ...p.slugs],
  }));

  const blogParams = blog.getPages().map((p) => ({
    slug: ['blog', ...p.slugs],
  }));

  return [...webdevParams, ...web3Params, ...blogParams];
}