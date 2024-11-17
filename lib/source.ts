import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { PageTree } from "fumadocs-core/server";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
});

function getPagesFromRoot(rootName: string) {
  const pageTree = source.pageTree;

  const rootNode = pageTree.children.find(
    (node): node is PageTree.Folder =>
      node.type === "folder" && node.name === rootName
  );
  if (!rootNode) {
    console.error(`Root node with name "${rootName}" not found.`);
    return [];
  }

  return rootNode.children || [];
}

//Source.pagetree

export const SidebarTree: PageTree.Root = {
  name: "Dev Axioms",
  children: [
    {
      type: "folder",
      name: "HTML",
      root: true,
      children: [
        {
          type: "page",
          name: "Introduction",
          url: "/docs/html",
        },
        ...getPagesFromRoot("HTML"),
      ],
    },
    {
      type: "folder",
      name: "CSS",
      root: true,
      children: [
        {
          type: "page",
          name: "Introduction",
          url: "/docs/css",
        },
        ...getPagesFromRoot("CSS"),
      ],
    },
    {
      type: "folder",
      name: "JavaScript",
      root: true,
      children: [
        {
          type: "page",
          name: "Introduction",
          url: "/docs/javascript",
        },
        ...getPagesFromRoot("JavaScript"),
      ],
    },
    {
      type: "folder",
      name: "React",
      root: true,
      children: [
        {
          type: "page",
          name: "Introduction",
          url: "/docs/react",
        },
        ...getPagesFromRoot("React"),
      ],
    },
  ],
};
