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
      openFolder: true,
      items: [
        { title: "What is HTML?", href: "/what-is-html" },
        { title: "Role in Web Development", href: "/role-in-web-dev" },
        { title: "Browser Rendering", href: "/browser-rendering" },
        { title: "Doctype Declaration", href: "/doctype" },
        { title: "HTML Elements", href: "/elements" },
        { title: "Common Tags", href: "/common-tags" },
        { title: "Semantic Tags", href: "/semantic-tags" }
      ]
    },
    {
      title: "Attributes and Properties",
      href: "/attributes",
      noLink: true,
      items: [
        { title: "Global Attributes", href: "/global" },
        { title: "Event Attributes", href: "/events" },
        { title: "Boolean Attributes", href: "/boolean" },
        { title: "Custom Data Attributes", href: "/data-attributes" }
      ]
    },
    {
      title: "Forms and Input",
      href: "/forms",
      noLink: true,
      items: [
        { title: "Form Elements", href: "/elements" },
        { title: "Form Attributes", href: "/attributes" },
        { title: "Input Types", href: "/types" },
        { title: "Validation", href: "/validation" }
      ]
    },
    {
      title: "Multimedia",
      href: "/multimedia",
      noLink: true,
      items: [
        { title: "Images", href: "/images" },
        { title: "Videos", href: "/videos" },
        { title: "Audio", href: "/audio" }
      ]
    },
    {
      title: "Tables",
      href: "/tables",
      noLink: true,
      items: [
        { title: "Table Structure", href: "/structure" },
        { title: "Table Attributes", href: "/attributes" }
      ]
    },
    {
      title: "Advanced HTML",
      href: "/advanced",
      noLink: true,
      items: [
        { title: "Semantic Elements", href: "/semantic" },
        { title: "Canvas API", href: "/canvas" },
        { title: "Storage APIs", href: "/storage" },
        { title: "Geolocation", href: "/geolocation" },
        { title: "HTML APIs", href: "/apis" },
        { title: "HTML vs HTML5", href: "/html-vs-html5" }
      ]
    },
    {
      title: "Accessibility",
      href: "/accessibility",
      noLink: true,
      items: [
        { title: "ARIA Roles", href: "/aria" },
        { title: "Screen Readers", href: "/screen-readers" },
        { title: "Best Practices", href: "/best-practices" }
      ]
    },
    {
      title: "SEO Essentials",
      href: "/seo",
      noLink: true,
      items: [
        { title: "Metadata", href: "/metadata" },
        { title: "Open Graph", href: "/open-graph" },
        { title: "Canonical Tags", href: "/canonical" }
      ]
    }
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
