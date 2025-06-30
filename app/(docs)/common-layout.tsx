import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";

import { LogoIcon } from "@/components/Logo";
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
      searchToggle={{enabled:true}}
      githubUrl="https://github.com/shivaydv/Dev-Axioms"
    links={[{
        type:"icon",
        text:"Dev Axioms",
        icon:<FaXTwitter />,
        url:"https://devaxioms.com",
    }]}
      {...options}
    >
      {children}
    </DocsLayout>
  );
}
