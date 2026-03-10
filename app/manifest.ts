import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import site from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    lang: "en",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#059669",
    categories: ["business", "food"],
    icons: [
      {
        src: "/favicon.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        purpose: "maskable" as any,
      },
    ],
  };
}
