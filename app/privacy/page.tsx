"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".privacy > *", { opacity: 0, y: 16, duration: 0.6, stagger: 0.08, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-16 lg:px-24 bg-white">
        <div className="privacy max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-dark mb-6">Privacy Policy</h1>
          <p className="text-neutral mb-8">Last updated: January 1, 2026</p>

          <p className="text-neutral mb-6">
            360ACE Food Consulting ("we", "us") respects your privacy. This policy describes how we
            collect, use, and protect personal information when you visit our website or engage our services.
          </p>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Information we collect</h2>
          <ul className="list-disc pl-6 text-neutral mb-6">
            <li>Contact details provided via forms (name, email, phone, company).</li>
            <li>Usage data (pages viewed, device and browser information, approximate location).</li>
            <li>Project details you voluntarily share with us during discovery.</li>
          </ul>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">How we use information</h2>
          <ul className="list-disc pl-6 text-neutral mb-6">
            <li>Respond to inquiries, schedule consultations, and deliver services.</li>
            <li>Improve site performance and content relevance.</li>
            <li>Send updates with your consent. You can opt out at any time.</li>
          </ul>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Sharing and retention</h2>
          <p className="text-neutral mb-6">
            We do not sell personal information. We may share data with trusted processors (e.g.,
            analytics or hosting) under confidentiality obligations. We retain information only as long as
            necessary for the purposes above or to comply with legal requirements.
          </p>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Your choices</h2>
          <ul className="list-disc pl-6 text-neutral mb-6">
            <li>Request access, correction, or deletion of your personal data.</li>
            <li>Unsubscribe from marketing at any time.</li>
            <li>Disable non-essential cookies through your browser settings.</li>
          </ul>

          <h2 className="font-display font-semibold text-2xl text-dark mb-3">Contact</h2>
          <p className="text-neutral">Questions? Email hello@360ace.food.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}

