import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import site from "@/data/site";
import articles from "@/data/articles.json" assert { type: "json" };

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: new Date() },
    { url: `${site.url}/insights`, lastModified: new Date() },
    { url: `${site.url}/contact`, lastModified: new Date() },
    { url: `${site.url}/privacy`, lastModified: new Date() },
    { url: `${site.url}/terms`, lastModified: new Date() },
  ];

  const articleRoutes: MetadataRoute.Sitemap = (articles as any[]).map((a) => ({
    url: `${site.url}/insights/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
  }));

  return [...staticRoutes, ...articleRoutes];
}
