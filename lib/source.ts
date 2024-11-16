import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { PageTree } from "fumadocs-core/server";
import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import LogoComponent from "@/components/docs/LogoComponent";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
});

//Source.pagetree

export const BaseOptions: BaseLayoutProps = {
  nav: {
    title: (
      typeof LogoComponent
    ),
  },
  githubUrl: "https://github.com/shivaydv/dev-axioms",
};

export const SidebarTree: PageTree.Root = {
  name: "Sidebar",
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
        {
          type: "page",
          name: "Elements & Tags",
          url: "/docs/html/elements",
        },
        {
          type: "page",
          name: "Forms & Input",
          url: "/docs/html/forms",
        },
        {
          type: "page",
          name: "Semantic HTML",
          url: "/docs/html/semantic",
        },
        {
          type: "page",
          name: "HTML5 Features",
          url: "/docs/html/html5",
        },
        {
          type: "page",
          name: "Meta Tags & SEO",
          url: "/docs/html/meta-seo",
        }
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
        {
          type: "page",
          name: "Selectors & Specificity",
          url: "/docs/css/selectors",
        },
        {
          type: "page",
          name: "Box Model",
          url: "/docs/css/box-model",
        },
        {
          type: "page",
          name: "Flexbox",
          url: "/docs/css/flexbox",
        },
        {
          type: "page",
          name: "Grid Layout",
          url: "/docs/css/grid",
        },
        {
          type: "page",
          name: "Positioning",
          url: "/docs/css/positioning",
        },
        {
          type: "page",
          name: "Responsive Design",
          url: "/docs/css/responsive",
        },
        {
          type: "page",
          name: "Animations",
          url: "/docs/css/animations",
        }
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
        {
          type: "page",
          name: "Data Types & Variables",
          url: "/docs/javascript/data-types",
        },
        {
          type: "page",
          name: "Functions & Scope",
          url: "/docs/javascript/functions",
        },
        {
          type: "page",
          name: "Arrays & Objects",
          url: "/docs/javascript/arrays-objects",
        },
        {
          type: "page",
          name: "DOM Manipulation",
          url: "/docs/javascript/dom",
        },
        {
          type: "page",
          name: "Async Programming",
          url: "/docs/javascript/async",
        },
        {
          type: "page",
          name: "ES6+ Features",
          url: "/docs/javascript/es6",
        },
        {
          type: "page",
          name: "Common Problems",
          url: "/docs/javascript/problems",
        }
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
        {
          type: "page",
          name: "Components & Props",
          url: "/docs/react/components",
        },
        {
          type: "page",
          name: "Hooks",
          url: "/docs/react/hooks",
        },
        {
          type: "page",
          name: "State Management",
          url: "/docs/react/state",
        },
        {
          type: "page",
          name: "Performance",
          url: "/docs/react/performance",
        },
        {
          type: "page",
          name: "Common Patterns",
          url: "/docs/react/patterns",
        }
      ],
    }
  ],
};
