import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MobileFloatNav from "@/components/MobileFloatNav";
import CustomCursor from "@/components/CustomCursor";
import site from "@/data/site";
import JsonLd from "@/components/JsonLd";

const bodyFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

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
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: site.twitter.card,
    title: site.title,
    description: site.description,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
};

// Control HTML caching of prerendered pages (helps avoid month-long caches)
export const revalidate = 300;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased`} suppressHydrationWarning>
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            sameAs: [],
            logo: site.ogImage,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.title,
            url: site.url,
            potentialAction: {
              "@type": "SearchAction",
              target: `${site.url}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
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
