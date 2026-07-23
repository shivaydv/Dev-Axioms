import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Bookmark, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  getUserLikedQuestions,
  getUserBookmarkedQuestions,
} from "@/server/actions/user-interactions-actions";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Dev Axioms",
  description: "Your profile overview with practice statistics and saved questions.",
};

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const [likedQuestions, bookmarkedQuestions] = await Promise.all([
    getUserLikedQuestions(),
    getUserBookmarkedQuestions(),
  ]);

  const totalSaved = likedQuestions.length + bookmarkedQuestions.length;

  const userInitials = session.user.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "DA";

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10 space-y-8 select-none">
      {/* Profile Header Hero */}
      <div className="relative rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8 backdrop-blur-xl shadow-xs overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A26]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-[#FF5A26]/20 shadow-md">
              <AvatarImage src={session.user.image || undefined} alt={session.user.name} />
              <AvatarFallback className="bg-[#FF5A26]/10 text-[#FF5A26] font-bold text-lg">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  {session.user.name}
                </h1>
                <Badge variant="outline" className="bg-[#FF5A26]/10 text-[#FF5A26] border-[#FF5A26]/20 text-[10px] uppercase font-semibold px-2 py-0.5">
                  {totalSaved} Saved Questions
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{session.user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button asChild size="sm" variant="outline" className="flex-1 sm:flex-initial text-xs h-9 border-border/60">
              <Link href="/practice">
                <Code2 className="w-3.5 h-3.5 mr-1.5 text-[#FF5A26]" />
                Explore Practice
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Liked Card */}
        <div className="group relative rounded-xl border border-border/60 bg-card/30 p-5 backdrop-blur-md transition-all hover:border-[#FF5A26]/40 hover:bg-card/60 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground border border-border/40 group-hover:text-[#FF5A26] group-hover:border-[#FF5A26]/30 transition-colors">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Liked Questions</p>
                <h3 className="text-2xl font-bold text-foreground mt-0.5">{likedQuestions.length}</h3>
              </div>
            </div>
            <Button asChild size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-foreground">
              <Link href="/profile/liked" className="flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bookmarks Card */}
        <div className="group relative rounded-xl border border-border/60 bg-card/30 p-5 backdrop-blur-md transition-all hover:border-[#FF5A26]/40 hover:bg-card/60 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-muted/50 text-muted-foreground border border-border/40 group-hover:text-[#FF5A26] group-hover:border-[#FF5A26]/30 transition-colors">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Bookmarked Questions</p>
                <h3 className="text-2xl font-bold text-foreground mt-0.5">{bookmarkedQuestions.length}</h3>
              </div>
            </div>
            <Button asChild size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-foreground">
              <Link href="/profile/bookmarks" className="flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Likes */}
        <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span>Recent Likes</span>
              </CardTitle>
              {likedQuestions.length > 0 && (
                <Link href="/profile/liked" className="text-xs font-medium text-muted-foreground hover:text-[#FF5A26]">
                  View all ({likedQuestions.length})
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {likedQuestions.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-muted-foreground">No liked questions yet</p>
                <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                  <Link href="/practice">Browse Practice</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {likedQuestions.slice(0, 3).map((question) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-background/50 hover:bg-card transition-all"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="truncate text-xs font-semibold text-foreground">{question.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-md px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wider border",
                            difficultyStyles[question.difficulty as keyof typeof difficultyStyles],
                          )}
                        >
                          {question.difficulty}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          Liked {new Date(question.likedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button asChild size="sm" className="h-7 px-3 text-xs bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 shrink-0">
                      <Link href={`/practice/${question.slug}`}>Solve</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Bookmarks */}
        <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Bookmark className="h-4 w-4 text-muted-foreground" />
                <span>Recent Bookmarks</span>
              </CardTitle>
              {bookmarkedQuestions.length > 0 && (
                <Link href="/profile/bookmarks" className="text-xs font-medium text-muted-foreground hover:text-[#FF5A26]">
                  View all ({bookmarkedQuestions.length})
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {bookmarkedQuestions.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-muted-foreground">No bookmarked questions yet</p>
                <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                  <Link href="/practice">Browse Practice</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedQuestions.slice(0, 3).map((question) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-background/50 hover:bg-card transition-all"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="truncate text-xs font-semibold text-foreground">{question.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-md px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wider border",
                            difficultyStyles[question.difficulty as keyof typeof difficultyStyles],
                          )}
                        >
                          {question.difficulty}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          Saved {new Date(question.bookmarkedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button asChild size="sm" className="h-7 px-3 text-xs bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 shrink-0">
                      <Link href={`/practice/${question.slug}`}>Solve</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
