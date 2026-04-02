import type { Metadata } from "next";
import site from "@/data/site";
import articlesData from "@/data/articles.json" assert { type: "json" };

type Article = {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  date?: string;
  author?: string;
  category?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = (articlesData as Article[]).find((a) => a.slug === slug);
  if (!article) return { title: site.title, description: site.description };

  const title = article.title;
  const description = article.excerpt || site.description;
  const url = `${site.url}/insights/${article.slug}`;
  const imageUrl = article.image
    ? article.image.startsWith("http") ? article.image : `${site.url}${article.image}`
    : `${site.url}${site.ogImage}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: article.date,
      authors: article.author ? [article.author] : undefined,
      section: article.category,
      images: [{ url: imageUrl, width: 1200, height: 800, alt: article.imageAlt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const dynamicParams = false;
export function generateStaticParams() {
  return (articlesData as Article[]).map((a) => ({ slug: a.slug }));
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
