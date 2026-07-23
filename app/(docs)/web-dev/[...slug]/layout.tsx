
import { webdev } from "@/lib/source";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import CommonLayout from "@/app/(docs)/common-layout";
import { FaReact } from "react-icons/fa6";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const isRootPage = slug.length <= 1;

  return (
    <CommonLayout
      pageTree={webdev.pageTree}
      options={{
        containerProps: {
          style: isRootPage ? { '--fd-sidebar-width': '0px' } as React.CSSProperties : undefined,
        },
        sidebar: {
          style: isRootPage ? { display: 'none' } : undefined,
          tabs: [
            {
              title: "HTML & CSS",
              url: "/web-dev/html-css",
              icon: <FaHtml5 className="w-full h-full p-1" />,
            },
            {
              title: "JavaScript",
              url: "/web-dev/javascript",
              icon: <FaCss3 className="w-full h-full p-1" />,
            },
            {
              title: "React",
              url: "/web-dev/react",
              icon: <FaReact className="w-full h-full p-1" />,
            },
            {
              title: "Next.js",
              url: "/web-dev/nextjs",
              icon: <FaReact className="w-full h-full p-1" />,
            },
          ],
        },
      }}
    >
      {children}
    </CommonLayout>
  );
}
