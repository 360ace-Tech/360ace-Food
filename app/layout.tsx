import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MobileFloatNav from "@/components/MobileFloatNav";
import CustomCursor from "@/components/CustomCursor";
import site from "@/data/site";
import JsonLd from "@/components/JsonLd";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: `${site.url}${site.ogImage}`,
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: site.twitter.card,
    site: site.twitter.handle,
    creator: site.twitter.handle,
    title: site.title,
    description: site.description,
    images: [`${site.url}${site.ogImage}`],
  },
  applicationName: site.shortName,
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: site.url,
  },
};

// Control HTML caching of prerendered pages (helps avoid month-long caches)
export const revalidate = 300;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            name: site.name,
            url: site.url,
            sameAs: [],
            logo: {
              "@type": "ImageObject",
              url: `${site.url}${site.ogImage}`,
              width: 1200,
              height: 630,
            },
            description: site.description,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            name: site.title,
            url: site.url,
            publisher: { "@id": `${site.url}/#organization` },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${site.url}/#service`,
            name: site.name,
            url: site.url,
            logo: `${site.url}/favicon.png`,
            image: `${site.url}${site.ogImage}`,
            description: site.description,
            parentOrganization: { "@id": `${site.url}/#organization` },
            areaServed: [
              { "@type": "Country", name: "Canada" },
              { "@type": "AdministrativeArea", name: "Ontario" },
              { "@type": "AdministrativeArea", name: "British Columbia" },
              { "@type": "AdministrativeArea", name: "Alberta" },
            ],
            knowsAbout: [
              "Food Safety Consulting",
              "HACCP Programs",
              "GMP Training",
              "GHP Training",
              "CFIA Compliance",
              "SFCR Compliance",
              "BRCGS Readiness",
              "Food Import Compliance Canada",
              "ISO 9001:2015",
              "Laboratory Quality Assurance",
              "Regulatory Audit Readiness",
              "Lean Six Sigma Food Industry",
            ],
            sameAs: [],
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <MobileFloatNav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
