import { getAdminDashboardStats } from "@/server/functions/admin-stats";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileCode2,
  Users,
  Heart,
  Bookmark,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Edit,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  const totalQuestions = stats.totalQuestions || 1;
  const easyPct = Math.round((stats.easyQuestions / totalQuestions) * 100);
  const mediumPct = Math.round((stats.mediumQuestions / totalQuestions) * 100);
  const hardPct = Math.round((stats.hardQuestions / totalQuestions) * 100);

  return (
    <div className="space-y-8 select-none max-w-6xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#FF5A26]/10 text-[#FF5A26] border-[#FF5A26]/20 text-[10px] uppercase font-semibold">
              Live System Status
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Dev Axioms Dashboard
          </h1>
          <p className="text-xs text-muted-foreground">
            Overview of questions, user engagement, and platform analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="outline" className="h-9 text-xs border-border/60">
            <Link href="/practice" target="_blank">
              <span>View Practice Page</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>

          <Button asChild size="sm" className="h-9 text-xs bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 font-semibold shadow-xs">
            <Link href="/admin/questions/add">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Add Question</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Questions Card */}
        <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Questions
            </CardTitle>
            <div className="p-2 rounded-lg bg-muted/60 text-foreground border border-border/40">
              <FileCode2 className="w-4 h-4 text-[#FF5A26]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{stats.totalQuestions}</div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-emerald-500 font-medium">{stats.easyQuestions} Easy</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-amber-500 font-medium">{stats.mediumQuestions} Med</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-rose-500 font-medium">{stats.hardQuestions} Hard</span>
            </div>
          </CardContent>
        </Card>

        {/* Registered Users */}
        <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Registered Users
            </CardTitle>
            <div className="p-2 rounded-lg bg-muted/60 text-foreground border border-border/40">
              <Users className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
            <p className="text-[11px] text-muted-foreground">Active platform members</p>
          </CardContent>
        </Card>

        {/* Total Likes */}
        <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Question Likes
            </CardTitle>
            <div className="p-2 rounded-lg bg-muted/60 text-foreground border border-border/40">
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{stats.totalLikes}</div>
            <p className="text-[11px] text-muted-foreground">Community favorites</p>
          </CardContent>
        </Card>

        {/* Total Bookmarks */}
        <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Bookmarks
            </CardTitle>
            <div className="p-2 rounded-lg bg-muted/60 text-foreground border border-border/40">
              <Bookmark className="w-4 h-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{stats.totalBookmarks}</div>
            <p className="text-[11px] text-muted-foreground">Saved for practice</p>
          </CardContent>
        </Card>
      </div>

      {/* Difficulty Breakdown Bar */}
      <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Question Difficulty Distribution
            </h3>
          </div>
          <span className="text-xs text-muted-foreground">{stats.totalQuestions} Total</span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="h-3 w-full rounded-full bg-muted/60 overflow-hidden flex">
          <div
            style={{ width: `${easyPct}%` }}
            className="bg-emerald-500 transition-all duration-500"
            title={`Easy: ${easyPct}%`}
          />
          <div
            style={{ width: `${mediumPct}%` }}
            className="bg-amber-500 transition-all duration-500"
            title={`Medium: ${mediumPct}%`}
          />
          <div
            style={{ width: `${hardPct}%` }}
            className="bg-rose-500 transition-all duration-500"
            title={`Hard: ${hardPct}%`}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Easy ({easyPct}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Medium ({mediumPct}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span>Hard ({hardPct}%)</span>
          </div>
        </div>
      </Card>

      {/* Main Content Grid: Recent Questions & Recent Users */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Questions (2 Cols) */}
        <Card className="md:col-span-2 border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Recent Questions</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Latest practice problems added to the system
              </CardDescription>
            </div>

            <Button asChild size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-foreground">
              <Link href="/admin/questions">
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            {stats.recentQuestions.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No questions found. Add your first question to get started.
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {stats.recentQuestions.map((q) => (
                  <div key={q.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-md px-1.5 py-0 text-[9px] font-semibold uppercase border shrink-0",
                            difficultyStyles[q.difficulty as keyof typeof difficultyStyles]
                          )}
                        >
                          {q.difficulty}
                        </Badge>
                        <span className="truncate text-xs font-semibold text-foreground">{q.title}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">/{q.slug}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button asChild size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <Link href={`/admin/questions/${q.id}/edit`}>
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                      <Button asChild size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-[#FF5A26]">
                        <Link href={`/practice/${q.slug}`} target="_blank">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Users List (1 Col) */}
        <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-sm font-semibold text-foreground">Recent Members</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Latest user signups on Dev Axioms
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {stats.recentUsers.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No user registrations yet.
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentUsers.map((u) => {
                  const initials = u.name
                    ? u.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                    : "U";

                  return (
                    <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card/60 transition-colors">
                      <Avatar className="h-8 w-8 rounded-full border border-border/50">
                        <AvatarImage src={u.image || undefined} alt={u.name} />
                        <AvatarFallback className="bg-[#FF5A26]/10 text-[#FF5A26] font-semibold text-[10px]">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-foreground">{u.name}</p>
                        <p className="truncate text-[10px] text-muted-foreground">{u.email}</p>
                      </div>
                      <Badge variant="outline" className="text-[9px] uppercase px-1.5 py-0 border-border/60 shrink-0">
                        {u.role}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
