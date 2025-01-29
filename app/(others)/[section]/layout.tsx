import { Leftbar } from "@/components/docs/leftbar";
import { DOCS_SECTIONS } from "@/lib/docs-config";
import { notFound } from "next/navigation";

export default async function DocsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { section: string };
}>) {
  const parameters = await params;
  const section = parameters.section;

  if (!DOCS_SECTIONS.find((s) => s.id === section)) {
    notFound();
  }

  return (
    <div className="flex items-start gap-8">
      <Leftbar />
      <div className="flex-[5.25] ">{children}</div>
    </div>
  );
}
