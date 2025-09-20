# Website Modernization Strategy

## Purpose & Alignment
- Anchor build strategy to `AGENT.md` mission: convey scientific excellence with premium brand polish and motion-rich storytelling.
- Ensure every implementation decision (stack, structure, workflow) reinforces the brand voice, IA, and animation system defined in the brief.

## Architecture Overview
- **Framework**: Next.js 14 (App Router) with TypeScript for type safety and file-based routing.
- **Styling**: Tailwind CSS layered with a custom design token system (`tokens.css` exported as CSS variables) to reflect the palette and typography from the brief.
- **State & Data**: Minimal global state via React Context for theming/reduced motion toggle; services and testimonials sourced from MDX or CMS.
- **Animations**: Framer Motion + GSAP-lite (via `gsap/ScrollTrigger`) for hero, scroll-triggered reveals, and micro-interactions; respect `prefers-reduced-motion`.
- **Forms & Email**: MailerSend API integration through Next.js Route Handlers for server-side email delivery.
- **Deployment**: Vercel with preview deployments for QA, leveraging Incremental Static Regeneration for content pages.

## Content Templating & Management
- Store structured content in `/content` as MDX/JSON (e.g., `services.mdx`, `awards.json`) enabling easy updates without code changes.
- Implement a thin content layer utility (`lib/content.ts`) that loads and normalizes data for components.
- Configure sanitised Markdown rendering via `next-mdx-remote` or `@content-collections/core` for typed queries.
- Provide admin-friendly documentation (`docs/content-updates.md`) describing update workflow, frontmatter fields, and preview steps.
- Optional future-proofing: integrate Sanity CMS or Contentful using GROQ/GraphQL adapters while keeping local MDX fallback.

## UX & Component Strategy
- Build a design system package under `src/design-system/` with base atoms (Button, Typography, Grid, Icon, Surface) and molecules (Hero, ServiceCard, ProcessTimeline, StatBlock, TestimonialSlider, CTASection, Footer).
- Apply 8pt spacing scale with CSS variables; enforce consistent responsive breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`).
- Implement layout structure: `app/(marketing)/layout.tsx` for nav/footer, `app/(marketing)/page.tsx` for homepage sections matching the IA.
- Provide accessible motion defaults: focus outlines, skip link, keyboard operable sliders, alt text guidelines.

## Animation & Motion Plan
- Centralize motion tokens (`motion.ts`) defining durations, easings, stagger intervals.
- Hero sequence: gradient canvas component with slow transform, headline fade/slide on mount, CTA spring.
- Scroll triggers: Intersection Observer hook to trigger Framer Motion variants; fallback to CSS transitions when JS disabled.
- Micro-interactions: Hover tilt using `react-use-gesture`, magnetic buttons with transform translate, parallax backgrounds via CSS `transform: translateZ` layers.
- Reduced motion: wrap animations in `useReducedMotion` checks and provide static alternatives.

## Contact & MailerSend Integration
- Create `app/api/contact/route.ts` handling POST requests, validating payload (name, email, organization, serviceNeed, message) with Zod.
- Call MailerSend's REST Email API via `fetch` to deliver transactional messages; template stored in `emails/contact-request.tsx` (string-based) referencing brand styling.
- Environment setup: require `MAILERSEND_API_TOKEN` (securely via `.env.local` or Netlify env vars), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- Frontend form component (`ContactForm.tsx`) with client-side validation, loading states, error handling, and success toast.
- Include spam prevention (bot-field honeypot + rate limiting via `@upstash/ratelimit` or custom middleware if desired).

## Workflow & Agent Roles
1. **Brand & UX Agent**
   - Translate visual direction into moodboards and Figma components.
   - Produce responsive layouts, animation prototypes, and asset specs.
2. **Content & Strategy Agent**
   - Rewrite services and bio into conversion-focused copy; maintain MDX library and SEO schema definitions.
   - Coordinate asset production (logos, photography) and ensure accessibility of language.
3. **Engineering Agent**
   - Scaffold Next.js project, integrate Tailwind, motion library, and content layer.
   - Implement components, connect MailerSend, configure deployment pipeline.
4. **QA & Performance Agent**
   - Run automation (Playwright/Lighthouse) on preview builds, enforce accessibility and performance budgets.

## Implementation Roadmap
1. **Week 0** – Kickoff: approve strategy, confirm palette/logo direction, set up repositories and Vercel project.
2. **Week 1** – Design System & Content Modeling: finalize tokens, create component library in Figma, define content schemas/MDX structure.
3. **Week 2** – Build Core Pages: implement homepage sections, navigation, footer, CTA band, integrate content data.
4. **Week 3** – Motion & Integrations: layer in animations, build contact page with MailerSend, wire up analytics and scheduling embeds; introduce hover/gesture micro-interactions across hero, services, process, testimonials.
5. **Week 4** – QA & Launch Prep: cross-browser testing, SEO/performance audits, finalize assets, plan rollout.

## Deliverables & Checkpoints
- Architecture diagram and repo scaffold (`docs/architecture.md`).
- Content model reference sheets and sample MDX entries.
- Component Storybook showcasing hero, cards, timelines, sliders with motion states.
- MailerSend integration checklist: env variables verified, template tests passed, fallback email copy.
- Launch readiness report summarizing testing results, performance scores, and outstanding tasks.

## Dependencies & Open Questions
- Confirm selection or commissioning of final logo assets (per `AGENT.md`).
- Decide on initial CMS (local MDX vs headless) based on stakeholder preference and budget.
- Verify availability of authoritative testimonials/case studies to populate MVP.
- Determine analytics and consent management platform (Plausible vs GA4 + Cookiebot).

## Next Steps
- Approve this strategy, assign agent leads, and kickstart Week 0 checklist.
- Spin up shared project management board mapping roadmap milestones to tasks.
- Schedule standing design/dev syncs for rapid feedback on motion and content.
- Plan future interaction experiments (magnetic CTA buttons, pointer-reactive hero backgrounds, scroll-linked data visualizations) to keep UI/UX evolving post-launch.
