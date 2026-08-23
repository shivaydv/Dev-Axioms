import { Navbar } from "@/components/global/Navbar";
import React from "react";

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
