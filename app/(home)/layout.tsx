import type { ReactNode } from "react";
import Navbar from "@/components/docs/Navbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <div className="w-screen min-h-screen ">
      <Navbar float />
      {children}
    </div>
  );
}
