"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Mail } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import site from "@/data/site";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || "";

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  }

  function validatePhone(phone: string) {
    if (!phone) return true; // optional
    const digits = (phone.match(/\d/g) || []).length;
    return digits >= 7 && digits <= 20;
  }
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${site.url}/contact` },
          ],
        }}
      />
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
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand" /> food@360ace.food</p>
            </div>
          </div>

          <form
            ref={formRef}
            className="contact-form card p-6 md:p-8 grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (status === "sending") return;
              setStatus("sending");
              setError("");

              const form = e.currentTarget as HTMLFormElement;
              const fields = new FormData(form);
              const payload = {
                name: String(fields.get("name") || "").trim(),
                company: String(fields.get("company") || "").trim(),
                email: String(fields.get("email") || "").trim(),
                phone: String(fields.get("phone") || "").trim(),
                message: String(fields.get("message") || "").trim(),
                // Turnstile adds this hidden input automatically when the widget sits inside the form
                "cf-turnstile-response": String(fields.get("cf-turnstile-response") || ""),
              };

              // Client-side validations for UX
              if (!payload.name || !payload.email) {
                setStatus("error");
                setError("Name and email are required.");
                return;
              }
              if (!validateEmail(payload.email)) {
                setStatus("error");
                setError("Enter a valid email address.");
                return;
              }
              if (!validatePhone(payload.phone)) {
                setStatus("error");
                setError("Enter a valid phone number (optional).");
                return;
              }
              if (siteKey && !payload["cf-turnstile-response"]) {
                setStatus("error");
                setError("Please complete the Turnstile check.");
                return;
              }

              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });
                const json = await res.json().catch(() => ({} as any));
                if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
                setStatus("success");
                form.reset();
              } catch (err: any) {
                setStatus("error");
                setError(err?.message || "Failed to send. Please email food@360ace.food.");
              }
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Full name</label>
                <input name="name" className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" required />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Company</label>
                <input name="company" className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Email</label>
                <input name="email" type="email" className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" required />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">Phone (optional)</label>
                <input
                  name="phone"
                  placeholder="Optional"
                  className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60 mb-2">What would you like to achieve?</label>
              <textarea name="message" rows={5} className="w-full rounded-xl border border-brand-subtle px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/30" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60">We reply in 1 business day</p>
              <button disabled={status === "sending"} className="inline-flex items-center gap-2 px-9 py-4 bg-brand text-white rounded-full font-bold text-[11px] uppercase tracking-[0.24em] hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 disabled:opacity-60">
                Submit request
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Status message */}
            <div aria-live="polite" className="mt-2 text-sm">
              {status === "sending" && <p className="text-neutral">Sending…</p>}
              {status === "success" && (
                <p className="text-emerald-600 font-medium">Thank you — your request was sent successfully.</p>
              )}
              {status === "error" && <p className="text-red-600">{error}</p>}
            </div>
            {/* Turnstile widget goes inside the form so it attaches hidden input */}
            {siteKey ? (
              <div className="mt-2 w-full sm:w-1/2 min-w-[240px] max-w-[360px]">
                <div
                  className="cf-turnstile"
                  data-sitekey={siteKey}
                  data-theme="light"
                  data-size="flexible"
                />
              </div>
            ) : null}
          </form>
          {/* Cloudflare Turnstile (only if site key present) */}
          {siteKey ? (
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" defer />
          ) : null}
        </div>
      </section>
      <Footer />
    </>
  );
}
