// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  openFolder?: boolean;
  items?: EachRoute[];
};

export type DocsRoutes = {
  [sectionId: string]: EachRoute[];
};

export const ROUTES: DocsRoutes = {
  html: [
    {
      title: "Introduction",
      href: "/introduction",
    },
    {
      title: "Structure",
      href: "/structure",
    },
    {
      title: "Attributes and Properties",
      href: "/attributes",
    },
    {
      title: "Forms and Input",
      href: "/inputs-and-forms",
    },
    {
      title: "Multimedia",
      href: "/multimedia",
    },
    {
      title: "Tables",
      href: "/tables",
    },
    {
      title: "HTML 5",
      href: "/html5",
    },
    {
      title: "Advanced HTML",
      href: "/advanced",
      noLink: true,
      items: [
        {title: "Accessibility", href: "/accessibility"},
        {title: "HTML API", href: "/html-api"},
        {title: "SEO", href: "/seo"},
      ]
    },
    {
      title: "Interview Questions",
      href: "/interview-questions",
    },
  ],
};

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export function getPageRoutes(section: string) {
  return ROUTES[section]?.map((it) => getRecurrsiveAllLinks(it)).flat() ?? [];
}
