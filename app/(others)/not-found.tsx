import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-2 h-full flex-1 flex flex-col gap-4 items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center w-fit gap-2 ">
        <h2 className="text-7xl font-bold pr-1">404</h2>
        <p className="text-muted-foreground text-md font-medium">
          Page not found {":("}
        </p>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
      <Link href="/" className={buttonVariants({})}>
        Back to homepage
      </Link>
    </div>
  );
}
