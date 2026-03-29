export const site = {
  name: "360ace Food Consulting",
  shortName: "360ace.FOOD",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://360ace.food",
  title: "360ace Food Consulting — Precision Food Safety Consulting",
  description:
    "We deliver science-led food safety, regulatory, and quality assurance consulting for organizations ready to elevate compliance and consumer trust.",
  keywords: [
    "food safety consulting",
    "food quality assurance",
    "HACCP programs",
    "GMP training",
    "GHP training",
    "food regulatory compliance",
    "ISO 9001:2015",
    "food safety training",
    "laboratory QA",
    "food import compliance Canada",
    "BRCGS readiness",
    "CFIA guidance",
    "SFCR compliance",
    "food safety consultant Canada",
    "food science research support",
    "SOP development food manufacturing",
    "allergen management",
    "grant writing food research",
    "Lean Six Sigma food industry",
  ],
  ogImage: "/images/logo-light.png",
  twitter: {
    handle: "@360aceFood",
    card: "summary_large_image" as const,
  },
};

export default site;

