
import { webdev } from "@/lib/source";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import CommonLayout from "@/app/(docs)/common-layout";
import { FaReact } from "react-icons/fa6";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <CommonLayout
      pageTree={webdev.pageTree}
      options={{
        sidebar: {
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
