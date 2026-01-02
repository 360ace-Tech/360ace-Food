"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import articles from "@/data/articles.json";

export default function InsightsPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".insights-hero", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      document.querySelectorAll(".article-card").forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.from(el, {
              y: 40,
              opacity: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
            });
          },
          once: true,
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Group articles by category
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="insights-hero max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-brand-subtle rounded-full px-3 py-1 mb-6 bg-light/80">
              <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.26em] font-semibold text-neutral">
                Insights & Articles
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-dark mb-6">
              Timely intelligence for your quality teams.
            </h1>

            <p className="text-neutral text-lg md:text-xl leading-relaxed mb-8">
              Curated articles and insights that keep food safety stakeholders proactive on
              emerging risks, regulatory changes, and industry best practices.
            </p>

            {/* Category filters */}
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand text-white">
                All Articles
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-brand-subtle text-neutral hover:bg-light transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-light">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link
                href={`/insights/${article.slug}`}
                key={article.id}
                className="article-card group"
              >
                <article className="card p-0 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-brand">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-neutral mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-semibold text-xl mb-3 text-dark group-hover:text-brand transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-neutral mb-4 line-clamp-3">{article.excerpt}</p>

                    {/* Author */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral/10">
                      <span className="text-xs font-medium text-neutral">
                        By {article.author}
                      </span>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand group-hover:gap-3 transition-all">
                        <span>Read more</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-dark mb-4">
            Want insights delivered to your inbox?
          </h2>
          <p className="text-neutral text-base md:text-lg max-w-2xl mx-auto mb-8">
            Subscribe to receive our latest articles, industry updates, and food safety best
            practices directly to your email.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-9 py-4 bg-brand text-white rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
