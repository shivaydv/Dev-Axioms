"use client";

import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DocsMenu({ isSheet = false,className }: { isSheet?: boolean,className?: string }) {
  const pathname = usePathname();
  const section = pathname.split('/')[1]; // Get the section from the URL

  if (!ROUTES[section]) return null;

  return (
    <div className={cn("flex flex-col gap-2 mt-5 pr-2 pb-6",className)} >
      {ROUTES[section].map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/${section}${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}
