import React from "react";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";

const Page = async() => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading delay
  return (
    <div className="h-full ">
      <div
        className="absolute inset-x-0 top-[180px] h-[250px] z-[1] border-b"
        style={{
          background: `
      repeating-linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 10%, transparent) 0, color-mix(in srgb, var(--color-foreground) 10%, transparent) 1px, transparent 1px, transparent 50px),
      repeating-linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 10%, transparent) 0, color-mix(in srgb, var(--color-foreground) 10%, transparent) 1px, transparent 1px, transparent 50px)
    `,
        }}
      />

      <main className=" relative mx-auto w-full px-4 md:px-2 py-4 lg:py-8">
        <div
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-muted-foreground) 8%, transparent) 500px, transparent 1000px)",
          }}
        >
          <Hero />
          <Highlights />
        </div>
      </main>
    </div>
  );
};

export default Page;
