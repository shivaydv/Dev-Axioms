import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { MenuLinks } from "@/components/docs/MobileNavigation";
import Navbar from "@/components/docs/Navbar";
import { BaseOptions, SidebarTree } from "@/lib/source";
import { RootToggle } from "fumadocs-ui/layouts/docs.client";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      disableThemeSwitch
      {...BaseOptions}
      sidebar={{
        banner: (
          <>
            <RootToggle
              className="w-full flex justify-end mt-4 p-2"
              options={[
                {
                  title: "HTML",
                  icon: <FaHtml5 className="text-[#E44D26]" size={30} />,
                  description: "Foundation of websites",
                  url: "/docs/html",
                },
                {
                  title: "CSS",
                  icon: <FaCss3Alt className="text-[#3950ad]" size={30} />,
                  description: "Create beautiful UI",
                  url: "/docs/css",
                },
                {
                  title: "JavaScript",
                  icon: <SiJavascript className="text-[#F7DF1E]" size={30} />,
                  description: "Add interactivity and logic",
                  url: "/docs/javascript",
                },
                {
                  title: "React",
                  icon: <FaReact className="text-[#61DAFB]" size={30} />,
                  description: "Modern web applications",
                  url: "/docs/react",
                },
              ]}
            />
            <div className="w-full border-b md:hidden mb-2">
              <MenuLinks
                className="py-4 flex-col gap-2"
                socialLinks={false}
                itemClassName="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md"
              />
            </div>
          </>
        ),
        hideSearch: true,
        footer: false,
        collapsible: true,
      }}
      tree={SidebarTree}
    >
      {children}
    </DocsLayout>
  );
}
