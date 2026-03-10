import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";

// Content-Security-Policy for this Next.js + GSAP + Cloudflare Turnstile site.
// 'unsafe-inline' for scripts is required by Next.js RSC/hydration chunks.
// 'unsafe-eval' is required by GSAP and Next.js dev mode.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://images.unsplash.com https://unsplash.com https://images.pexels.com",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'self'",
]
  .join("; ")
  .concat(";");

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // X-XSS-Protection is deprecated; setting to 0 disables the broken
          // XSS auditor in older browsers that could itself introduce vulnerabilities.
          { key: "X-XSS-Protection", value: "0" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          // Prevents Flash / PDF plugins from reading response body cross-origin
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          // Allows popups (needed by Cloudflare Turnstile) while keeping same-origin isolation
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport ? { unoptimized: true } : {}),
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
