import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex w-full justify-center">
        <div className="w-full max-w-[1250px]">{children}</div>
      </div>
    </div>
  );
}
