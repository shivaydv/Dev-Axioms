import Link from "next/link";
import { blog } from "@/lib/source";
import { PathUtils } from 'fumadocs-core/source';


function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export default function Page(): React.ReactElement {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date((b.data.date as string) ?? b.slugs[0]).getTime() -
      new Date((a.data.date as string) ?? a.slugs[0]).getTime()
  );

  const svg = `<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='0.65' 
      numOctaves='3' 
      stitchTiles='stitch'/>
  </filter>
  
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>`;

  return (
    <main className="mx-auto w-full max-w-page px-4 pb-12 md:py-12">
      <div
        className="relative dark mb-4 aspect-[9.16] p-8 z-2 md:p-12"
        style={{
          backgroundImage: [
            // 'radial-gradient(circle at 70% 10%, rgba(255,50,100,0.5), transparent)',
            "radial-gradient(circle at 0% 80%, rgba(190,0,255,0.5), transparent)",
            "radial-gradient(circle at 50% 50%, rgba(50,50,255,0.3), transparent)",
            `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
          ].join(", "),
        }}
      >
         <h1 className="mb-4 text-3xl text-landing-foreground font-mono font-medium">
         DEV AXIOMS BLOGS
        </h1>
        <p className="text-sm font-mono text-landing-foreground-200">
          Ace Your Dev Interviews
        </p>
      </div>
       <div className="grid grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="flex flex-col bg-fd-card rounded-2xl border shadow-sm p-4 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <p className="font-medium">{post.data.title}</p>
            <p className="text-sm text-fd-muted-foreground line-clamp-1">{post.data.description}</p>

            <p className="mt-auto pt-4 text-xs text-brand">
              {new Date((post.data.date as string) ?? getName(post.path)).toDateString()}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
