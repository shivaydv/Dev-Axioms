export type DocsSection = {
  id: string; // Used in URL path
  title: string; // Display name
  description?: string;
  icon?: React.ComponentType; // Optional icon for the section
};

export const DOCS_SECTIONS: DocsSection[] = [
  {
    id: "html",
    title: "HTML",
    description: "HTML documentation",
  },
];
