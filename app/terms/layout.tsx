import type { Metadata } from "next";
import site from "@/data/site";

const title = "Terms of Service";
const description =
  "Read the website terms for using 360ace Food Consulting content, inquiries, and consulting service information.";
const url = `${site.url}/terms`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title,
    description,
    url,
    images: [{ url: `${site.url}${site.ogImage}`, width: 1200, height: 630, alt: site.name }],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
