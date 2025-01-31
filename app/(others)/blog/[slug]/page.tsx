import { Typography } from "@/components/docs/typography";
import { buttonVariants } from "@/components/ui/button";
import { Author, getAllBlogStaticPaths, getBlogForSlug } from "@/lib/markdown";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import Image from "next/image";


type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;
  const res = await getBlogForSlug(slug);
  if (!res) return null;
  
  const { frontmatter } = res;
  
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      url: `https://dev-axioms.vercel.app/blog/${slug}`,
      images: [
        {
          url: frontmatter.cover || '/og-image.png', // Fallback to default if no cover
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
      publishedTime: frontmatter.date,
      authors: frontmatter.authors?.map(author => author.username) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [frontmatter.cover || '/og-image.png'],
    },
  };
}

export async function generateStaticParams() {
  const val = await getAllBlogStaticPaths();
  if (!val) return [];
  return val.map((it) => ({ slug: it }));
}

export default async function BlogPage(props: PageProps) {
  const params = await props.params;

  const {
    slug
  } = params;

  const res = await getBlogForSlug(slug);
  if (!res) notFound();
  return (
    <div className="lg:w-[70%] sm:[95%] md:[75%] mx-auto">
      <Link
        className={buttonVariants({
          variant: "link",
          className: "!mx-0 !px-0 mb-7 !-ml-1 ",
        })}
        href="/blog"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to blog
      </Link>
      <div className="flex flex-col gap-3  w-full border-b pb-6 ">
        <p className="text-muted-foreground text-sm">
          {formatDate(res.frontmatter.date)}
        </p>
        {/* <div className="mt-2 flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Posted by</p>
          <Authors authors={res.frontmatter.authors} />
        </div> */}
        <h1 className="sm:text-4xl text-3xl font-extrabold">
          {res.frontmatter.title}
        </h1>
      </div>
      <div className="!w-full">
          {
            res.frontmatter.cover && (
              <div className="w-full mt-6 aspect-video  content-center">
              <Image
                src={res.frontmatter.cover}
                alt="cover"
                width={700}
                height={400}
                className="w-full h-full rounded-md border object-cover"
              />
        </div>
            )
          }
        <Typography>{res.content}</Typography>
      </div>
    </div>
  );
}

// function Authors({ authors }: { authors: Author[] }) {
//   return (
//     <div className="flex items-center gap-8 flex-wrap">
//       {authors.map((author) => {
//         return (
//           <Link
//             href={author.handleUrl}
//             className="flex items-center gap-2"
//             key={author.username}
//           >
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={author.avatar} />
//               <AvatarFallback>
//                 {author.username.slice(0, 2).toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
//             <div className="">
//               <p className="text-sm font-medium">{author.username}</p>
//               <p className="font-code text-[13px] text-muted-foreground">
//                 @{author.handle}
//               </p>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }
