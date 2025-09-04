"use client"
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
    <section className="relative py-8 md:py-16 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden  rounded-3xl p-2 py-8 md:p-12 md:h-[300px] select-none"
          style={{
            backgroundImage: [
              'radial-gradient(circle at 70% 10%, rgba(255,50,100,0.5), transparent)',
              "radial-gradient(circle at 0% 80%, rgba(190,0,255,0.5), transparent)",
              "radial-gradient(circle at 50% 50%, rgba(50,50,255,0.3), transparent)",
              `url("data:image/svg+xml,${encodeURIComponent(GradientSvg)}")`,
            ].join(", "),
          }}
        >
          <div className="relative text-center text-white space-y-4 flex flex-col justify-center items-center h-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-4xl text-center  font-semibold "
            >

              Ace Your Dev Interviews

            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-xl max-w-xs text-white/60 md:max-w-md mx-auto"
            >
              All in one platform to learn and practice interview questions as a developer.
            </motion.p>
          </div>
        </motion.div>
    </section>
  );
}

export default CTA;
