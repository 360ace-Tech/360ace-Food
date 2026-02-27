import type { Metadata } from "next";
import site from "@/data/site";
import articlesData from "@/data/articles.json" assert { type: "json" };

type Article = {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  date?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = (articlesData as Article[]).find((a) => a.slug === slug);
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

// For static export, generate the list of article paths at build time
export const dynamicParams = false;
export function generateStaticParams() {
  return (articlesData as Article[]).map((a) => ({ slug: a.slug }));
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
