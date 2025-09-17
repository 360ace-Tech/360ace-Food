# Food Consultancy Website Agent Brief

## Mission
Build a flagship marketing website for Dr. Ifeoluwa Adekoya’s food consultancy that mirrors the polish and storytelling quality of top-tier brands (think Apple, Stripe, IDEO). The experience must fuse scientific credibility with modern luxury—clean layouts, confident typography, cinematic motion, and effortless navigation.

## Core Objectives
- Convey trust, expertise, and innovation in food safety and quality assurance.
- Highlight services and differentiators with clear value-driven messaging.
- Showcase Dr. Adekoya’s credentials, achievements, and recognitions as social proof.
- Capture leads through prominent, low-friction calls to action (consultation booking, contact form, newsletter).
- Deliver a responsive, performant experience with sophisticated but purposeful animations.

## Target Audience & Mindset
- Food manufacturers, SMEs, and enterprise quality teams seeking regulatory guidance.
- Research institutions and NGOs looking for training partners or consultants.
- Corporate decision-makers who value science-backed solutions delivered with premium service.
- Users expect clarity, credibility, and ease; reduce cognitive load with progressive disclosure.

## Brand Voice & Story Pillars
- Voice: assured, precise, empathetic, forward-looking.
- Tagline directions: “Engineering Safer Food Systems” / “Precision Food Safety Consulting.”
- Messaging pillars: Regulatory mastery, tailored training, research leadership, measurable impact.
- Microcopy must pair scientific terminology with accessible explanations; avoid jargon walls by layering detail behind toggles or accordions.

## Visual Direction
- Overall aesthetic: spacious, high-contrast, subtly textured backgrounds with gradients or soft glassmorphism to imply modern lab sophistication.
- Color palette concept: deep navy or charcoal base (#0B1A2A), accent orange-gold (#F7A600) for energy, secondary mint or sage (#4FB8A0) for freshness, neutral warm gray (#F5F7FA) for backgrounds.
- Typography: Pair a sharp sans-serif display (e.g., Neue Haas Grotesk, Work Sans) with a humanist body font (e.g., Inter, Source Sans). Use generous letter spacing in headers, 8-point grid for consistency.
- Photography & imagery: hero imagery of lab environments and fresh produce, macro shots of quality control processes. Blend with abstract scientific overlays (mesh gradients, contour lines).
- Iconography: minimal line icons with rounded corners; leverage duotone treatment using primary + neutral.

## Logo & Identity Guidance
- Commission or design a badge featuring initials “IA” abstracted into a shield or molecular motif, symbolizing protection and precision.
- Explore circular emblem with dot matrices referencing microbiology, paired with logotype set in the chosen display typeface.
- Provide primary, monochrome, and white-on-dark variants; export in SVG, PNG, and favicon sizes.

## Information Architecture
1. **Hero**: bold headline, value prop, subtext referencing expertise, CTA buttons (“Book a Consultation”, “Explore Services”), background video or animated gradient.
2. **Trusted By / Stats Strip**: logos or statistical proof (years of experience, industries served, certifications, publications).
3. **Services & Solutions**: cluster offerings into categories (Training, Compliance, Research, Product Development); rely on interactive cards linking to detail modals or subpages. Populate from `content.md` service list.
4. **Approach & Process**: 4–5 step timeline (Assess → Design → Implement → Monitor → Elevate) with subtle scroll-triggered reveals.
5. **Featured Expertise**: profile of Dr. Adekoya with high-resolution portrait, credentials, awards, publications; include slider for recognitions (AWARD Fellowship, L’Oréal-UNESCO, etc.).
6. **Impact Stories**: case study carousel or dynamic grid with hover states; incorporate metrics (compliance rate, training satisfaction).
7. **Resources & Insights**: blog teaser, downloadable checklists, webinar promotions.
8. **Testimonials**: animated testimonial cards with parallax background.
9. **CTA Band**: anchor conversion with contrasting color, contact details, scheduling widget embed.
10. **Footer**: quick links, certifications badges, newsletter signup, social links, privacy/legal.

## UX & Interaction Principles
- Maintain consistent spacing (8/16/24/48px rhythm) across components.
- Use sticky nav with slight translucency and blur when scrolling, revealing progress indicator.
- Ensure WCAG AA compliance: contrast ratios, focus states, skip links, semantic HTML.
- Provide clear pathways to contact from any section; sticky quick action button on mobile.
- Balance motion and performance—prefer hardware-accelerated transforms, limit simultaneous animations.

## Animation & Motion System
- Hero: gradient background slowly animates; headline fades and slides, CTA buttons spring in with slight delay.
- Scroll-trigger: use GSAP or Framer Motion to animate cards (3D tilt on hover), process timeline (connector line draws in), statistic counters.
- Micro-interactions: magnetic buttons, subtle parallax on imagery, reveal masks on content blocks.
- Page transitions: fade-through with scale to maintain continuity between sections; ensure quick (<400ms).
- Accessibility: provide reduced motion alternative via CSS `prefers-reduced-motion` media query.

## Component Library Checklist
- Navigation bar with mega-menu for Services/Resources.
- Responsive hero module supporting text + media, overlay gradient, decorative abstract motif.
- Service card variations (icon + text, expandable detail) with consistent icon set.
- Process timeline component with numbered steps, icons, supporting copy.
- Testimonial slider with autoplay (pause on hover/focus) and keyboard controls.
- Stat highlight blocks using animated counters.
- CTA panels and inquiry form (name, email, organization, service need, message).
- Footer with column grid, newsletter form validation messaging.

## Content Integration Notes
- Extract service offerings exactly as listed in `content.md`; group logically and rewrite in business-outcome language.
- Summarize Dr. Adekoya’s bio into hero subcopy + dedicated section; include awards, publications count, collaboration mentions.
- Provide downloadable PDF one-pagers or training brochures; placeholder copy until assets delivered.
- Ensure CMS-ready structure for future blog/resources (consider MDX or headless CMS schema definitions).

## Technical Implementation Suggestions
- Recommended stack: Next.js 14 (App Router), TypeScript, Tailwind CSS or CSS Modules with design tokens, Framer Motion for animations, Sanity/Contentful for CMS.
- Use responsive images (Next.js `<Image>`), LQIP placeholders, WebP/AVIF formats.
- Implement global design tokens (colors, typography, spacing) via CSS variables.
- Optimize lighthouse metrics: prefetch routes, lazy load non-critical components, compress assets.
- Integrate analytics (Plausible or GA4) and privacy consent banner.
- Consider integrating Calendly or SavvyCal for scheduling CTA.

## Asset Production To-Do
- Professional photo shoot or curated stock for lab environments and consultant portrait.
- Design custom icon set aligned with brand palette.
- Produce motion graphic overlays or looping background video.
- Gather partner logos, certification badges, client testimonials (with permission).
- Compile downloadable resources (service brochures, training outlines).

## QA & Launch Checklist
- Cross-browser test (Chrome, Safari, Firefox, Edge) and responsive breakpoints (320px → 1440px+).
- Validate HTML, aria labels, tab order, and forms (server + client side).
- Run performance audits (Lighthouse ≥ 90 on mobile/desktop).
- Verify SEO essentials: meta tags, structured data (`Organization`, `Person`, `Service` schemas), sitemap, robots.txt.
- Set up 404/500 pages with branded illustration and quick navigation.
- Prepare deployment pipeline (Vercel/GitHub Actions), staging review, production release.

## Next Actions for the Agent
1. Translate this brief into component-level tasks (design system setup, IA wireframes, motion prototypes).
2. Produce moodboard and visual explorations for stakeholder review.
3. Develop high-fidelity designs and interactive prototypes (Figma preferred).
4. Implement frontend with chosen stack, iterating on motion and accessibility testing.
5. Collect feedback, iterate, and prepare launch assets/documentation.
