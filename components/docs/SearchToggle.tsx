"use client";
import React from "react";
import { useSearchContext } from "fumadocs-ui/provider";
import { Search } from "lucide-react";

const SearchToggle = () => {
  const { setOpenSearch } = useSearchContext();
  return (
    <>
      <button
        onClick={() => setOpenSearch(true)}
        className="max-md:hidden border border-fd-border rounded-xl px-3 py-2 flex items-center  gap-3 hover:bg-fd-foreground/10 transition-colors select-none"
      >
        <p className="text-sm">Search in Documentation...</p>
        <kbd className="text-sm">⌘K</kbd>
      </button>
      <button
        onClick={() => setOpenSearch(true)}
        className="md:hidden p-2 hover:bg-fd-foreground/10 transition-colors rounded-md"
      >
        <Search className="h-5 w-5" />
      </button>
    </>
  );
};

export default SearchToggle;
