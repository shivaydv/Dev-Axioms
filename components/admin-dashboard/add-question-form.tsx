"use client";
import React, { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { toast } from "sonner";
import { addQuestion } from "@/server/actions/question-actions";
import { useRouter } from "next/navigation";

// Lazy loaded heavy components with skeleton fallbacks
const AdvancedFileManager = dynamic(
  () => import("@/components/FileManager/AdvancedFileManager"),
  {
    loading: () => (
      <div className="h-[400px] w-full rounded-xl border border-border/60 bg-card/30 flex items-center justify-center text-xs text-muted-foreground gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#FF5A26]" />
        <span>Loading Sandbox File Manager...</span>
      </div>
    ),
    ssr: false,
  }
);

const MarkdownEditor = dynamic(
  () => import("@/components/md-editor/MarkdownEditor"),
  {
    loading: () => (
      <div className="h-[300px] w-full rounded-xl border border-border/60 bg-card/30 flex items-center justify-center text-xs text-muted-foreground gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#FF5A26]" />
        <span>Loading Editor...</span>
      </div>
    ),
    ssr: false,
  }
);

const QuestionScheme = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  content: z.string().trim().min(1, "Content cannot be empty"),
  starterCode: z.record(z.union([z.string(), z.record(z.any())])),
  solution: z.string().optional(),
  timeLimit: z
    .number()
    .min(5, "Time limit must be at least 5 minutes")
    .max(180, "Time limit cannot exceed 3 hours"),
});

const AddQuestionForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
      timeLimit: parseInt(data.timeLimit as string) || 30,
    };

    startTransition(async () => {
      const result = QuestionScheme.safeParse(parsedData);
      if (!result.success) {
        toast.error(result.error?.errors[0].message || "Invalid input data");
        return;
      }

      const resp = await addQuestion(result.data);

      if (resp.success) {
        toast.success(resp.message);
        router.push("/admin/questions");
      } else {
        toast.error(resp.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/admin/questions"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Questions</span>
            </Link>
            <span className="text-xs text-muted-foreground/60">/</span>
            <span className="text-xs font-semibold text-foreground">Add Question</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create New Question
          </h1>
        </div>
      </div>

      <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs p-6">
        <form onSubmit={handleOnSubmit} className="space-y-8">
          <input type="hidden" name="content" value={content} />
          <input type="hidden" name="solution" value={solution} />

          {/* Basic Info */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-semibold text-foreground">
                  Title <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Two Sum Algorithm Challenge"
                  className="h-9 text-xs border-border/60 bg-background/50 focus:border-[#FF5A26]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-xs font-semibold text-foreground">
                  Difficulty Level
                </Label>
                <Select name="difficulty" defaultValue="Easy">
                  <SelectTrigger className="h-9 text-xs border-border/60 bg-background/50">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeLimit" className="text-xs font-semibold text-foreground">
                  Time Limit (minutes)
                </Label>
                <Input
                  id="timeLimit"
                  name="timeLimit"
                  type="number"
                  min="5"
                  max="180"
                  defaultValue="30"
                  placeholder="e.g. 30"
                  className="h-9 text-xs border-border/60 bg-background/50 focus:border-[#FF5A26]"
                />
              </div>

              <div className="lg:col-span-3">
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
            </div>
          </Section>

          {/* Content & Code */}
          <Section title="Question Content & Code">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="bg-muted/50 grid w-full grid-cols-3 p-1 rounded-xl">
                <TabsTrigger
                  value="content"
                  className="text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-xs"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="starter"
                  className="text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-xs"
                >
                  Starter Code
                </TabsTrigger>
                <TabsTrigger
                  value="solution"
                  className="text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-xs"
                >
                  Solution
                </TabsTrigger>
              </TabsList>

              {/* Content */}
              <TabsContent value="content" className="mt-6 space-y-3">
                <LabelWithBadge
                  label="Question Description"
                  badge="Supports Markdown"
                  required
                />
                <MarkdownEditor markdown={content} onChange={setContent} />
                <p className="text-muted-foreground text-xs">
                  Provide a clear problem statement with examples, constraints, and output format.
                </p>
              </TabsContent>

              {/* Starter Code */}
              <TabsContent value="starter" className="mt-6 space-y-3">
                <LabelWithBadge
                  label="Initial Code Files"
                  badge="Interactive Sandbox Files"
                />
                <AdvancedFileManager
                  initialFiles={starterCode}
                  onChange={setStarterCode}
                  height="400px"
                  showProperties
                  className="rounded-xl border border-border/60"
                />
                <p className="text-muted-foreground text-xs">
                  Set up initial starter files for candidate solution playgrounds.
                </p>
              </TabsContent>

              {/* Solution */}
              <TabsContent value="solution" className="mt-6 space-y-3">
                <LabelWithBadge label="Solution Explanation" badge="Optional" />
                <MarkdownEditor markdown={solution} onChange={setSolution} />
                <p className="text-muted-foreground text-xs">
                  Provide detailed complexity analysis and step-by-step solution logic.
                </p>
              </TabsContent>
            </Tabs>
          </Section>

          {/* Submit Actions */}
          <div className="flex items-center justify-between border-t border-border/40 pt-6">
            <Button type="button" variant="outline" size="sm" className="text-xs h-9" asChild>
              <Link href="/admin/questions">Cancel</Link>
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 text-xs font-semibold h-9 px-4 shadow-xs"
            >
              {isPending ? "Creating..." : "Create Question"}
            </Button>
          </div>
        </form>
      </Card>
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
    <div className="space-y-4">
      <div className="border-b border-border/40 pb-2">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</h3>
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
      <Label className="text-xs font-semibold text-foreground flex items-center gap-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </Label>
      {badge && (
        <Badge variant="outline" className="text-[10px] uppercase font-semibold">
          {badge}
        </Badge>
      )}
    </div>
  );
}

export default AddQuestionForm;
