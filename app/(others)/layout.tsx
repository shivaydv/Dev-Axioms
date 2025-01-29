import { Navbar } from "@/components/docs/navbar";
import { Footer } from "@/components/docs/footer";
import "@/styles/globals.css";

export default function Layout1({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="sm:container mx-auto w-[90vw] flex flex-col flex-1 scroll-smooth">
        {children}
      </main>
      <Footer />
    </div>
  );
}
