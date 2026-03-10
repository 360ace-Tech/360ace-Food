import type { Metadata } from "next";
import site from "@/data/site";
import data from "@/data/consultants.json" assert { type: "json" };

type Consultant = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const consultant = (data as Consultant[]).find((c) => c.id === id);
  if (!consultant) return { title: site.title, description: site.description };
  const title = `${consultant.name} — ${site.shortName}`;
  const description = consultant.role;
  const url = `${site.url}/bio/${consultant.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      title,
      description,
      url,
      images: [{ url: consultant.avatar || site.ogImage, width: 1200, height: 630, alt: consultant.name }],
    },
    twitter: { card: site.twitter.card, title, description },
  };
}

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
