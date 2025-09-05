"use client"
import React, { ReactNode } from "react";
import { motion } from "motion/react";
import {
  type LucideIcon,
  BrainIcon,
  CodeIcon,
  BookOpen,
  User,
  CircleHelp,
  RocketIcon,
} from "lucide-react";

function Highlights(): React.ReactElement {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 border-border border-r border-b bg-background md:grid-cols-2 lg:grid-cols-3 "
      >
        <Highlight icon={BrainIcon} heading="Interview Questions">
          Comprehensive collection of technical interview questions.
        </Highlight>
        <Highlight icon={CodeIcon} heading="Interactive Playgrounds">
          Practice and master coding concepts with our interactive playgrounds.
        </Highlight>
        <Highlight icon={BookOpen} heading="Coding Round Preparation">
          Practice actual coding problems asked in coding rounds at top tech
          companies.
        </Highlight>
        <Highlight icon={User} heading="Community Contributions">
          It&apos;s open-source and anyone can contribute.
        </Highlight>
        <Highlight icon={CircleHelp} heading="Interview Tips">
          Get valuable tips and tricks to ace your technical interviews.
        </Highlight>
        <Highlight icon={RocketIcon} heading="Real-time Updates">
          Stay updated with the latest Tech and Interview trends.
        </Highlight>
      </motion.div>
    );
  }
  
  function Highlight({
    icon: Icon,
    heading,
    children,
  }: {
    icon: LucideIcon;
    heading: ReactNode;
    children: ReactNode;
  }): React.ReactElement {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-l border-t border-border px-6 py-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 flex flex-row items-center gap-2 text-muted-foreground"
        >
          <motion.div
            initial={{ scale: 0 }}
            viewport={{ once: true }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Icon className="size-4" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm font-medium"
          >
            {heading}
          </motion.h2>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className=""
        >
          {children}
        </motion.span>
      </motion.div>
    );
  }

  export default Highlights;