"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, AlertTriangle, BarChart3, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import site from "@/data/site";

type Answer = "yes" | "needs" | "skip";

const sections = [
  {
    id: "design",
    title: "System Design & Fit",
    desc: undefined,
    items: [
      "Procedures reflect how work is actually done on the production floor.",
      "SOPs remain practical during busy or high-pressure production periods.",
      "Controls focus on meaningful food safety risks rather than low-impact activities.",
      "Documentation supports decision-making — not just audit readiness.",
    ],
  },
  {
    id: "people",
    title: "People & Training",
    desc: "Food safety systems only work when people understand their role in them.",
    items: [
      "Staff understand why controls exist — not just what procedures state.",
      "Training is role-specific (production, QA, sanitation, maintenance, leadership).",
      "Expectations are clear and practical for each function.",
      "Food safety responsibility is shared beyond QA.",
    ],
  },
  {
    id: "records",
    title: "Records & Data Use",
    desc: "Records should support control and improvement, not just storage.",
    items: [
      "Records are completed consistently and accurately and securely stored.",
      "Data is reviewed and discussed — not simply filed.",
      "Trends are identified and addressed where necessary.",
      "Record-keeping feels manageable and purposeful.",
    ],
  },
  {
    id: "pressure",
    title: "Performance Under Pressure",
    desc: "Strong systems hold up when things don’t go as planned.",
    items: [
      "The system functions effectively during inspections — not only before them.",
      "Deviations can be quickly identified and staff know what to do when deviations occur.",
      "Deviations can be quickly corrected due to system robustness.",
      "Traceability and response processes are clearly understood; the team can respond confidently.",
    ],
  },
] as const;

export default function SelfCheckPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".selfcheck-hero, .selfcheck-card", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
      });
    });
    return () => ctx.revert();
  }, []);

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showModal, setShowModal] = useState<"positive" | "improve" | null>(null);

  const total = useMemo(() => sections.reduce((sum, s) => sum + s.items.length, 0), []);
  const yesCount = Object.values(answers).filter((v) => v === "yes").length;
  const completion = Math.round((Object.keys(answers).length / total) * 100);
  const score = total ? Math.round((yesCount / total) * 100) : 0;

  const onFinish = () => {
    if (completion === 100) setShowModal(score >= 60 ? "positive" : "improve");
  };

  const set = (key: string, val: Answer) => setAnswers((prev) => ({ ...prev, [key]: val }));

  return (
    <>
      <Navigation />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Self-check", item: `${site.url}/self-check` },
          ],
        }}
      />

      <section className="pt-32 md:pt-40 pb-10 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1100px] mx-auto selfcheck-hero">
          <div className="inline-flex items-center gap-2 border border-brand-subtle rounded-full px-3 py-1 mb-6 bg-light/80">
            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.26em] font-semibold text-neutral">
              Reflection Tool
            </span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-dark mb-4">
            Is your food safety system working — or just on paper?
          </h1>
          <p className="text-neutral text-base md:text-lg leading-relaxed max-w-[70ch] md:max-w-[75ch]">
            This short self-check is not an audit and not a compliance test. It helps you reflect on
            how well your system supports daily operations in a real facility. There are no scores and
            no pass or fail — just insights to guide action.
          </p>
        </div>
      </section>

      <section className="pb-20 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[1100px] mx-auto grid gap-6">
          <div className="selfcheck-card card p-5 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BarChart3 className="w-5 h-5 text-brand" />
              <p className="text-sm text-neutral">
                Completion: <span className="font-medium text-dark">{completion}%</span> · Confidence index: <span className="font-medium text-dark">{score}%</span>
              </p>
            </div>
            <div className="h-2 rounded-full bg-slate-100 w-44 overflow-hidden">
              <div className="h-full bg-brand" style={{ width: `${completion}%` }} />
            </div>
          </div>

          {sections.map((section, sIdx) => (
            <article key={section.id} className="selfcheck-card card p-6 md:p-8">
              <h2 className="font-display font-semibold text-xl md:text-2xl text-dark mb-1">
                {sIdx + 1}. {section.title}
              </h2>
              {section.desc && <p className="text-neutral mb-4">{section.desc}</p>}
              <div className="grid gap-3">
                {section.items.map((q, i) => {
                  const key = `${section.id}-${i}`;
                  const val = answers[key];
                  return (
                    <div key={key} className="rounded-xl border border-brand-subtle p-4 bg-white/50">
                      <p className="text-sm text-dark mb-3">{q}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => set(key, "yes")}
                          className={`px-3 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
                            val === "yes" ? "bg-emerald-500 text-white" : "bg-light hover:bg-emerald-50 text-dark"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => set(key, "needs")}
                          className={`px-3 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
                            val === "needs" ? "bg-rose-500 text-white" : "bg-light hover:bg-rose-50 text-dark"
                          }`}
                        >
                          Needs improvement
                        </button>
                        <button
                          onClick={() => set(key, "skip")}
                          className={`px-3 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
                            val === "skip" ? "bg-slate-800 text-white" : "bg-light hover:bg-slate-100 text-dark"
                          }`}
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}

          <div className="selfcheck-card card p-6 md:p-8">
            <p className="text-neutral text-sm">
              If you would like support interpreting your reflections or prioritising next steps, you may reach out to us.
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral/60">Progress {completion}%</p>
              <button
                onClick={onFinish}
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand text-white rounded-full text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-brand/90"
              >
                View result
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(null)} />
          <div className="relative z-10 max-w-lg w-full rounded-2xl bg-white shadow-2xl border border-white p-6 md:p-8">
            {showModal === "positive" ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl text-dark mb-2">Strong alignment</h3>
                <p className="text-neutral mb-6">
                  Your reflections suggest your system supports daily operations effectively. We can help you identify strategic improvements and collaborate on elevating your existing setup.
                </p>
                <div className="mx-auto mb-6 w-28 h-28 rounded-full grid place-items-center" style={{ background: `conic-gradient(#10b981 ${score}%, #e5e7eb 0)` }}>
                  <div className="w-24 h-24 rounded-full bg-white grid place-items-center">
                    <span className="font-display font-semibold text-dark">{score}%</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-brand/90"
                  >
                    Collaborate with us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100 text-rose-600 mb-4">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl text-dark mb-2">Opportunities to strengthen</h3>
                <p className="text-neutral mb-6">
                  Your reflections suggest areas that may benefit from clearer responsibilities, simpler processes, or better alignment to operations. We can support a practical action plan tailored to your facility.
                </p>
                <div className="mx-auto mb-6 w-28 h-28 rounded-full grid place-items-center" style={{ background: `conic-gradient(#ef4444 ${100 - score}%, #e5e7eb 0)` }}>
                  <div className="w-24 h-24 rounded-full bg-white grid place-items-center">
                    <span className="font-display font-semibold text-dark">{score}%</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-brand/90"
                  >
                    Contact us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
