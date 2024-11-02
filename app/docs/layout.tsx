import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import Navbar from "@/components/Navbar";
import { PageTree } from "fumadocs-core/server";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      disableThemeSwitch
      nav={{
        component: <Navbar />,
      }}
      sidebar={{
        hideSearch: true,
        footer: false,
        collapsible: true,
      }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}


const tree: PageTree.Root = {
  name: "main",
  children: [
    {
      type: "page",
      name: "Home", 
      url: "/",
    },
    {
      type: "separator",
      name: "Components",
    },
    {
      type: "folder",
      name: "Button",
      children: [
        {
          type: "page",
          name: "Button",
          url: "/test",
        },
        {
          type: "page",
          name: "IconButton",
          url: "/test2",
        },
      ],
    },
  ],
};
