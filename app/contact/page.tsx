"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-hero, .contact-form", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-start">
          <div className="contact-hero">
            <span className="inline-flex items-center gap-2 border border-brand-subtle rounded-full px-3 py-1 mb-6 bg-light/80">
              <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.26em] font-semibold text-neutral">
                Book a consultation
              </span>
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-dark mb-4">
              Let’s plan your roadmap.
            </h1>
            <p className="text-neutral text-base md:text-lg max-w-prose">
              Share a few details about your goals and timelines. We’ll reply within
              1 business day with next steps and a proposed slot.
            </p>

            <div className="mt-8 grid gap-2 text-sm text-neutral">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand"/> hello@360ace.food</p>
            </div>
          </div>

          <form className="contact-form card p-6 md:p-8 grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Full name</label>
                <input className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" required />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Company</label>
                <input className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Email</label>
                <input type="email" className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" required />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Phone</label>
                <input className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">What would you like to achieve?</label>
              <textarea rows={5} className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60">We reply in 1 business day</p>
              <button className="inline-flex items-center gap-2 px-9 py-4 bg-brand text-white rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300">
                Submit request
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
