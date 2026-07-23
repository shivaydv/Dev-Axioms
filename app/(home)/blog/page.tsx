import Link from "next/link";
import { blog } from "@/lib/source";
import { PathUtils } from "fumadocs-core/source";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs - Dev Axioms",
  description: "Technical blogs on system architecture, React, and web engineering.",
};

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export default function BlogIndexPage(): React.ReactElement {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date((b.data.date as string) ?? b.slugs[0]).getTime() -
      new Date((a.data.date as string) ?? a.slugs[0]).getTime()
  );

  return (
    <div className="bg-background min-h-screen pb-20 pt-10">
      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
            Blogs & Articles
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Deep-dive technical breakdowns on production web architecture, system design, and modern software engineering.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => {
            const formattedDate = new Date(
              (post.data.date as string) ?? getName(post.path)
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            const authorName =
              typeof post.data.author === "string" ? post.data.author : null;

            return (
              <Link
                key={post.url}
                href={post.url}
                className="group rounded-xl border border-border/70 bg-card/40 hover:bg-card hover:border-border p-5 transition-all shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formattedDate}</span>
                    {authorName && (
                      <span className="font-medium text-foreground">{authorName}</span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
                    {post.data.title}
                  </h3>

                  {post.data.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {post.data.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#FF5A26]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
