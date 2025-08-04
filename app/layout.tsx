import { baseUrl, keywords } from "@/lib/metadata";
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Metadata } from "next";
import Analytics from "@/analytics/analytics";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Dev Axioms",
    default: "Dev Axioms",
  },
  description:
    "All in one platform to learn and practice interview questions as a developer.",
  keywords: keywords,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geist.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen ">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
