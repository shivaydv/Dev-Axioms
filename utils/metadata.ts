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

export const keywords = [
  "web development",
  "interview preparation",
  "coding interviews",
  "programming concepts",
  "software engineering",
  "technical interviews",
  "web technologies",
  "JavaScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "Dev Axioms",
  "dev axioms",
  "dev-axioms",
];
