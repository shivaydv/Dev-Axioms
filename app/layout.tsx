import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { defaultSEOConfig } from "@/lib/seo-config";

const GeistSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: "400",
});

const GeistMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-axioms.vercel.app"),
  title: {
    default: defaultSEOConfig.defaultTitle,
    template: defaultSEOConfig.titleTemplate,
  },
  description: defaultSEOConfig.description,
  keywords: defaultSEOConfig.additionalMetaTags[0].content,
  openGraph: {
    type: "website",
    siteName: defaultSEOConfig.openGraph.siteName,
    locale: defaultSEOConfig.openGraph.locale,
    url: defaultSEOConfig.openGraph.url,
    images: defaultSEOConfig.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    site: defaultSEOConfig.twitter.site,
    creator: defaultSEOConfig.twitter.handle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable}  font-regular antialiased tracking-wide`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

type DynamicMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function generateDynamicMetadata({
  title,
  description,
  path = "",
  image,
}: DynamicMetadataProps) {
  const fullTitle = title 
    ? `${title} | ${defaultSEOConfig.defaultTitle}`
    : defaultSEOConfig.defaultTitle;
    
  const fullDescription = description || defaultSEOConfig.description;
  const url = `${defaultSEOConfig.openGraph.url}${path}`;
  
  return {
    title: fullTitle,
    description: fullDescription,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      images: image ? [{ url: image }] : defaultSEOConfig.openGraph.images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: image ? [image] : defaultSEOConfig.openGraph.images,
    },
  };
}
