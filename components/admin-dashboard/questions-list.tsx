"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  MoreHorizontal,
  Trash2,
  Search,
  Filter,
  Calendar,
  Tag,
  BookOpen,
  ExternalLink,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { deleteQuestion } from "@/server/actions/question-actions";
import { useRouter } from "next/navigation";
import { Question } from "@/types/Question";
import { cn } from "@/lib/utils";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

type Props = {
  questions: Question[];
};

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export function QuestionsList({ questions }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    questions.forEach((q) => q.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesDifficulty =
        difficultyFilter === "all" || question.difficulty === difficultyFilter;
      const matchesTag =
        tagFilter === "all" || question.tags.includes(tagFilter);

      return matchesSearch && matchesDifficulty && matchesTag;
    });
  }, [questions, searchTerm, difficultyFilter, tagFilter]);

  const handleDelete = async (questionId: string) => {
    setIsDeleting(true);
    try {
      const result = await deleteQuestion(questionId);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the question");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    }
  };

  const confirmDelete = (questionId: string) => {
    setQuestionToDelete(questionId);
    setDeleteDialogOpen(true);
  };

  if (questions.length === 0) {
    return (
      <Card className="border-border/60 bg-card/30 backdrop-blur-md shadow-xs">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="p-3 rounded-2xl bg-[#FF5A26]/10 text-[#FF5A26] border border-[#FF5A26]/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No questions yet</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Get started by creating your first practice question for the Dev Axioms platform.
          </p>
          <Button asChild size="sm" className="bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 text-xs font-semibold px-4 shadow-xs">
            <Link href="/admin/questions/add">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Add Question</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs overflow-hidden">
        <CardHeader className="space-y-4 pb-4 border-b border-border/40 px-6 pt-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-foreground">
              Questions ({filteredQuestions.length})
            </CardTitle>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
              <Input
                placeholder="Search by title or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs border-border/60 bg-background/50"
              />
            </div>

            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-full sm:w-[130px] h-9 text-xs border-border/60 bg-background/50">
                <Filter className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-full sm:w-[140px] h-9 text-xs border-border/60 bg-background/50">
                <Tag className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground h-11">Title</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground h-11">Difficulty</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground h-11">Tags</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground h-11">Created</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground h-11 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id} className="border-border/40 hover:bg-card/70 transition-colors">
                  <TableCell className="py-3.5">
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-xs text-foreground truncate">{question.title}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        /{question.slug}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wider border",
                        difficultyStyles[question.difficulty as keyof typeof difficultyStyles],
                      )}
                    >
                      {question.difficulty}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {question.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40">
                          {tag}
                        </span>
                      ))}
                      {question.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-md bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40">
                          +{question.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5">
                    <div className="text-[11px] text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-3 w-3 text-muted-foreground/70" />
                      {formatTimeAgo(new Date(question.createdAt))}
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-[#FF5A26]" asChild>
                        <Link target="_blank" href={`/practice/${question.slug}`}>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-xs w-36">
                          <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-wider">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={`/admin/questions/${question.id}/edit`}>
                              <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={`/practice/${question.slug}`} target="_blank">
                              <ExternalLink className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                              View Live
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-rose-500 focus:text-rose-600 focus:bg-rose-500/10 cursor-pointer"
                            onClick={() => confirmDelete(question.id)}
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredQuestions.length === 0 && questions.length > 0 && (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No questions match your current search and filter settings.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6 border-border/60 bg-card backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground">Delete Question</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
              Are you sure you want to delete this practice question? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              disabled={isDeleting}
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="text-xs h-8 bg-rose-500 text-white hover:bg-rose-600 font-semibold"
              onClick={() => questionToDelete && handleDelete(questionToDelete)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
