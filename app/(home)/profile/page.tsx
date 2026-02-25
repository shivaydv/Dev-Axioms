import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  getUserLikedQuestions,
  getUserBookmarkedQuestions,
} from "@/server/actions/user-interactions-actions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Your profile overview with activity statistics and recent interactions.",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user statistics
  const [likedQuestions, bookmarkedQuestions] = await Promise.all([
    getUserLikedQuestions(),
    getUserBookmarkedQuestions(),
  ]);

  const stats = [
    {
      title: "Liked Questions",
      value: likedQuestions.length,
      description: "Questions you've liked",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      href: "/profile/liked",
    },
    {
      title: "Bookmarked Questions",
      value: bookmarkedQuestions.length,
      description: "Questions saved for later",
      icon: Bookmark,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      href: "/profile/bookmarks",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name}! Here&apos;s your activity overview.
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-muted-foreground text-sm">
                    {stat.description}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Link href={stat.href}>View All</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Recent Likes
            </CardTitle>
            <CardDescription>
              Questions you&apos;ve recently liked
            </CardDescription>
          </CardHeader>
          <CardContent>
            {likedQuestions.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No liked questions yet
              </p>
            ) : (
              <div className="space-y-3">
                {likedQuestions.slice(0, 3).map((question) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{question.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {question.difficulty} •{" "}
                        {new Date(question.likedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/practice/${question.slug}`}>Practice</Link>
                    </Button>
                  </div>
                ))}
                {likedQuestions.length > 3 && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/profile/liked">View All Liked</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-blue-500" />
              Recent Bookmarks
            </CardTitle>
            <CardDescription>
              Questions you&apos;ve recently bookmarked
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookmarkedQuestions.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No bookmarked questions yet
              </p>
            ) : (
              <div className="space-y-3">
                {bookmarkedQuestions.slice(0, 3).map((question) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{question.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {question.difficulty} •{" "}
                        {new Date(question.bookmarkedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/practice/${question.slug}`}>Practice</Link>
                    </Button>
                  </div>
                ))}
                {bookmarkedQuestions.length > 3 && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/profile/bookmarks">View All Bookmarks</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
