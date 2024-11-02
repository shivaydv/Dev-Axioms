import Link from "next/link";
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center p-4 bg-fd-background">
      <h1 className="text-2xl font-semibold">Welcome to Dev Axioms</h1>
      <p className="text-fd-muted-foreground">
        You can open{" "}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{" "}
        and see the documentation.
      </p>
    </main>
  );
}
