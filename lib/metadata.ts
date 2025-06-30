import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    // openGraph: {
    //   title: override.title ?? undefined,
    //   description: override.description ?? undefined,
    //   url: 'https://devaxioms.vercel.app',
    //   images: '/images/repo-banner.png',
    //   siteName: 'Fumadocs',
    //   ...override.openGraph,
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   creator: '@shivaydv',
    //   title: override.title ?? undefined,
    //   description: override.description ?? undefined,
    //   images: '/images/repo-banner.png',
    //   ...override.twitter,
    // },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' || !process.env.VERCEL_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_URL}`);


export const keywords = ["web development", "interview preparation", "coding interviews", "programming concepts", "software engineering", "technical interviews", "web technologies", "JavaScript", "React", "Node.js", "HTML", "CSS", "Dev Axioms","dev axioms","dev-axioms"];