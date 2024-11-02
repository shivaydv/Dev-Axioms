import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <div className="w-screen min-h-screen ">
      <Navbar />
      {children}
    </div>
  );
}
