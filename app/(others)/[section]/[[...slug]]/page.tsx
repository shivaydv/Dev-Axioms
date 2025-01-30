import DocsBreadcrumb from "@/components/docs/docs-breadcrumb";
import Pagination from "@/components/docs/pagination";
import Toc from "@/components/docs/toc";
import { DOCS_SECTIONS } from "@/lib/docs-config";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/docs/typography";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type PageProps = {
  params: {
    section: string;
    slug?: string[];
  };
};

export default async function DocsPage({ params }: { params: Promise<PageProps['params']> }) {
  const { section, slug = [] } = await params; // ✅ Awaiting params

  if (!DOCS_SECTIONS.find((s) => s.id === section)) {
    notFound();
  }

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName, section);

  if (!res) notFound();

  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <DocsBreadcrumb paths={slug} section={section} />
        <Typography>
          <h1 className="text-3xl !-mt-0.5">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px]">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          <Pagination pathname={pathName} section={section} />
        </Typography>
      </div>
      <Toc path={pathName} section={section} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<PageProps['params']> }): Promise<Metadata> {
  const { section } = await params; // ✅ Awaiting params
  const sectionCapitalized = section.charAt(0).toUpperCase() + section.slice(1);

  return {
    title: `Dev Axioms - ${sectionCapitalized}`,
  };
}
