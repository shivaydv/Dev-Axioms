import type { ReactNode } from "react";
import Navbar from "@/components/docs/Navbar";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { BaseOptions } from "@/lib/source";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <HomeLayout {...BaseOptions}>
      {children}
    </HomeLayout>
  );
}
