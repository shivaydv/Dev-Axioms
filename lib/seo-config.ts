export const defaultSEOConfig = {
  defaultTitle: "Dev Axioms - Technical Interview Preparation Platform",
  titleTemplate: "%s | Dev Axioms",
  description: "Comprehensive platform for technical interview preparation, featuring interactive playgrounds, coding challenges, and in-depth tutorials.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev-axioms.vercel.app/",
    siteName: "Dev Axioms",
    images: [
      {
        url: "/repo-banner.png", // TODO: Change this to the actual banner image og-image.png
        width: 1200,
        height: 630,
        alt: "Dev Axioms",
      },
    ],
  },
  twitter: {
    handle: "@shivay1256",
    site: "@shivay1256",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "technical interviews, coding practice, web development, programming tutorials, interview preparation, coding challenges, frontend development, backend development, system design, dev axioms, dev axioms blog, dev axioms playground, dev axioms interview, dev axioms tutorial, dev axioms coding, dev axioms practice, dev axioms learn, dev axioms interview preparation, dev axioms coding challenges, dev axioms frontend development, dev axioms backend development, dev axioms system design, shiva yadav , shiva yadav jhansi , shiva yadav dev axioms, shiva yadav developer",
    },
  ],
}; 