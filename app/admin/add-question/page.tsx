"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdvancedFileManager from "@/components/FileManager/AdvancedFileManager";
import MarkdownEditor from "@/components/md-editor/MarkdownEditor";
import { SandpackFiles } from "@codesandbox/sandpack-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MultiTagInput } from "@/components/ui/multi-tag-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { toast } from "sonner";
import { addQuestion } from "@/server/actions/question-actions";

const QuestionScheme = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  content: z.string().trim().min(1, "Content cannot be empty"),
  starterCode: z.record(z.union([z.string(), z.record(z.any())])),
  solution: z.string().optional(),
});

export type QuestionFormData = z.infer<typeof QuestionScheme>;

const page = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [solution, setSolution] = useState("");
  const [starterCode, setStarterCode] = useState<SandpackFiles>({
    "/index.js": { code: "// Write your solution here\n", active: true },
  });

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const tags = formData.get("tags") as string;
    const parsedData = {
      ...data,
      tags: JSON.parse(tags),
      starterCode,
    };

    const result = QuestionScheme.safeParse(parsedData);
    console.log(result.error?.errors[0].message);
    if (!result.success) {
      toast.error("Invalid input data");
      return;
    }

    const resp = await addQuestion(result.data);

    if (resp.success) {
      toast.success(resp.message);
    } else {
      toast.error(resp.message || "Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="pb-4">
        <h4 className="text-xl font-semibold">Add New Question</h4>
        <p className="text-muted-foreground text-sm">
          Fill in the information below to create a question
        </p>
      </div>

      <div className="space-y-8">
        <form onSubmit={handleOnSubmit} className="space-y-8">
          <input type="hidden" name="content" value={content} />
          <input type="hidden" name="solution" value={solution} />

          {/* Basic Info */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="flex items-center gap-1 text-sm font-medium"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Two Sum Algorithm Challenge"
                  className={`focus:border-primary focus:ring-primary/20 transition-all duration-200`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-sm font-medium">
                  Difficulty Level
                </Label>
                <Select name="difficulty" defaultValue="Easy">
                  <SelectTrigger className="focus:border-primary focus:ring-primary/20 w-full transition-all duration-200">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <MultiTagInput
                name="tags"
                label="Tags"
                placeholder="e.g. array, algorithm, sorting"
                emptyMessage="No tags added yet"
                tags={tags}
                required
                onChange={setTags}
              />
            </div>
          </Section>

          {/* Content & Code */}
          <Section title="Question Content & Code">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-muted/50 grid w-full grid-cols-3 p-1">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Question Description
                </TabsTrigger>
                <TabsTrigger
                  value="starter"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Starter Code
                </TabsTrigger>
                <TabsTrigger
                  value="solution"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Solution
                </TabsTrigger>
              </TabsList>

              {/* Content */}
              <TabsContent value="content" className="mt-6 space-y-4">
                <LabelWithBadge
                  label="Question Description"
                  badge="Supports Markdown"
                  required
                />
                <MarkdownEditor markdown={content} onChange={setContent} />
                <p className="text-muted-foreground text-sm">
                  Provide a clear problem statement with examples, constraints,
                  and expected output format.
                </p>
              </TabsContent>

              {/* Starter Code */}
              <TabsContent value="starter" className="mt-6 space-y-4">
                <LabelWithBadge
                  label="Initial Code Files"
                  badge="Interactive File Manager"
                />
                <AdvancedFileManager
                  //   ref={fileManagerRef}
                  initialFiles={starterCode}
                  onChange={setStarterCode}
                  height="400px"
                  showProperties
                  className="rounded-xl"
                />
                <p className="text-muted-foreground text-sm">
                  Set up the initial code structure that candidates will start
                  with.
                </p>
              </TabsContent>

              {/* Solution */}
              <TabsContent value="solution" className="mt-6 space-y-4">
                <LabelWithBadge label="Solution Explanation" badge="Optional" />
                <MarkdownEditor markdown={solution} onChange={setSolution} />
                <p className="text-muted-foreground text-sm">
                  Provide a detailed explanation of the solution approach and
                  complexity analysis.
                </p>
              </TabsContent>
            </Tabs>
          </Section>

          {/* Submit */}
          <div>
            <Button type="submit" className="w-full md:w-auto">
              Create Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="border-border/50 flex items-center gap-3 border-b pb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function LabelWithBadge({
  label,
  badge,
  required,
}: {
  label: string;
  badge?: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="flex items-center gap-1 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {badge && (
        <Badge variant="outline" className="text-xs">
          {badge}
        </Badge>
      )}
    </div>
  );
}

export default page;
