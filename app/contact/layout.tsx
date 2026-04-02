import type { Metadata } from "next";
import site from "@/data/site";

const title = "Book a Consultation";
const description =
  "Connect with 360ace Food Consulting to discuss your food safety, regulatory compliance, or quality assurance needs. Book a consultation and start building a stronger food safety system today.";
const url = `${site.url}/contact`;

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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
