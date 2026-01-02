export const site = {
  name: "360ace Food Consulting",
  shortName: "360ace.FOOD",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://360ace-food.vercel.app",
  title: "360ace Food Consulting — Precision Food Safety Consulting",
  description:
    "We deliver science-led food safety, regulatory, and quality assurance consulting for organizations ready to elevate compliance and consumer trust.",
  keywords: [
    "food safety consulting",
    "food quality assurance",
    "HACCP programs",
    "GMP training",
    "food regulatory compliance",
    "ISO 9001:2015",
    "food safety training",
    "laboratory QA",
    "food import compliance",
    "BRCGS readiness",
    "CFIA guidance",
  ],
  ogImage: "/images/logo-light.png",
  twitter: {
    handle: "@360aceFood",
    card: "summary_large_image" as const,
  },
};

export default site;

