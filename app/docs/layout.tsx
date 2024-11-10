import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { MenuLinks } from "@/components/docs/MobileNavigation";
import Navbar from "@/components/docs/Navbar";
import { SidebarTree, source } from "@/lib/source";
import { RootToggle } from "fumadocs-ui/layouts/docs.client";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      disableThemeSwitch
      nav={{
        component: <Navbar menu="Sidebar" />,
      }}
      sidebar={{
        banner: (
          <>
            <RootToggle
              className="w-full border rounded-md mt-4 p-2"
              options={[
                {
                  title: "Html",
                  url: "/docs/html",
                },
                {
                  title: "Css",
                  url: "/docs/css",
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
