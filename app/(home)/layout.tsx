import type { ReactNode } from "react";
import { Navbar } from "@/components/global/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex w-full justify-center min-h-0 flex-1 relative">
        <div className="w-full flex-1">{children}</div>
      </div>
    </div>
  );
}
