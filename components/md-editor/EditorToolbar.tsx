"use client";

import { FC } from "react";
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  Separator,
  InsertCodeBlock,
} from "@mdxeditor/editor";

export const EditorToolbar: FC = () => {
  return (
    <div className="flex flex-1 flex-wrap items-center gap-1 p-2">
      {/* Undo/Redo */}
      <UndoRedo />
      <Separator />

      {/* Text formatting */}
      <BoldItalicUnderlineToggles />
      <CodeToggle />
      <Separator />

      {/* Block types */}
      <BlockTypeSelect />
      <Separator />

      {/* Lists */}
      <ListsToggle />
      <Separator />

      {/* Links and media */}
      <CreateLink />
      <InsertImage />
      <Separator />

      {/* Tables and elements */}
      <InsertTable />
      <InsertThematicBreak />
      <InsertCodeBlock />
    </div>
  );
};
