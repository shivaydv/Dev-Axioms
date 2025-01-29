import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo, NavMenu } from "./navbar";
import { Button } from "../ui/button";
import { AlignLeftIcon } from "lucide-react";
import { FooterButtons } from "@/components/docs/footer";
import { DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocsMenu from "@/components/docs/docs-menu";

export function Leftbar() {
  return (
    <aside className="md:flex hidden flex-[1.5] min-w-[238px] sticky top-16 flex-col h-[93.75vh] overflow-y-auto">
      <ScrollArea className="py-4">
        <DocsMenu className="gap-[2px]  " />
      </ScrollArea>
    </aside>
  );
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden flex hover:scale-110 transition-transform active:scale-95"
        >
          <AlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <SheetHeader>
          <SheetClose asChild>
            <div className="flex items-center px-5">
              <Logo/>
            </div>
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-2.5  mx-2 px-5 border-b py-2">
            <NavMenu isSheet />
          </div>
          <div className=" px-5">
            <DocsMenu isSheet className="!mt-0" />
          </div>
          <div className="p-6 pb-4 flex gap-2.5">
            <FooterButtons />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
