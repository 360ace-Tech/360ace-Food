"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import articles from "@/data/articles.json";
import site from "@/data/site";
import JsonLd from "@/components/JsonLd";
import ArticleShare from "@/components/ArticleShare";

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

  const index = articles.findIndex((a) => a.id === article.id);
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;
  const articleImageUrl = article.image.startsWith("http") ? article.image : `${site.url}${article.image}`;

  return (
    <>
      <Navigation />

      
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          author: { "@type": "Person", name: article.author },
          image: articleImageUrl,
          mainEntityOfPage: `${site.url}/insights/${article.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Insights", item: `${site.url}/insights` },
            { "@type": "ListItem", position: 2, name: article.title, item: `${site.url}/insights/${article.slug}` },
          ],
        }}
      />
      
      <article className="pt-32 md:pt-40 pb-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-[1100px] mx-auto">
          
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral hover:text-brand transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all insights
            </Link>

          
          <div className="article-header">
            
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-light text-brand border border-brand-subtle">
                {article.category}
              </span>
            </div>

            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-dark mb-6 leading-tight">
              {article.title}
            </h1>

            
            <p className="text-xl md:text-2xl text-neutral leading-relaxed mb-8">
              {article.excerpt}
            </p>

            
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
              <ArticleShare title={article.title} slug={article.slug} />
            </div>
          </div>

          
          <div className="my-12 relative h-96 rounded-3xl overflow-hidden bg-slate-100">
            <Image
              src={article.image}
              alt={"imageAlt" in article && typeof article.imageAlt === "string" ? article.imageAlt : article.title}
              fill
              sizes="(min-width: 1280px) 1100px, (min-width: 768px) calc(100vw - 8rem), calc(100vw - 3rem)"
              className={`${"imageFit" in article && article.imageFit === "contain" ? "object-contain p-4" : "object-cover"}`}
              priority
            />
          </div>

          
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
                case "list": {
                  const lb2 = block as { type: string; items?: string[] };
                  return (
                    <ul key={index} className="list-none pl-0 m-0 space-y-3 mb-6">
                      {lb2.items?.map((item, i) => (
                        <li key={i} className="text-neutral leading-relaxed flex items-start gap-1.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                case "authors": {
                  const b = block as { type: string; text?: string };
                  return b.text ? (
                    <p key={index} className="text-sm text-neutral mb-6 leading-relaxed">
                      <span className="font-semibold text-dark">Authors: </span>{b.text}
                    </p>
                  ) : null;
                }
                case "publication_link": {
                  const lb = block as { type: string; text?: string; href?: string; label?: string };
                  return lb.href ? (
                    <div key={index} className="my-8 p-6 rounded-2xl border border-brand-subtle bg-emerald-50/60">
                      <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-brand mb-2">Peer-Reviewed Journal Article</p>
                      <p className="text-sm font-semibold text-dark mb-4 leading-snug">{lb.label}</p>
                      <a
                        href={lb.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-[11px] font-bold uppercase tracking-[0.18em] rounded-full hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 transition-all"
                      >
                        {lb.text || "Read full publication"}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : null;
                }
                default:
                  return null;
              }
            })}

            
            {Array.isArray((article as unknown as { references?: string[] }).references) && (article as unknown as { references?: string[] }).references!.length > 0 && (
              <div className="mt-16 pt-8 border-t border-neutral/10">
                <h3 className="font-display font-semibold text-xl text-dark mb-4">
                  References
                </h3>
                <ul className="space-y-2">
                  {(article as unknown as { references?: string[] }).references!.map((ref, index) => (
                    <li key={index} className="text-sm text-neutral leading-relaxed">
                      {index + 1}. {ref}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        
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
                          alt={"imageAlt" in relatedArticle && typeof relatedArticle.imageAlt === "string" ? relatedArticle.imageAlt : relatedArticle.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className={`transition-transform duration-500 ${"imageFit" in relatedArticle && relatedArticle.imageFit === "contain" ? "object-contain p-2" : "object-cover group-hover:scale-105"}`}
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

        
        <div className="max-w-4xl mx-auto px-6 md:px-16 mt-24">
          <div className="card p-8 md:p-12 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-center">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-dark mb-4">
              Ready to strengthen your food safety program?
            </h3>
            <p className="text-neutral mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our evidence-based consulting services can support your
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

        { (prev || next) && (
          <div className="max-w-4xl mx-auto px-6 md:px-16 mt-10 mb-24">
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <Link href={`/insights/${prev.slug}`} className="group inline-flex items-center gap-2 text-sm text-neutral hover:text-brand">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
                  <span>{prev.title}</span>
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/insights/${next.slug}`} className="group inline-flex items-center gap-2 text-sm text-neutral hover:text-brand">
                  <span>{next.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>
              ) : <span />}
            </div>
            <div className="mt-6 text-center">
              <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-neutral hover:text-brand">
                <ArrowLeft className="w-4 h-4" /> Back to all insights
              </Link>
            </div>
          </div>
        )}
      </article>

      <Footer />
    </>
  );
}
