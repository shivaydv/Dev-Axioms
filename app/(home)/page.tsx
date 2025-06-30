import React from "react";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";

const Page = () => {
  return (
    <div className="h-full ">
      {/* <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  className="absolute inset-x-0 top-[180px] h-[250px] z-[1] border-b"
  style={{
    background:
      "repeating-linear-gradient(to right, red 1px, red 1px, transparent 1px, transparent 50px), linear-gradient(white, white)",
  }}  
/> */}

      <main className=" relative mx-auto w-full px-4 md:px-2 py-4 lg:py-8">
        <div
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)",
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
