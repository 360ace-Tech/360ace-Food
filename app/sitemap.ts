import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import site from "@/data/site";
import articlesData from "@/data/articles.json" assert { type: "json" };
import consultantsData from "@/data/consultants.json" assert { type: "json" };

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/insights`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/self-check`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = (articlesData as { slug: string; date?: string }[]).map((a) => ({
    url: `${site.url}/insights/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const bioRoutes: MetadataRoute.Sitemap = (consultantsData as { id: string }[]).map((c) => ({
    url: `${site.url}/bio/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...bioRoutes];
}
