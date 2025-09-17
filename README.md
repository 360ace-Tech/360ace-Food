# 360ace.Food Website

A Next.js 14 marketing experience for Dr. Ifeoluwa Adekoya’s food consultancy. The project pairs a premium UI/motion system with templated content so updates can happen without touching core components.

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS with design tokens
- Framer Motion for transitions
- MDX/JSON content layer
- Resend for contact form email delivery

## Getting Started
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`.

## Content Management
Content lives in the `content/` directory. Edit the JSON or MDX files and restart the dev server if necessary.
- `content/services.json` – service clusters and bullet lists
- `content/process.json`, `content/stats.json`, `content/testimonials.json` – homepage data
- `content/blog/*.mdx` – long-form insight articles (frontmatter + MDX)

### Adding an Insight Article
1. Duplicate an existing file in `content/blog/`.
2. Update the frontmatter (`title`, `description`, `date`, `author`, `tags`, optional `heroImage`).
3. Add your MDX body.
4. Run `npm run dev` to preview.

## Assets
Brand assets should live under `public/`.
- `public/images/logo-light.png` – primary logo
- `public/favicon.png` – browser favicon

Swap the files with new exports and keep the same filenames to update branding.

## Contact Form & Resend
Create `.env.local` with:
```
RESEND_API_KEY=your-resend-api-key
CONTACT_FROM_EMAIL=360ace@yourdomain.com
CONTACT_TO_EMAIL=hello@360acefood.com
```
Emails render via `emails/contact-request.tsx`.

## Deployment Notes
- Run `npm run build` for lint/build.
- The repo uses Next.js fonts; ensure outbound network is allowed or replace with self-hosted fonts when building in restricted environments.

## Git & Hosting
1. `git init`
2. `git remote add origin https://github.com/adekoyadapo/360ace-Food`
3. `git add . && git commit -m "Initial import"`
4. `git push -u origin main`

## License
Proprietary. All rights reserved.
