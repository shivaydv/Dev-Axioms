
import { webdev } from "@/lib/source";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import CommonLayout from "@/app/(docs)/common-layout";

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
              title: "HTML",
              url: "/web-dev/html",
              icon: <FaHtml5 className="w-full h-full p-1" />,
            },
            {
              title: "CSS",
              url: "/web-dev/css",
              icon: <FaCss3 className="w-full h-full p-1" />,
            },
          ],
        },
      }}
    >
      {children}
    </CommonLayout>
  );
}
