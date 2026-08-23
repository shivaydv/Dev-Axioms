import { MetadataRoute } from "next";
import { webdev, web3, blog } from "@/lib/source";
import { baseUrl } from "@/utils/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rootUrls = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/playground/javascript`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/playground/react`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/playground/web`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Blog posts
  const blogUrls = blog.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.data.date ? new Date(page.data.date as string) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Web-dev docs pages
  const webdevUrls = webdev.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Web3 docs pages
  const web3Urls = web3.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));



  return [...rootUrls, ...blogUrls, ...webdevUrls, ...web3Urls];
}
