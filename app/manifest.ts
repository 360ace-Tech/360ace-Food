import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import site from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    // Use a single favicon with flexible sizing to avoid console warnings
    // when the actual pixel dimensions do not match declared sizes.
    icons: [{ src: "/favicon.png", sizes: "any", type: "image/png" }],
  };
}
