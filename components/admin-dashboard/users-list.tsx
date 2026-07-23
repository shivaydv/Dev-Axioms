"use client";

import React, { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Heart, Bookmark, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type UserWithActivity = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  createdAt: Date;
  questionLikes: {
    id: string;
    createdAt: Date;
    question: {
      id: string;
      title: string;
      slug: string;
      difficulty: string;
    };
  }[];
  questionBookmarks: {
    id: string;
    createdAt: Date;
    question: {
      id: string;
      title: string;
      slug: string;
      difficulty: string;
    };
  }[];
};

interface UsersListProps {
  users: UserWithActivity[];
}

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export function UsersList({ users }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithActivity | null>(null);
  const [activityModalOpen, setActivityModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const term = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    });
  }, [users, searchTerm]);

  const openUserActivity = (user: UserWithActivity) => {
    setSelectedUser(user);
    setActivityModalOpen(true);
  };

  return (
    <>
      <Card className="border-border/60 bg-card/40 backdrop-blur-md shadow-xs overflow-hidden select-none">
        <CardHeader className="space-y-4 pb-4 border-b border-border/40 px-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-bold text-foreground">
              User Directory ({filteredUsers.length})
            </CardTitle>

            <div className="relative w-full sm:w-72">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-xs border-border/60 bg-background/50"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No users found matching your search.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/40 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-muted-foreground h-11">User</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground h-11">Role</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground h-11">Joined</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground h-11">Likes</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground h-11">Bookmarks</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground h-11 text-right">Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const initials = user.name
                    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                    : "U";

                  return (
                    <TableRow key={user.id} className="border-border/40 hover:bg-card/70 transition-colors">
                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 rounded-full border border-border/50">
                            <AvatarImage src={user.image || undefined} alt={user.name} />
                            <AvatarFallback className="bg-[#FF5A26]/10 text-[#FF5A26] font-semibold text-[10px]">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-foreground">{user.name}</p>
                            <p className="truncate text-[10px] text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-3.5">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[9px] uppercase px-1.5 py-0 font-semibold border",
                            user.role === "ADMIN"
                              ? "bg-[#FF5A26]/10 text-[#FF5A26] border-[#FF5A26]/20"
                              : "border-border/60 text-muted-foreground"
                          )}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      <TableCell className="py-3.5">
                        <span className="text-[11px] text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>

                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>{user.questionLikes.length}</span>
                        </div>
                      </TableCell>

                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                          <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                          <span>{user.questionBookmarks.length}</span>
                        </div>
                      </TableCell>

                      <TableCell className="py-3.5 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-[11px] px-2.5 border-border/60"
                          onClick={() => openUserActivity(user)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* User Activity Modal */}
      <Dialog open={activityModalOpen} onOpenChange={setActivityModalOpen}>
        <DialogContent className="max-w-2xl rounded-2xl p-6 border-border/60 bg-card backdrop-blur-xl max-h-[85vh] overflow-y-auto select-none">
          {selectedUser && (
            <>
              <DialogHeader className="border-b border-border/40 pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-full border border-border/50">
                    <AvatarImage src={selectedUser.image || undefined} alt={selectedUser.name} />
                    <AvatarFallback className="bg-[#FF5A26]/10 text-[#FF5A26] font-semibold text-xs">
                      {selectedUser.name ? selectedUser.name.slice(0, 2).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-base font-bold text-foreground">
                      {selectedUser.name}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      {selectedUser.email} • Joined {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Liked Questions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Liked Questions ({selectedUser.questionLikes.length})
                    </h4>
                  </div>

                  {selectedUser.questionLikes.length === 0 ? (
                    <div className="p-4 rounded-xl border border-border/40 bg-muted/20 text-center text-xs text-muted-foreground">
                      No liked questions.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedUser.questionLikes.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-background/50"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-md px-1.5 py-0 text-[9px] font-semibold uppercase border shrink-0",
                                difficultyStyles[item.question.difficulty as keyof typeof difficultyStyles]
                              )}
                            >
                              {item.question.difficulty}
                            </Badge>
                            <span className="truncate text-xs font-semibold text-foreground">
                              {item.question.title}
                            </span>
                          </div>
                          <Button asChild size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-[#FF5A26] shrink-0">
                            <Link href={`/practice/${item.question.slug}`} target="_blank">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bookmarked Questions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Bookmarked Questions ({selectedUser.questionBookmarks.length})
                    </h4>
                  </div>

                  {selectedUser.questionBookmarks.length === 0 ? (
                    <div className="p-4 rounded-xl border border-border/40 bg-muted/20 text-center text-xs text-muted-foreground">
                      No bookmarked questions.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedUser.questionBookmarks.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-background/50"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-md px-1.5 py-0 text-[9px] font-semibold uppercase border shrink-0",
                                difficultyStyles[item.question.difficulty as keyof typeof difficultyStyles]
                              )}
                            >
                              {item.question.difficulty}
                            </Badge>
                            <span className="truncate text-xs font-semibold text-foreground">
                              {item.question.title}
                            </span>
                          </div>
                          <Button asChild size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-[#FF5A26] shrink-0">
                            <Link href={`/practice/${item.question.slug}`} target="_blank">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
