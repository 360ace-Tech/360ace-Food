import type { Metadata } from "next";
import site from "@/data/site";

const title = "Food Safety System Self-Check";
const description =
  "Use our free food safety system self-check tool to assess how well your current compliance framework holds up under real operational conditions — and identify the gaps before an audit does.";
const url = `${site.url}/self-check`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title,
    description,
    url,
    images: [{ url: `${site.url}${site.ogImage}`, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function SelfCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
