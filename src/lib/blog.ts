import path from 'path';
import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactNode } from 'react';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
  heroImage?: string;
  tags?: string[];
};

export type BlogSummary = BlogFrontmatter & {
  slug: string;
};

export async function getBlogSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}

export async function getBlogSummaries(): Promise<BlogSummary[]> {
  const slugs = await getBlogSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
      const source = await fs.readFile(filePath, 'utf8');
      const { frontmatter } = await compileMDX<BlogFrontmatter>({
        source,
        options: { parseFrontmatter: true }
      });

      return {
        slug,
        ...frontmatter
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

export async function getBlogPost(slug: string): Promise<{
  frontmatter: BlogFrontmatter & { slug: string };
  content: ReactNode;
}> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    const source = await fs.readFile(filePath, 'utf8');
    const { frontmatter, content } = await compileMDX<BlogFrontmatter>({
      source,
      options: { parseFrontmatter: true }
    });

    return {
      frontmatter: { ...frontmatter, slug },
      content
    };
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    throw error;
  }
}
