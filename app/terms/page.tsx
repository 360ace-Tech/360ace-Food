"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".terms > *", { opacity: 0, y: 16, duration: 0.6, stagger: 0.08, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-16 lg:px-24 bg-white">
        <div className="terms max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-dark mb-6">Terms of Service</h1>
          <p className="text-neutral mb-8">Last updated: January 1, 2026</p>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Use of this site</h2>
          <p className="text-neutral mb-6">
            By accessing this website you agree to these terms and applicable laws. Content is provided
            for general information and does not constitute legal or regulatory advice.
          </p>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Engagements</h2>
          <p className="text-neutral mb-6">
            Consulting services are governed by a separate agreement that sets out scope, deliverables,
            fees, and confidentiality. In case of conflict, the signed agreement prevails.
          </p>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Intellectual property</h2>
          <p className="text-neutral mb-6">
            All materials on this site are owned by 360ACE Food Consulting or our licensors and may not be
            reproduced without permission.
          </p>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Limitation of liability</h2>
          <p className="text-neutral mb-6">
            We work to keep information accurate and current; however we provide no warranties and shall not
            be liable for indirect or consequential losses arising from use of this site.
          </p>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Contact</h2>
          <p className="text-neutral">For questions about these terms, email hello@360ace.food.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}

