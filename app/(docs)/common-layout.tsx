import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";

import { LogoIcon } from "@/components/global/Logo";
import type { PageTree } from "fumadocs-core/server";
import { FaXTwitter } from "react-icons/fa6";

export default function CommonLayout({
  children,
  pageTree,
  options,
}: {
  children: ReactNode;
  pageTree: PageTree.Root;
  options?: Partial<DocsLayoutProps>;
}) {
  return (
    <DocsLayout
      tree={pageTree}
      tabMode="navbar"
      themeSwitch={{ mode: "light-dark" }}
      nav={{
        title: (
          <>
            <LogoIcon />
            <span className="inline">Dev Axioms</span>
          </>
        ),
        mode: "top",
      }}
      searchToggle={{ enabled: true }}
      githubUrl="https://github.com/shivaydv/Dev-Axioms"
      links={[
        {
          text: "Home",
          url: "/",
        },
        {
          text: "Practice",
          url: "#",
        },
        {
          text: "Blogs",
          url: "/blog",
        },
        {
          type: "icon",
          text: "Dev Axioms",
          icon: <FaXTwitter />,
          url: "https://x.com/shivay1256",
        },
      ]}
      {...options}
    >
      {children}
    </DocsLayout>
  );
}
