"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import articles from "@/data/articles.json";

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".article-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".article-content > *", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      });
    });
    return () => ctx.revert();
  }, []);

  if (!article) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-display font-bold text-3xl text-dark mb-4">
              Article not found
            </h1>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-brand hover:text-brand/70"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to insights
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Find related articles (same category, exclude current)
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <>
      <Navigation />

      {/* Article Header */}
      <article className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          {/* Back link */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral hover:text-brand transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all insights
          </Link>

          {/* Header */}
          <div className="article-header">
            {/* Category badge */}
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-light text-brand border border-brand-subtle">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-dark mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-neutral leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral pb-8 border-b border-neutral/10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-light flex items-center justify-center">
                  <span className="font-display font-bold text-brand text-sm">
                    {article.author.split(" ")[0].charAt(0)}
                    {article.author.split(" ")[1]?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-dark">{article.author}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <button className="flex items-center gap-2 hover:text-brand transition-colors ml-auto">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="my-12 relative h-96 rounded-3xl overflow-hidden bg-slate-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="article-content prose prose-lg max-w-none">
            {article.content.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={index} className="text-neutral leading-relaxed mb-6">
                      {block.text}
                    </p>
                  );
                case "heading":
                  return (
                    <h2
                      key={index}
                      className="font-display font-bold text-3xl text-dark mt-12 mb-6 tracking-tight"
                    >
                      {block.text}
                    </h2>
                  );
                case "subheading":
                  return (
                    <h3
                      key={index}
                      className="font-display font-semibold text-2xl text-dark mt-8 mb-4 tracking-tight"
                    >
                      {block.text}
                    </h3>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-none pl-0 m-0 space-y-3 mb-6">
                      {block.items?.map((item, i) => (
                        <li key={i} className="text-neutral leading-relaxed flex items-start gap-1.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                default:
                  return null;
              }
            })}

            {/* References */}
            {article.references && article.references.length > 0 && (
              <div className="mt-16 pt-8 border-t border-neutral/10">
                <h3 className="font-display font-semibold text-xl text-dark mb-4">
                  References
                </h3>
                <ul className="space-y-2">
                  {article.references.map((ref, index) => (
                    <li key={index} className="text-sm text-neutral leading-relaxed">
                      {index + 1}. {ref}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 md:px-16 mt-24">
            <div className="border-t border-neutral/10 pt-16">
              <h2 className="font-display font-bold text-3xl text-dark mb-8">
                Related articles
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    href={`/insights/${relatedArticle.slug}`}
                    key={relatedArticle.id}
                    className="group"
                  >
                    <article className="card p-0 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300">
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-neutral mb-3">
                          <span>{relatedArticle.category}</span>
                          <span>•</span>
                          <span>{relatedArticle.readTime}</span>
                        </div>
                        <h3 className="font-display font-semibold text-xl text-dark group-hover:text-brand transition-colors mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-neutral line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="max-w-4xl mx-auto px-6 md:px-16 mt-24">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-center">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-dark mb-4">
              Ready to strengthen your food safety program?
            </h3>
            <p className="text-neutral mb-8 max-w-2xl mx-auto">
              Let's discuss how our evidence-based consulting services can support your
              compliance and quality goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 bg-brand text-white rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300"
            >
              <span>Book a consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
