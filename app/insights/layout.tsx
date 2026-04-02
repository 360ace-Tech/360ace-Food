import type { Metadata } from "next";
import site from "@/data/site";

const title = "Insights & Articles";
const description =
  "Food safety insights, regulatory updates, and industry best practices from 360ace Food Consulting. Curated articles to keep quality teams proactive and informed.";
const url = `${site.url}/insights`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title,
    description,
    url,
    images: [{ url: `${site.url}${site.ogImage}`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
