"use client";
import { Twitter, Linkedin, Facebook, Copy, Share2 } from "lucide-react";
import site from "@/data/site";

export default function ArticleShare({ title, slug }: { title: string; slug: string }) {
  const url = typeof window !== "undefined" ? window.location.href : `${site.url}/insights/${slug}`;
  return (
    <div className="flex items-center gap-3 ml-auto">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on X/Twitter"
        className="hover:text-brand transition-colors"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
        className="hover:text-brand transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"
        className="hover:text-brand transition-colors"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <button onClick={() => { navigator.clipboard?.writeText(url).catch(()=>{}); }} className="hover:text-brand transition-colors" aria-label="Copy link">
        <Copy className="w-4 h-4" />
      </button>
      <button className="hover:text-brand transition-colors" onClick={() => navigator.share?.({ title, url }).catch(()=>{})} aria-label="System share">
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}
