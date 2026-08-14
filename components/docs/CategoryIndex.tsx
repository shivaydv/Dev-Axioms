import { webdev, web3 } from "@/lib/source";
import Link from "next/link";

export function CategoryIndex({ folderName }: { folderName: string }) {
  // Find the top-level folder across all sources
  let section = webdev.pageTree.children.find((c) => typeof c.name === "string" && c.name.toLowerCase() === folderName.toLowerCase());
  
  if (!section || section.type !== "folder") {
    // try web3
    section = web3.pageTree.children.find((c) => typeof c.name === "string" && c.name.toLowerCase() === folderName.toLowerCase());
  }
  
  if (!section || section.type !== "folder") return null;

  // Group by separators
  const categories: { name: string; items: any[] }[] = [];
  let currentCategory = { name: "Overview", items: [] as any[] };
  
  section.children.forEach((item) => {
    if (item.type === "separator") {
      if (currentCategory.items.length > 0) {
        categories.push(currentCategory);
      }
      currentCategory = { name: (item.name as string) || "Section", items: [] };
    } else if (item.type === "page") {
      currentCategory.items.push(item);
    }
  });
  
  if (currentCategory.items.length > 0) {
    categories.push(currentCategory);
  }

  return (
    <div className="flex flex-col gap-10 mt-8">
      {categories.map((cat, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          <h2 className="text-xl font-medium tracking-tight text-foreground border-b border-border/60 pb-2">
            {cat.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cat.items.map((page) => (
              <Link 
                key={page.url} 
                href={page.url}
                className="group flex flex-col justify-between p-4 h-full bg-card rounded-lg border border-border/60 hover:bg-accent/40 transition-colors duration-200"
              >
                <div>
                  <h3 className="text-[15px] font-medium text-foreground group-hover:text-primary transition-colors">
                    {page.name}
                  </h3>
                  {page.description && (
                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                      {page.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
