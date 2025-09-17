# Updating Site Content

This site uses structured JSON files inside `/content` so non-developers can refresh copy without touching components.

## Service Offerings
- File: `content/services.json`
- Each object represents a service cluster with a description and bullet list.
- Keep the array order to influence on-page layout.

## Process, Insights, Testimonials, Stats
- Files: `content/process.json`, `content/insights.json`, `content/testimonials.json`, `content/stats.json`
- Add, remove, or reorder items as needed. Titles and descriptions render automatically.

## Recognitions & Bio Highlights
- File: `content/recognitions.json`
- Use this for awards and partnerships referenced in the expertise section.

## Blog Articles
- Location: `content/blog/*.mdx`
- Each file begins with frontmatter fields (`title`, `description`, `date`, `author`, optional `tags`, `heroImage`).
- Body content is written in MDX—standard Markdown plus React components if needed.
- Add new posts by duplicating an existing file, updating the frontmatter, and saving with a new slug (filename).

Edit the JSON or MDX files, then run `npm run dev` locally to preview.
