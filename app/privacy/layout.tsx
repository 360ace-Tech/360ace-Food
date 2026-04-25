import type { Metadata } from "next";
import site from "@/data/site";

const title = "Privacy Policy";
const description =
  "Review how 360ace Food Consulting collects, uses, and protects personal information submitted through the website and consulting inquiries.";
const url = `${site.url}/privacy`;

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

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
