"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";


export const EditorTabs: FC = () => {
  return (
    <div className="flex items-center justify-between border-b py-1">
      <TabsList className="gap-2 bg-transparent px-2">
        <TabsTrigger asChild value="edit">
          <Button
            variant="ghost"
            className="data-[state=active]:bg-muted data-[state=active]:border-border"
          >
            Edit
          </Button>
        </TabsTrigger>
        <TabsTrigger asChild value="raw">
          <Button
            variant="ghost"
            className="data-[state=active]:bg-muted data-[state=active]:border-border"
          >
            Raw
          </Button>
        </TabsTrigger>
        <TabsTrigger asChild value="preview">
          <Button
            variant="ghost"
            className="data-[state=active]:bg-muted data-[state=active]:border-border"
          >
            Preview
          </Button>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
