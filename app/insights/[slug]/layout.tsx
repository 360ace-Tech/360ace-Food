import type { Metadata } from "next";
import site from "@/data/site";
import articles from "@/data/articles.json" assert { type: "json" };

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = (articles as any[]).find((a) => a.slug === params.slug);
  if (!article) return { title: site.title, description: site.description };
  return {
    title: `${article.title} — ${site.shortName}`,
    description: article.excerpt || site.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: `${article.title} — ${site.shortName}`,
      description: article.excerpt || site.description,
      url: `${site.url}/insights/${article.slug}`,
      images: [
        {
          url: article.image || site.ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: site.twitter.card,
      title: `${article.title} — ${site.shortName}`,
      description: article.excerpt || site.description,
    },
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

