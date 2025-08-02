import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex w-full justify-center min-h-0 flex-1">
        <div className="w-full max-w-[1250px] flex-1 ">{children}</div>
      </div>
    </div>
  );
}
