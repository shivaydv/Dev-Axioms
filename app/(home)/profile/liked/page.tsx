import { getUserLikedQuestions } from "@/server/actions/user-interactions-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export const metadata: Metadata = {
  title: "Liked Questions | Dev Axioms",
  description: "View all the practice questions you've liked.",
};

export default async function LikedQuestionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const likedQuestions = await getUserLikedQuestions();

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10 space-y-6 select-none">
      {/* Clean Heading Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Liked Questions
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {likedQuestions.length} {likedQuestions.length === 1 ? "question" : "questions"} saved in your favorites
          </p>
        </div>

        <Button asChild size="sm" variant="outline" className="text-xs h-8 border-border/60">
          <Link href="/practice">Browse All Questions</Link>
        </Button>
      </div>

      {/* Empty State */}
      {likedQuestions.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card/30 py-16 text-center shadow-xs space-y-3">
          <p className="text-sm font-semibold text-foreground">No Liked Questions Yet</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Explore practice problems and like the ones you find helpful.
          </p>
          <Button asChild size="sm" className="bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 text-xs px-4">
            <Link href="/practice">Explore Questions</Link>
          </Button>
        </div>
      ) : (
        /* Minimalist High-Density List Table */
        <div className="rounded-xl border border-border/60 bg-card/30 overflow-hidden divide-y divide-border/40 shadow-xs">
          {likedQuestions.map((question) => (
            <div
              key={question.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-card/70 transition-colors"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                {/* Title First for Uniform Left Alignment */}
                <div className="flex items-center gap-2.5">
                  <Link
                    href={`/practice/${question.slug}`}
                    className="text-sm font-semibold text-foreground hover:text-[#FF5A26] transition-colors truncate"
                  >
                    {question.title}
                  </Link>

                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-md px-1.5 py-0 text-[10px] font-semibold uppercase tracking-wider border shrink-0",
                      difficultyStyles[question.difficulty as keyof typeof difficultyStyles],
                    )}
                  >
                    {question.difficulty}
                  </Badge>
                </div>

                {question.tags && question.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {question.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/30">
                <span className="text-[11px] text-muted-foreground">
                  Liked {new Date(question.likedAt).toLocaleDateString()}
                </span>

                <Button asChild size="sm" className="h-8 px-3.5 text-xs bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 font-semibold shadow-xs">
                  <Link href={`/practice/${question.slug}`}>Practice</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
