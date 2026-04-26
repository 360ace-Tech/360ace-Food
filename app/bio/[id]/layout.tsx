import type { Metadata } from "next";
import site from "@/data/site";
import data from "@/data/consultants.json" assert { type: "json" };

type Consultant = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string[];
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const consultant = (data as Consultant[]).find((c) => c.id === id);
  if (!consultant) return { title: site.title, description: site.description };

  const title = `${consultant.name} — ${site.shortName}`;
  // Use first bio paragraph as description (role field is empty for both consultants)
  const description =
    consultant.bio?.[0] ||
    `${consultant.name} is a food safety consultant at ${site.name}.`;
  const url = `${site.url}/bio/${consultant.id}`;
  const imageUrl = consultant.avatar
    ? consultant.avatar.startsWith("http") ? consultant.avatar : `${site.url}${consultant.avatar}`
    : `${site.url}${site.ogImage}`;

  return {
    title,
    description,
    keywords: [consultant.name, "food safety consultant", "food regulatory consultant", "quality assurance"].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: consultant.name }],
    },
    twitter: { card: site.twitter.card, title, description, images: [imageUrl] },
  };
}

export const dynamicParams = false;
export function generateStaticParams() {
  return (data as Consultant[]).map((consultant) => ({ id: consultant.id }));
}

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
