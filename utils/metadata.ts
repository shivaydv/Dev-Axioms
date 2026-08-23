import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://devaxioms.vercel.app`);


export const githubContentConfig = {
  owner: "shivaydv",
  repo: "Dev-Axioms",
}

export const keywords = [
  // Core Brand
  "Dev Axioms",
  "dev axioms",
  "dev-axioms",
  "DevAxioms",
  "Dev Axioms platform",
  
  // Creator / Personal Branding
  "Shiva Yadav",
  "shiva yadav",
  "shivaydv",
  "Shiva Yadav Developer",
  "Shiva Yadav Portfolio",
  
  // Specific Features & Playgrounds
  "Dev Axioms Blog",
  "Dev Axioms Playground",
  "JS Playground",
  "JavaScript Playground",
  "React Playground",
  "React.js Playground",
  "Web Playground",
  "HTML CSS JS Playground",
  "Online code editor",
  "In-browser IDE",
  "Cloud IDE",
  "Interactive coding environment",
  
  // Educational & Interview Prep
  "Dev Axioms documentation",
  "Learn Web Development",
  "web development",
  "frontend engineering",
  "interview preparation",
  "coding interviews",
  "machine coding round",
  "frontend interview prep",
  "system design",
  "data structures and algorithms",
  "DSA in JavaScript",
  "programming concepts",
  "software engineering",
  "technical interviews",
  "coding challenges",
  
  // Technologies & Languages
  "web technologies",
  "JavaScript",
  "TypeScript",
  "React",
  "React.js",
  "Next.js",
  "Node.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Web3",
  
  // Long-tail Keywords
  "how to practice React online",
  "free online JavaScript compiler",
  "frontend developer resources",
  "best site for frontend interview prep",
  
  // Advanced Frameworks & Tools
  "Next.js tutorial",
  "React Server Components",
  "Tailwind CSS templates",
  "Framer Motion animations",
  "Zustand state management",
  "Redux toolkit",
  "Vite.js build tool",
  "Webpack configuration",
  "Babel transpiler",
  
  // Specific Interview Topics
  "debouncing and throttling in js",
  "event loop in javascript",
  "closures in javascript",
  "hoisting in js",
  "promises and async await",
  "react custom hooks",
  "useMemo vs useCallback",
  "virtual DOM explained",
  "CSS flexbox vs grid",
  "responsive web design",
  "web accessibility (a11y)",
  
  // Competitive Programming & DSA
  "leetcode solutions javascript",
  "hackerRank javascript practice",
  "blind 75 leetcode",
  "graphs and trees in js",
  "dynamic programming tutorial",
  "sorting algorithms visualization",
  "time and space complexity",
  "Big O notation",
  
  // Miscellaneous / Catch-All
  "open source developer tools",
  "best coding platform 2026",
  "Shivaydv GitHub",
  "live code sharing",
  "pair programming online",
  "frontend mentor challenges",
  "web3 development",
  "smart contract development",
  "blockchain engineering",
  
  // Brand Specific Expanded
  "Dev Axioms Community",
  "Dev Axioms Practice",
  "Dev Axioms Pro",
  "Dev Axioms Open Source",
  "Dev Axioms by Shiva Yadav",
  "DevAxioms Tutorials",
  "Dev-Axioms Guides",
  "Dev Axioms Platform",
  "Dev Axioms UI",
  "Dev Axioms Code",
  "Dev Axioms Algorithms",
  "Dev Axioms Web",
  "Dev Axioms Fullstack",
  "The Dev Axioms Way"
];
