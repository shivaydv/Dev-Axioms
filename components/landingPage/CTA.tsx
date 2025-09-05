"use client";
import React from "react";
import { motion } from "motion/react";

export const GradientSvg = `<svg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='0.65' 
      numOctaves='3' 
      stitchTiles='stitch'/>
  </filter>
  
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>`;

function CTA(): React.ReactElement {
  return (
    <section className="relative px-4 py-8 md:px-6 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-2 py-8 select-none md:h-[300px] md:p-12"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 70% 10%, rgba(255,50,100,0.5), transparent)",
            "radial-gradient(circle at 0% 80%, rgba(190,0,255,0.5), transparent)",
            "radial-gradient(circle at 50% 50%, rgba(50,50,255,0.3), transparent)",
            `url("data:image/svg+xml,${encodeURIComponent(GradientSvg)}")`,
          ].join(", "),
        }}
      >
        <div className="relative flex h-full flex-col items-center justify-center space-y-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-xl font-semibold md:text-4xl"
          >
            Ace Your Dev Interviews
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xs text-sm text-white/60 md:max-w-md md:text-xl"
          >
            All in one platform to learn and practice interview questions as a
            developer.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
