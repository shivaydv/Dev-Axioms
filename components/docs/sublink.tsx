import { EachRoute } from "@/lib/routes-config";
import Anchor from "./anchor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
  openFolder,
}: EachRoute & { level: number; isSheet: boolean }) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(openFolder || false);

  useEffect(() => {
    if (path === href || path.includes(href)) {
      setIsOpen(true);
    }
  }, [href, path]);

  const Comp = (
    <Anchor
      activeClassName="text-primary dark:font-medium font-semibold bg-accent"
      href={href}
      className="transition-colors duration-200 hover:bg-accent w-full text-left rounded-md px-2 py-1"
    >
      {title}
    </Anchor>
  );

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4 className="text-primary px-2  w-full text-left ">{title}</h4>
  );

  if (!items) {
    return (
      <div className="flex flex-col   w-full ">
        {titleOrLink}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between cursor-pointer w-full   group hover:bg-accent rounded-md py-1">
            {titleOrLink}
            <span>
              {!isOpen ? (
                <ChevronRight className="h-[0.9rem] w-[0.9rem]" />
              ) : (
                <ChevronDown className="h-[0.9rem] w-[0.9rem]" />
              )}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className={cn(
              "flex flex-col sm:text-sm items-start w-full  dark:text-stone-300/85 text-stone-800 px-1 ml-0.5 mt-2.5 gap-2",
              level > 0 && "pl-4 border-l ml-1.5"
            )}
          >
            {items?.map((innerLink) => {
              const modifiedItems = {
                ...innerLink,
                href: `${href + innerLink.href}`,
                level: level + 1,
                isSheet,
              };
              return <SubLink key={modifiedItems.href} {...modifiedItems} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
