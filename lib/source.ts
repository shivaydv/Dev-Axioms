import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { PageTree } from "fumadocs-core/server";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
});

//Source.pagetree


export const SidebarTree: PageTree.Root = {
  name: "Sidebar",
  children: [
      {
        type: "folder",
        name: "Html",
        root: true,
        children: [
          {
            type: "page",
            name: "index",
            url: "/docs/html",
          },
          {
            type: "page",
            name: "page2",
            url: "/docs/html/html2",
          },
        ],
      },
      {
        type: "folder",
        name: "Css",
        root: true,
        children: [
          {
            type: "page",
            name: "css",
            url: "/docs/css",
          },
          {
            type: "page",
            name: "test",
            url: "/docs/css/test",
          },
        ],
      },
    ],
  }



// export const SidebarTree: PageTree.Root = {
//   name: "Sidebar",
//   children: [
//       {
//         type: "separator",
//         name: "Html",
//       },
//       {
//         type: "page",
//         name: "index",
//         url: "/docs/html",
//       },
//       {
//         type: "folder",
//         name: "Samples",
//         children: [
//           {
//             type: "page",
//             name: "Button",
//             url: "/docs/html/html2",
//           },
//         ],
//       },
//       {
//         type: "separator",
//         name: "Css",
//       },
//       {
//         type: "page",
//         name: "index",
//         url: "/docs/css",
//       },
//     ],
//   }
